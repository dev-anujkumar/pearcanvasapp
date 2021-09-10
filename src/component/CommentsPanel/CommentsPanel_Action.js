import axios from 'axios';
import config from '../../config/config';
import {
    TOGGLE_COMMENTS_PANEL,
    FETCH_COMMENTS,
    REPLY_COMMENT,
    FETCH_COMMENT_BY_ELEMENT,
    RESOLVE_COMMENT,
    TOGGLE_REPLY,
    UPDATE_COMMENT,
    GET_PROJECT_USER,
    UPDATE_ASSIGNEE,
    DELETE_COMMENT,
    ERROR_POPUP
} from '../../constants/Action_Constants';

import { getCommentElements } from './../Toolbar/Search/Search_Action';


/**
 * 
 *@discription - This function is to fetchComments of the element called in slate wrapper action
  @param {String} contentUrn - content urn of slate 
  @param {String} title - Title of the slate 
*/
export const fetchComments = (contentUrn, title) => dispatch => {
    let projectUrn = config.projectUrn,
        url = `${config.REACT_APP_API_URL}v1/narrative/${projectUrn}/aggregatedComments/container/${contentUrn}`
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        dispatch({
            type: FETCH_COMMENTS,
            payload: { comments: response.data.comments, title }
        })
        let searchString = window.location.search;
        let q = new URLSearchParams(searchString);
        if (q.get('q')) {
            let currentWorkId = q.get('q');
            dispatch({
                type: TOGGLE_COMMENTS_PANEL,
                payload: true
            })
            dispatch({
                type: FETCH_COMMENT_BY_ELEMENT,
                payload: {
                    elementId: currentWorkId,
                    index: 0
                }
            })

            dispatch(getCommentElements(currentWorkId));
            //Replaces to the original URL to prevent multiple panel toggle
            window.history.replaceState(null, null, `/toc-wrapper/index.html?projectUrn=${config.projectUrn}&entityUrn=${config.projectEntityUrn}`);
        }
    }).catch(error => {
        console.log("failed to fetch comment", error);
    })
};

/**
 * 
 *@discription - This function is to fetchComments of the element 
  @param {String} elemenetId - elemenetId of element 
*/
export const fetchCommentByElement = (elementId, index) => dispatch => {
    return dispatch({
        type: FETCH_COMMENT_BY_ELEMENT,
        payload: {
            elementId: elementId,
            index: index
        }
    })
};

/**
 * 
 *@discription - This function is to toggle comments panel when click on button 
  @param {String} toggle - value true or false
*/

export const toggleCommentsPanel = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_COMMENTS_PANEL,
        payload: toggle
    })
};

/**
 * 
 *@discription - This function is to toggle reply component when click on reply button in comments panel 
  @param {String} toggle - value true or false
*/
export const toggleReply = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_REPLY,
        payload: toggle
    })
};

/**
 * 
 *@discription - This function is to save reply comment 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} reply - reply comment
  @param {String} elementId - Element id of the element
*/

export const replyComment = (commentUrn, reply, elementId) => dispatch => {
    let replyDataToSend = {
        comment: reply.commentString,
        commentCreator: reply.commentCreator
    };
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/reply/`
    return axios.post(url, replyDataToSend,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
            }
        }
    )
        .then(response => {
            dispatch({
                type: REPLY_COMMENT,
                payload: {
                    commentUrn,
                    reply,
                    toggleReplyForm: false
                }
            });

        }).catch(error => {
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            //console.log("Failed to add reply", error);
        })
};

/**
 * 
 *@discription - This function is to resolveComment  
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} resolveOrOpen - reply comment
  @param {String} elementId - Element id of the element
*/
export const resolveComment = (commentUrn, resolveOrOpen, elementId) => dispatch => {

    let request = {
        status: resolveOrOpen
    };
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
            }
        }
    )
        .then(response => {
            dispatch({
                type: RESOLVE_COMMENT,
                payload: { commentUrn, resolveOrOpen }
            });

        }).catch(error => {
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            //console.log("status update fail", error);
        })
};

/**
 * 
 *@discription - This function is to updateComment  
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} updateComment - update comment when click on edit
  @param {String} elementId - Element id of the element
*/

export const updateComment = (commentUrn, updateCommentParams, elementId) => dispatch => {

    let request = updateCommentParams
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Status/`
    return axios.put(url, request,
        {
            headers: {
                "Content-Type": "application/json",
                ApiKey: config.STRUCTURE_APIKEY,
                PearsonSSOSession: config.ssoToken
            }
        }
    ).then(response => {
        dispatch({
            type: UPDATE_COMMENT,
            payload: { commentUrn, updateComment: updateCommentParams.comment }
        });
    }).catch(error => {
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
        //console.log("status update fail", error);
    })
};

/**
 * 
 *@discription - This function is to get detail of all project users  
  @param {String} commentUrn - Comment urn of comment to reply
*/

export const getProjectUsers = () => dispatch => {
    let ENTITY_URN = config.projectEntityUrn
    let url = `${config.JAVA_API_URL}v2/dashboard/projectUserInfo/${ENTITY_URN}`
    return axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }).then(response => {
            dispatch({
                type: GET_PROJECT_USER,
                payload: [{ "userId": "c5test05", "roleId": "edit", "email": "c5test05@pedev.com", "firstName": "c5test05", "lastName": "c5test05", "lastModifiedDate": "2021-09-09T06:52:52.539Z", "isAuthorizedUser": true, "isAdmin": false }, { "userId": "c5test04", "roleId": "comment_only", "email": "c5test04@pedev.com", "firstName": "C5", "lastName": "Test04", "lastModifiedDate": "2021-09-09T07:27:17.535Z", "isAuthorizedUser": true, "isAdmin": false }, { "userId": "umuruba", "email": "Balla.Murugan@Pearson.com", "firstName": "Murugan, Balla", "lastName": "Balla", "isAdmin": true }, { "userId": "mmi1", "email": "mmi1@pedev.com", "firstName": "mmi1", "lastName": "mmi1", "isAdmin": true }, { "userId": "uhanlde", "email": "deb.hartwell@pearson.com", "firstName": "Hartwell, Deborah1", "lastName": "Deb", "isAdmin": true }, { "userId": "upannmi", "email": "michael.panno@pedev.com", "firstName": "Panno, Michael", "lastName": "zppqwiet", "isAdmin": true }, { "userId": "c2test03", "email": "c2test03.@pedev.com", "firstName": "c2test03", "lastName": "c2test03", "isAdmin": true }, { "userId": "c2test20", "email": "C2test20@PEDEV.COM", "firstName": "C2test20", "lastName": "C2test20", "isAdmin": true }, { "userId": "vshinni", "email": "nshinde@metrodigi.com", "firstName": "VSHINNI", "lastName": "Nikita", "isAdmin": true }, { "userId": "vemarde", "email": "Deepika.Emarose@pearson.com", "firstName": "Deepika Emarose", "lastName": "Deepika", "isAdmin": true }, { "userId": "c2test21", "email": "C2test21@PEDEV.COM", "firstName": "C2test21", "lastName": "C2test21", "isAdmin": true }, { "userId": "c2test14", "email": "C2test14@PEDEV.COM", "firstName": "C2test14", "lastName": "C2test14", "isAdmin": true }, { "userId": "ucleame", "email": "megan.cleary@pearson.com", "firstName": "Cleary, Megan", "lastName": "Megan", "isAdmin": true }, { "userId": "c2test07", "email": "c2test07.@pedev.com", "firstName": "c2test07", "lastName": "c2test07", "isAdmin": true }, { "userId": "c2test19", "email": "C2test19@PEDEV.COM", "firstName": "C2test19", "lastName": "C2test19", "isAdmin": true }, { "userId": "blueprint-admin", "email": "blueprint-admin.@pedev.com", "firstName": "blueprint-admin", "lastName": "blueprint-admin", "isAdmin": true }, { "userId": "c2test09", "email": "c2test09.@pedev.com", "firstName": "c2test09", "lastName": "c2test09", "isAdmin": true }, { "userId": "vgnansa", "email": "Sathya.Gnanasekaran@pearson.com", "firstName": "Gnanasekaran, Sathya", "lastName": "Sathya", "isAdmin": true }, { "userId": "sso1", "email": "SSO1@pearson.com", "firstName": "SSO1", "lastName": "SSO1", "isAdmin": true }, { "userId": "c2test17", "email": "C2test17@PEDEV.COM", "firstName": "C2test17", "lastName": "C2test17", "isAdmin": true }, { "userId": "c4test01", "email": "C4test01@pedev.com", "firstName": "test01, c4", "lastName": "c4", "isAdmin": true }, { "userId": "ubellcl", "email": "claudine.bellanton@pedev.com", "firstName": "Bellanton, Claudine1", "lastName": "qekkeud", "isAdmin": true }, { "userId": "performance101", "email": "Performance101.@pedev.com", "firstName": "Performance101", "lastName": "Performance101", "isAdmin": true }, { "userId": "ubrowc9", "email": "Christine.Brown@pearson.com", "firstName": "Brown, Christine", "lastName": "Christine", "isAdmin": true }, { "userId": "pafaa_testuser03", "email": "PAFAATestUser03@PEDEV.com", "firstName": "TestUser03, PAFAA", "lastName": "PAFAA", "isAdmin": true }, { "userId": "c2test05", "email": "c2test05.@pedev.com", "firstName": "c2test05", "lastName": "c2test05", "isAdmin": true }, { "userId": "c2test01", "email": "c2test01.@pedev.com", "firstName": "c2test01", "lastName": "c2test01", "isAdmin": true }, { "userId": "c2test04", "email": "c2test04.@pedev.com", "firstName": "c2test04", "lastName": "c2test04", "isAdmin": true }, { "userId": "usloali", "email": "lindsey.sloan@pearson.com", "firstName": "Sloan, Lindsey1", "lastName": "aqvvvgln", "isAdmin": true }, { "userId": "c2test13", "email": "c2test13.@pedev.com", "firstName": "c2test13", "lastName": "c2test13", "isAdmin": true }, { "userId": "c2test18", "email": "C2test18@PEDEV.COM", "firstName": "C2test18", "lastName": "C2test18", "isAdmin": true }, { "userId": "c2test22", "email": "C2test22@PEDEV.COM", "firstName": "C2test22", "lastName": "C2test22", "isAdmin": true }, { "userId": "vbachsu", "email": "sumit.bachani@pearson.com", "firstName": "Bachani, Sumit", "lastName": "Sumit", "isAdmin": true }, { "userId": "uthalki", "email": "kira.marbit@pedev.com", "firstName": "Marbit, Kira1", "lastName": "aonmqt", "isAdmin": true }, { "userId": "pafaa_testuser01", "email": "PAFAATestUser01@PEDEV.com", "firstName": "TestUser01, PAFAA", "lastName": "PAFAA", "isAdmin": true }, { "userId": "c2test11", "email": "C2test11@PEDEV.COM", "firstName": "C2test11", "lastName": "C2test11", "isAdmin": true }, { "userId": "vmishsu", "email": "smishra@metrodigi.com", "firstName": "Mishra, Sumant", "lastName": "Sumant", "isAdmin": true }, { "userId": "upurust", "email": "steven.purushothaman@pearson.com", "firstName": "Purushothaman, Steven", "lastName": "Steven", "isAdmin": true }, { "userId": "ulyncs1", "email": "samuel.lynch@pedev.com", "firstName": "Lynch, Samuel", "lastName": "Samuel", "isAdmin": true }, { "userId": "ubrowbl", "email": "blair.brown@pearson.com", "firstName": "Brown, Blair1", "lastName": "vouwzo", "isAdmin": true }, { "userId": "c2test16", "email": "C2test16@PEDEV.COM", "firstName": "C2test16", "lastName": "C2test16", "isAdmin": true }, { "userId": "sso3", "email": "sso3@mandc-test.com", "firstName": "SSO3", "lastName": "SSO3", "isAdmin": true }, { "userId": "lomt-admin", "email": "LOMT.ADMIN@pedev.com", "firstName": "ADMIN, LOMT", "lastName": "LOMT", "isAdmin": true }, { "userId": "c2test10", "email": "c2test10.@pedev.com", "firstName": "c2test10", "lastName": "c2test10", "isAdmin": true }, { "userId": "c4test03", "email": "C4test03@pedev.com", "firstName": "test03, c4", "lastName": "c4", "isAdmin": true }, { "userId": "vpriydi", "email": "Divya.Priyadarshini@pearson.com", "firstName": "Priyadarshini, Divya", "lastName": "Divya", "isAdmin": true }, { "userId": "uswenkr", "email": "kyrce.swenson@pearson.com", "firstName": "Swenson, Kyrce1", "lastName": "hhxzj", "isAdmin": true }, { "userId": "vrainsh", "email": "sraina@metrodigi.com", "firstName": "Raina, Sheetal", "lastName": "Sheetal", "isAdmin": true }, { "userId": "varbope", "email": "parboleda@metrodigi.com", "firstName": "VARBOPE", "lastName": "Peter", "isAdmin": true }, { "userId": "vramap1", "email": "Pratibha.Ramachandran@pearson.com", "firstName": "Ramachandran, Pratibha", "lastName": "Pratibha", "isAdmin": true }, { "userId": "c4test04", "email": "C4test04@pedev.com", "firstName": "test04, c4", "lastName": "c4", "isAdmin": true }, { "userId": "c2test12", "email": "c2test12.@pedev.com", "firstName": "c2test12", "lastName": "c2test12", "isAdmin": true }, { "userId": "c5test02", "email": "c5test02@mctest.local", "firstName": "C5 Test02", "lastName": "C5", "isAdmin": true }, { "userId": "vrymaal", "email": "alan.ryman@pearson.com", "firstName": "Ryman, Alan", "lastName": "Alan", "isAdmin": true }, { "userId": "ugangha", "email": "hari.gangadharan@pearson.com", "firstName": "Gangadharan, Hari", "lastName": "vbocot", "isAdmin": true }, { "userId": "c2test06", "email": "c2test06.@pedev.com", "firstName": "c2test06", "lastName": "c2test06", "isAdmin": true }, { "userId": "vmetcda", "email": "djm@logictran.com", "firstName": "Metcalfe, David", "lastName": "David", "isAdmin": true }, { "userId": "c2test23", "email": "C2test23@PEDEV.COM", "firstName": "C2test23", "lastName": "C2test23", "isAdmin": true }, { "userId": "ukanopa", "email": "patrick.kanouse@pearson.com", "firstName": "Kanouse, Patrick1", "lastName": "oovvgo", "isAdmin": true }, { "userId": "utayld1", "email": "Darren.Taylor@pedev.com", "firstName": "Taylor, Darren", "lastName": "szli", "isAdmin": true }, { "userId": "c4test05", "email": "C4test05 @pedev.com", "firstName": "test05, c4", "lastName": "c4", "isAdmin": true }, { "userId": "vagarra", "email": "radhika.agarwal@pearson.com", "firstName": "Agarwal, Radhika", "lastName": "Radhika", "isAdmin": true }, { "userId": "vgoela3", "email": "Akansh.Goel@PEDEV.COM", "firstName": "Goel, Akansh", "lastName": "Akansh", "isAdmin": true }, { "userId": "vgoels1", "email": "Sunny.Goel@PEDEV.COM", "firstName": "Goel, Sunny", "lastName": "Sunny", "isAdmin": true }, { "userId": "vrawam2", "email": "Manjeet.Rawat@PEDEV.COM", "firstName": "Rawat, Manjeet", "lastName": "Manjeet", "isAdmin": true }, { "userId": "serv.elm_integration", "email": "servELMINTEGRATION@pearson.com", "firstName": "Serv, ELM_INTEGRATION", "lastName": "ELM_INTEGRATION", "isAdmin": true }, { "userId": "c4test02", "email": "C4test02@pedev.com", "firstName": "test02, c4", "lastName": "c4", "isAdmin": true }, { "userId": "qa1-pafaa", "email": "qa1-pafaa@pedev.com", "firstName": "qa1-pafaa, .", "lastName": ".", "isAdmin": true }, { "userId": "pafaa_testuser04", "email": "PAFAATestUser04@PEDEV.com", "firstName": "TestUser04, PAFAA", "lastName": "PAFAA", "isAdmin": true }, { "userId": "vaggaan", "email": "Ankit.Aggarwal@PEDEV.COM", "firstName": "Aggarwal, Ankit", "lastName": "Ankit", "isAdmin": true }, { "userId": "pafaa_testuser02", "email": "PAFAATestUser02@PEDEV.com", "firstName": "TestUser02, PAFAA", "lastName": "PAFAA", "isAdmin": true }, { "userId": "qa2-pafaa", "email": "qa2-pafaa@pedev.com", "firstName": "qa2-pafaa, .", "lastName": ".", "isAdmin": true }, { "userId": "c2test24", "email": "C2test24@PEDEV.COM", "firstName": "C2test24", "lastName": "C2test24", "isAdmin": true }, { "userId": "c2test25", "email": "C2test25@PEDEV.COM", "firstName": "C2test25", "lastName": "C2test25", "isAdmin": true }, { "userId": "vkum324", "email": "santhosh.kumarperi@pearson.com", "firstName": "Kumar Peri, Santhosh", "lastName": "Santhosh", "isAdmin": true }, { "userId": "performance102", "email": "Performance102.@pedev.com", "firstName": "Performance102", "lastName": "Performance102", "isAdmin": true }, { "userId": "test_sso", "email": "test_sso@mandc-test.com", "firstName": "test_sso", "lastName": "test_sso", "isAdmin": true }, { "userId": "c5test01", "email": "c5test01test@pedev.com", "firstName": "Test01, C5", "lastName": "C5", "isAdmin": true }, { "userId": "vgotlda", "email": "Dave.Gotlieb@pearson.com", "firstName": "Gotlieb, Dave", "lastName": "Dave", "isAdmin": true }, { "userId": "udbtest01", "email": "udbtest01@PEDEV.COM", "firstName": "test01, udb", "lastName": "udb", "isAdmin": true }, { "userId": "ustroda", "email": "David.Stroup@Pearson.com", "firstName": "Stroup, David1", "lastName": "slcxwrm", "isAdmin": true }, { "userId": "udbtest02", "email": "udbtest02@PEDEV.COM", "firstName": "test02, udb", "lastName": "udb", "isAdmin": true }, { "userId": "ufolea3", "email": "andrea.foley@pearson.com", "firstName": "Foley, Andrea1", "lastName": "Andrea", "isAdmin": true }, { "userId": "avankra", "email": "rajasekhar.vankayala@pearson.com", "firstName": "Vankayala, Rajasekhar", "lastName": "Rajasekhar", "isAdmin": true }, { "userId": "vchapvi", "email": "Vivek.Chapa@PEDEV.COM", "firstName": "Chapa, Vivek", "lastName": "Vivek", "isAdmin": true }, { "userId": "elm-uat03", "email": "Master.Oogway@PEDEV.COM", "firstName": "Oogway, Master", "lastName": "Master", "isAdmin": true }, { "userId": "ujagapa", "email": "parthiban.jaganathan@pedev.com", "firstName": "Jaganathan, Parthiban1", "lastName": "bomvsyar", "isAdmin": true }, { "userId": "elm03", "email": "elm-03@pedev.com", "firstName": "03, elm", "lastName": "elm", "isAdmin": true }, { "userId": "steveoculususr", "email": "steven.gagliostro@pearson.com", "firstName": "Steve", "lastName": "oculususr", "isAdmin": true }, { "userId": "elm02", "email": "elm-02@pedev.com", "firstName": "elm", "lastName": "02", "isAdmin": true }, { "userId": "c5test043", "email": "c5test04@pedev.com12", "firstName": "C5", "lastName": "Test04", "isAdmin": true }, { "userId": "vdougke", "email": "kenneth.dougherty@pearson.com", "firstName": "Kenneth", "lastName": "Dougherty", "isAdmin": true }, { "userId": "elm-uat10", "email": "Su.Wu@PEDEV.COM", "firstName": "Su", "lastName": "Wu", "isAdmin": true }, { "userId": "asamipr", "email": "Prakash.Saminathan@pedev.com", "firstName": "Prakash", "lastName": "Saminathan", "isAdmin": true }, { "userId": "asahumo", "email": "Mohamed.Hameed@PEDEV.COM", "firstName": "Mohamed Abubacker Sithick", "lastName": "Sahul Hameed", "isAdmin": true }, { "userId": "c5test09", "email": "C5test09@PEDEV.COM", "firstName": "c5test09", "lastName": "c5test09", "isAdmin": true }, { "userId": "avasura", "email": "Ragul.Vasudevan@Pearson.com", "firstName": "Ragul", "lastName": "Vasudevan", "isAdmin": true }, { "userId": "amarisu", "email": "sureshkumar.marimuthu@pearson.com", "firstName": "Sureshkumar", "lastName": "Marimuthu", "isAdmin": true }]
            });
        }).catch(error => {
            //console.log("error while getting user", error);
        })
}

/**
 * 
 *@discription - This function is to Update the assignee of the project 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} newAssignee -Name of the new assignee in the project
  @param {String} elementId -elementId of the element
*/

export const updateAssignee = (commentUrn, newAssignee, elementId) => dispatch => {
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/comment/${commentUrn}/Assignee/`
    let req = {
        assignee: newAssignee
    };
    return axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            ApiKey: config.STRUCTURE_APIKEY,
            PearsonSSOSession: config.ssoToken
        }
    }).then(response => {
        dispatch({
            type: UPDATE_ASSIGNEE,
            payload: { commentUrn, newAssignee: newAssignee }
        });
    }).catch(error => {
        dispatch({ type: ERROR_POPUP, payload: { show: true } })
        //console.log("error while updating user", error);
    })

}

/**
 * 
 *@discription - This function is to delete the comment of the project 
  @param {String} commentUrn - Comment urn of comment to reply
  @param {String} elementId -elementId of the element
*/

export const deleteComment = (commentUrn, elementId) => (dispatch, getState) => {
    let url = `${config.REACT_APP_API_URL}v2/narrative/container/${elementId}/comment/${commentUrn}`
    return axios.delete(url,
        {
            headers: {
                "Content-Type": "application/json",
                PearsonSSOSession: config.ssoToken
            }
        }).then(response => {
            dispatch({
                type: DELETE_COMMENT,
                payload: commentUrn
            });
        }).catch(error => {
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            console.log("error while deleting user", error);
        })

}

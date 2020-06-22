import config from '../../../../config/config';
import { FULL_ASSESSMENT_CITE, FULL_ASSESSMENT_TDX } from '../../AssessmentSlateConstants';
import axios from 'axios';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType, assessmentTitle, filterUUID, pageNo=1) => (dispatch,getState) => {
    let sortBy = getState().citeTdxReducer.sortBy ? getState().citeTdxReducer.sortBy : '';
    let sortOrder = (getState().citeTdxReducer.sortOrder === 0 || getState().citeTdxReducer.sortOrder === 1) ? getState().citeTdxReducer.sortOrder : '';
    let startPage = --pageNo;
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });

    let searchTitle = (assessmentTitle == undefined || assessmentTitle == '') ? '' : assessmentTitle;
    searchTitle= specialCharacterEncode(searchTitle)
    var assessmentDispatchType = (assessmentType === FULL_ASSESSMENT_CITE)? 'GET_CITE_RESOURCES': (assessmentType === FULL_ASSESSMENT_TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';
    let pageSize=25;

    let url = `https://contentapis-qa.pearsoncms.net/assessment-api/assessments/v3/search?taxonomicTypes=${assessmentType === FULL_ASSESSMENT_CITE ? `CITE` : assessmentType === FULL_ASSESSMENT_TDX? `TDX` :'MMI'}&status=approved&name=${searchTitle}&page=${startPage}&pageSize=${pageSize}&sortAttribute=${sortBy}&sortOrder=${sortOrder}&collation.caseSensitivity=false&groupByEntity=true`;

    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
            dispatch({
                type: assessmentDispatchType,
                payload: {
                    data: res.data,
                    errFlag: false,
                    isLoading: false
                }
            })
    }).catch((error) => {
        dispatch({
            type: assessmentDispatchType,
            payload: {
                data: { assessments: [] },
                errFlag: true,
                isLoading: false
            }
        })
    })
}
export const setCurrentCiteTdx = (currentAssessmentSelected, openedFrom) => (dispatch, getState) => {
     dispatch({
            type: 'CURRENT_SELECTED_ASSESSMENT',
            payload: currentAssessmentSelected
        })
}
export const setCurrentInnerCiteTdx = (currentAssessmentSelected, openedFrom) => (dispatch, getState) => {
     dispatch({
            type: 'CURRENT_SELECTED_SINGLE_ASSESSMENT',
            payload: currentAssessmentSelected
        })
}

export const getSingleAssessmentData = (currentAssessmentSelected) => (dispatch, getState) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    let url =`${config.REACT_APP_API_URL}v1/slate/assessment/${currentAssessmentSelected}/items`;
    return axios.get(url, {
          headers:  {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
            dispatch({
                type: 'GET_SINGLE_ASSESSMENT_DATA',
                payload: {
                    data: res.data.items,
                    errFlag: false,
                    isLoading: false
                }
            })
    }).catch((error) => {
        dispatch({
            type: 'GET_SINGLE_ASSESSMENT_DATA',
            payload: {
                data: [],
                errFlag: true,
                isLoading: false
            }
        })
    })
}
/**
 * Filter UUID based on data responsefor the Assessment items
 */
export const filterCiteTdxData = (assessmentType, assessmentTitle, filterUUID) => (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    
    let url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/urn:pearson:work:${filterUUID}`;
    
    var filterData = { assessments: [] };
    var assessmentDispatchtype = (assessmentType === FULL_ASSESSMENT_CITE)? 'GET_CITE_RESOURCES': (assessmentType === FULL_ASSESSMENT_TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';

    var typeAssessment = (assessmentType === FULL_ASSESSMENT_CITE)? 'CITE': (assessmentType === FULL_ASSESSMENT_TDX)?'TDX': 'MMI';

    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let taxonomyType = (res.data.taxonomicTypes.length > 0) ? res.data.taxonomicTypes : [];
        let responseName = (res.data.name !== undefined) ? res.data.name : '';
        responseName=specialCharacterEncode(responseName);
        assessmentTitle=specialCharacterEncode(assessmentTitle);
        if ((taxonomyType.includes(typeAssessment) == false) || (responseName.toLowerCase().search(assessmentTitle.toLowerCase()) == -1)) {
            filterData = { assessments: [] };
        } else {
            let versionUrn = (res.data.versionUrn !== undefined) ? res.data.versionUrn : 'NA';
            let name = (res.data.name !== undefined) ? res.data.name : 'NA';
            let modifiedDate = (res.data.dateModified !== undefined) ? res.data.dateModified : 'NA';
            let modifiedBy = (res.data.createdBy !== undefined) ? res.data.createdBy : 'NA';
            filterData.assessments.push({ versionUrn, name, modifiedDate, modifiedBy })
        }
        dispatch({
            type: assessmentDispatchtype,
            payload: {
                data: filterData,
                errFlag: false,
                isLoading: false
            }
        })
    }).catch((error) => {
        dispatch({
            type: assessmentDispatchtype,
            payload: {
                data: filterData,
                errFlag: false,
                isLoading: false
            }
        })
    })
}

export function getMCQGuidedData(workUrn) {
    try {
        let responseData = axios.get(`${config.ASSESSMENT_ENDPOINT}assessmentitem/v2/${workUrn}/content`,
            {
                headers: {
                    "PearsonSSOSession": config.ssoToken,
                }
            });

        return responseData
    } catch (err) {
        console.log('Error in get assessment data', err)
    }
}

export const assessmentSorting = (sortBy,sortOrder) => (dispatch, getState) => {
    dispatch({
        type: 'ASSESSMENT_SORTING',
        payload: {
            sortOrder:sortOrder,
            sortBy:sortBy
        }
    })
}
function specialCharacterEncode(title){
    let searchTitle=encodeURIComponent(title);
    let specialCharacters={
        "\\(":"%28",
        "\\)":"%29",
        "\\!":"%21",
        "\\-":"%2D",
        "\\.":"%2E",
        "\\*":"%2A",
        "\\_":"%5F"
    }
    
    for (let key in specialCharacters) {
        searchTitle = searchTitle.replace(new RegExp(key,"g") , specialCharacters[key])
    }
    return searchTitle;

}

/** [PCAT-7985] - Special Characters on Assesment Picker showing as hexcode rather than special characters.*/
/**
 *  @function specialCharacterDecode
 *  @description - This function is to convert HTML code back to special characters
 *  @param {String} encodedString - string to be converted
 *  @returns {String} 
*/
export const specialCharacterDecode = (encodedString) => {
    let decodedString = "";
    if (encodedString) {
        // decodedString = decodeHtmlCharCodes(encodedString)
        decodedString =  stringToHTML(encodedString)
        decodedString = escapeHtml(decodedString)
        decodedString = decodedString.replace(/<\s*\/?br\s*[\/]?>/gi, "")
    }
    return decodedString;
}

// const decodeHtmlCharCodes = (str) => {
//     return str.replace(/(&#(\d+);)/g, (match, capture, charCode) => {
//         return String.fromCharCode(charCode);
//     });
// }

const escapeHtml = (str) => {
    var specialCharList = {
        '\\&nbsp;': " ",
        '\\&lt;': "<",
        '\\&gt;': ">",
        '\\&euro;': "€",
        '\\&pound;': "£",
        "\\&quot;": '"',
        "\\&apos;": "'",
        "\\&amp;": "&"
    };
    for (let key in specialCharList) {
        str = str.replace(new RegExp(key,"g") , specialCharList[key])
    }
    return str;
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body.innerHTML;
};  
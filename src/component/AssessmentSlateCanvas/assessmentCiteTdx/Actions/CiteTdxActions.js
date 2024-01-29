import config from '../../../../config/config';
import { CITE, TDX , MMI} from '../../AssessmentSlateConstants';
import axios from 'axios';
import { axiosGetAPI } from '../../../../js/apiCancelRequestHandlers.js';

/**
 * This action creator is used to fetch ELM resources added to the project
 */
export const getCiteTdxData = (assessmentType, assessmentTitle, filterUUID, pageNo=1) => async(dispatch,getState) => {

    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });
    let sortBy = getState().citeTdxReducer.sortBy ? getState().citeTdxReducer.sortBy : '';
    let sortOrder = (getState().citeTdxReducer.sortOrder === 0 || getState().citeTdxReducer.sortOrder === 1) ? getState().citeTdxReducer.sortOrder : '';
    let startPage = --pageNo;
    let searchTitle = (assessmentTitle == undefined || assessmentTitle == '') ? '' : assessmentTitle;
    searchTitle= specialCharacterEncode(searchTitle)
    var assessmentDispatchType = (assessmentType === CITE)? 'GET_CITE_RESOURCES': (assessmentType === TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';
    let pageSize=25;
    const taxonomicTypes = assessmentType === CITE ? CITE.toUpperCase() : assessmentType === TDX ? TDX.toUpperCase() : MMI.toUpperCase();

    let url = `${config.ACON_API_ENDPOINT}assessments/search?taxonomicTypes=${taxonomicTypes}&status=approved&name=${searchTitle}&page=${startPage}&pageSize=${pageSize}&sortAttribute=${sortBy}&sortOrder=${sortOrder}&collation.caseSensitivity=false&groupByEntity=true`
    try {
        const res = await axiosGetAPI(url);
        if(res.data?.hasOwnProperty('assesssments')){
            res.data={
                ...res.data,
                assessments: res.data.assesssments
            }
            delete res.data.assesssments
        }
        dispatch({
            type: assessmentDispatchType,
            payload: {
                data: res.data,
                errFlag: false,
                isLoading: false
            }
        })
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('The Assessment Search API has been cancelled!!!')
        } else {
            dispatch({
                type: assessmentDispatchType,
                payload: {
                    data: { assessments: [] },
                    errFlag: true,
                    isLoading: false
                }
            })
            console.log("Unable to fetch API results>>>",err)
        }
    }
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
export const filterCiteTdxData = (assessmentType, assessmentTitle, filterUUID) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING_TRUE', payload: { isLoading: true } });

    let url = `${config.ASSESSMENT_ENDPOINT}assessment/v2/urn:pearson:work:${filterUUID}`;

    var filterData = { assessments: [] };
    var assessmentDispatchtype = (assessmentType === CITE)? 'GET_CITE_RESOURCES': (assessmentType === TDX)?'GET_TDX_RESOURCES': 'GET_MMI_RESOURCES';

    var typeAssessment = (assessmentType === CITE)? CITE.toUpperCase() : (assessmentType === TDX)? TDX.toUpperCase(): MMI.toUpperCase();

    try {
        const res = await axiosGetAPI(url);
        let taxonomyType = (res.data.taxonomicTypes.length > 0) ? res.data.taxonomicTypes : [];
        let responseName = (res.data.name !== undefined) ? res.data.name : '';
        if(res.data?.hasOwnProperty('assesssments')){
            res.data={
                ...res.data,
                assessments: res.data.assesssments
            }
            delete res.data.assesssments
        }
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
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log('The Assessment Search API has been cancelled!!!')
        } else {
            dispatch({
                type: assessmentDispatchtype,
                payload: {
                    data: filterData,
                    errFlag: false,
                    isLoading: false
                }
            })
            console.log("Unable to fetch API results>>>",err)
        }
    }
}

export async function getMCQGuidedData(workUrn) {
    try {
        let responseData = await axios.get(`${config.ASSESSMENT_ENDPOINT}assessmentitem/v2/${workUrn}/content`,
            {
                headers: {
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
export const specialCharacterEncode = (title) => {
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

export const setAssessmentFilterParams = (title, uuid) => {
    return {
        type: 'SET_SEARCH_PARAMS',
        payload: {
            searchTitle: title,
            searchUUID: uuid
        }
    }
}

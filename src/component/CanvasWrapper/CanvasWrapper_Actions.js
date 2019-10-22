import axios from 'axios';
import config from '../../config/config';
import mockdata from './../../appstore/mockdata';
import {
	FETCH_SLATE_DATA,
	SET_ACTIVE_ELEMENT,
} from '../../constants/Action_Constants';
import {fetchComments} from '../CommentsPanel/CommentsPanel_Action';
import elementTypes from './../Sidebar/elementTypes';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';

const axiosApiInstance = axios.create({
	baseURL: config.C4_API_URL,
	withCredentials: true
})

const findElementType = (element, index) => {
	let elementType = {};
	elementType['tag'] = '';

	switch (element.type) {
		case 'element-authoredtext':
			elementType['elementType'] = 'element-authoredtext';
			if ('elementdata' in element && 'headers' in element.elementdata && element.elementdata.headers) {
				elementType['primaryOption'] = 'primary-heading';
				elementType['secondaryOption'] = 'secondary-heading-' + element.elementdata.headers[0].level;
			} else {
				elementType['primaryOption'] = 'primary-paragraph';
				elementType['secondaryOption'] = 'secondary-paragraph';
			}
			break;

		case 'element-blockfeature':
			elementType['elementType'] = 'element-authoredtext';
			elementType['primaryOption'] = 'primary-blockquote';
			switch (element.elementdata.type) {
				case 'pullquote':
					elementType['secondaryOption'] = 'secondary-pullquote';
					break;
				case 'blockquote':
					elementType['secondaryOption'] = 'secondary-marginalia';
					break;
				case 'marginalia':
					elementType['secondaryOption'] = 'secondary-marginalia-attribution';
					break;
			}
			break;

		case 'figure':
			if (element.figuretype) {
				if (element.figuretype == 'image') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-image-figure';
					switch (element.subtype) {
						case 'image50Text':
							elementType['secondaryOption'] = 'secondary-image-figure-half';
							break;
						case 'imageTextWidth':
							elementType['secondaryOption'] = 'secondary-image-figure-width';
							break;
						case 'imageWiderThanText':
							elementType['secondaryOption'] = 'secondary-image-figure-wider';
							break;
						case 'imageFullscreen':
							elementType['secondaryOption'] = 'secondary-image-figure-full';
							break;
						case 'image25Text':
						default:
							elementType['secondaryOption'] = 'secondary-image-figure-quarter';
							break;
					}
				} else if(element.figuretype == 'table') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-image-table';
					switch(element.subtype) {
						case 'image50TextTableImage':
							elementType['secondaryOption'] = 'secondary-image-table-half';
							break;
						case 'imageTextWidthTableImage':
							elementType['secondaryOption'] = 'secondary-image-table-width';
							break;
						case 'imageWiderThanTextTableImage':
							elementType['secondaryOption'] = 'secondary-image-table-wider';
							break;
						case 'imageFullscreenTableImage':
							elementType['secondaryOption'] = 'secondary-image-table-full';
							break;
					}
				} else if(element.figuretype == 'mathImage') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-image-equation';
					switch(element.subtype) {
						case 'image50TextMathImage':
							elementType['secondaryOption'] = 'secondary-image-equation-half';
							break;
						case 'imageTextWidthMathImage':
							elementType['secondaryOption'] = 'secondary-image-equation-width';
							break;
						case 'imageWiderThanTextMathImage':
							elementType['secondaryOption'] = 'secondary-image-equation-wider';
							break;
						case 'imageFullscreenMathImage':
							elementType['secondaryOption'] = 'secondary-image-equation-full';
							break;
					}
				} else if(element.figuretype == 'authoredtext') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-mathml-equation';
					switch(element.subtype) {
						case 'mathml':
							elementType['secondaryOption'] = 'secondary-mathml-equation';
							break;
					}
				} else if (element.figuretype == 'codelisting') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-blockcode-equation';
					switch (element.figuretype.programlanguage) {
						case 'C++':
							elementType['secondaryOption'] = 'secondary-blockcode-language-C++';
							break;
						case 'Java':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Java';
							break;
						case 'C':
							elementType['secondaryOption'] = 'secondary-blockcode-language-C';
							break;
						case 'Python':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Python';
							break;
						case 'Javascript':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Javascript';
							break;
						case 'HTML':
							elementType['secondaryOption'] = 'secondary-blockcode-language-HTML';
							break;
						case 'CSS':
							elementType['secondaryOption'] = 'secondary-blockcode-language-CSS';
							break;
						case 'Apache':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Apache';
							break;
						case 'C#':
							elementType['secondaryOption'] = 'secondary-blockcode-language-C#';
							break;
						case 'JSON':
							elementType['secondaryOption'] = 'secondary-blockcode-language-JSON';
							break;
						case 'Makefile':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Makefile';
							break;
						case 'Kotlin':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Kotlin';
							break;
						case 'R':
							elementType['secondaryOption'] = 'secondary-blockcode-language-R';
							break;
						case 'Perl':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Perl';
							break;
						case 'PHP':
							elementType['secondaryOption'] = 'secondary-blockcode-language-PHP';
							break;
						case 'GO':
							elementType['secondaryOption'] = 'secondary-blockcode-language-GO';
							break;
						case 'Ruby':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Ruby';
							break;
						case 'Lisp':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Lisp';
							break;
						case 'Objective_C':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Objective_C';
							break;
						case 'Scala':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Scala';
							break;
						case 'Shell_Session':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Shell_Session';
							break;
						case 'SQL':
							elementType['secondaryOption'] = 'secondary-blockcode-language-SQL';
							break;
						case 'Swift':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Swift';
							break;
						case 'XML':
							elementType['secondaryOption'] = 'secondary-blockcode-language-XML';
							break;
						case 'Matlab':
							elementType['secondaryOption'] = 'secondary-blockcode-language-Matlab';
							break;
						case 'GLSL':
							elementType['secondaryOption'] = 'secondary-blockcode-language-GLSL';
							break;
						case 'SML':
							elementType['secondaryOption'] = 'secondary-blockcode-language-SML';
							break;
						default:
							elementType['secondaryOption'] = 'secondary-blockcode-language-Default';
							break;

					}
				} else if (element.figuretype == 'tableasmarkup') {
					elementType['elementType'] = 'figure';
					elementType['primaryOption'] = 'primary-editor-table-equation';
					switch (element.subtype) {
						case 'imageTextWidthTableEditor':
							elementType['secondaryOption'] = 'secondary-editor-table-width';
							break;
						case 'imageWiderThanTextEditorTable':
							elementType['secondaryOption'] = 'secondary-editor-table-wider';
							break;
						case 'imageFullscreenTableEditor':
							elementType['secondaryOption'] = 'secondary-editor-table-full';
							break;
						case 'image50TextEditorTable':
						default:
							elementType['secondaryOption'] = 'secondary-editor-table-half';
							break;

					}
				} else if (element.figuretype == 'video') {
					elementType['elementType'] = 'video-audio';
					elementType['primaryOption'] = 'primary-video';
					switch(element.figuredata.srctype) {
						case 'internal':
							elementType['secondaryOption'] = 'secondary-video-alfresco';
							break;
						case 'externallink':
						default:
							elementType['secondaryOption'] = 'secondary-video-smartlink';
							break;
					}
				} else if (element.figuretype == 'audio') {
					elementType['elementType'] = 'video-audio';
					elementType['primaryOption'] = 'primary-audio';
					switch(element.figuredata.srctype) {
						case 'internal':
							elementType['secondaryOption'] = 'secondary-audio-alfresco';
							break;
						case 'externallink':
						default:
							elementType['secondaryOption'] = 'secondary-audio-smartlink';
							break;
						
							
					}
				} else if (element.figuretype == 'interactive') {
					elementType['elementType'] = 'element-interactive';
					switch(element.figuredata.interactivetype) {
						case '3rd-party':
							elementType['primaryOption'] = 'primary-smartlink';
							elementType['secondaryOption'] = 'secondary-interactive-smartlink-third';
							break;
						case 'pdf':
							elementType['primaryOption'] = 'primary-smartlink';
							elementType['secondaryOption'] = 'secondary-interactive-smartlink-pdf';
							break;
						case 'web-link':
							elementType['primaryOption'] = 'primary-smartlink';
							elementType['secondaryOption'] = 'secondary-interactive-smartlink-web';
							break;
						case 'pop-up-web-link':
							elementType['primaryOption'] = 'primary-smartlink';
							elementType['secondaryOption'] = 'secondary-interactive-smartlink-pop-up-web-link';
							break;
						case 'table':
							elementType['primaryOption'] = 'primary-smartlink';
							elementType['secondaryOption'] = 'secondary-interactive-smartlink-tab';
							break;
						case 'showhide':
							elementType['primaryOption'] = 'primary-showhide';
							elementType['secondaryOption'] = 'secondary-interactive-showhide';
							break;
						case 'popup':
							elementType['primaryOption'] = 'primary-popup';
							elementType['secondaryOption'] = 'secondary-interactive-popup';
							break;
						case 'fpo':
						case 'flashcards':
						default:
							elementType['primaryOption'] = 'primary-mmi';
							elementType['secondaryOption'] = 'secondary-interactive-mmi';
							break;
					}
				} else if (element.figuretype == 'assessment') {
					elementType['elementType'] = 'element-assessment';
					elementType['primaryOption'] = 'primary-single-assessment';
					switch (element.figuredata.elementdata.assessmentformat) {
						case 'tdx':
							elementType['secondaryOption'] = 'secondary-single-assessment-tdx';
							break;
						case 'cite':
						default:
							elementType['secondaryOption'] = 'secondary-single-assessment-cite';
							break;
					}
				}
			}
			break;

		case 'element-aside':
			if (element.subtype === '' || element.subtype === 'sidebar') {
				elementType['elementType'] = 'element-aside';
				switch(element.designtype) {
					case 'asideTacticBox':
						elementType['primaryOption'] = 'primary-aside-tactic';
						elementType['secondaryOption'] = 'secondary-aside-tactic';
						break;
					case 'asideSidebar01':
						elementType['primaryOption'] = 'primary-aside-aside';
						elementType['secondaryOption'] = 'secondary-aside-sb1';
						break;
					case 'asideSidebar02':
						elementType['primaryOption'] = 'primary-aside-aside';
						elementType['secondaryOption'] = 'secondary-aside-sb2';
						break;
					case 'asideSidebar03':
						elementType['primaryOption'] = 'primary-aside-aside';
						elementType['secondaryOption'] = 'secondary-aside-sb3';
						break;
					case 'asideSidebar04':
						elementType['primaryOption'] = 'primary-aside-aside';
						elementType['secondaryOption'] = 'secondary-aside-sb4';
						break;
					case 'asideSidebar05':
						elementType['primaryOption'] = 'primary-aside-aside';
						elementType['secondaryOption'] = 'secondary-aside-sb5';
						break;
					case 'asideSidebarFeature':
						elementType['primaryOption'] = 'primary-aside-feature';
						elementType['secondaryOption'] = 'secondary-aside-feature';
						break;
					case 'asideActivity':
						elementType['primaryOption'] = 'primary-aside-activity';
						elementType['secondaryOption'] = 'secondary-aside-activity';
						break;	
					default:
						elementType['primaryOption'] = 'primary-aside-lol';
						elementType['secondaryOption'] = 'secondary-aside-lol';
						break;
				}
			} else if (element.subtype === 'workedexample') {
				elementType['elementType'] = 'element-workedexample';
				switch(element.designtype) {
					case 'workedexample1':
						elementType['primaryOption'] = 'primary-workedexample-we1';
						elementType['secondaryOption'] = 'secondary-workedexample-we1';
						break;
					case 'workedexample2':
						elementType['primaryOption'] = 'primary-workedexample-we2';
						elementType['secondaryOption'] = 'secondary-workedexample-we2';
						break;
				}
			}
			break;

		case 'element-list':
			elementType['elementType'] = 'element-authoredtext';
			elementType['primaryOption'] = 'primary-list';
			switch (element.subtype) {
				case "upper-alpha":
					elementType['secondaryOption'] = 'secondary-list-3';
					break;
				case "lower-alpha":
					elementType['secondaryOption'] = 'secondary-list-4';
					break;
				default:
					elementType['secondaryOption'] = 'secondary-list-3';
					break;
			}
			break;

		case 'element-learningobjectivemapping':
			elementType['elementType'] = '';
			elementType['primaryOption'] = '';
			elementType['secondaryOption'] = '';
			elementType['tag'] = 'LO';
			break;

		case 'element-generateLOlist':
			elementType['elementType'] = '';
			elementType['primaryOption'] = '';
			elementType['secondaryOption'] = '';
			elementType['tag'] = 'MA';
			break;
		
		case 'chapterintro':
			elementType['elementType'] = 'chapterintro';
			elementType['primaryOption'] = 'primary-chapterintro';
			elementType['secondaryOption'] = 'secondary-chapterintro';
			elementType['tag'] = 'OE';
			break;
		
		default: 
			elementType['elementType'] = 'element-authoredtext';
			elementType['primaryOption'] = 'primary-paragraph';
			elementType['secondaryOption'] = 'secondary-paragraph';
	}

	elementType['elementId'] = element.id;
	elementType['index'] = index;
	elementType['elementWipType'] = element.type;

	if(elementType.elementType && elementType.elementType !== '')
	elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
	
	return elementType;
}

export const fetchElementTag = (element, index = 0) => {
	if (Object.keys(element).length > 0) {
		return findElementType(element, index).tag;
	}
}

export const fetchSlateData = (manifestURN) => dispatch => {	
	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${config.slateEntityURN}`, {
		headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
	}).then(slateData => {
		sendDataToIframe({'type': HideLoader,'message': { status: false }});
		let contentUrn = slateData.data[manifestURN].contentUrn;
		let title = slateData.data[manifestURN].contents.title ? slateData.data[manifestURN].contents.title.text : '';
		
		dispatch(fetchComments(contentUrn, title));
		dispatch({
			type: FETCH_SLATE_DATA,
			payload: {
				[manifestURN]: slateData.data[manifestURN]
			}
		});
	});
};

export const setActiveElement = (activeElement = {}, index = 0) => dispatch => {
	dispatch({
		type: SET_ACTIVE_ELEMENT,
		payload: findElementType(activeElement, index)
	});
}

export const fetchAuthUser = () => dispatch=> {
    let userDataURL;
	let axiosInstance;

    if (process.env.NODE_ENV === 'development') {
        userDataURL = 'dev-user'
        axiosInstance = axiosApiInstance

    } else {
        if (!sessionStorage.validSession) return Promise.reject(new Error('No session'))
        const sessionData = JSON.parse(JSON.parse(sessionStorage.validSession).data)
        if (!sessionData.valid) return Promise.reject(new Error('No valid session'))
        userDataURL = `users/${sessionData.uid}`
        axiosInstance = axiosPearsonInstance
    }
    return axios.get(`${config.JAVA_API_URL}v2/dashboard/userInfo/users/${config.userId}`, {
		headers: {
            "Content-Type": "application/json",
			"PearsonSSOSession":  config.ssoToken
		}
	}).then((response) => {
            let userInfo = response.data;
            config.userEmail = userInfo.email;
        })
        .catch(err => {
            console.log('axios Error', err);
            //dispatch({type: 'FETCH_AUTH_USER_REJECTED', payload: err}) // NOt using
        })
}
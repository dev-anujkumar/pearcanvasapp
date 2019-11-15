import axios from 'axios';
import config from '../../config/config';
import {
	FETCH_SLATE_DATA,
	SET_ACTIVE_ELEMENT,
} from '../../constants/Action_Constants';
import {fetchComments} from '../CommentsPanel/CommentsPanel_Action';
import elementTypes from './../Sidebar/elementTypes';
import { sendDataToIframe } from '../../constants/utility.js';
import { HideLoader} from '../../constants/IFrameMessageTypes.js';
import elementDataBank from './elementDataBank'


const findElementType = (element, index) => {
	let elementType = {};
	elementType['tag'] = '';
	try {
		switch (element.type) {
			case 'element-authoredtext':
				elementType['elementType'] = elementDataBank[element.type]["elementType"];
				if ('elementdata' in element && 'headers' in element.elementdata && element.elementdata.headers) {
					elementType['primaryOption'] = elementDataBank["element-authoredtext-heading"]["primaryOption"];
					elementType['secondaryOption'] = 'secondary-heading-' + element.elementdata.headers[0].level;
				} else {
					elementType['primaryOption'] = elementDataBank[element.type]["primaryOption"];
					elementType['secondaryOption'] = elementDataBank[element.type]["secondaryOption"];
				}
				break;

			case 'element-blockfeature':
				elementType = {
					...elementDataBank[element.type][element.elementdata.type]
				}
				break;

			case 'figure':
					let altText="";
				switch (element.figuretype){
					case "image":
					case "table":
					case "mathImage":
					case "authoredtext":
					case "tableasmarkup":
						altText = element.figuredata.alttext ? element.figuredata.alttext : ""
						let longDesc = element.figuredata.longdescription ? element.figuredata.longdescription : "" 	
						elementType = {
							elementType : elementDataBank[element.type][element.figuretype]["elementType"],
							primaryOption : elementDataBank[element.type][element.figuretype]["primaryOption"],
							altText,
							longDesc,
							...elementDataBank[element.type][element.figuretype][element.subtype]
						}
						break;
					case "codelisting":
						elementType = {
							elementType : elementDataBank[element.type][element.figuretype]["elementType"],
							primaryOption : elementDataBank[element.type][element.figuretype]["primaryOption"],
							numbered : element.figuredata.numbered,
							startNumber : element.figuredata.startNumber
						}
						switch (element.figuredata.programlanguage){
							case "Select":
								elementType.secondaryOption = `secondary-blockcode-language-Default`
								break;

							default:
								elementType.secondaryOption = `secondary-blockcode-language-${element.figuredata.programlanguage}`
						}
						break;
					case "video":
					case "audio" :
						elementType = {
							elementType : elementDataBank[element.type][element.figuretype]["elementType"],
							primaryOption : elementDataBank[element.type][element.figuretype]["primaryOption"],
							...elementDataBank[element.type][element.figuretype][element.figuredata.srctype||'externallink']
						}
						break;
					case "interactive":
						altText = element.figuredata.alttext ? element.figuredata.alttext : "",
						elementType = {
							elementType : elementDataBank[element.type][element.figuretype]["elementType"],
							primaryOption : elementDataBank[element.type][element.figuretype][element.figuredata.interactivetype]["primaryOption"],
							secondaryOption : elementDataBank[element.type][element.figuretype][element.figuredata.interactivetype]["secondaryOption"],
							altText
						}
						break;
					case "assessment":
						elementType = {
							elementType : elementDataBank[element.type][element.figuretype]["elementType"],
							primaryOption : elementDataBank[element.type][element.figuretype]["primaryOption"],
							...elementDataBank[element.type][element.figuretype][element.figuredata.elementdata.assessmentformat]
						}
						break;
				}
				break;

			case 'element-aside':
				if(element.designtype == ""){
					element.designtype = "asideLearningObjective";
				}
				elementType = {
					elementType : elementDataBank[element.type][element.subtype]["elementType"],
					...elementDataBank[element.type][element.subtype][element.designtype]
				}
				break;

			case 'element-list':
				elementType = {
					...elementDataBank[element.type][element.subtype]
				}
				break;

			case 'element-learningobjectivemapping':
			case 'element-generateLOlist':
			case 'element-learningobjectives':
			case 'openerelement':
				elementType = {...elementDataBank[element.type]}
				break;
			
			default:
				elementType = {...elementDataBank["element-authoredtext"]}
		}
	} catch(err) {
		elementType = {
			elementType: ''
		}
	}

	elementType['elementId'] = element.id;
	elementType['index'] = index;
	elementType['elementWipType'] = element.type;

	elementType['toolbar'] = [];
	if(elementType.elementType && elementType.elementType !== '') {
		elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
		elementType['toolbar'] = elementTypes[elementType.elementType][elementType.primaryOption].toolbar;
	}
	return elementType;
}

export const fetchElementTag = (element, index = 0) => {
	if (Object.keys(element).length > 0) {
		return findElementType(element, index).tag || "";
	}
}

export const fetchSlateData = (manifestURN) => dispatch => {
	return axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${config.slateEntityURN}/${manifestURN}`, {
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
				[manifestURN]: JSON.parse(JSON.stringify(slateData.data[manifestURN]))
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

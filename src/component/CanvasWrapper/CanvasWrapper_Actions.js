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


const findElementType = (element) => {
	let elementType = {};

	switch (element.type) {
		case 'element-authoredtext':
			elementType['elementType'] = 'element-authoredtext';
			if (element.elementdata.hasOwnProperty("headers") && element.elementdata.headers) {
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
						case 'imageTextWidth':
							elementType['secondaryOption'] = 'secondary-image-figure-width';
							break;
						case 'imageWiderThanText':
							elementType['secondaryOption'] = 'secondary-image-figure-wider';
							break;
						case 'imageFullscreen':
							elementType['secondaryOption'] = 'secondary-image-figure-full';
							break;
						case 'image50Text':
						default:
							elementType['secondaryOption'] = 'secondary-image-figure-half';
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
				}
			}
			break;

		case 'element-aside':
			if(element.subtype === '' || element.subtype === 'sidebar') {
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
			} else if(element.subtype === 'workedexample') {
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
			elementType['elementWipType'] = 'element-list';
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

		default: 
			elementType['elementType'] = 'element-authoredtext';
			elementType['primaryOption'] = 'primary-paragraph';
			elementType['secondaryOption'] = 'secondary-paragraph';
			break;
	}

	elementType['elementId'] = element.id;
	if(elementType.elementType)
	elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
	else
	elementType['tag'] = 'LO';
	return elementType;
}

export const fetchElementTag = (element) => {
	if (Object.keys(element).length > 0) {
		return findElementType(element).tag;
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
		let title = slateData.data[manifestURN].contents.title ? slateData.data[manifestURN].contents.title.text : '' 
		//let title = slateData.data[manifestURN].contents.title && slateData.data[manifestURN].contents.title.text;
		
		dispatch(fetchComments(contentUrn, title));
		dispatch({
			type: FETCH_SLATE_DATA,
			payload: {
				[manifestURN]: slateData.data[manifestURN]
			}//slateData.data
		});
	});
};

export const setActiveElement = (activeElement = {}) => dispatch => {
	dispatch({
		type: SET_ACTIVE_ELEMENT,
		payload: findElementType(activeElement)
	});
}
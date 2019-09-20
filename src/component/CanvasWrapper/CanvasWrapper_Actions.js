import axios from 'axios';
import config from '../../config/config';
import mockdata from './../../appstore/mockdata';
import {
	FETCH_SLATE_DATA,
	SET_ACTIVE_ELEMENT,
	SET_ELEMENT_TAG
} from '../../constants/Action_Constants';
import {fetchComments} from '../CommentsPanel/CommentsPanel_Action';
import elementTypes from './../Sidebar/elementTypes';

const findElementType = (element) => {
	let elementType = {};

	switch (element.type) {
		case 'element-authoredtext':
			elementType['elementType'] = 'element-authoredtext';
			if (element.elementdata.headers) {
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
					elementType['secondaryOption'] = 'secondary-pullquote'
					break;
				case 'blockquote':
					elementType['secondaryOption'] = 'secondary-marginalia'
					break;
				case 'marginalia':
					elementType['secondaryOption'] = 'secondary-marginalia-attribution'
					break;
			}
			break;
		case 'figure':

			if (element.figuretype && element.subtype !== undefined) {
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
				}
			}
			break;
	}

	elementType['elementId'] = element.id;
	if(elementType.elementType)
	elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
	else
	elementType['tag'] = 'LO';
	return elementType;
}

const defineElementTag = (bodymatter = {}) => {
	let tagList = {};
	if (Object.keys(bodymatter).length > 0) {
		bodymatter.forEach(element => {
			tagList[element.id] = findElementType(element).tag;
		});
	}

	return tagList;
}

export const fetchSlateData = (manifestURN) => dispatch => {
	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${config.slateURN}`, {
	//	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44/urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75`, {
			headers: {
				"Content-Type": "application/json",
				"PearsonSSOSession": config.ssoToken
			}
		}).then(slateData => {
			
			//let contentUrn = slateData.data[manifestURN].contentUrn,
			//title = slateData.data[manifestURN].contents.title.text
			console.log("mockdata[manifestURN].contents.bodymatter",slateData.data[manifestURN].contents.bodymatter);
			dispatch({
				type: SET_ELEMENT_TAG,
				payload: defineElementTag(slateData.data[manifestURN].contents.bodymatter)
			});
			
			dispatch({
				type: FETCH_SLATE_DATA,
				payload: {
					[manifestURN]: slateData.data[manifestURN]
				}//slateData.data
			});
			 })
			//});
	};

export const setActiveElement = (activeElement = {}) => dispatch => {
	console.log('active Element::', activeElement);
	dispatch({
		type: SET_ACTIVE_ELEMENT,
		payload: findElementType(activeElement)
	});
}
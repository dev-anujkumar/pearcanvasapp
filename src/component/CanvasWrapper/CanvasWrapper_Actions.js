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

	switch(element.type) {
		case 'element-authoredtext':
			elementType['elementType'] = 'element-authoredtext';
			if(element.elementdata.headers) {
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
			switch(element.elementdata.type){
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
	}
	
	elementType['elementId'] = element.id;
	elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
	return elementType;
}

const defineElementTag = (bodymatter = {}) => {
	let tagList = {};
	if(Object.keys(bodymatter).length > 0) {
		bodymatter.forEach(element => {
			tagList[element.id] = findElementType(element).tag;
		});
	}

	return tagList;
}

export const fetchSlateData = (manifestURN) => dispatch => {
	axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${manifestURN}`, {
		headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
	}).then(slateData => {
		// let contentUrn = slateData.data[manifestURN].contentUrn,
		// title = slateData.data[manifestURN].contents.title.text
		dispatch({
        	type: SET_ELEMENT_TAG,
			payload: defineElementTag(mockdata[manifestURN].contents.bodymatter)
		});
		
        dispatch({
        	type: FETCH_SLATE_DATA,
			payload: {
				manifestURN: {
					[manifestURN]: mockdata[manifestURN]
				}
			}//slateData.data
        });
	})
};

export const setActiveElement = (activeElement = {}) => dispatch => {
	dispatch({
		type: SET_ACTIVE_ELEMENT,
		payload: findElementType(activeElement)
	});
}
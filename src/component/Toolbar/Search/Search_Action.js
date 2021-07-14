import axios from 'axios';
import config from './../../../config/config';
import { fetchSlateData } from './../../CanvasWrapper/CanvasWrapper_Actions';

import { SET_SEARCH_URN, SET_COMMENT_SEARCH_URN } from './../../../constants/Search_Constants.js';
import SLATE_CONSTANTS from '../../ElementSaprator/ElementSepratorConstants';
import { UPDATE_MULTIPLE_COLUMN_INFO } from '../../../constants/Action_Constants';

export const searchEvent = {
    index: 0,
    totalCount: 0,
};

export const getContainerData = (searchTerm, deeplink = false) => {
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'PearsonSSOSession': config.ssoToken
        }
    });

    return async (dispatch, getState) => {
        let payload = '';
        let parent = '';
        let elementIndex = 0;
        let bodymatter = {};
        let multiColumnIndex = null;
        let slateData = getState().appStore.slateLevelData[config.slateManifestURN] ? getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter || {} : {};

        if(/^(urn\:pearson\:(work|manifest)\:\w{8}(\-\w{4}){3}\-\w{12})$/gi.test(searchTerm) ) {
            await axiosObject.get(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`)
            .then(res => {
                bodymatter = res.data[config.slateManifestURN].contents.bodymatter;
            });
            if((JSON.stringify(bodymatter)).indexOf(searchTerm) >= 0) {
                config.fromTOC = false;
                payload = searchTerm;
                let totalCount = 0;
                bodymatter.forEach((item, index) => {
                    if((JSON.stringify(item)).indexOf(searchTerm) >= 0) {
                        // BG-4794 | Checking for multi column to get column index
                        let columnLengthArr = [2, 3];
                        if (item?.type === SLATE_CONSTANTS.MULTI_COLUMN && columnLengthArr.includes(item?.groupeddata?.bodymatter.length)) {
                            item.groupeddata.bodymatter.forEach((column, columnIndex) => {
                                if (JSON.stringify(column).includes(searchTerm)) {
                                    multiColumnIndex = columnIndex + 1;
                                }
                            });
                        }
                        elementIndex = index + 1;
                        parent = item.id;
                        if(searchTerm === item.id) {
                            totalCount++;
                        }
                    }
                });

                let slateLength = slateData.length;
                do{
                    if(elementIndex > slateLength) {
                        dispatch(fetchSlateData(config.slateManifestURN,config.slateEntityURN, ++config.page,'',""));
                    }
                    slateLength = Number(slateLength) + Number(getState().appStore.slateLength);
                } while(elementIndex > slateLength);

                searchEvent.index = 1;
                searchEvent.totalCount = ((JSON.stringify(bodymatter)).match(new RegExp(`(id(\"|\'|):(\"|\'|)${searchTerm})`, 'g'))).length;
            }
        } else {
            searchEvent.index = 0;
            searchEvent.totalCount = 0;
        }

        if (multiColumnIndex && parent) {
            const multiColumnPayload = {
                containerId: parent,
                columnIndex: `C${multiColumnIndex}`
            }
            // BG-4794 | dispatch action to select column by column index
            dispatch({ type: UPDATE_MULTIPLE_COLUMN_INFO, key: parent, payload: multiColumnPayload });
        }
        dispatch({ type: SET_SEARCH_URN, payload, parent, deeplink, scroll: false, scrollTop: 0 });
    }
}

export const getCommentElements = (q) => {
    const axiosObject = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'PearsonSSOSession': config.ssoToken
        }
    });

    return async (dispatch, getState) => {
        let payload = '';
        let parent = '';
        let elementIndex = 0;
        let bodymatter = {};
        let slateData = getState().appStore.slateLevelData[config.slateManifestURN] ? getState().appStore.slateLevelData[config.slateManifestURN].contents.bodymatter || {} : {};
        
        if(/^(urn\:pearson\:(work|manifest)\:\w{8}(\-\w{4}){3}\-\w{12})$/gi.test(q) ) {
            await axiosObject.get(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${config.slateEntityURN}/elementids`)
            .then(res => {
                bodymatter = res.data[config.slateManifestURN].contents.bodymatter;
            });
            if((JSON.stringify(bodymatter)).indexOf(q) >= 0) {
                config.fromTOC = false;
                payload = q;
                bodymatter.forEach((item, index) => {
                    if((JSON.stringify(item)).indexOf(q) >= 0) {
                        elementIndex = index + 1;
                        parent = item.id;
                    }
                });

                let slateLength = slateData.length;
                do{
                    if(elementIndex > slateLength) {
                        dispatch(fetchSlateData(config.slateManifestURN,config.slateEntityURN, ++config.page,'',""));
                    }
                    slateLength = Number(slateLength) + Number(getState().appStore.slateLength);
                } while(elementIndex > slateLength);
            }
        }

        dispatch({ type: SET_COMMENT_SEARCH_URN, payload, parent, scroll: false, scrollTop: 0 });
    }
}

export const setScroll = (scrollArgs) => {
    return (dispatch, getState) => {
        let { type, scrollTop } = scrollArgs;
        let searchReducer = '';
        if(type === SET_SEARCH_URN) {
            searchReducer = getState().searchReducer;
            dispatch({ type, payload: searchReducer.searchTerm, parent: searchReducer.parentId, deeplink: searchReducer.deeplink, scroll: true, scrollTop });
        } else if(type === SET_COMMENT_SEARCH_URN) {
            searchReducer = getState().commentSearchReducer;
            dispatch({ type, payload: searchReducer.commentSearchTerm, parent: searchReducer.parentId, scroll: true, scrollTop });
        }
    }
}
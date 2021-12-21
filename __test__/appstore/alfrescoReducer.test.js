import reducer from '../../src/appstore/alfrescoReducer';

import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA,
    SAVE_INLINE_IMAGE_DATA,
    SAVE_ALFRESCO_ELEMENT
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {
    launchAlfrescoPopup: false,
    alfrescoPath: {},
    alfrescoListOption: {},
    alfrescoAssetData: {},
    elementId: '',
    Permission : [],
    editor : {},
    isCiteChanged: false,
    changedSiteData: {},
    isInlineEditorOpen: false,
    locationData: {},
    calledFromGlossaryFootnote: false,
    calledFromImageGlossaryFootnote: false,
    savedElement:{}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

describe('Test alfrescoReducer', () => {
    it('SET_ALFRESCO_POPUP', () => {
        reducer(INITIAL_STATE, {
            type: SET_ALFRESCO_POPUP,
            payload: {
                launchAlfrescoPopup: false,
                alfrescoPath: {},
                alfrescoListOption: {},
                id: '',
                editor: {},
                locationData: {},
                isGlossary: false,
                isImageGlossary: false
            }
        })
    })
    it('SAVE_ALFRESCO_ASSET_DATA', () => {
        
        reducer(INITIAL_STATE, {
            type: SAVE_ALFRESCO_ASSET_DATA,
            payload: {
                asset: {},
                id: '',
                changedSiteUrl: "",
                changedAlfrescoData: {},
                editor: {},
                launchAlfrescoPopup: false
            }
        })
    })
    it('SAVE_ALFRESCO_ELEMENT', () => {
        
        reducer(INITIAL_STATE, {
            type: SAVE_ALFRESCO_ELEMENT,
            payload: {
                savedElement:{}
            }
        })
    })
    it('SAVE_INLINE_IMAGE_DATA', () => {
        
        reducer(INITIAL_STATE, {
            type: SAVE_INLINE_IMAGE_DATA,
            payload: {
                permissions: true,
                editor: {},
                element: {},
                imageArgs: {},
                asset: {},
                launchAlfrescoPopup: false,
                isInlineEditor: false
            }
        })
    })
    it('default', () => {
        
        reducer(INITIAL_STATE, {
            type: "default",
            payload: {
                state: {
                    permissions: true,
                    editor: {},
                    element: {},
                    imageArgs: {},
                    asset: {},
                    launchAlfrescoPopup: false,
                    isInlineEditor: false
                }
            }
        })
    })

})
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import MarkIndexPopup from '../../../src/component/MarkIndexPopup/MarkIndexPopup.js';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/js/utils',()=>{
return {
    checkforToolbarClick: ()=>{
        return false
    }
}
})
jest.mock('../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions', () => {
    return {
        setFormattingToolbar: () => { return; }
    }
})

const initialState ={
    markedIndexReducer: {
        markedIndexValue : {
            popUpStatus: false,
            type: "Markedindex"
        },
        markedIndexGlossary:{
            popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: ''
        }
    }
}
let store = mockStore(initialState);

describe('Testing Markedindex component with props', () => {
    let props={
        permissions:[],
        showGlossaaryFootnote: jest.fn(),
        markedIndexValue:{"type":"","popUpStatus":false} ,
        showingToastMessage:jest.fn(),
        markedIndexCurrentValue:{firstLevel:'imageAssetContent'},
        showMarkedIndexPopup:jest.fn(),
        isInGlossary : {
            markedIndexGlossary: {
                popUpStatus: false
            }
        }

    }
    let wrapper = mount(<Provider store={store}>< MarkIndexPopup {...props} /></Provider>);
    let MarkIndexPopupInstance = wrapper.find('MarkIndexPopup')


    it('render Markedindex component', () => {
        expect(wrapper).toHaveLength(1);
        expect(MarkIndexPopupInstance).toBeDefined();
    })

    it('render Markedindex component', () => {
        let markedIndexValue = {
            "type": "Markedindex", "popUpStatus": false
        }
        let wrapper = mount(<Provider store={store}>< MarkIndexPopup {...props} markedIndexValue={markedIndexValue} /></Provider>)
        let MarkIndexPopupInstance = wrapper.find('MarkIndexPopup');
        MarkIndexPopupInstance.onFocus = jest.fn()
        MarkIndexPopupInstance.onBlur = jest.fn()
        wrapper.find('#markedindex-editor').simulate('focus', (null, 'remove'))
        wrapper.find('#markedindex-editor').simulate('blur', (null, 'remove'))
        // wrapper.find('#index-secondlevel-attacher').simulate('focus', (null, 'remove'))
        // wrapper.find('#index-secondlevel-attacher').simulate('blur', (null, 'remove'))
        expect(wrapper).toHaveLength(1);
        expect(MarkIndexPopupInstance).toBeDefined();
    })
})

import React from 'react';
import { mount, shallow } from 'enzyme';
import GlossaryFootnoteMenu from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnoteMenu';
import { comments, filters } from '../../../fixtures/commentPanelData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);
let store = mockStore({});
let props = {
    glossaryFootnoteValue : {type: "Glossary"},
    glossaryFootnoteValue: {
        popUpStatus: true
    },
    glossaryFootNoteCurrentValue: {"glossaryContentText": ""},
    showGlossaaryFootnote : ()=>{
    return;
    }
};
const initialState = {
    appStore: {
        addfigureGlossarypopup: true
    },
    glossaryFootnoteReducer: {
        glossaryFootnoteValue: {
            popUpStatus: true
        }
    }
};
const store2 = mockStore(initialState)
let props2 = {
    glossaryFootnoteValue: {type: "Glossary", popUpStatus: true},
    glossaryFootNoteCurrentValue: {"glossaryContentText": ""},
    showGlossaaryFootnote : ()=>{
    return;
    },
    audioGlossaryData: {
        "narrativeAudioUrn": "135222a8-0dc2-4375-9488-2790133ce894",
        "location": "https://cite-media-stg.pearson.com/legacy_paths/135222a8-0dc2-4375-9488-2790133ce794/Automation_Audio_3.mp3",
        "title": { "en": "Automation_Audio_3.mp3" }, "format": "audio/mpeg"
    },
    figureGlossaryData:{
        "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
        "imageid": "urn:pearson: alfresco: e2b1710e - a000 - 4625 - b582 - 367261a2cd0e",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/e2b1710e-a000-4625-b582-367261a2cd0e/2.jpeg",
        "height": "450",
        "width": "350",
        "alttext": "Alt Text for Snow white change alt text update kdvb",
        "longdescription": "Snow White Description change long desc test",
        "type": "image"
    },
    markedIndexGlossaryData : {
        markedIndexEntryURN:"",
        isDiffrence: true
    }
};
jest.mock('../../../src/component/AudioTinyMceGlossary', () => {
    return function () {
        return (<div>null</div>)
    }
})
describe('Testing GlossaryFootnote menu component with props', () => {
    let wrapper = mount(<Provider store={store}><GlossaryFootnoteMenu {...props} /></Provider>)
    const instance = wrapper.find('GlossaryFootnoteMenu').instance();
    it('componentWillMount Event', () => {
        instance.componentWillMount()
     })
    it('componentWillUnmount Event', () => {
        instance.componentWillUnmount()
     })
      it('renders closePopup function correctly', () => {
        instance.closePopup ()
     });
     xit('renders saveContent function correctly', () => {
        instance.saveContent()
     });
    it('renders glossaryFootnoteDifference function correctly', () => {
        let newTerm = 'abc'
        let oldTerm = 'cde'
        let newDef = 'aaa'
        let oldDef = 'bbb'
        let type = 'glossary'
        instance.glossaryFootnoteDifference(newTerm, newDef, oldTerm, oldDef, type)
        type = 'footnote'
        instance.glossaryFootnoteDifference(newTerm, newDef, oldTerm, oldDef, type)
    });
})

describe('Testing Save content function',() => {
    let wrapper = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
    const instance = wrapper.find('GlossaryFootnoteMenu').instance();
    it('renders saveContent function correctly', () => {
        instance.saveContent()
     });
})
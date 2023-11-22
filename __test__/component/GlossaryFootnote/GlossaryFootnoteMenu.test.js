import React from 'react';
import { mount, shallow } from 'enzyme';
import GlossaryFootnoteMenu from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnoteMenu';
import { comments, filters } from '../../../fixtures/commentPanelData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import config from '../../../src/config/config';

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
        markedIndexEntryURN:"sdfsdf",
        isDifference : true
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
        let newTerm = '<p audio-id="ac6d869a-539f-4856-83ee-0fbcc24ab85c" audio-path="https://cite-media-stg.pearson.com/legacy_paths/ac6d869a-539f-4856-83ee-0fbcc24ab85c/media628cff8ee21c9.mp3">sdfsdf ffsd&nbsp; <strong>vfsf sdfs</strong></p>'
        let oldTerm = '<p audio-id="ac6d869a-539f-4856-83ee-0fbcc24ab85c" audio-path="https://cite-media-stg.pearson.com/legacy_paths/ac6d869a-539f-4856-83ee-0fbcc24ab85c/media628cff8ee21c9.mp3">sdfsdf ffsd&nbsp;fdfd <strong>vfsf</strong></p>'
        let newDef = '<p><img /><img />dsffssd&nbsp;</p> '
        let oldDef = '<p><img /><img/></p>'
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
     it('renders saveContent function correctly : MarkedIndexEntryUrn is not given', () => {
        instance.props.markedIndexGlossaryData.markedIndexEntryURN = ''
        instance.saveContent()
     });
     it('renders saveContent function correctly when audioGlossaryData is empty', () => {
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        instance2.props.markedIndexGlossaryData.markedIndexEntryURN = 'asd'
        instance2.saveContent()
     });

     it('renders saveContent function correctly GloassaryData', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = (id) => {
            if(id === '#glossary-editor > div > p') {
            return {
                innerHTML: 'sdfsdf ffsd&nbsp; <strong>vfsf<span id="_mce_caret">dfs</span)"<span id="_mce_caret" data-mce-bogus="1" data-mce-type="format-caret">&#8203;&#65279;</span></strong>'
            }
        } else if(id === '#glossary-editor-attacher > div > p') {
            return {
                innerHTML: 'sdfsdf ffsd&nbsp; <strong>vfsf</strong>'
            }
        }
        }
        instance2.saveContent()
     });
     it('renders saveContent function correctly GloassaryData conditional coverage', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = (id) => {
            if(id === '#glossary-editor > div > p') {
            return {
                innerHTML: '<p><p className="Wirisformula">sdfs</p></p>'
            }
        } else if(id === '#glossary-editor-attacher > div > p') {
            return {
                innerHTML: '<p></p>'
            }
        }
        }
        instance2.saveContent()
     });
});

describe("Increase coverage", () => {
    const mockQuerySelector1 = (id) => {
        if (id === '#glossary-editor > div > p') {
            return {
                getElementsByClassName: (className) => {
                    if (className === 'Wirisformula') {
                        return [
                            {
                                getAttribute: () => {
                                    return {
                                        substr: jest.fn()
                                    }
                                },
                                setAttribute: jest.fn(),
                                removeAttribute: jest.fn()
                            }
                        ]
                    }
                    return true
                },
                innerHTML: {
                    replace: jest.fn(),
                    match: jest.fn()
                }
            }
        } else if (id === '#glossary-editor-attacher > div > p') {
            return {
                innerHTML: '<p></p>'
            }
        }
    }
    const mockQuerySelector2 = (id) => {
        if (id === '#glossary-editor > div > p') {
            return {
                getElementsByClassName: (className) => {
                    if (className === 'Wirisformula') {
                        return [
                            {
                                getAttribute: () => {
                                    return {
                                        substr: jest.fn()
                                    }
                                },
                                setAttribute: jest.fn(),
                                removeAttribute: jest.fn()
                            }
                        ]
                    }
                    return true
                },
                innerHTML: {
                    replace: jest.fn(),
                    match: jest.fn().mockReturnValue(false)
                }
            }
        } else if (id === '#glossary-editor-attacher > div > p') {
            return {
                innerHTML: '<p></p>'
            }
        }
    }
    const mockQuerySelector3 = (id) => {
        if (id === '#glossary-editor-attacher > div > p') {
            return {
                getElementsByClassName: (className) => {
                    if (className === 'Wirisformula') {
                        return [
                            {
                                getAttribute: () => {
                                    return {
                                        substr: jest.fn()
                                    }
                                },
                                setAttribute: jest.fn(),
                                removeAttribute: jest.fn()
                            }
                        ]
                    }
                    return true
                },
                innerHTML: {
                    replace: jest.fn(),
                    match: jest.fn()
                }
            }
        } else if (id === '#glossary-editor > div > p') {
            return {
                innerHTML: '<p></p>'
            }
        }
    }
    tinymce = {
        $: () => {
            return {
                find: () => {
                    return {
                        each: (cb) => {
                            cb.call({
                                innerHTML: '<p></p>'
                            })
                        }
                    }
                }
            }
        },
        editors: [{ id: 'cypress-0-0' }],
        remove:jest.fn()
    }
    it('renders saveContent function correctly GloassaryData conditional coverage - 1', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = mockQuerySelector1;
        config.S3MathImagePath = true;
        instance2.saveContent();
    });
    it('renders saveContent function correctly GloassaryData conditional coverage - 2', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = mockQuerySelector1;
        config.S3MathImagePath = false;
        instance2.saveContent();
    });
    it('renders saveContent function correctly GloassaryData conditional coverage - 3', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        props2.markedIndexGlossaryData = {
            markedIndexEntryURN: ""
        }
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = mockQuerySelector2;
        config.S3MathImagePath = false;
        instance2.saveContent();
    });
    it('renders saveContent function correctly GloassaryData conditional coverage - 4', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = mockQuerySelector3;
        config.S3MathImagePath = true;
        instance2.saveContent();
    });
    it('renders saveContent function correctly GloassaryData conditional coverage - 5', () => {
        props2.figureGlossaryData = {}
        props2.audioGlossaryData = {}
        let wrapper2 = mount(<Provider store={store2}><GlossaryFootnoteMenu {...props2} /></Provider>)
        const instance2 = wrapper2.find('GlossaryFootnoteMenu').instance();
        document.querySelector = mockQuerySelector3;
        config.S3MathImagePath = false;
        instance2.saveContent();
    });
});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnote_Actions';
import  mockData  from "../../../src/appstore/mockdata.js";
import axios from 'axios';
const middlewares = [thunk];
import { JSDOM } from 'jsdom'
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
if (!global.Element.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent;
        },
    });

}
let  initialState = {
    appStore:{
        slateLevelData:mockData,
        activeElement: {
            altText: "",
            elementId: "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184",
            elementType: "element-interactive",
            elementWipType: "figure",
            index: 0,
            primaryOption: "primary-smartlink",
            secondaryOption: "secondary-interactive-smartlink-pdf",
            tag: "SL",
            toolbar: ["crossLinkingIcon", "assetpopover", "glossary"]
        }
    },
    glossaryFootnoteReducer: {"elementIndex" : "0"},
    glossaaryFootnoteValue:{ "type":"","popUpStatus":false}
};


jest.mock('./../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    guid: jest.fn(),
    encodeHTMLInWiris: jest.fn(),
    matchHTMLwithRegex: jest.fn(),
    createTitleSubtitleModel: jest.fn(),
    createLabelNumberTitleModel: jest.fn(),
    removeBlankTags: jest.fn(),
    removeUnoClass: jest.fn()
}))
jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121ag0i",
    ASSET_POPOVER_ENDPOINT:"https://contentapis-staging.pearsoncms.net/manifest-api/",
    STRUCTURE_APIKEY:'Gf7G8OZPaVGtIquQPbqpZc6D2Ri6A5Ld',
    PRODUCTAPI_ENDPOINT:"https://contentapis-staging.pearsoncms.net/product-api/",
    projectUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    parentEntityUrn : "bodyMatter",
    slateType: "assessment"
}));
let responseData = {};
jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                appStore:{slateLevelData:mockData,
                    activeElement: {
                        altText: "",
                        elementId: "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184",
                        elementType: "element-interactive",
                        elementWipType: "figure",
                        index: 0,
                        primaryOption: "primary-smartlink",
                        secondaryOption: "secondary-interactive-smartlink-pdf",
                        tag: "SL",
                        toolbar: ["crossLinkingIcon", "assetpopover", "glossary"]
                    },
                    parentUrn : {
                        contentUrn : "urn:pearson:work:282ddf7a-4e73-4cb7-814c-5873bc750184"
                    }
                },
                glossaryFootnoteReducer:{"elementIndex": "0"}
            }
        },
        dispatch:(obj)=>{
            responseData = obj;
           // console.log("object123456---",obj);
            return jest.fn();
        }
    }
})

describe('Tests commentsPanel action', () => {
    // beforeAll(() => {
    //     Object.defineProperty(global, 'document', {
    //         getElementById:()=>{
    //             return {innerHTML:'tests'}
    //         },
    //         querySelector : () => {}
    //     });
    //   })

      beforeAll(() => {
        const div = document.createElement('div');
        window.domNode = div;
        document.body.appendChild(div);
      })

    let store = mockStore(() => initialState);

    beforeEach(() => {
        initialState = {
             glossaaryFootnoteValue:{ "type":"","popUpStatus":false},
             appStore:{slateLevelData:mockData},
             glossaryFootnoteReducer:{"elementIndex": "0"}
        };
    });
 

   it('glossaaryFootnotePopup glossary---', async() => {
        let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','figure','01-21-1-23-21','image','term text--', "popup", "formatted-subtitle");
        result(store.dispatch).then((item)=>{
            expect(typeof(item)).toEqual('object');
            expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        }).catch((err)=>{
            expect(err).toEqual(err)
        });
   });
    it('glossaaryFootnotePopup glossary---', async () => {
        let result = await actions.glossaaryFootnotePopup(false, "Glossary", 'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d', 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a', 'figure', '01-21-1-23-21', 'image', 'term text--');
        result(store.dispatch).then((item) => {
            expect(typeof (item)).toEqual('object');
            expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        }).catch((err) => {
            expect(err).toEqual(err)
        });
    });
   it('glossaaryFootnotePopup glossary---if element type not defined', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Glossary",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a','',0,'image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image')
    }).catch((err) =>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"Footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','0-1-2223','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image')
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote---', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','',0,'image','term text--',"popup","formatted-subtitle");
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual('image');
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when index in less than3 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','12-12-121-2','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("12-12-121-2-12")
    }).catch((err)=>{
        expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when index in less than3 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','12-12-121-2-12-32','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual(0)
    }).catch((err) =>{
     expect(err).toEqual(err)
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 4 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','12-12-121-2','image','term text--');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual(0)
    }).catch((err) =>{
     expect(err).toEqual(err)
    });
   });

   describe('testing saveGlossaryAndFootnote ',() => {
    // mocking axios put request
    axios.put = jest.fn(() => Promise.resolve({
        data: {
            id: '',
            html: {
                text: ''
            }
        }
    }));
    it('testing new func ===> image', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','GLOSSARY','apple','fruit','image', 'term', 'popup'); 
       });
       it('testing new func ===> ?????', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {
                        innerHTML:'tests',
                        getElementsByTagName: () => {
                            return {
                                tagName: 'dfn',
                                textContent: () => { return { slice: () => { return "" } } }
                            }
                        }
                    }
                    }
                
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','interactive','dsusiudfd','GLOSSARY','apple','fruit','image',''); 
       });
       xit('testing if there is an audio in glossary', async () => {
           document.querySelector = () => { return false; }
           document.getElementById = () => {
               return {
                   innerHTML: 'tests',
                   getElementsByTagName: () => {
                       return {
                           innerHTML: "testing",
                           outerHTML: '<dfn class="Pearson-Component GlossaryTerm" data-uri="urn:pearson:work:fb1d04b4-14f8-4eef-8224-8345a7e75487" audio-id="c5a24ac0-af3d-4d80-983b-bc96e26605d8" audio-path="https://cite-media-stg.pearson.com/legacy_paths/c5a24ac0-af3d-4d80-983b-bc96e26605d8/nse_aud_11_u43_l1_m1_01.mp3">testing</dfn>'
                       }
                   }
               }
           }
           let audioGlossaryData = {
               "narrativeAudioUrn": "2ddad41f-a05e-4f99-b44c-4a9306bd2a36",
               "location": "https://cite-media-stg.pearson.com/legacy_paths/2ddad41f-a05e-4f99-b44c-4a9306bd2a36/Progressive%20Audio%20sample%20Midsummer_Sky.mp3",
               "title": {
                   "en": "Progressive Audio sample Midsummer_Sky.mp3"
               },
               "format": "audio/mpeg"
           }
           let term = '<p audio-id="c5a24ac0-af3d-4d80-983b-bc96e26605d8" audio-path="https://cite-media-stg.pearson.com/legacy_paths/c5a24ac0-af3d-4d80-983b-bc96e26605d8/nse_aud_11_u43_l1_m1_01.mp3">testing</p>'

           await actions.saveGlossaryAndFootnote('urn:pearson:work:f954d8b8-ce9e-4fbd-8e60-a16d9deea238', 'element-authoredtext', 'urn:pearson:work:fb1d04b4-14f8-4eef-8224-8345a7e75487', 'Glossary', term, '<p></p>', 'undefined', 'element-authoredtext', audioGlossaryData);
           expect({ 'narrativeAudioUrn': '2ddad41f-a05e-4f99-b44c-4a9306bd2a36' }).toMatchObject({ 'narrativeAudioUrn': '2ddad41f-a05e-4f99-b44c-4a9306bd2a36' }); 
       });

       it('testing new func ===> tableasmarkup', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','tableasmarkup', 'term', 'popup'); 
       });
       it('testing new func ===> audio', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','audio', 'term', 'popup'); 
       });
       it('testing new func ===> video', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','video', 'term', 'popup'); 
       });
       it('testing new func ===> table', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','table', 'term', 'popup'); 
       });
       it('testing new func ===> mathImage', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','mathImage', 'term', 'popup'); 
       });
       it('testing new func ===> interactive', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','interactive', 'term', 'popup'); 
       });
       it('testing new func ===> codelisting', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {innerHTML:'tests'}
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','codelisting', 'term', 'popup'); 
       });
       it('testing new func ===> authoredtext', async () => {
        document.querySelector = () => { return false; }
           document.getElementById = () => {
               return {
                   innerHTML: 'tests',
                   getElementsByTagName: () => {
                    return {
                        tagName: 'dfn',
                        textContent: () => { return { slice: () => { return "" } } }
                    }
                }
               };
           }
        
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure','dsusiudfd','FOOTNOTE','apple','fruit','authoredtext', 'popup', 'popup',''); 
       });
       it('testing new func ===> authoredtext', async () => {
        document.querySelector = () => { return false; }
           document.getElementById = () => {
               return {
                   innerHTML: 'tests',
                   getElementsByTagName: () => {
                    return {
                        tagName: 'dfn',
                        textContent: () => { return { slice: () => { return "" } } }
                    }
                }
               }
           }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','stanza','dsusiudfd','FOOTNOTE','apple','fruit','authoredtext', 'popup', 'formatted-subtitle',''); 
       });
       it('testing new func ===> authoredtext', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {
                            innerHTML:'tests',
                            getElementsByTagName: () => {
                                return {
                                    tagName: 'dfn',
                                    textContent: () => { return { slice: () => { return "" } } }
                                }
                            }
                        }
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','element-authoredtext','dsusiudfd','FOOTNOTE','apple','fruit','authoredtext', 'poetry', 'creditsarray',''); 
       });
       it('testing new func ===> authoredtext', async () => {
        document.querySelector = () => { return false; }
        document.getElementById = ()=>{
                        return {
                            innerHTML:'tests',
                            getElementsByTagName: () => {
                                return {
                                    tagName: 'dfn',
                                    textContent: () => { return { slice: () => { return "" } } }
                                }
                            }
                        }
                    }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','element-authoredtext','dsusiudfd','FOOTNOTE','apple','fruit','authoredtext', 'poetry', 'formatted-subtitle',''); 
       });
       it('testing new func ===> authoredtext', async () => {
        document.querySelector = () => { return false; }
           document.getElementById = () => {
               return {
                   innerHTML: 'tests',
                getElementsByTagName: () => {
                    return {
                        tagName: 'dfn',
                        textContent: () => { return { slice: () => { return "" } } }
                    }
                }
               }
           }
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','interactive','dsusiudfd','FOOTNOTE','apple','fruit','authoredtext', 'poetry', 'formatted-subtitle',''); 
       });
       it('glossaryfootnoteid undefined', async () => {
        await actions.saveGlossaryAndFootnote('urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure',undefined,'FOOTNOTE','apple','fruit','image'); 
       });
   })

   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 2 typeWithPopup is popup --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure2222','0-0','image','term text--','popup');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("0-0");
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 3 typeWithPopup is popup   --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure2222','0-0-0','image','term text--','popup');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("0-0-0");
    });
   });
   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 4 typeWithPopup is popup   --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','figure2222','0-0-0-0','image','term text--','popup');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("0-0-0-0");
    }).catch((err) =>{
        expect(err).toEqual(err)
       });
   });

   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 2 typeWithPopup is poetry   --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','element-authoredtext','1-1','image','term text--','poetry');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("1-1");
    });
   });

   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 4 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','poetry','1-4','image','term text--','poetry');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("1-4");
    });
   });

   it('await functionalityglossaaryFootnotePopup Footnote- when tempindex equal to 4 and element type image  --', async() => {
    let result = await actions.glossaaryFootnotePopup(true,"footnote",'urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','urn:pearson:work:e55c1c98-ffe6-487d-b8b2-f8f45513d66d','stanza','0-3-0','image','term text--','stanza');
    result(store.dispatch).then((item)=>{
        expect(typeof(item)).toEqual('object');
        expect(item.type).toEqual('OPEN_GLOSSARY_FOOTNOTE');
        expect(item.payload.elementIndex).toEqual("0-3-0");
    });
   });
    describe('testing setFormattingToolbar ', () => {
        it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('enableTinymceToolbar')
        });
        it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('disableTinymceToolbar')
           });
           it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('enableGlossaryFootnoteToolbar')
           });
           it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('disableGlossaryFootnoteToolbar')
           });
           it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('removeTinymceSuperscript')
           });
           it('setFormattingToolbar', () => {
            document.querySelector = () => { return false; }
            actions.setFormattingToolbar('removeGlossaryFootnoteSuperscript')
           });
    })
   

   
})


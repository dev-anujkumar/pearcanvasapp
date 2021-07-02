import React from 'react';
import * as showHideHelper from "../../../src/component/ShowHide/ShowHide_Helper.js";
import elementTypes from '../../../src/component/Sidebar/elementTypes.js';
import { TEXT } from '../../../src/component/SlateWrapper/SlateWrapperConstants.js';


describe('1. ShowHide test cases', () => {

    describe(' test csaes for find section Type', () => {
        it('1.find section Type', () => {
            const spyonFindSectionType = jest.spyOn(showHideHelper, "findSectionType");
            showHideHelper.findSectionType("0");
            expect(spyonFindSectionType).toHaveReturnedWith("show");
        });
        it('2.find section Type', () => {
            const spyonFindSectionType = jest.spyOn(showHideHelper, "findSectionType");
            showHideHelper.findSectionType("1");
            expect(spyonFindSectionType).toHaveReturnedWith("postertextobject");
        });
        it('3.find section Type', () => {
            const spyonFindSectionType = jest.spyOn(showHideHelper, "findSectionType");
            showHideHelper.findSectionType("2");
            expect(spyonFindSectionType).toHaveReturnedWith("hide");
        });
    });

    describe('test cases for add Nested Elements',()=>{
        let props={
            sectionType:"show",
            index:"0-0-0",
        }
        it('add nested elements for show',()=>{
            const spyonAddNestedElements =jest.spyOn(showHideHelper,"addNestedElements");
            showHideHelper.addNestedElements("0-0-1","show",props);
            expect(spyonAddNestedElements).toHaveBeenCalled();
        });
        // it('add nested Elements for',()=>{
        //     let returnedValues=[{
        //         buttonType: 'text-elem',
        //         buttonHandler: () => jest.fn(),
        //         tooltipText: 'Text',
        //         tooltipDirection: 'left'
        //     },{
        //         buttonType: 'image-elem',
        //         buttonHandler: () =>jest.fn(),
        //         tooltipText: 'Image',
        //         tooltipDirection: 'left'
        //     },{
        //         buttonType: 'audio-elem',
        //         buttonHandler: () => jest.fn(),
        //         tooltipText: 'Audio/Video',
        //         tooltipDirection: 'left'
        //     }
        // ]
        //     const spyonAddNestedElements =jest.spyOn(showHideHelper,"addNestedElements");
        //     const result=showHideHelper.addNestedElements("0-2-0","hide",props);
        //     expect(result).toHaveReturnedWith(returnedValues);
        // })
    });

    describe('test caes for addElementInShowHide',()=>{
        it('savingCall in Progess',()=>{
            let config={
                savingCall :false
            }
            expect(config.savingCall).toBe(false);
        });
    })
    
    describe('test cases for getShowHideElement',()=>{
        const slateBodyMattter={
            contentUrn: "urn:pearson:entity:7ce7913e-4555-410c-a46b-f3d0d8c64d32",
            elementdata:{
                bodymatter:[{
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743210",
                    elementdata:{
                        text:"test"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06f",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743211",
                    elementdata:{
                        text:"test1"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06g",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743212",
                    elementdata:{
                        text:"test2"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06h",
                }
                ]
            }
        }
        it('getShowHIdeElement :case 3',()=>{
            const spyonGetShowHideElement =jest.spyOn(showHideHelper,"getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter,3,0);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 4',()=>{
            const spyonGetShowHideElement =jest.spyOn(showHideHelper,"getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter,4,1);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 5',()=>{
            const spyonGetShowHideElement =jest.spyOn(showHideHelper,"getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter,5,2);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 6',()=>{
            const spyonGetShowHideElement =jest.spyOn(showHideHelper,"getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter,6,2);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 7',()=>{
            const spyonGetShowHideElement =jest.spyOn(showHideHelper,"getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter,7,2);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
    });

    describe('index of section Type', () => {
        it("indexofSectionType redners", () => {
            const indexes = 0-0-0-0;
            const spyonIndexOfSectionType = jest.spyOn(showHideHelper, "indexOfSectionType");
            showHideHelper.indexOfSectionType(indexes);
            expect(spyonIndexOfSectionType).toHaveBeenCalled();
        })
        it("indexofSectionType if", () => {
            const indexes = [0, 0, 0, 0];
            const spyonIndexOfSectionType = jest.spyOn(showHideHelper, "indexOfSectionType");
            showHideHelper.indexOfSectionType(indexes);
            expect.arrayContaining(indexes);
        });
        it("indexofSectionType if string", () => {
            const indexes = "0-0-0-0";
            const spyonIndexOfSectionType = jest.spyOn(showHideHelper, "indexOfSectionType");
            showHideHelper.indexOfSectionType(indexes);
            expect.arrayContaining(indexes);
        });
    });

    describe("test handleElementsInShowHide",()=>{
        let bodymatter = [{
            containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
            contents:[{
            containerUrn: "urn:pearson:manifest:26eb2fd4-3300-47a7-9783-cb53e29ae996",
            entityUrn: "urn:pearson:entity:32271fee-8a0d-4377-b20b-cac31278d324",
            label: "section",
            title: ""
        }]
    }]
    let elementType= "element-authoredtext";
    let showHideObj={}
    let calledFrom= "glossaryFootnote";
    let indexes = ["0", "1", "0", "1"];
        it("indexofSectionType redners", () => {
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter,indexes,elementType,showHideObj,calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        // it("indexofSectionType call from glossary", () => {
        //     const dataToSend={
        //         currentElement:{
        //             contentUrn: "urn:pearson:entity:6c08050a-08e0-4ce9-9f56-3afd271e8484",
        //             elementdata: {
        //                 glossaryentries:[{
        //                     glossaryentry:[{
        //                         definition:{
        //                             text:"test"
        //                         },
        //                         term:{
        //                             text:"test1"
        //                         }
        //                     }]}],
        //                     glossaryentrytype: "monolingual",
        //                     itemid:"urn:pearson:work:a069a9e3-79cb-484d-9506-279eb14c1f77",
        //                     type: "element-authoredtext"
        //             }
        //         },
        //         showHideType: "show"
        //     }
        //     const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
        //     const result=showHideHelper.handleElementsInShowHide(bodymatter,indexes,elementType,showHideObj,calledFrom);
        //     expect(result).toBe(dataToSend);
        // });
    });

    describe('test cases for getTextInShowHideElement',()=>{
        const slateBodyMattter={
            contentUrn: "urn:pearson:entity:7ce7913e-4555-410c-a46b-f3d0d8c64d32",
            elementdata:{
                bodymatter:[{
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743210",
                    elementdata:{
                        text:"test"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06f",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743211",
                    elementdata:{
                        text:"test1"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06g",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743212",
                    elementdata:{
                        text:"test2"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06h",
                }
                ]
            }
        };
        const showHideObj=undefined
        it('getTextInShowHIdeElement :case 3',()=>{
            const spyonGetTextInShowHide =jest.spyOn(showHideHelper,"getTextElementInShowHide");
            showHideHelper.getTextElementInShowHide(slateBodyMattter,3,showHideObj);
            expect(spyonGetTextInShowHide).toHaveBeenCalled();
        });
        it('getTextInShowHIdeElement :case 4',()=>{
            const spyonGetTextInShowHide =jest.spyOn(showHideHelper,"getTextElementInShowHide");
            showHideHelper.getTextElementInShowHide(slateBodyMattter,4,showHideObj);
            expect(spyonGetTextInShowHide).toHaveBeenCalled();
        });
        it('getTextInShowHIdeElement :case 5',()=>{
            const spyonGetTextInShowHide =jest.spyOn(showHideHelper,"getTextElementInShowHide");
            showHideHelper.getTextElementInShowHide(slateBodyMattter,5,showHideObj);
            expect(spyonGetTextInShowHide).toHaveBeenCalled();
        });
        it('getTextInShowHIdeElement :case 6',()=>{
            const spyonGetTextInShowHide =jest.spyOn(showHideHelper,"getTextElementInShowHide");
            showHideHelper.getTextElementInShowHide(slateBodyMattter,6,showHideObj);
            expect(spyonGetTextInShowHide).toHaveBeenCalled();
        });
        it('getTextInShowHIdeElement :case 7',()=>{
            const spyonGetTextInShowHide =jest.spyOn(showHideHelper,"getTextElementInShowHide");
            showHideHelper.getTextElementInShowHide(slateBodyMattter,7,showHideObj);
            expect(spyonGetTextInShowHide).toHaveBeenCalled();
        });
    });

    it('getShowHideIndex renders',()=>{
        const indexes = [0, 0, 0, 0];
        const result= 0-0-0;
        const spyonGetShowHideIndex =jest.spyOn(showHideHelper,"getShowHideIndex");
        showHideHelper.getShowHideIndex(indexes);
        expect(spyonGetShowHideIndex).toBe(result);
    });

    describe('onGlossaryFnUpdateSuccessInShowHide renders',()=>{
        const indexes=["0","0","0","0"];
        const activeElemType="element-authoredtext";
        const showHideObj=undefined;
        const resData={
            id: "urn:pearson:work:104147fb-aae1-4298-8e1f-e48277c3d37b",
             type: "element-authoredtext",
             elementdata:{
                 glossaryentries:{
                     glossaryentry:{
                     definition:{
                         text:"test1"
                     },
                     term:{
                         text:"test"
                     }
                 },
                 glossaryentrytype:"monolingual",
                 itemid: "urn:pearson:work:104147fb-aae1-4298-8e1f-e48277c3d37b"
                }
             },
             text:''
        };
        const bodymatter={
            contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
            id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
            interactivedata:{
                hide:[],
                postertextobject:[{}],
                show:{
                    contentUrn: "urn:pearson:entity:d3df1394-a16b-4000-8b7b-39901cc17ebe",
                    elementdata:{
                    glossaryentries:{
                        glossaryentry:{
                        definition:{
                            text:"test1"
                        },
                        term:{
                            text:"test"
                        }
                    },
                    glossaryentrytype:"monolingual",
                    itemid: "urn:pearson:work:104147fb-aae1-4298-8e1f-e48277c3d37b"
                   }
                },
                text:''}
            },
            status:"wip",
            type:"showhide"
        }
        it('onGlossaryFnUpdateSuccessInShowHide renders',()=>{
        const spyonGlossaryFnUpdateSuccessInShowHide =jest.spyOn(showHideHelper,"onGlossaryFnUpdateSuccessInShowHide");
        showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
        expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
    })
});

});




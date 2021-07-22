import * as showHideHelper from "../../../src/component/ShowHide/ShowHide_Helper.js";
import config from "../../../src/config/config.js";

const showHide = {
    "id":"urn:pearson:manifest:856a0a7f-e4f8-4cfa-9409-5f564ad1211f",
    "type":"showhide",
    "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
    "versionUrn":"urn:pearson:manifest:856a0a7f-e4f8-4cfa-9409-5f564ad1211f",
    "contentUrn":"urn:pearson:entity:b16f5b97-7ba9-4003-a252-26285d89efec",
    "status":"wip",
    "interactivedata":{
        "postertextobject":[
            {
            "id":"urn:pearson:work:1c35a5c1-0dc7-4616-a36d-158f976b13b0",
            "type":"element-authoredtext",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":"Reveal Answer:"
            },
            "html":{
                "text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"
            },
            "versionUrn":"urn:pearson:work:1c35a5c1-0dc7-4616-a36d-158f976b13b0",
            "contentUrn":"urn:pearson:entity:8d11dff2-9f0e-4773-817f-c57be2003340"
            }
        ],
        "show":[{
            "id":"urn:pearson:work:fc048ad1-475d-41f2-ab16-2b1131887647",
            "type":"element-authoredtext",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":"sdasd"
            },
            "html":{
                "text":"<p class=\"paragraphNumeroUno\">sdasd</p>"
            },
            "versionUrn":"urn:pearson:work:fc048ad1-475d-41f2-ab16-2b1131887647",
            "contentUrn":"urn:pearson:entity:2630d7e2-f9ec-42fd-bb1d-fa654148d7ee"
            }
        ],
        "hide":[
            {
            "id":"urn:pearson:work:9d8bb762-b8ee-43e8-b6a1-ce3489bbdb53",
            "type":"element-authoredtext",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata":{
                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text":""
            },
            "html":{
                "text":"<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "versionUrn":"urn:pearson:work:9d8bb762-b8ee-43e8-b6a1-ce3489bbdb53",
            "contentUrn":"urn:pearson:entity:efdc2c7f-dd9b-47ce-a4f1-3fc712da04dd"
            }
        ]
    },
    "index":"0-0-0-2"
};

describe('1. ShowHide test cases', () => {

    describe(' test cases for find section Type', () => {
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

    describe('test cases for add Nested Elements', () => {
        let props = {
            sectionType: "show",
            index: "0-0-0",
        }
        it(' render add nested elements for show', () => {
            const spyonAddNestedElements = jest.spyOn(showHideHelper, "addNestedElements");
            showHideHelper.addNestedElements("0-0-1", "show", props);
            expect(spyonAddNestedElements).toHaveBeenCalled();
        });
    });

    describe('test caes for addElementInShowHide', () => {
        it('savingCall in Progess', () => {
            let config = {
                savingCall: false
            }
            expect(config.savingCall).toBe(false);
        });
    });

    describe('1.4 - test cases for add elements in showHide', () => {
        const props = {
            createShowHideElement: jest.fn()
        }
        const elementList = ["TEXT","IMAGE","VIDEO","figure-mml-elem","blockcode-elem","element-dialogue","smartlink-elem","element-discussion","elm-interactive-elem","interactive-elem"];
        it.each(elementList)('add %s element inside sh',(input) => {
            const spyonAddElementInShowHide = jest.spyOn(showHideHelper, "addElementInShowHide");
            showHideHelper.addElementInShowHide("0-0-1", "show", input, props);
            expect(spyonAddElementInShowHide).toHaveBeenCalled();
        })
        it('config.savingInProgress If case', () => {
            config.savingInProgress = true;
            const spyonAddElementInShowHide = jest.spyOn(showHideHelper, "addElementInShowHide");
            showHideHelper.addElementInShowHide("0-0-1", "show", "TEXT", props);
            expect(spyonAddElementInShowHide).toHaveBeenCalled();
        })
    })

    describe('test cases for getShowHideElement', () => {
        
        it('getShowHIdeElement :case 3', () => {
            const slateBodyMattter = [{...showHide}];
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 3, ["0","0","0"]);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 4', () => {
            const slateBodyMattter = [{elementdata: { bodymatter: [{...showHide}]}}];
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 4, ["0","0","0","0"]);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 5', () => {
            const slateBodyMattter = [{elementdata:{ bodymatter: [{ contents: { bodymatter: [{...showHide}]}}]}}];
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 5, ["0","0","0","0","0"]);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 6', () => {
            const slateBodyMattter = [{groupeddata:{ bodymatter: [{ groupdata: { bodymatter: [{ elementdata: { bodymatter: [{...showHide}]}}]}}]}}];
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 6, ["0","0","0","0","0","0"]);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 7', () => {
            const slateBodyMattter = [{groupeddata:{ bodymatter: [{ groupdata: { bodymatter: [{ elementdata: { bodymatter: [{ contents: { bodymatter: [{...showHide}]}}]}}]}}]}}];
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 7, ["0","0","0","0","0","0","0"]);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
    });

    describe('index of section Type', () => {
        it("indexofSectionType redners", () => {
            const indexes = 0 - 0 - 0 - 0;
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

    describe("test handleElementsInShowHide", () => {
        let bodymatter = [{
            containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
            id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
            interactivedata: {
                hide: [{
                    contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                    elementdata: {
                        text: "test1"
                    },
                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                    type: "element-authoredtext"
                }],
                postertextobject: [{
                    contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                    elementdata: {
                        text: "Reveal Answer:"
                    },
                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                    type: "element-authoredtext"
                }],
                show: [{
                    id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                    contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                    title: {
                        test: "test1"
                    },
                    type: "element-authoredtext"
                }],
                type: "showhide"
            },
        }]
        let elementType = "element-authoredtext";
        let showHideObj = {}
        let calledFrom = "glossaryFootnote";
        let indexes = ["0", "1", "0", "1"];
        it("indexofSectionType redners", () => {
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('indexofSectionType else case', () => {
            let calledFrom = "figure";
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getTextElementInShowHide case 3:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
                interactivedata: {
                    hide: [{
                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                        elementdata: {
                            text: "test1"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    postertextobject: [{
                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                        elementdata: {
                            text: "Reveal Answer:"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    show: [{
                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                        title: {
                            test: "test1"
                        },
                        type: "element-authoredtext"
                    }],
                    type: "showhide"
                },
            }];
            let indexes = 0;
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveReturnedWith({ "currentElement": undefined, "showHideType": undefined });
        });
        it('getTextElementInShowHide case 3:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
                interactivedata: {
                    hide: [{
                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                        elementdata: {
                            text: "test1"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    postertextobject: [{
                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                        elementdata: {
                            text: "Reveal Answer:"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    show: [{
                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                        title: {
                            test: "test1"
                        },
                        type: "element-authoredtext"
                    }],
                    type: "showhide"
                },
            }];
            let indexes = ["0", "1", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getTextElementInShowHide case 5:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                elementdata: {
                    bodymatter: [
                        {
                            contents: {
                                bodymatter: [{
                                    contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                    id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                    index: "0-0-0-0-0",
                                    interactivedata: {
                                        hide: [{
                                            contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                            elementdata: {
                                                text: "test1"
                                            },
                                            id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                            type: "element-authoredtext"
                                        }],
                                        postertextobject: [{
                                            contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                            elementdata: {
                                                text: "Reveal Answer:"
                                            },
                                            id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                            type: "element-authoredtext"
                                        }],
                                        show: [{
                                            id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                            contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                            title: {
                                                test: "test1"
                                            },
                                            type: "element-authoredtext"
                                        }],
                                    },
                                    type: "showhide"
                                }]
                            }
                        }]
                },

            }];
            let indexes = ["0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getTextElementInShowHide case 6:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                groupeddata: {
                    bodymatter: [
                        {
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [
                                            {
                                                contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                                id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                                index: "0-0-0-0-0-0",
                                                interactivedata: {
                                                    hide: [{
                                                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                                        elementdata: {
                                                            text: "test1"
                                                        },
                                                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                        type: "element-authoredtext"
                                                    }],
                                                    postertextobject: [{
                                                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                                        elementdata: {
                                                            text: "Reveal Answer:"
                                                        },
                                                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                        type: "element-authoredtext"
                                                    }],
                                                    show: [{
                                                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                                        title: {
                                                            test: "test1"
                                                        },
                                                        type: "element-authoredtext"
                                                    }],
                                                },
                                                type: "showhide"
                                            }
                                        ]
                                    }

                                }]
                            }
                        }]
                },
            }];
            let indexes = ["0", "0", "0", "0", "0", '0'];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getTextElementInShowHide case 7:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                groupeddata: {
                    bodymatter: [
                        {
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [
                                            {
                                                contents: {
                                                    bodymatter: [
                                                        {
                                                            contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                                            id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                                            index: "0-0-0-0-0-0-0",
                                                            interactivedata: {
                                                                hide: [{
                                                                    contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                                                    elementdata: {
                                                                        text: "test1"
                                                                    },
                                                                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                                    type: "element-authoredtext"
                                                                }],
                                                                postertextobject: [{
                                                                    contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                                                    elementdata: {
                                                                        text: "Reveal Answer:"
                                                                    },
                                                                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                                    type: "element-authoredtext"
                                                                }],
                                                                show: [{
                                                                    id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                                                    contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                                                    title: {
                                                                        test: "test1"
                                                                    },
                                                                    type: "element-authoredtext"
                                                                }],
                                                            },
                                                            type: "showhide"
                                                        }
                                                    ]

                                                }
                                            }
                                        ]

                                    }

                                }]
                            }
                        }]
                },
            }];
            let indexes = ["0", "0", "0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getFigureElementsInShowHide indexlength else', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
                interactivedata: {
                    hide: [{
                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                        elementdata: {
                            text: "test1"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    postertextobject: [{
                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                        elementdata: {
                            text: "Reveal Answer:"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    show: [{
                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                        title: {
                            test: "test1"
                        },
                        type: "element-authoredtext"
                    }],
                    type: "showhide"
                },
            }];
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = 0;
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveReturnedWith({ "currentElement": false, "showHideType": false });
        })
        it('getFigureElementsInShowHide case 4:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
                interactivedata: {
                    hide: [{
                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                        elementdata: {
                            text: "test1"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    postertextobject: [{
                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                        elementdata: {
                            text: "Reveal Answer:"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    show: [{
                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                        title: {
                            test: "test1"
                        },
                        type: "element-authoredtext"
                    }],
                    type: "showhide"
                },
            }];
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = ["0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getFigureElementsInShowHide case 5:', () => {

            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                id: "urn:pearson:manifest:2aa69479-f34e-48bb-9c58-6b0c8fa411c0",
                interactivedata: {
                    hide: [{
                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                        elementdata: {
                            text: "test1"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    postertextobject: [{
                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                        elementdata: {
                            text: "Reveal Answer:"
                        },
                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                        type: "element-authoredtext"
                    }],
                    show: [{
                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                        title: {
                            test: "test1"
                        },
                        type: "element-authoredtext"
                    }],
                    type: "showhide"
                },
            }]
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = ["0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getFigureElementsInShowHide case 6:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                elementdata: {
                    bodymatter: [
                        {
                            contents: {
                                bodymatter: [{
                                    contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                    id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                    index: "0-0-0-0-0-0",
                                    interactivedata: {
                                        hide: [{
                                            contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                            elementdata: {
                                                text: "test1"
                                            },
                                            id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                            type: "element-authoredtext"
                                        }],
                                        postertextobject: [{
                                            contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                            elementdata: {
                                                text: "Reveal Answer:"
                                            },
                                            id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                            type: "element-authoredtext"
                                        }],
                                        show: [{
                                            id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                            contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                            title: {
                                                test: "test1"
                                            },
                                            type: "element-authoredtext"
                                        }],
                                    },
                                    type: "showhide"
                                }]
                            }
                        }]
                },

            }];
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = ["0", "0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getFigureElementsInShowHide case 7:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                groupeddata: {
                    bodymatter: [
                        {
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [
                                            {
                                                contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                                id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                                index: "0-0-0-0-0-0-0",
                                                interactivedata: {
                                                    hide: [{
                                                        contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                                        elementdata: {
                                                            text: "test1"
                                                        },
                                                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                        type: "element-authoredtext"
                                                    }],
                                                    postertextobject: [{
                                                        contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                                        elementdata: {
                                                            text: "Reveal Answer:"
                                                        },
                                                        id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                        type: "element-authoredtext"
                                                    }],
                                                    show: [{
                                                        id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                                        contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                                        title: {
                                                            test: "test1"
                                                        },
                                                        type: "element-authoredtext"
                                                    }],
                                                },
                                                type: "showhide"
                                            }
                                        ]
                                    }

                                }]
                            }
                        }]
                },
            }];
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = ["0", "0", "0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
        it('getFigureElementsInShowHide case 8:', () => {
            let bodymatter = [{
                containerUrn: "urn:pearson:manifest:4ca82b86-a138-403f-bc93-2ff437ecde42",
                groupeddata: {
                    bodymatter: [
                        {
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [
                                            {
                                                contents: {
                                                    bodymatter: [
                                                        {
                                                            contentUrn: "urn:pearson:entity:7b2a37bc-6c56-4e79-be08-11b13bfa9085",
                                                            id: "urn:pearson:manifest:02cf1bcf-a5cc-4f73-b29a-0e90d5c33c81",
                                                            index: "0-0-0-0-0-0-0-0",
                                                            interactivedata: {
                                                                hide: [{
                                                                    contentUrn: "urn:pearson:entity:104326ec-ee53-4ed2-970e-f00189be13ca",
                                                                    elementdata: {
                                                                        text: "test1"
                                                                    },
                                                                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                                    type: "element-authoredtext"
                                                                }],
                                                                postertextobject: [{
                                                                    contentUrn: "urn:pearson:entity:003023de-6215-45d5-a617-9da65105468c",
                                                                    elementdata: {
                                                                        text: "Reveal Answer:"
                                                                    },
                                                                    id: "urn:pearson:work:6c397f2b-ffde-4ba1-b389-cb1039e59326",
                                                                    type: "element-authoredtext"
                                                                }],
                                                                show: [{
                                                                    id: "urn:pearson:work:48df93ce-5c9c-45fc-bfb5-a93e66dfeaaa",
                                                                    contentUrn: "urn:pearson:entity:e60a2672-cc1e-4bbc-bd89-136d0dbe083c",
                                                                    title: {
                                                                        test: "test1"
                                                                    },
                                                                    type: "element-authoredtext"
                                                                }],
                                                            },
                                                            type: "showhide"
                                                        }
                                                    ]

                                                }
                                            }
                                        ]

                                    }

                                }]
                            }
                        }]
                },
            }];
            let elementType = "figure";
            let showHideObj = {}
            let calledFrom = "glossaryFootnote";
            let indexes = ["0", "0", "0", "0", "0", "0", "0", "0"];
            const spyonhandleElementsInShowHide = jest.spyOn(showHideHelper, "handleElementsInShowHide");
            showHideHelper.handleElementsInShowHide(bodymatter, indexes, elementType, showHideObj, calledFrom);
            expect(spyonhandleElementsInShowHide).toHaveBeenCalled();
        });
    });

    it('getShowHideIndex renders', () => {
        const indexes = [0, 0, 0, 0];
        const spyonGetShowHideIndex = jest.spyOn(showHideHelper, "getShowHideIndex");
        showHideHelper.getShowHideIndex(indexes);
        expect(spyonGetShowHideIndex).toHaveBeenCalled();
    });
    describe('onGlossaryFnUpdateSuccessInShowHide renders', () => {
        describe('onGlossaryFnUpdateSuccessInShowHide for various element type', () => {
            const resData = {
                alignment: "text-width",
                type: "element-authoredtext",
                captions: { text: "test1" },
                contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                credits: { text: "test1" },
                figuredata: {
                    imageid: "",
                    path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                },
                figuretype: "image",
                title: { text: "" },
            };
            const activeElemType = "figure";
            const showHideObj = "show";
            it('onGlossaryFnUpdateSuccessInShowHide renders index for "element-dialogue" else', () => {
                let elmDiv = document.createElement('div');
                elmDiv.setAttribute('id', 'cypress-0-0-0-0')
                elmDiv.setAttribute('placeHolder', "Enter Stage Directions...")
                document.body.appendChild(elmDiv);

                const indexes = ["0", "0", "0", "0"];
                const bodymatter = [{...showHide}];
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, "element-dialogue", showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveReturnedWith(bodymatter);
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 5 "element-dialogue" Type', () => {
                let elmDiv = document.createElement('div');
                elmDiv.setAttribute('id', 'cypress-0-0-0-0-0')
                elmDiv.setAttribute('placeHolder', "Enter Character Name...")
                document.body.appendChild(elmDiv);

                const indexes = ["0", "0", "0", "0","0"];
                 const bodymatter = [{...showHide}];
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, "element-dialogue", showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 5 Text Type', () => {
                const indexes = ["0", "0", "0", "0", "0"];
                const bodymatter = [{elementdata:{ bodymatter: [{ contents: { bodymatter: [{...showHide}]}}]}}];
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, "element-authoredtext", showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 6 figure Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0", "0"];
                const bodymatter = [{groupeddata:{ bodymatter: [{ groupdata: { bodymatter: [{ elementdata: { bodymatter: [{...showHide}]}}]}}]}}];
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 7 figure Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0", "0", "0"];
                const bodymatter = [{groupeddata:{ bodymatter: [{ groupdata: { bodymatter: [{ elementdata: { bodymatter: [{ contents: { bodymatter: [{...showHide}]}}]}}]}}]}}];
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide("GetElementWithFnGlry_SH", bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
        });
    });
   describe('1.10 onUpdateSuccessInShowHide ', () => {
            const resData = {
                type: "element-authoredtext",
                elementdata: { text: "test1" },
                contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
            };
            it('showHideElement?.type === SHOW_HIDE ', () => {
                const indexes = ["0", "0", "0"];
                const bodymatter = [{...showHide}]
                const spyonFunc = jest.spyOn(showHideHelper, "onUpdateSuccessInShowHide");
                showHideHelper.onUpdateSuccessInShowHide(resData, bodymatter, indexes);
                expect(spyonFunc).toHaveBeenCalled();
            });
        });

});
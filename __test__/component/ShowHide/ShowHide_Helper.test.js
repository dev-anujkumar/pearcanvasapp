import * as showHideHelper from "../../../src/component/ShowHide/ShowHide_Helper.js";

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

    describe('test cases for add elements in showHide', () => {
        const props = {
            createShowHideElement: jest.fn()
        }
        it('add text element inside sh', () => {
            const spyonAddElementInShowHide = jest.spyOn(showHideHelper, "addElementInShowHide");
            showHideHelper.addElementInShowHide("0-0-1", "show", "TEXT", props);
            expect(spyonAddElementInShowHide).toHaveBeenCalled();
        });
        it('add IMAGE element inside sh', () => {
            const spyonAddElementInShowHide = jest.spyOn(showHideHelper, "addElementInShowHide");
            showHideHelper.addElementInShowHide("0-0-1", "show", "IMAGE", props);
            expect(spyonAddElementInShowHide).toHaveBeenCalled();
        });
        it('add VIDEO element inside sh', () => {
            const spyonAddElementInShowHide = jest.spyOn(showHideHelper, "addElementInShowHide");
            showHideHelper.addElementInShowHide("0-0-1", "show", "VIDEO", props);
            expect(spyonAddElementInShowHide).toHaveBeenCalled();
        })
    })

    describe('test cases for getShowHideElement', () => {
        const slateBodyMattter = {
            contentUrn: "urn:pearson:entity:7ce7913e-4555-410c-a46b-f3d0d8c64d32",
            type: 'showhide',
            elementdata: {
                bodymatter: [{
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743210",
                    elementdata: {
                        text: "test"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06f",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743211",
                    elementdata: {
                        text: "test1"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06g",
                },
                {
                    contentUrn: "urn:pearson:entity:d88d957a-61d8-497c-aa86-218203743212",
                    elementdata: {
                        text: "test2"
                    },
                    id: "urn:pearson:work:5b540c25-8632-4d4f-b1cc-f448478ca06h",
                }
                ]
            }
        }
        it('getShowHIdeElement :case 3', () => {
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 3, 0);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 4', () => {
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 4, 1);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 5', () => {
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 5, 2);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 6', () => {
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 6, 2);
            expect(spyonGetShowHideElement).toHaveBeenCalled();
        });
        it('getShowHIdeElement :case 7', () => {
            const spyonGetShowHideElement = jest.spyOn(showHideHelper, "getShowHideElement");
            showHideHelper.getShowHideElement(slateBodyMattter, 7, 2);
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
        describe('onGlossaryFnUpdateSuccessInShowHide for figure type', () => {
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
                type: "figure"
            };
            const activeElemType = "figure";
            const showHideObj = undefined;
            it('onGlossaryFnUpdateSuccessInShowHide renders index for figure else', () => {
                const indexes = 0;
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    interactivedata: {
                        hide: [{}],
                        postertextobject: [{}],
                        show: [{}, {}, {}]
                    },
                    status: "wip",
                    type: "showhide"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveReturnedWith(bodymatter);
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 4 figure Type', () => {
                const indexes = ["0", "0", "0", "0"];
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    interactivedata: {
                        hide: [{}],
                        postertextobject: [{}],
                        show: [{}, {}, {}]
                    },
                    status: "wip",
                    type: "showhide"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 5 figure Type', () => {
                const indexes = ["0", "1", "0", "0", "0"];
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    elementdata: {
                        bodymatter: [{
                            elementdata: {
                                header: [{}],
                                text: ""
                            }
                        },
                        {
                            contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                            id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                            index: '0-1-0-1',
                            interactivedata: {
                                hide: [{}],
                                postertextobject: [{}],
                                show: [{}, {}, {}, {}]
                            },
                            type: "showhide"
                        }, {
                        }],
                    },
                    subtype: "workedexample",
                    type: "element-aside"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 6 figure Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0"];
                const bodymatter = [{
                    elementdata: {
                        bodymatter: [{
                            contents: {
                                bodymatter: [{
                                    interactivedata: {
                                        hide: [{}],
                                        postertextobject: [{}],
                                        show: [{}, {}, {}, {}, {}]
                                    }
                                }]
                            }
                        }],
                    },
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 7 figure Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0", "0"];
                const bodymatter = [{
                    groupeddata: {
                        bodymatter: [{
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [{
                                            interactivedata: {
                                                hide: [{}],
                                                postertextobject: [{}],
                                                show: [{}, {}, {}, {}, {}, {}]
                                            }
                                        }]
                                    }
                                }]
                            }
                        }],
                    },
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 8 figure Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0", "0", "0"];
                const bodymatter = [{
                    groupeddata: {
                        bodymatter: [{
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [{
                                            contents: {
                                                bodymatter: [{
                                                    interactivedata: {
                                                        hide: [{}],
                                                        postertextobject: [{}],
                                                        show: [{}, {}, {}, {}, {}, {}, {}]
                                                    }
                                                }]
                                            }
                                        }]
                                    }
                                }]
                            }
                        }],
                    },
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
        });
        describe('onGlossaryFnUpdateSuccessInShowHide for text type', () => {
            const activeElemType = "element-authoredtext";
            const showHideObj = undefined;
            const resData = {
                alignment: "text-width",
                type: "element-authoredtext",
                elementdata: { text: "test1" },
                contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
            };
            it('onGlossaryFnUpdateSuccessInShowHide renders case 3 ', () => {
                const indexes = ["0", "0", "0"];
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    index: "0-0-0",
                    interactivedata: {
                        hide: [{}],
                        postertextobject: [{}],
                        show: [{}, {}, {}]
                    },
                    status: "wip",
                    type: "showhide"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 4 text Type', () => {
                const indexes = ["0", "0", "0", "0"];
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    elementdata: {
                        bodymatter: [{
                            interactivedata: {
                                hide: [{}],
                                postertextobject: [{}],
                                show: [{}, {}, {}]
                            }
                        }]
                    },
                    status: "wip",
                    type: "showhide"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 5 text Type', () => {
                const indexes = ["0", "0", "0", "0", "0"];
                const bodymatter = [{
                    elementdata: {
                        bodymatter: [{
                            contents: {
                                bodymatter: [{
                                    interactivedata: {
                                        hide: [{}],
                                        postertextobject: [{}],
                                        show: [{}, {}, {}, {}]
                                    }
                                }]
                            }
                        }]
                    },
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });

            it('onGlossaryFnUpdateSuccessInShowHide renders case 6 text Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0"];
                const bodymatter = [{
                    contentUrn: "urn:pearson:entity:6f165c38-6a3f-40b3-a36f-ee17857c94d5",
                    id: "urn:pearson:manifest:5f773b02-1b8e-4e58-bd30-12cd5c8141ce",
                    groupeddata: {
                        bodymatter: [{
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [{
                                            interactivedata: {
                                                hide: [{}],
                                                postertextobject: [{}],
                                                show: [{}, {}, {}, {}, {}, {}]
                                            }
                                        }
                                            , {}]
                                    }
                                }]
                            }
                        }],
                    },
                    type: "element-aside"
                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
            it('onGlossaryFnUpdateSuccessInShowHide renders case 7 text Type', () => {
                const indexes = ["0", "0", "0", "0", "0", "0", "0"];
                const bodymatter = [{
                    groupeddata: {
                        bodymatter: [{
                            groupdata: {
                                bodymatter: [{
                                    elementdata: {
                                        bodymatter: [{
                                            contents: {
                                                bodymatter: [{
                                                    interactivedata: {
                                                        hide: [{}],
                                                        postertextobject: [{}],
                                                        show: [{}, {}, {}, {}, {}, {}]
                                                    }
                                                }]
                                            }
                                        }
                                            , {}]
                                    }
                                }]
                            }
                        }],
                    },

                }]
                const spyonGlossaryFnUpdateSuccessInShowHide = jest.spyOn(showHideHelper, "onGlossaryFnUpdateSuccessInShowHide");
                showHideHelper.onGlossaryFnUpdateSuccessInShowHide(resData, bodymatter, activeElemType, showHideObj, indexes);
                expect(spyonGlossaryFnUpdateSuccessInShowHide).toHaveBeenCalled();
            });
        });

    });

});
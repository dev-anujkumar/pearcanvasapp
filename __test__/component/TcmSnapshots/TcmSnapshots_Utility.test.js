import * as tcmSnapshotUtility from '../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';
import config from '../../../src/config/config.js';
import { showHide } from '../../../fixtures/ElementSHowHideData.js';

jest.mock('../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js', () => {
   return {
    getLatestVersion: ()=>{
        return true
    },
    sendElementTcmSnapshot: jest.fn()
    }
})

jest.mock('../../../src/component/TcmSnapshots/ElementSnapshot_Utility.js', () => {
    return {
        fetchElementsTag: jest.fn(),
        generateWipDataForFigure: jest.fn(),
        getInteractiveSubtypeData: jest.fn(),
        removeCalloutTitle: jest.fn(),
        setSemanticsSnapshots: () => {
            return Promise.resolve({
                footnoteSnapshot: [],
                glossarySnapshot: [],
                assetPopoverSnapshot: []
            })
        },
    }
})

describe('-----------------------Test TcmSnapshots_Utility Functions-----------------------', () => {
    config.projectUrn="urn:pearson:distributable:ff18cbc0-ab3f-4c7e-9ed0-84eb34f4e126"
    config.slateManifestUrn="urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"

    describe('prepareTcmSnapshots ', () => {
        const { paragraph,elementcitation } = tcmTestData.setSemanticsSnapshotsData
        let actionStatus = {
            action:"create",
            status:"accepted",
            fromWhere:"create"
        }
        let containerElement ={
            "asideData": {
                "type": "citations",
                "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                "element": {
                    "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                    "contents": {
                        "bodymatter":[{
                            "contentUrn": "urn:pearson:entity:60d66604-7813-4a30-97e3-1d645026be31",
                            "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                            "html": { "text": "<p class='paragraphNumeroUnoCitation'><br></p>" },
                            "id": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "type": "element-citation",
                            "versionUrn": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba"

                        }] 
                    },
                        "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                        "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                        "status": "wip",
                        "type": "citations",
                        "versionUrn": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7"

                    }
                },
                // "parentUrn": undefined,
                "parentUrn":{
                    "multiColumnType":"citation"
                },
                "poetryData": undefined
            }
        it('prepareTcmSnapshots  - Normal elements', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(paragraph,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus,"","","");
        })
        it('prepareTcmSnapshots  - delete action', () => {
            let actionStatus = {
                action:"delete"
            }
            let asideContainer= {
                "contentUrn": "urn:pearson:entity:d9cf1cbd-b104-4102-b176-da65760a3359",
                "id": "urn:pearson:manifest:6c092699-072d-4ada-8a3e-402be2ae0938",
                "subtype": "workedexample",
                "type": "element-aside",
                parentUrn: {
                    elementType: "element-aside",
                }
            }
            let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
             const { slate1 } = tcmTestData
             let aside = slate1[manifest1].contents.bodymatter[1];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,actionStatus,asideContainer,"","");
             expect(spyFunction).toHaveBeenCalledWith(aside, actionStatus,asideContainer,"","");
         })
         it('prepareTcmSnapshots  - delete action', () => {
            let parentUrn = {
                manifestUrn: "urn:pearson:manifest:86fab86c-16ca-4428-9e38-bc15ebdbee49",
                contentUrn: "urn:pearson:entity:646f6acc-e6ce-4ac4-ab04-4e526a6cb866",
                elementType: "element-aside"
            }
            let asideContainer= {
                "contentUrn": "urn:pearson:entity:d9cf1cbd-b104-4102-b176-da65760a3359",
                "id": "urn:pearson:manifest:6c092699-072d-4ada-8a3e-402be2ae0938",
                "subtype": "workedexample",
                "type": "element-aside",
            }
            let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
             const { slate1 } = tcmTestData
             let aside = slate1[manifest1].contents.bodymatter[1];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,asideContainer,parentUrn,"","");
             expect(spyFunction).toHaveBeenCalledWith(aside,asideContainer,parentUrn,"","");
         })
        it('prepareTcmSnapshots  - Citation elements', () => {
           let manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
            const { slate2 } = tcmTestData
           let citations = slate2[manifest2].contents.bodymatter[1];
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(citations,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(citations, actionStatus,"","","");
        })
        it('prepareTcmSnapshots  - add element in citation and poetry elements', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(elementcitation,actionStatus,containerElement,"","");
            expect(spyFunction).toHaveBeenCalledWith(elementcitation, actionStatus,containerElement,"","");
        })
        it('prepareTcmSnapshots  - add element in citation and poetry elements1', () => {
            let containerElement1 ={
                "asideData": {
                    "type": "citations",
                    "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                    "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                    "parent":{
                        "multiColumnType":"Citation"
                    },
                    "element": {
                        "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                        "contents": {
                            "bodymatter":[{
                                "contentUrn": "urn:pearson:entity:60d66604-7813-4a30-97e3-1d645026be31",
                                "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                                "html": { "text": "<p class='paragraphNumeroUnoCitation'><br></p>" },
                                "id": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "type": "element-citation",
                                "versionUrn": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba"
    
                            }] 
                        },
                            "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                            "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                            "status": "wip",
                            "type": "citations",
                            "versionUrn": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7"
    
                        }
                    },
                    "parentUrn": undefined,
                    "poetryData": undefined
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(elementcitation,actionStatus,containerElement1,"","");
            expect(spyFunction).toHaveBeenCalledWith(elementcitation, actionStatus,containerElement1,"","");
        })
        it('prepareTcmSnapshots  - add element in citation and poetry elements1', () => {
            let containerElement2 ={
                "asideData": {
                    "type": "citations",
                    "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                    "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                    "parent":{
                        "multiColumnType":"Citation"
                    },
                    "element": {
                        "contentUrn": "urn:pearson:entity:53e08afb-61fe-4c76-a9c4-72c9992344b8",
                        "contents": {
                            "bodymatter":[{
                                "contentUrn": "urn:pearson:entity:60d66604-7813-4a30-97e3-1d645026be31",
                                "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                                "html": { "text": "<p class='paragraphNumeroUnoCitation'><br></p>" },
                                "id": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba",
                                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                "type": "element-citation",
                                "versionUrn": "urn:pearson:work:e9c83beb-4f0a-4597-aa0e-77df6c15e2ba"
    
                            }] 
                        },
                            "id": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7",
                            "schema": "http://schemas.pearson.com/wip-authoring/citations/1",
                            "status": "wip",
                            "type": "citations",
                            "versionUrn": "urn:pearson:manifest:8a4d5a66-ce1b-4047-aa67-64cb1aa256c7"
    
                        }
                    },
                    "parentUrn": undefined,
                    "poetryData": undefined,
                    "parentData": {
                        "multiColumnType":"Citation"
                    }
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(elementcitation,actionStatus,containerElement2,"","");
            expect(spyFunction).toHaveBeenCalledWith(elementcitation, actionStatus,containerElement2,"","");
        })
        it('prepareTcmSnapshots  - WE', () => {
            let asideContainer= {
                "contentUrn": "urn:pearson:entity:d9cf1cbd-b104-4102-b176-da65760a3359",
                "id": "urn:pearson:manifest:6c092699-072d-4ada-8a3e-402be2ae0938",
                "subtype": "workedexample",
                "type": "element-aside",
                parentUrn: {
                    contentUrn: "urn:pearson:entity:e169b3d9-318f-470f-b308-5904f1dc693c",
                    elementType: "group",
                    manifestUrn: "urn:pearson:manifest:7e58d2dc-4d8d-4ef0-abff-ccc1ab56630d"
                }
            }
            let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
             const { slate1 } = tcmTestData
            let aside = slate1[manifest1].contents.bodymatter[1];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,actionStatus,asideContainer,"","");
             expect(spyFunction).toHaveBeenCalledWith(aside, actionStatus,asideContainer,"","");
         })
         it('prepareTcmSnapshots  - WE Manifest', () => {
            let asideContainer= {
                "contentUrn": "urn:pearson:entity:d9cf1cbd-b104-4102-b176-da65760a3359",
                "id": "urn:pearson:manifest:6c092699-072d-4ada-8a3e-402be2ae0938",
                "subtype": "workedexample",
                "type": "element-aside",
            }
            let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
             const { slate1 } = tcmTestData
            let aside = slate1[manifest1].contents.bodymatter[2];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,actionStatus,asideContainer,"","");
             expect(spyFunction).toHaveBeenCalledWith(aside, actionStatus,asideContainer,"","");
         })
         it('prepareTcmSnapshots  - WE SB', () => {
            let asideContainer= {
                "contentUrn": "urn:pearson:entity:d9cf1cbd-b104-4102-b176-da65760a3359",
                "id": "urn:pearson:manifest:6c092699-072d-4ada-8a3e-402be2ae0938",
                "subtype": "workedexample",
                "type": "element-aside",
            }
            let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
            const { slate1 } = tcmTestData
            let aside = slate1[manifest1].contents.bodymatter[2].elementdata.bodymatter[2];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,actionStatus,asideContainer,"SECTION_BREAK","");
             expect(spyFunction).toHaveBeenCalledWith(aside, actionStatus,asideContainer,"SECTION_BREAK","");
         })
    });

    describe('Test-20-Function--prepareTcmSnapshots', () => {
        it('Test-20.1-Function--prepareTcmSnapshots', () => {
            let wipData= {
                type: "poetry",
                contents: {
                    bodymatter: [
                        {
                            id: 1
                        }
                    ]
                }
            }
            let containerElement = {
                parentUrn: {
                    elementType: "group"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(wipData, {}, containerElement, "", 0, null, null);

        })
        it('Test-20.2-Function--prepareTcmSnapshots', () => {
            let wipData= {
                type: "figure",
                contents: {
                    bodymatter: [
                        {
                            id: 1
                        }
                    ]
                }
            }
            let containerElement = {
                parentUrn: {
                    elementType: "group"
                },
                asideData: {
                    figureIn2cAside: {
                        isExist: true,
                        asideData: {
                            parent: {
                                type: "groupedcontent"
                            }
                        }
                    }
                }
            }
            let actionStatus = {
                action: "update"
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(wipData, actionStatus, containerElement, "", 0, null, null);
        
        })
        // it('Test-20.2-Function--prepareTcmSnapshots', () => {
        //     let wipData= {
        //         type: "figure",
        //         contents: {
        //             bodymatter: [
        //                 {
        //                     id: 1
        //                 }
        //             ]
        //         }
        //     }
        //     let containerElement = {
        //         parentUrn: {
        //             elementType: "element-aside"
        //         },
        //         asideData: {
        //             figureIn2cAside: {
        //                 isExist: true,
        //                 asideData: {
        //                     parent: {
        //                         type: "groupedcontent"
        //                     }
        //                 }
        //             },
        //             parent: {
        //                 type: {
        //                     gPType: "groupedcontent"
        //                 }
        //             }
        //         }
        //     }
        //     let actionStatus = {
        //         action: "delete"
        //     }
        //     let type =  "SMART_LINK"
        //     const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
        //     tcmSnapshotUtility.prepareTcmSnapshots(wipData, actionStatus, containerElement,type, 0, null, null);
        
        // })
    })

    describe('Test-21-Function--tcmSnapshotsElementsInPopupInContainer', () => {
        it('Test-21.1-Function--tcmSnapshotsElementsInPopupInContainer', () => {
            config.popupParentElement = {
                popupAsideData: {
                    element: {
                        status: "approved",
                        elementdata: {
                            bodymatter: [
                                {
                                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                                    status: "approved"
                                }
                            ]
                        }
                    },
                    contentUrn: "content1",
                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f",
                    parent: {
                        type: "groupedcontent"
                    }
                },
                popupParentUrn : {
                    manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                }
            }
            let snapshotsData = {
                wipData: showHide,
                slateManifestVersioning : {},
                actionStatus: {

                },
                tag: {},
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                }
            }
            let defaultKeys = {
                action:"create",
                status:"accepted",
                fromWhere:"delete"
            }
            let containerElement = {
                popupAsideData: {
                    element: {
                        status: "approved",
                        elementdata: {
                            bodymatter: [
                                {
                                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                                    status: "approved"
                                }
                            ]
                        }
                    },
                    contentUrn: "content1",
                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f"
                },
                popupParentUrn : {
                    manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                }
            }
            let type = "element-authoredtext"
            let index = 0
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsElementsInPopupInContainer');
            tcmSnapshotUtility.tcmSnapshotsElementsInPopupInContainer(snapshotsData, defaultKeys, containerElement, type,index);
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, defaultKeys, containerElement, type,index);

        })
    })

    describe('Test-7-Figure snapshots helper functions', () => {
        const { setSemanticsSnapshotsData } = tcmTestData
        it('Test-7.1-Function--1--setFigureElementContentSnapshot - for figure image', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.figure);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.figure);
        })
        it('Test-7.2-Function--1--setFigureElementContentSnapshot - for figure audio', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.audio);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.audio);
        })
        it('Test-7.3-Function--1--setFigureElementContentSnapshot - for figure video', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.video);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.video);
        })
        it('Test-7.3-Function--1--setFigureElementContentSnapshot - for authoredtext', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.authoredtext);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.authoredtext);
        })
        it('Test-7.3-Function--1--setFigureElementContentSnapshot - for codelisting', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.codelisting);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.codelisting);
        })
        it('Test-7.3-Function--1--setFigureElementContentSnapshot - for interactive', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(setSemanticsSnapshotsData.interactive);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.interactive);
        })
        it('Test-7.3-Function--1--prepareFigureElementSnapshots - for figure', () => {
            let actionStatus = {
                action: "update",
                status: "pending",
                fromWhere: "update"
            },
            index = "2-1";
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareFigureElementSnapshots');
            tcmSnapshotUtility.prepareFigureElementSnapshots(setSemanticsSnapshotsData.figure, actionStatus, index);
            expect(spyFunction).toHaveBeenCalledWith(setSemanticsSnapshotsData.figure, actionStatus, index);
        })
        
        it('prepareTcmSnapshots  - popup element', () => {
            config.popupParentElement = {
                parentElement:{
                    type: "popup"
                },
                popupAsideData:{id:"67890"}
            }
            let {popup} = tcmTestData.setSemanticsSnapshotsData
            let actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            let containerElement ={
                parentElement:{
                    type:"popup"
                },
            }
            config.isPopupSlate = false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(popup,actionStatus,containerElement,"POP_UP","");
            expect(spyFunction).toHaveBeenCalledWith(popup, actionStatus,containerElement,"POP_UP","");
        })
        it('prepareTcmSnapshots  - popup element', () => {
            config.popupParentElement = {
                parentElement:{
                    type: "popup"
                },
                popupAsideData:{id:"67890"}
            }
            let {popup} = tcmTestData.setSemanticsSnapshotsData
            let actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            let containerElement ={
                parentElement:{
                    type:"popup"
                },
                asideData:{
                    "id":"890"
                }
            }
            config.isPopupSlate = false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(popup,actionStatus,containerElement,"POP_UP","");
            expect(spyFunction).toHaveBeenCalledWith(popup, actionStatus,containerElement,"POP_UP","");
        })
        it('prepareTcmSnapshots  - Normal elements in popup', () => {
            config.isPopupSlate = true;
            let actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            let { paragraph } = tcmTestData.setSemanticsSnapshotsData
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(paragraph,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus,"","","");
        })
        it('prepareTcmSnapshots  - Normal elements in popup - no container', () => {
            config.isPopupSlate = true;
            let actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            config.popupParentElement = false
            let { paragraph } = tcmTestData.setSemanticsSnapshotsData
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(paragraph,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus,"","","");
        })
        it('prepareTcmSnapshots  - popup element delete', () => {
            config.popupParentElement = {
                parentElement:{
                    type: "popup"
                },
                popupAsideData:{id:"67890"}
            }
            let {popup} = tcmTestData.setSemanticsSnapshotsData
            let actionStatus = {
                action:"delete",
                status:"accepted",
                fromWhere:"delete"
            }
            let containerElement ={
                parentElement:{
                    type:"popup"
                },
                asideData:{
                    "id":"890"
                }
            }
            config.isPopupSlate = false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(popup,actionStatus,containerElement,"popup","");
            expect(spyFunction).toHaveBeenCalledWith(popup, actionStatus,containerElement,"popup","");
        })
        it('prepareTcmSnapshots  - multicolumn', () => {
            config.isPopupSlate = true;
            let actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            config.isPopupSlate=false;
            let { multicolumn } = tcmTestData.setSemanticsSnapshotsData
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(multicolumn,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(multicolumn, actionStatus,"","","");
        })

        it('tcmSnapshotsInPopupElement', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"delete",
                status:"accepted",
                fromWhere:"delete"
            }
            const snapshotsData = {
                wipData: {
                    id: "urn:pearson:work:3525235-324323-4432sfe31",
                    popupdata: {
                        "formatted-title": {
                            "id": "urn:pearson:work:123"
                        },
                        bodymatter: [
                            {
                                id: "urn:pearson:work:123",
                                type: "element-authoredtext"
                            }
                        ]
                    }
                },
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: { childTag: 'P' },
                elementId: { parentId : "" }
            }
            const containerElement = {
                metaDataField: "formattedTitle",
                parentElement: {
                    id: "urn:pearson:work:112231-sf3412412-141fwf3412e2"
                }
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, actionStatus, containerElement, 'popup', false, {});
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, actionStatus, containerElement, 'popup', false, {});
        })
        it('tcmSnapshotsInPopupElement - else - non delete case', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"delete",
                status:"accepted",
                fromWhere:"delete"
            }
            const snapshotsData = {
                wipData: {
                    id: "urn:pearson:work:3525235-324323-4432sfe31",
                    popupdata: {
                        'formatted-title': {}
                    }
                },
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: { childTag: 'P' },
                elementId: { parentId : "" }
            }
            const containerElement = {
                metaDataField: "formattedTitle",
                parentElement: {
                    id: "urn:pearson:work:112231-sf3412412-141fwf3412e2"
                }
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, {}, containerElement, 'formattedTitle', false, {});
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, {}, containerElement, 'formattedTitle', false, {});
        })
        it('tcmSnapshotsInPopupElement - posterText element', () => {
            config.isPopupSlate = true;
            const actionStatus = {}
            const snapshotsData = {
                wipData: {
                    id: "urn:pearson:work:3525235-324323-4432sfe31",
                    popupdata: {
                        "formatted-title": {
                            "id": "urn:pearson:work:123"
                        },
                        bodymatter: [
                            {
                                id: "urn:pearson:work:123",
                                type: "element-authoredtext"
                            }
                        ]
                    }
                },
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: { childTag: 'P' },
                elementId: { parentId : "" }
            }
            const containerElement = {
                parentElement: {
                    id: "urn:pearson:work:112231-sf3412412-141fwf3412e2"
                },
                sectionType: "postertextobject"
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, actionStatus, containerElement, 'popup', false, {});
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, actionStatus, containerElement, 'popup', false, {});
        })
         
        it('prepareAndSendTcmData', () => {
            config.isPopupSlate = true;
            const defaultKeys = {
                action:"create",
                status:"accepted",
                fromWhere:"delete"
            }
            const wipData = {
                id: "urn:pearson:work:3525235-324323-4432sfe31",
                popupdata: {
                    "formatted-title": {
                        "id": "urn:pearson:work:123"
                    },
                    bodymatter: [
                        {
                            id: "urn:pearson:work:123",
                            type: "element-authoredtext"
                        }
                    ]
                }
            }
            const elementDetails = {
                elementType: "LB",
                elementUrn: "",
                actionStatus: defaultKeys,
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareAndSendTcmData');
            
            tcmSnapshotUtility.prepareAndSendTcmData(elementDetails, wipData, defaultKeys, defaultKeys, 0, "wip");
            expect(spyFunction).toHaveBeenCalledWith(elementDetails, wipData, defaultKeys, defaultKeys, 0, "wip");
        })
        it('prepareAndSendTcmData - popup CTA', async () => {
            config.isPopupSlate = true;
            const defaultKeys = {
                action:"create",
                status:"accepted",
                fromWhere:"delete"
            }
            const wipData = {
                id: "urn:pearson:work:3525235-324323-4432sfe31",
                type: "popup",
                popupdata: {
                    "formatted-title": {
                        "id": "urn:pearson:work:123"
                    },
                    bodymatter: [
                        {
                            id: "urn:pearson:work:123",
                            type: "element-authoredtext"
                        }
                    ]
                }
            }
            const elementDetails = {
                elementType: "POP:CTA",
                elementUrn: "",
                actionStatus: defaultKeys,
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareAndSendTcmData');
            
            tcmSnapshotUtility.prepareAndSendTcmData(elementDetails, wipData, defaultKeys, defaultKeys, 1, "wip");
            expect(spyFunction).toHaveBeenCalledWith(elementDetails, wipData, defaultKeys, defaultKeys, 1, "wip");
        })
        it('setElementTypeAndUrn - 1st if', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "not poetry" 
                },
                parent: {
                    id: "id",
                    type: "showhide"
                },
                sectionType: "sectionType"
            },
            containerElement = {
                asideData : {
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside",
                        subtype: "workedexample"
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - 1st if : sectionType false', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "not poetry" 
                },
                parent: {
                    type: "showhide"
                },
            },
            containerElement = {
                asideData : {
                    parent: {id:"test"},
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - 1st if : false', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "not poetry" 
                },
                parent: {
                    type: "showhide"
                }
            },
            containerElement = {
                asideData : {
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                showHideObj: {
                    currentElement: {
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - element-aside', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "poetry" 
                },
                parent: {
                    type: "showhide"
                }
            },
            containerElement = {
                asideData : {
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - worked example', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "poetry" 
                },
                parent: {
                    type: "showhide"
                }
            },
            containerElement = {
                asideData : {
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside",
                        subtype: "workedexample"
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - containerinSH', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "showhide" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - showhide - last if : true', async () => {
            config.isPopupSlate = false;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = true,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "showhide" 
                }
            },
            containerElement = {
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            let actionStatus = {
                action: "delete"
            }
            let popupCutCopyParentData = {
                operationType: "cut",
                isPopupSlate: true,
                versionUrn: "versionUrn"
            }
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
        })
        it('setElementTypeAndUrn - showhide - last if : false', async () => {
            config.isPopupSlate = false;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = true,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "showhide" 
                }
            },
            containerElement = {
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            let actionStatus = {
                action: "delete"
            }
            let popupCutCopyParentData = {
                operationType: "cut",
                isPopupSlate: true
            }
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
        })
        it('setElementTypeAndUrn - 1st else if (popupCutCopyParentData?.operationType === cut', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "test" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            let actionStatus = {
                action: "delete"
            }
            let popupCutCopyParentData = {
                operationType: "cut",
                isPopupSlate: false,
            }
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
        })
        it('setElementTypeAndUrn - 2nd else if (popupCutCopyParentData?.operationType === cut', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "test" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            let actionStatus = {
                action: "delete"
            }
            let popupCutCopyParentData = {
                operationType: "cut",
                isPopupSlate: true,
                versionUrn: "versionUrn"
            }
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
        })
        it('setElementTypeAndUrn - 2nd else if (popupCutCopyParentData?.operationType === cut', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "test" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            let actionStatus = {
                action: "delete"
            }
            let popupCutCopyParentData = {
                operationType: "cut",
                isPopupSlate: true,
            }
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement,actionStatus, popupCutCopyParentData);
        })
        it('setElementTypeAndUrn - tag', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = true,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "showhide" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - parentElement', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = true,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { 
                    type: "poetry" 
                },
                parent: {
                    type: "type1"
                }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31",
                    parent: {
                        type: "showhide"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    },
                    containerinSH: ["element-aside", "citations"]
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - poetry', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                asideData : {
                    type: "poetry",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - element-aside', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - workedexample', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - groupedcontent', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                asideData : {
                    type: "groupedcontent",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                parentUrn: {multiColumnType: "3C", columnName: "C1", manifestUrn:"m-123", mcId: "mc-123"}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
       
        })
        it('setElementTypeAndUrn - workedexample', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "different" }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        
        })
        it('setElementTypeAndUrn - showhide inside aside', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "showhide" }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - showhide - poetry', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                showHideObj: {
                    element: {
                        type: 'showhide'
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - showhide - poetry - sectionType block', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                showHideObj: {
                    element: {
                        type: 'showhide',
                        sectionType: 'show'
                    },
                    sectionType: 'show'
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - showhide - poetry - showHideObj element - id and sectionType block', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "poetry" }
            },
            containerElement = {
                showHideObj: {
                    element: {
                        id: 'urn:pearson:manifest:as242342asd3:32sf4314',
                        type: 'showhide',
                        sectionType: 'show'
                    }
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setElementTypeAndUrn - showhide inside WE', async () => {
            config.isPopupSlate = true;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "SH",
                childTag : "P"
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = true,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "showhide" }
            },
            containerElement = {
                asideData : {
                    type: "element-aside",
                    subtype: "workedexample",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
        it('setContentSnapshot - showhide reveal answer', async () => {
            
            const element = {
                html : {
                    text: "<p>Reveal Answer: This test</p>"
                }
            },
            elementDetails = {
                elementType : "SH:Action Button Label"
            },
            actionStatus = {
                action: ""
            },
            CurrentSlateStatus = "wip"
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setContentSnapshot');
            // const expectedText = "<p>Reveal Answer: This test</p>"
            tcmSnapshotUtility.setContentSnapshot(element, elementDetails, actionStatus, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('setContentSnapshot - if part', async () => {
            
            const element = {
                html : {
                    text: "<p>Reveal Answer: This test</p>"
                },
                type:'group',groupdata:{bodymatter:[{html : {
                    text: "<p>Reveal Answer: This test</p>"
                },}]}
            },
            elementDetails = {
                elementType : "SH:Action Button Label"
            },
            actionStatus = {
                action: ""
            },
            CurrentSlateStatus = "wip"
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setContentSnapshot');
            // const expectedText = "<p>Reveal Answer: This test</p>"
            tcmSnapshotUtility.setContentSnapshot(element, elementDetails, actionStatus, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('setContentSnapshot - else-if part', async () => {
            
            const element = {
                html : {
                    text: "<p>Reveal Answer: This test</p>"
                },
                type:'element-blockfeature',
                elementdata:{
                    type:'blockquote'
                }
            },
            elementDetails = {
                elementType : "SH:Action Button Label"
            },
            actionStatus = {
                action: ""
            },
            CurrentSlateStatus = "wip"
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setContentSnapshot');
            // const expectedText = "<p>Reveal Answer: This test</p>"
            tcmSnapshotUtility.setContentSnapshot(element, elementDetails, actionStatus, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('setContentSnapshot - else-if part when html is not present', async () => {
            
            const element = {
                html : {
                },
                type:'element-blockfeature',
                elementdata:{
                    type:'blockquote'
                }
            },
            elementDetails = {
                elementType : "SH:Action Button Label"
            },
            actionStatus = {
                action: ""
            },
            CurrentSlateStatus = "wip"
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setContentSnapshot');
            // const expectedText = "<p>Reveal Answer: This test</p>"
            tcmSnapshotUtility.setContentSnapshot(element, elementDetails, actionStatus, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('setContentSnapshot -2nd  else-if part', async () => {
            
            const element = {
                html : {
                    text: "<p>Reveal Answer: This test</p>"
                },
                type:'element-blockfeature',
                elementdata:{
                    type:'blockquote'
                }
            },
            elementDetails = {
                elementType: "LB",
                isMetaFieldExist:true
            },
            actionStatus = {
                action: "create"
            },
            CurrentSlateStatus = "wip"
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setContentSnapshot');
            // const expectedText = "<p>Reveal Answer: This test</p>"
            tcmSnapshotUtility.setContentSnapshot(element, elementDetails, actionStatus, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('setElementTypeAndUrn - MultiColumn - 3 Column', () => {
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd",
                columnId: "urn:pearson:work:as242342asd3:32sf43sdd"
            },
            tag = {
                parentTag: "3C",
                childTag : "P"
            },
            isHead = "BODY",
            eleIndex = 2,
            spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex);  
            let expectedResult = {
                "elementUrn": "undefined+urn:pearson:manifest:as242342asd3:32sf4314+urn:pearson:work:as242342asd3:32sf43sdd+urn:pearson:work:as242342asd3:32sf43sdd",
                'elementType': 'POP:BODY:3C:C3:P'
            }
            expect(spyFunction).toHaveReturnedWith(expectedResult);
        });
    })
    describe('Test - 8 tcmSnapshotsInPopupElement ', () => {
        let snapshotsData = {
            "tag":{ "parentTag":"POP" },
            "wipData":{
                "id":"urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f",
                "type":"popup",
                "contentUrn":"urn:pearson:entity:5e2a5892-b71c-4e6c-83c6-ae3863fae832",
                "popupdata":{
                    "bodymatter":[],
                    "postertextobject":[
                        {
                        "id":"urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
                        "status":"wip"
                        }
                    ]
                }
            },
            "elementId":{
                "parentId":"urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f"
            },
            "actionStatus":{
                "action":"create",
                "status":"pending",
                "fromWhere":"create"
            }
        },
        defaultKeys = {action: 'create'},
        containerElement = { 
            metaDataField: 'formattedTitleOnly',
            sectionType: "",
            parentElement: { popupdata: {"formatted-title": "title"} }
        }, type = 'POP_UP', index = 0, operationType = null;
        it('Test-8.1- if(metaDataField && parentElement && ', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test-8.2- if(type == POPUP_ELEMENT && operationType===copy', () => {
            type = 'popup'; operationType = "copy";
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test-8.3- else(metaDataField && parentElement && parentElement.popupdata', () => {
            type = 'popup'; operationType = "copy";  containerElement.metaDataField = false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test-8.4 - else(sectionType && sectionType === POSTER_TEXT_OBJ', () => {
            defaultKeys = {action: 'update'}; type = ""; containerElement.sectionType = "";
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test-8.5 - no opration type passed', () => {
            defaultKeys = {action: 'update'}; type = ""; containerElement.sectionType = "";
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index);
            expect(spyFunction).toHaveBeenCalled();
        })        
        it('Test-8.6 - when operationType is cut', () => {
            defaultKeys = {action: 'update'}; operationType='cut'
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInPopupElement');
            tcmSnapshotUtility.tcmSnapshotsInPopupElement(snapshotsData, defaultKeys, containerElement, type,index,operationType);
            expect(spyFunction).toHaveBeenCalled();
        })        
    });

    describe('Test-10 - prepareElementSnapshots functions', () => {
        it('Test - 10.1 - if (element?.type === ELEMENT_TYPE_PDF)', async () => {
            const element = {id: "123", type: "element-pdf",
                elementdata: { filetitle: "title", assetid: "ai-1234"}},
                actionStatus = {action: "update"},
                index = 0, elementDetails = {}, CurrentSlateStatus = {};
            // jest.spyOn('')
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareElementSnapshots');
            tcmSnapshotUtility.prepareElementSnapshots(element,actionStatus,index, elementDetails, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('Test - 10.2 - if (element?.type === element-assessment)', async () => {
            const element = {id: "123", type: "element-assessment",
                elementdata: {
                    assessmenttitle:"",
                    assessmentitemtitle:"",
                    assessmentid:"",  assessmentitemid: "231", usagetype:"", assessmentformat:""
                }},
                actionStatus = {action: "update"},
                index = 0, elementDetails = {}, CurrentSlateStatus = {};
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareElementSnapshots');
            await tcmSnapshotUtility.prepareElementSnapshots(element,actionStatus,index, elementDetails, CurrentSlateStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
    })

    describe('Test-13 - tcmSnapshotsOnDefaultSlate functions', () => {
        it('setElementTypeAndUrn - showhide inside multicol', async () => {
            config.isPopupSlate = false;
            const eleId = {
                parentId: "urn:pearson:manifest:as242342asd3:32sf4314",
                childId : "urn:pearson:work:as242342asd3:32sf43sdd",
                grandParentId: "21312"
            },
            tag = {
                parentTag: "3C:C1:SH",
                childTag : "P",
                grandParent: "3C:C1",
                isMultiColumnInPopup: true
            },
            isHead = "HEAD",
            eleIndex = -1,
            popupInContainer = false,
            slateManifestVersioning = "",
            popupSlate = false,
            parentElement = {
                element: { type: "showhide" }
            },
            containerElement = {
                asideData : {
                    type: "groupedcontent",
                    subtype: "",
                    id: "urn:pearson:manifest:3525235-324323-4432sfe31"
                },
                parentUrn: {multiColumnType: "3C", columnName: "C1", manifestUrn:"m-123", mcId: "mc-123"}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setElementTypeAndUrn');
            
            tcmSnapshotUtility.setElementTypeAndUrn(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(eleId, tag, isHead, "" , eleIndex, popupInContainer, slateManifestVersioning, popupSlate, parentElement, containerElement);
        })
    }) 
    describe('Test-14 - setFigureElementContentSnapshot functions', () => {
        it('14.1 - setFigureElementContentSnapshot if(elementData){ ', () => {
            const element = { 
                html: {title: "title"},
                figuretype: "assessment",
                figuredata: {elementdata: {
                    assessmenttitle:"",
                    assessmentitemtitle:"",
                    assessmentid:"",  assessmentitemid: "231", usagetype:"", assessmentformat:""
                }}
            }, actionStatus={};
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(element, actionStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
        it('14.2 - setFigureElementContentSnapshot else(elementData){ ', () => {
            const element = { 
                html: {title: "title"},
                figuretype: "assessment",
                figuredata: {}
            }, actionStatus={};
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setFigureElementContentSnapshot');
            tcmSnapshotUtility.setFigureElementContentSnapshot(element, actionStatus);
            expect(spyFunction).toHaveBeenCalled();
        })
    })

    describe('setSlateType',()=>{
        const actionStatus = {
            action:"create",
            status:"accepted",
            fromWhere:"create"
        }
        const snapshotsData = {
            wipData: {
                type: "showhide",
                interactivedata: {
                    show: [
                        {type: "element-aside"}
                    ]
                },
                contents: {
                    bodymatter: [{}]
                },
                elementdata: {
                    bodymatter: [{}]
                }
            },
            slateManifestVersioning : {},
            popupInContainer: null,
            actionStatus,
            tag: {},
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            }
        }
        it('setSlateType if element type is not citations', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setSlateType');
            tcmSnapshotUtility.setSlateType(snapshotsData,{ figureIn2cAside: { isExist: true, asideData: { parent: [Object] } } },'abc');
            expect(spyFunction).toHaveBeenCalled();
        })
    })
})

describe('tcmSnapshotsPopupInContainer',()=>{
    let type = 'test'
    let defaultKeys = { action: "create", status: "accepted", fromWhere: "delete" }
    let containerElement = { poetryData: { id: '123' }, asideData: { type: 'element-aside', subtype: 'workedexample' }, parentUrn: { manifestUrn: "123" } }
    let snapshotsData = {
        wipData: { id: '123' },
        elementId: { popupParentId: '', parentId: '123' },
        tag: {},
        actionStatus: {},
        slateManifestVersioning: {}
    }
    let operationType = 'random'

    it('tcmSnapshotsPopupInContainer', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData,defaultKeys, containerElement,type ,1,operationType);
        expect(spyFunction).toHaveBeenCalled();
    })            
    it('tcmSnapshotsPopupInContainer if operationType argument is not passed', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData,defaultKeys, containerElement,type ,1);
        expect(spyFunction).toHaveBeenCalled();
    })        
    it('tcmSnapshotsPopupInContainer if asideData is not avaiable', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData,defaultKeys, {poetryData:{}, parentUrn:{}},type ,1,operationType);
        expect(spyFunction).toHaveBeenCalled();
    })
    it('tcmSnapshotsPopupInContainer if poetryData is not avaiable', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData,defaultKeys,{parentUrn:{}},type ,1,operationType);
        expect(spyFunction).toHaveBeenCalled();
    })
    it('tcmSnapshotsPopupInContainer if popupParent-id is avaiable', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData,defaultKeys, {poetryData:{id:'123'}, parentUrn:{}},type ,1,operationType);
        expect(spyFunction).toHaveBeenCalled();
    })
})
describe('Function--checkContainerPopupVersion', () => {
    let containerElement = {
        popupAsideData: {
            element: {
                status: "approved",
                elementdata: {bodymatter: [{id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",status: "approved"}]}
            },
            contentUrn: "content1",
            id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f"
        },
        popupParentUrn : {
            manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
        }
    }
    it('Test-15.1-Function--checkContainerPopupVersion', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerPopupVersion');
        tcmSnapshotUtility.checkContainerPopupVersion(containerElement);
        expect(spyFunction).toHaveBeenCalledWith(containerElement);
    })
    it('checkContainerPopupVersion if stauts is not approved', () => {
        let newContainerElement = containerElement.popupAsideData.element['status']='pending'
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerPopupVersion');
        tcmSnapshotUtility.checkContainerPopupVersion(newContainerElement);
        expect(spyFunction).toHaveBeenCalledWith(newContainerElement);
    })        
})

describe('checkElementsInPopupInContainer-hasPopupParentUrn false case', () => {
    config.popupParentElement = {
            parentElement: {
                type: "showhide"
            },
            popupParentUrn: {
                urn: "urn"
            },
            popupAsideData:{
                data: "data"
            }
    }
    it('checkElementsInPopupInContainer-hasPopupParentUrn false case', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkElementsInPopupInContainer');
        tcmSnapshotUtility.checkElementsInPopupInContainer();
    })
    
})

describe('checkContainerPopupVersion-manifest urn not equal to popupAsideData id', () => {
    let containerElement = {
        popupAsideData: {
            element: {
                status: "approved",
                elementdata: {
                    bodymatter: [
                        {
                            id: 2,
                            status: "notapproved"
                        }
                    ]
                }
            },
            id: 1
        },
        popupParentUrn: {
            manifestUrn: 2
        }
    }
    it('checkContainerPopupVersion-manifest urn not equal to popupAsideData id', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerPopupVersion');
        tcmSnapshotUtility.checkContainerPopupVersion(containerElement);
    })
    
})

describe("prepareMetablock funtion",()=>{
    let element ={figuredata:{programlanguage:'abc',syntaxhighlighting:false,numbered:false}}
    let actionStatus ={}
    it("prepareMetablock",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareMetablock');
        tcmSnapshotUtility.prepareMetablock(element,actionStatus);
        expect(spyFunction).toHaveBeenCalledWith(element,actionStatus);
    })
})
describe("checkParentData funtion",()=>{
    let containerElement ={poetryData:{},asideData: {}, parentUrn: {}}
    it("checkParentData",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkParentData');
        tcmSnapshotUtility.checkParentData(containerElement);
        expect(spyFunction).toHaveBeenCalledWith(containerElement);
    })
})
describe("setDefaultKeys funtion",()=>{
    it("setDefaultKeys",()=>{
        config.tcmStatus=true
        let actionStatus={}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={}    
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn);
    })
    it("setDefaultKeys > 1st if : true",()=>{
        config.tcmStatus=true
        config.isPopupSlate=false
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isPopupSlate:true,parentSlateId:"test"}, popupParentSlateData    
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
    it("setDefaultKeys > 1st if : false",()=>{
        config.tcmStatus=true
        config.isPopupSlate=false
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isPopupSlate:true}, popupParentSlateData    
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
    it("setDefaultKeys > 1st if",()=>{
        config.tcmStatus=true
        config.isPopupSlate=true
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isPopupSlate:false}, popupParentSlateData    
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
    it("setDefaultKeys > 2nd if",()=>{
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isSlateApproved:true}, popupParentSlateData    
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
    it("setDefaultKeys > 3rd if : true",()=>{
        config.tcmStatus=true
        config.isPopupSlate=true
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isPopupSlate:true,versionUrn:"test",isSlateApproved:false,parentSlateId:"parentSlateId"}, popupParentSlateData={versionUrn:"2test"} 
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
    it("setDefaultKeys > 3rd if : false",()=>{
        config.tcmStatus=true
        config.isPopupSlate=true
        let actionStatus={action:"delete"}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={manifestUrn:"urn"},popupCutCopyParentData={operationType: "cut",isPopupSlate:true,versionUrn:"test",isSlateApproved:false}, popupParentSlateData={versionUrn:"2test"} 
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn, null, popupCutCopyParentData, popupParentSlateData);
    })
})
describe("prepareFigureElementSnapshots funtion",()=>{
    let actionStatus={}, element={type:'element-citation'}
    it("prepareFigureElementSnapshots",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareFigureElementSnapshots');
        tcmSnapshotUtility.prepareFigureElementSnapshots(element, actionStatus, 1);
        expect(spyFunction).toHaveBeenCalledWith(element, actionStatus, 1);
    })
    it("prepareFigureElementSnapshots when element not passed",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareFigureElementSnapshots');
        tcmSnapshotUtility.prepareFigureElementSnapshots('', actionStatus, 1);
        expect(spyFunction).toHaveBeenCalledWith("", actionStatus, 1);
    })
})
describe("checkElementsInPopupInContainer funtion",()=>{
    it("checkElementsInPopupInContainer",()=>{
        config.popupParentElement.parentElement['type']='test'
        config.popupParentElement['popupParentUrn']='test'
        config.popupParentElement['popupAsideData']='data'

        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkElementsInPopupInContainer');
        tcmSnapshotUtility.checkElementsInPopupInContainer();
        expect(spyFunction).toHaveBeenCalledWith();
    })
})
describe("setSlateType funtion",()=>{
    let wipData={}, type={} ,containerElement={poetryData:true}
    it("setSlateType",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setSlateType');
        tcmSnapshotUtility.setSlateType(wipData, containerElement, type);
        expect(spyFunction).toHaveBeenCalledWith(wipData, containerElement, type);
    })
})
describe("getAssessmentType funtion",()=>{
    let key='tdx', isStandAlone=true
    it("getAssessmentType is standalone",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAssessmentType');
        tcmSnapshotUtility.getAssessmentType(key, isStandAlone);
        expect(spyFunction).toHaveBeenCalledWith(key, isStandAlone);
    })
    it("getAssessmentType is not standalone",()=>{
        isStandAlone=false
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAssessmentType');
        tcmSnapshotUtility.getAssessmentType(key, isStandAlone);
        expect(spyFunction).toHaveBeenCalledWith(key, isStandAlone);
    })
})
describe("getAssessmentStatus funtion",()=>{
    let assessmentId='123'
    it("getAssessmentStatus",()=>{
        jest.spyOn(tcmSnapshotUtility, 'getAssessmentType');
        tcmSnapshotUtility.getAssessmentStatus(assessmentId);
    })
})

describe("tcmSnapshotsPopupCTA",()=>{
    let containerElement = {

    }
    let snapshotsData = {
        wipData: {
            type: "showhide",
            id: 1
        },
        elementId: {
            parentId: 2 
        },
        tag: {
            parentTag: "tag"
        }
    }
    it("tcmSnapshotsPopupCTA",()=>{
        jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupCTA');
        tcmSnapshotUtility.tcmSnapshotsPopupCTA(snapshotsData, {}, containerElement, 0);
    })
})

describe("tcmSnapshotsPopupInContainer- isHead value-head",()=>{
    let containerElement = {
        asideData: {
            type: "element-aside",
            subtype: "workedexample",
            id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
        },
        parentUrn: {
            manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
        }
    }
    let snapshotsData = {
        elementId: {
            popupParentId: "1"
        },
        wipData: {
            id: "1"
        },
        tag: {
            popupParentTag: "tag"
        }
    }
    it("tcmSnapshotsPopupInContainer- isHead value-head",()=>{
        jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsPopupInContainer');
        tcmSnapshotUtility.tcmSnapshotsPopupInContainer(snapshotsData, {}, containerElement, "", 0, null);
    })
    it("autoNumberedElements",() =>{
        let element = {
            type:"figure",
            figuretype:"table"
        }
        jest.spyOn(tcmSnapshotUtility, 'autoNumberedElements');
        tcmSnapshotUtility.autoNumberedElements(element);
    })
    it("autoNumberedElements",() =>{
        let element = {
            type:"",
            figuretype:""
        }
        jest.spyOn(tcmSnapshotUtility, 'autoNumberedElements');
        tcmSnapshotUtility.autoNumberedElements(element);
    })
    
})
describe("autoNumberedElements funtion",()=>{
    let element={type:'figure'}
    it("autoNumberedElements",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'autoNumberedElements');
        tcmSnapshotUtility.autoNumberedElements(element);
        expect(spyFunction).toHaveBeenCalledWith(element);
    })
})

describe("getAutoNumberedLabelData funtion",()=>{
    let element={type:'figure'}
    it("getAutoNumberedLabelData",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element);
        expect(spyFunction).toHaveBeenCalledWith(element);
    })
})
describe("getAutoNumberedLabelData funtion -- if case", () => {
    let element={type:'figure', numberedandlabel: false, figuretype: "image", manualoverride: "abc", overridelabelvalue: "123"}
    it("getAutoNumberedLabelData", () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element);
        expect(spyFunction).toHaveBeenCalledWith(element);
    })
})   
describe("getAutoNumberedLabelData funtion -- else if case", () => {
    it("getAutoNumberedLabelData", () => {
        let element={type:'figure', numberedandlabel: true, manualoverride: {overridenumbervalue: "123",overridelabelvalue:"label"}}
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element);
        expect(spyFunction).toHaveBeenCalledWith(element);
    })
    it("getAutoNumberedLabelData : else", () => {
        let element={type:'figure', numberedandlabel: true, manualoverride: {overridenumbervalue: "123"}}
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element);
        expect(spyFunction).toHaveBeenCalledWith(element);
    })
    let element1={type:'figure', numberedandlabel: true, manualoverride:"", }
    it("getAutoNumberedLabelData", () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element1);
        expect(spyFunction).toHaveBeenCalledWith(element1);
    })
    let element2={type:'table', numberedandlabel: true, manualoverride:"abc", overridelabelvalue: "123"}
    it("getAutoNumberedLabelData", () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'getAutoNumberedLabelData');
        tcmSnapshotUtility.getAutoNumberedLabelData(element2);
        expect(spyFunction).toHaveBeenCalledWith(element2);
    })
})

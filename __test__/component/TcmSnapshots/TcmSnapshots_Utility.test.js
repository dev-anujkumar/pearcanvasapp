import * as tcmSnapshotUtility from '../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';
import config from '../../../src/config/config.js';
import { showHide } from '../../../fixtures/ElementSHowHideData.js';
import { poetryElem } from '../../../fixtures/ElementPoetryTestData.js';

jest.mock('../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js', () => {
   return {
    getLatestVersion: ()=>{
        return true
    }}
})

jest.mock('../../../src/component/TcmSnapshots/ElementSnapshot_Utility.js', () => {
    return {
        fetchElementsTag: jest.fn(),
        generateWipDataForFigure: jest.fn(),
        getInteractiveSubtypeData: jest.fn(),
        removeCalloutTitle: jest.fn(),
        setSemanticsSnapshots: jest.fn(),
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
                "parentUrn": undefined,
                "poetryData": undefined
            }
        it('prepareTcmSnapshots  - Normal elements', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
            tcmSnapshotUtility.prepareTcmSnapshots(paragraph,actionStatus,"","","");
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus,"","","");
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
    xdescribe('Test-3-Function--3--fetchElementWipData', () => {
        const { slate1, slate2 } = tcmTestData
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
        let bodymatter1 = slate1[manifest1].contents.bodymatter,
            bodymatter2 = slate2[manifest2].contents.bodymatter;

        xit('Test-3.1-Function--3--fetchElementWipData - Paragraph in Slate', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, 0, 'element-authoredtext')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 0, 'element-authoredtext')
        })
        xit('Test-3.2-Function--3--fetchElementWipData - Section-Break', () => {
            let entityUrn = "urn:pearson:entity:4e42d3a8-f794-4977-9e13-b1e76431d8bf"
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, ["2"], 'element-aside', entityUrn)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2"], 'element-aside', entityUrn)
        })
        xit('Test-3.3-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "2-3-0", 'stanza')

        })
        xit('Test-3.4-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "0-1-2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "0-1-2-3-0", 'stanza')

        })
        xit('Test-3.5-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "0-2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "0-2-3-0", 'stanza')

        })
        xit('Test-3.6-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "3-0-2", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "3-0-2", 'showhide')

        })
        xit('Test-3.7-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "6-0-2-0", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "6-0-2-0", 'showhide')

        })
        xit('Test-3.8-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "7-0-2-0-0", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "7-0-2-0-0", 'showhide')

        })
        xit('Test-3.9-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "8-0-2-0-0", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "8-0-2-0-0", 'showhide')

        })
        it('Test-3.10-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "9-0-2", 'element-aside')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "9-0-2", 'element-aside')

        })
        it('Test-3.4-Function--3--fetchElementWipData - Element-Citation', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "1-1", 'element-citation')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "1-1", 'element-citation')

        })
        it('Test-3.5-Function--3--fetchElementWipData - BQ in WE-Body', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "2-2-0", 'element-blockfeature')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "2-2-0", 'element-blockfeature')

        })
        it('Test-3.6-Function--3--fetchElementWipData - LO in SB', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "2-2-0", 'element-learningobjectives')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "2-2-0", 'element-learningobjectives')
        })
        it('Test-3.7-Function--3--fetchElementWipData - List in Aside', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "1-1", 'element-list')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "1-1", 'element-list')
        })
        it('Test-3.7-Function--3--fetchElementWipData - figure in slate', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "3", 'figure')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "3", 'figure')
        })
        it('Test-3.8-Function--3--fetchElementWipData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "6-0-1", 'element-aside')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "6-0-1", 'element-aside')
        })
        it('Test-3.9-Function--3--fetchElementWipData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "0-0", 'popup')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "0-0", 'popup')
        })
    });
    xdescribe('Test-4-Function--4--fetchParentData', () => {
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb";
        let bodymatter1 = tcmTestData.slate1[manifest1].contents.bodymatter;
        xit('Test-4.1-Function--4--fetchParentData - Paragraph in Aside', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["1", "0"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["1", "0"])
        })
        xit('Test-4.2-Function--4--fetchParentData - Aside', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, 1)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 1)
        })
        it('Test-4.3-Function--4--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["4", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["4", "1", "1"])
        })
        it('Test-4.4-Function--4--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["5", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["5", "1", "1"])
        })
        it('Test-4.5-Function--4--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["2", "1", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1", "1"])
        })
        it('Test-4.6-Function--4--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["4", "1", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["4", "1", "1", "1"])
        })
        it('Test-4.7-Function--5--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["2", "1", "1", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1", "1", "1"])
        })
        it('Test-4.8-Function--4--fetchParentData', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["2", "1", "1"], {})
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1"], {})
        })
    });
    xdescribe('Test-5-Function--5--checkContainerElementVersion', () => {
        it('Test-5.1-Function--5--checkContainerElementVersion - parentStatus !== "approved"', () => {
            let versionStatus = {
                parentStatus: "wip",
                popupStatus:"approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1"
                }, parentElement = {
                    asideData: {
                        id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                    },
                    poetryData: undefined
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);
        })
        it('Test-5.2-Function--5--checkContainerElementVersion - parentStatus === "approved" | Aside"', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1"
                }, parentElement = {
                    asideData: {
                        id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                        contentUrn: "urn:pearson:entity:8ae1090b-2429-4926-b638-ce43560c7f06"
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5"
                    },
                    poetryData: undefined

                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);
        })
        it('Test-5.3-Function--5--checkContainerElementVersion - parentStatus === "approved", childStatus === "approved" | WE-BODY', () => {
            let versionStatus = {
                parentStatus: "approved",
                childStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1"
                }, parentElement = {
                    asideData: {
                        id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:8ae1090b-2429-4926-b638-ce43560c7f06"
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f1",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.4-Function--5--checkContainerElementVersion - parentStatus === "approved" | Poetry', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1"
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: undefined,
                    poetryData: {
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91",
                        id: "urn:pearson:manifest:d8666a10-dffd-4b16-ab75-ec714a3fc3a6",
                        parentUrn: "urn:pearson:manifest:d8666a10-dffd-4b16-ab75-ec714a3fc3a6"
                    }
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.5-Function--5--checkContainerElementVersion - parentStatus === "approved" | Citations', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.6-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved", 
                showHideObj: {
                    element: {
                        type: "showhide"
                    }
                }
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.7-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved", 
                showHideObj: {
                    element: {
                        type: "showhide"
                    }
                },
                multiColParentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "groupedcontent",
                            parentContentUrn: "content1"
                        }
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.8-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved", 
                showHideObj: {
                    element: {
                        type: "showhide"
                    }
                },
                multiColParentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "groupedcontent"
                        }
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.9-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved", 
                showHideObj: {
                    element: {
                        type: "showhide"
                    }
                },
                multiColChildStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "groupedcontent",
                            columnContentUrn: "content1"
                        }
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.10-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved", 
                showHideObj: {
                    element: {
                        type: "showhide"
                    }
                },
                multiColChildStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "groupedcontent"
                        }
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.11-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "showhide"
                        },
                        element: {
                            type: "element-aside",
                            status: "approved"
                        }
                    },
                    parentUrn: {
                        elementType: "manifest",
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.12-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "app"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "showhide"
                        },
                        element: {
                            type: "element-aside",
                            status: "status"
                        }
                    },
                    parentUrn: {
                        elementType: "type",
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.13-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "groupedcontent",
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.14-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "groupedcontent",
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.15-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "type1",
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.16-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "wip",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "type1",
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.17-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "element-aside",
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.18-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    type: "element-aside"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.19-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        element: {
                            grandParent: {
                                asideData: {
                                    subtype: "type1"
                                },
                            },
                            type: "poetry"
                        }
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.20-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                popupStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,  
                    parentElement: {
                        contentUrn: "content1"
                    }    
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.21-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    parentElement: {
                        type: "showhide"
                    },
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined, 
                    showHideObj: {
                        element: {
                            type: "showhide",
                            contentUrn: "content1"
                        }
                    }     
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.22-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    parentElement: {
                        type: "showhide"
                    },
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined, 
                    showHideObj: {
                        element: {
                            type: "showhide",
                            contentUrn: "content1"
                        }
                    }     
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.23-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "wip",
                showHideStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    parentElement: {
                        type: "type"
                    },
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined, 
                    showHideObj: {
                        element: {
                            type: "showhide",
                            contentUrn: "content1"
                        }
                    }     
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.24-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    asideData: {
                        parent: {
                            type: "poetry"
                        }
                    },
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined,      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.25-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: {
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },      
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
        it('Test-5.26-Function--5--checkContainerElementVersion', () => {
            let versionStatus = {
                parentStatus: "approved"
            },
                currentSlateData = {
                    status: "approved",
                    contentUrn: "content1",
                    popupSlateData:{
                        status:"approved"
                    }
                }, parentElement = {
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
    });
    xdescribe('Test-22-Function--22--popupWipData', () => {
        const { slate1, slate2 } = tcmTestData
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
        let bodymatter1 = slate1[manifest1].contents.bodymatter,
            bodymatter2 = slate2[manifest2].contents.bodymatter;
        it('Test-22.1-Function--22--popupWipData', () => {
                let bodymatter = bodymatter2
                let eleIndex = [0, 1, 2, 3, 4]
                let operationType = "delet"
                let wipData = {}
                const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
                tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);
        
            })
        it('Test-22.2-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1]
            let operationType = "delet"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);
      
        })
        it('Test-22.3-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1, 2]
            let operationType = "delet"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);

        })
        xit('Test-22.4-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [3, 0, 2, 4]
            let operationType = "delet"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);

        })
        xit('Test-22.5-Function-22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1, 2, 3, 4]
            let operationType = "delete"
            let wipData = {}
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);
        })
        xit('Test-22.6-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1]
            let operationType = "delete"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);

        })
    })

    describe('Test-16-Function--tcmSnapshotsOnDefaultSlate', () => {
        xit('Test-16.1-Function--tcmSnapshotsOnDefaultSlate', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    type: "element-aside",
                    interactivedata: {
                        show: [
                            {
                                type: "element-aside"
                            }
                        ]
                    },
                    elementdata: {
                        bodymatter: [
                            {
                                type: "manifest",
                                contents: {
                                    bodymatter: [
                                        {
                                            type: "popup",
                                            popupdata: {
                                                'formatted-title': "formattedTitle"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
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
            let containerElement = {
                cutCopyParentUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f"
            }
            
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);
        })
        xit('Test-16.2-Function--tcmSnapshotsOnDefaultSlate', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    type: "element-aside",
                    interactivedata: {
                        show: [
                            {
                                type: "element-aside"
                            }
                        ]
                    },
                    elementdata: {
                        bodymatter: [
                            {
                                type: "manifest",
                                contents: {
                                    bodymatter: [
                                        {
                                            type: "popup",
                                            popupdata: {
                                                'formatted-title': "formattedTitle"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
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
            let containerElement = {
                asideData: {
                    parent: {
                        source: "fromCutCopy"
                    }
                }
            }
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);
        
        })
        xit('Test-16.3-Function--tcmSnapshotsOnDefaultSlate', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    type: "element-aside",
                    interactivedata: {
                        show: [
                            {
                                type: "element-aside"
                            }
                        ]
                    },
                    elementdata: {
                        bodymatter: [
                            {
                                type: "manifest",
                                contents: {
                                    bodymatter: [
                                        {
                                            type: "popup",
                                            popupdata: {
                                                'formatted-title': "formattedTitle"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
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
            let containerElement = {
                asideData: {
                    parent: {
                        source: "different"
                    }
                },
                parentUrn: {
                    elementType: "group"
                }
            }
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, "copy");

        })
        xit('Test-16.4-Function--tcmSnapshotsOnDefaultSlate', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    type: "element-aside",
                    interactivedata: {
                        show: [
                            {
                                type: "element-aside"
                            }
                        ]
                    },
                    elementdata: {
                        bodymatter: [
                            {
                                type: "popup",
                                contents: {
                                    bodymatter: [
                                        {
                                            type: "popup",
                                            popupdata: {
                                                'formatted-title': "formattedTitle"
                                            }
                                        }
                                    ]
                                },
                                popupdata: {
                                    'formatted-title': "formattedTitle"
                                }
                            }
                        ]
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
            let containerElement = {
                asideData: {
                    parent: {
                        source: "different"
                    }
                },
                parentUrn: {
                    elementType: "group"
                }
            }
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, "copy");
        })
        xit('Test-16.5-Function--tcmSnapshotsOnDefaultSlate', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    type: "citations",
                    interactivedata: {
                        show: [
                            {
                                type: "element-aside"
                            }
                        ]
                    },
                    elementdata: {
                        bodymatter: [
                            {
                                type: "manifest",
                                contents: {
                                    bodymatter: [
                                        {
                                            type: "popup",
                                            popupdata: {
                                                'formatted-title': "formattedTitle"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    contents: {
                        bodymatter: [
                            {
                                id: 1
                            }
                        ]
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
            let containerElement = {
                asideData: {
                    parent: {
                        source: "fromCutCopy"
                    }
                },
                showHideObj: {
                    currentElement: {
                        type: "element-aside"
                    }
                },
                sectionType: "section"
            }
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);
        
        })
    })

    describe('Test-17-Function--tcmSnapshotsInContainerElements', () => {
        xit('Test-17.1-Function--tcmSnapshotsInContainerElements', () => {
            let containerElement = {
                showHideObj: {
                    currentElement: {
                        type: "citations",
                        contents: {
                            bodymatter: [
                                {
                                    
                                }
                            ]
                        }
                    }
                }
            }
            let snapshotsData = {
                elementId: {
                    childId: "urn:pearson:work:as242342asd3:32sf43sdd"
                },
                tag: {
                    parentTag: "SH",
                    childTag : "P"
                },
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                },
                wipData: {
                    type: "citations"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
            tcmSnapshotUtility.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
            expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);
        
        })
        xit('Test-17.2-Function--tcmSnapshotsInContainerElements', () => {
            let containerElement = {
                showHideObj: {
                    currentElement: {
                        type: "citations",
                        contents: {
                            bodymatter: [
                                {
                                    
                                }
                            ]
                        }
                    }
                }
            }
            let snapshotsData = {
                elementId: {
                    childId: "urn:pearson:work:as242342asd3:32sf43sdd"
                },
                tag: {
                    parentTag: "SH",
                    childTag : "P"
                },
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                },
                wipData: {
                    type: "else case"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
            tcmSnapshotUtility.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
            expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);
        
        })
        xit('Test-17.3-Function--tcmSnapshotsInContainerElements', () => {
            let containerElement = {
                showHideObj: {
                    containerinSH: {

                    }
                },
                asideData: {
                    parent: {
                        type: "showhide"
                    },
                    element: {
                        type: "element-aside"
                    },
                    figureIn2cAside: {
                        isExist: true,
                        asideData: {
                            type: "element-aside",
                            subtype: "workedexample",
                            element: {
                                elementdata: {
                                    bodymatter: [
                                        {
                                            id: 1
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
            let snapshotsData = {
                elementId: {
                    childId: "urn:pearson:work:as242342asd3:32sf43sdd"
                },
                tag: {
                    parentTag: "SH",
                    childTag : "P"
                },
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                },
                wipData: {
                    type: "citations"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
            tcmSnapshotUtility.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
            expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);
        })

    })

    describe('Test-18-Function--prepareSnaphotPoetry', () => {
        xit('Test-18.1-Function--prepareSnaphotPoetry', () => {
            let containerElement =  {
                asideData: {
                    grandParent: {
                        asideData: {
                            parent: {
                                type: "showhide"
                            }
                        },
                        parentUrn: {
                            manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                        }
                    }
                }
            }
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareSnaphotPoetry');
            tcmSnapshotUtility.prepareSnaphotPoetry(containerElement, {}, 0, {});
            expect(spyFunction).toHaveBeenCalledWith(containerElement, {}, 0, {});
        })

    })

    xdescribe('Test-19-Function--tcmSnapshotsForUpdate', () => {
        xit('Test-19.1-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = true;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "showhide"
                }
            };
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.2-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "showhide"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.3-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "poetry"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.4-Function-tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.5-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.6-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9c',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {}
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.7-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9c',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {},
                  poetrylines: 2
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb'
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.8-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9c',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {},
                  type: "figure"
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                figureData: {
                    type: "type1"
                }
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.9-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9c',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {},
                  type: "element-assessment"
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                figureData: {
                    type: "type1"
                }
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
        it('Test-19.9-Function--tcmSnapshotsForUpdate', () => {
            config.isPopupSlate = false;
            let elementUpdateData = {
                CurrentSlateStatus: 'wip',
                currentParentData: { 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7': {} },
                response: {
                  id: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9c',
                  type: 'element-authoredtext',
                  schema: 'http://schemas.pearson.com/wip-authoring/element/1',
                  elementdata: {},
                  html: {},
                  type: "figure"
                },
                slateManifestUrn: 'urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7',
                updateBodymatter: [ {} ],
                updatedId: 'urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb',
                figureData: {}
            };
            let containerElement = {
                asideData: {
                    type: "else case"
                },
                metaDataField: "formattedTitle",
                parentElement: {
                    type: "popup"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(elementUpdateData, 0, containerElement);
            expect(spyFunction).toHaveBeenCalledWith(elementUpdateData, 0, containerElement);

        })
    })

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

    xdescribe('Test-6-Function--6--fetchManifestStatus', () => {
        const { slate1, slate2 } = tcmTestData
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
        let bodymatter1 = slate1[manifest1].contents.bodymatter,
            bodymatter2 = slate2[manifest2].contents.bodymatter;
        it('Test-6.1-Function--6--fetchManifestStatus - No Bodymatter', () => {
            let bodymatter = [], parentElement = {}, type = "element-authoredtext"
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
        it('Test-6.2-Function--6--fetchManifestStatus - Create Section-Break', () => {
            let bodymatter = bodymatter1, type = "SECTION_BREAK", parentElement = {
                asideData: {
                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
        it('Test-6.3-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    id: "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "group",
                    columnIndex: "0"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
        })
        it('Test-6.4-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    id: "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "manifest",
                    columnIndex: "0"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
        })
        it('Test-6.5-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    id: "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "popup",
                    columnIndex: "0"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
        })
        it('Test-6.6-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    id: "urn:pearson:work:09d00b1e-66a1-406e-b04f-0612d2d2dcdc"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "element-aside",
                    columnIndex: "0"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
        })
        it('Test-6.7-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    element: {
                        elementdata: {
                            bodymatter: [
                                {
                                    id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                                    status: "different"
                                }
                        ]
                        }
                    },
                    parent: {
                        type: "groupedcontent",
                        id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e"
                    }
                    
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "element-aside",
                    columnIndex: "0"
                },
                poetryData: {}, 
                showHideObj: {
                    showHideType: {}
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, containerElement, type);
        })
        it('Test-6.8-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    element: {
                        elementdata: {
                            bodymatter: [
                                {
                                    id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                                    status: "different"
                                }
                        ]
                        }
                    },
                    parent: {
                        type: "groupedcontent",
                        id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e"
                    },
                    type: "groupedcontent"
                    
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "element-aside",
                    columnIndex: "0",
                    multiColumnDetails: {
                        type: "type1",
                        manifestUrn: "manifest1",
                        columnName: "column1",
                        contentUrn: "content1",
                        mcId: "type2"
                    }
                },
                poetryData: {}, 
                showHideObj: {
                    showHideType: "type1"
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, containerElement, type);
        })
        it('Test-6.9-Function--6--fetchManifestStatus', () => {
            let bodymatter = bodymatter2, type = "element-citation", containerElement = {
                asideData: {
                    element: {
                        elementdata: {
                            bodymatter: [
                                {
                                    id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e",
                                    status: "different"
                                }
                        ]
                        }
                    },
                    parent: {
                        type: "groupedcontent",
                        id: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e"
                    }
                    
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5",
                    elementType: "element-aside",
                    columnIndex: "0"
                },
                poetryData: {}, 
                showHideObj: {
                    showHideType: {}
                }
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, containerElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, containerElement, type);
        })
    });
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
        xit('tcmSnapshotsForUpdate', () => {
            let update = {
                "CurrentSlateStatus": "wip",
                "currentParentData": {
                    "urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7": {}
                },
                "response": {
                    id: "urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", elementdata: {}, html: {}
                },
                "slateManifestUrn": "urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7",
                "updateBodymatter":[{}],
                "updatedId": "urn:pearson:work:d95c23b0-f7b8-4fab-8979-5d00125bf9cb"
            }
            let index = 0;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForUpdate');
            tcmSnapshotUtility.tcmSnapshotsForUpdate(update,index);
            expect(spyFunction).toHaveBeenCalledWith(update,index);
        })
        xit('tcmSnapshotsForCreate', () => {
            let update = { bodymatter : {},
            currentParentData: {"urn:pearson:manifest:21bcd0e7-b4f9-48ae-938a-2e144d461df7": {}},
            response: {id: "urn:pearson:work:1ebb31ac-8468-4d4c-b6ae-59fd69709870", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1", elementdata: {}, html: {}}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForCreate');
            tcmSnapshotUtility.tcmSnapshotsForCreate(update,"TEXT");
            expect(spyFunction).toHaveBeenCalledWith(update,"TEXT");
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
        // it('tcmSnapshotsOnDefaultSlate - versioning delete case', () => {
        //     config.isPopupSlate = true;
        //     const actionStatus = {
        //         action:"create",
        //         status:"accepted",
        //         fromWhere:"create"
        //     }
        //     const snapshotsData = {
        //         wipData: {
        //             id: "urn:pearson:work:3525235-324323-4432sfe31"
        //         },
        //         slateManifestVersioning : {},
        //         popupInContainer: null,
        //         actionStatus,
        //         tag: 'P',
        //         elementId: "urn:pearson:work:3525235-324323-4432sfe31"
        //     }
            
        //     config.isPopupSlate=false;
        //     const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsOnDefaultSlate');
        //     tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, {}, null, true, {}, 1, false);
        //     expect(spyFunction).toHaveBeenCalledWith(snapshotsData, null, {}, null, true, {}, 1, false);
        // })
        xit('tcmSnapshotsOnDefaultSlate - showhide case', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: showHide,
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: {},
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                }
            }
            
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsOnDefaultSlate');
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, {}, null, true, {}, 1, false);
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, null, {}, null, true, {}, 1, false);
        })
        xit('tcmSnapshotsOnDefaultSlate - poetry_element case', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: poetryElem,
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: {},
                elementId: {
                    parentId: "urn:pearson:work:3525235-324323-4432sfe31"
                }
            }
            config.isPopupSlate=false;
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, null, {}, null, true, {}, 1, false);
        
        })
        xit('tcmSnapshotsInContainerElements - versioning delete case', () => {
            config.isPopupSlate = true;
            const actionStatus = {
                action:"create",
                status:"accepted",
                fromWhere:"create"
            }
            const snapshotsData = {
                wipData: {
                    id: "urn:pearson:work:3525235-324323-4432sfe31"
                },
                slateManifestVersioning : {},
                popupInContainer: null,
                actionStatus,
                tag: { childTag: 'P' },
                elementId: { parentId : "" }
            }
            config.isPopupSlate=false;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
            tcmSnapshotUtility.tcmSnapshotsInContainerElements(snapshotsData, snapshotsData, {}, true, {}, false);
            expect(spyFunction).toHaveBeenCalledWith(snapshotsData, snapshotsData, {}, true, {}, false);
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
         
        // it('tcmSnapshotsElementsInPopupInContainer', async () => {
        //     config.isPopupSlate = true;
        //     const actionStatus = {
        //         action:"delete",
        //         status:"accepted",
        //         fromWhere:"delete"
        //     }
        //     const snapshotsData = {
        //         wipData: {
        //             id: "urn:pearson:work:3525235-324323-4432sfe31",
        //             popupdata: {
        //                 "formatted-title": {
        //                     "id": "urn:pearson:work:123"
        //                 },
        //                 bodymatter: [
        //                     {
        //                         id: "urn:pearson:work:123",
        //                         type: "element-authoredtext"
        //                     }
        //                 ]
        //             }
        //         },
        //         slateManifestVersioning : {},
        //         popupInContainer: null,
        //         actionStatus,
        //         tag: { childTag: 'P' },
        //         elementId: { parentId : "" }
        //     }
        //     const containerElement = {
        //         parentElement: {
        //             id: "urn:pearson:work:112231-sf3412412-141fwf3412e2"
        //         },
        //         sectionType: "postertextobject"
        //     }
        //     config.isPopupSlate=false;
        //     const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsElementsInPopupInContainer');
        //     tcmSnapshotUtility.tcmSnapshotsElementsInPopupInContainer(snapshotsData, actionStatus, containerElement, 'popup', false, {});
        //     expect(spyFunction).toHaveBeenCalledWith(snapshotsData, actionStatus, containerElement, 'popup', false, {});
        // })
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
                elementType : "SH:Action Button Label",
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
            metaDataField: {},
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
    });
    describe('Test - 9 tcmSnapshotsInContainerElements ', () => {
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
            metaDataField: {},
            sectionType: "",
            parentElement: {},
            asideData: { figureIn2cAside: { 
                isExist: true, asideData: { 
                    type: "element-aside", subtype: "workedexample",
                    element: {elementdata: {bodymatter:[{ id: "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f" }]}}
                }
            }}
        }, index = 0, operationType = null;
        // it('Test-9.1- if(isExist) ', () => {
        //     const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
        //     tcmSnapshotUtility.tcmSnapshotsInContainerElements(containerElement, snapshotsData, defaultKeys,index,"", operationType);
        //     expect(spyFunction).toHaveBeenCalled();
        // })
        // it('Test-9.2- else(asideFigObj?.type === ELEMENT_ASIDE) ', () => {
        //     containerElement.asideData = { figureIn2cAside: { 
        //         isExist: true, asideData: { 
        //             type: "element-aside", subtype: "sidebar1",
        //             element: {elementdata: {bodymatter:[{ id: "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f" }]}}
        //         }
        //     }}
        //     const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsInContainerElements');
        //     tcmSnapshotUtility.tcmSnapshotsInContainerElements(containerElement, snapshotsData, defaultKeys,index,"", operationType);
        //     expect(spyFunction).toHaveBeenCalled();
        // })
    });
    describe('Test-10 - prepareElementSnapshots functions', () => {
        it('Test - 10.1 - if (element?.type === ELEMENT_TYPE_PDF)', async () => {
            const element = {id: "123", type: "element-pdf",
                elementdata: { filetitle: "title", assetid: "ai-1234"}},
                actionStatus = {action: "update"},
                index = 0, elementDetails = {}, CurrentSlateStatus = {};
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
    describe('Test-11 - prepareSnapshots_ShowHide functions', () => {
        xit('Test - 11.1 ', () => {
           let wipData = {
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
            containerElement = { 
                sectionType: "show",
                parentElement: {},
                asideData: { grandParent: { asideData: {}, parentUrn: {}} }
            }, index = 0;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareSnapshots_ShowHide');
            tcmSnapshotUtility.prepareSnapshots_ShowHide(containerElement, wipData, index,"");
            expect(spyFunction).toHaveBeenCalled();
        })
    })
    describe('Test-12 - tcmSnapshotsOnDefaultSlate functions', () => {
        xit('Test - 12.1 tcmSnapshotsMultiColumn  if()', () => {
           let snapshotsData = {
            "tag":{ "parentTag":"POP" },
            "wipData":{
                "id":"urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f",
                "type":"groupedcontent",
                "contentUrn":"urn:pearson:entity:5e2a5892-b71c-4e6c-83c6-ae3863fae832",
                "groupeddata":{
                    "bodymatter":[{ groupdata: {bodymatter: [{
                        "id":"urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67211",
                        "status":"wip",
                        type: "showhide",
                        "postertextobject":[{
                            "id":"urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
                            "status":"wip"
                        }]
                    },{
                        "id":"urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67213",
                        type: "element-aside",
                        "elementdata":{ bodymatter: [{
                            "id":"urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
                            "status":"wip"
                        }]}
                    }]}
                    }]
                }
            },
            "elementId":{ "parentId":"urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f" },
            "actionStatus":{
                "action":"create",
                "status":"pending",
                "fromWhere":"create"
            }
        },
        defaultKeys = {action: 'create'},
        containerElement = {}, index = 0, operationType = null;
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsOnDefaultSlate');
            tcmSnapshotUtility.tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, "groupedcontent",index, "",operationType);
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

    describe('Test-24#1 - tcmSnapshotsForCreate functions', () => {
        xit('14.1 - tcmSnapshotsForCreate', () => {
            config.isPopupSlate = true;
            let elementCreateData = {
                response: {
                    figure: "different"
                }
            }
            let dispatch = jest.fn();
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'tcmSnapshotsForCreate');
            tcmSnapshotUtility.tcmSnapshotsForCreate({}, "", {}, dispatch, 0, "cut");
            // expect(spyFunction).toHaveBeenCalled();

        })
    })

    describe('containerSnapshotsInShowhide',()=>{
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
        xit('containerSnapshotsInShowhide if element type is not citations', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'containerSnapshotsInShowhide');
            tcmSnapshotUtility.containerSnapshotsInShowhide(snapshotsData, 1, {}, actionStatus,{type:'test'},'abc');
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
describe('Function--prepareParentData', () => {
    let asideData={}
    let parentUrn={
        multiColumnDetails:{
            type:'', manifestUrn:"", columnName:'', contentUrn:'', mcId:''
        }
    }
    it('prepareParentData if condition', () => {
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareParentData');
        tcmSnapshotUtility.prepareParentData(asideData,parentUrn);
        expect(spyFunction).toHaveBeenCalledWith(asideData,parentUrn);
    })
    it('prepareParentData else condition', () => {
        let parentUrn1={}
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareParentData');
        tcmSnapshotUtility.prepareParentData(asideData,parentUrn1);
        expect(spyFunction).toHaveBeenCalledWith(asideData,parentUrn1);
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
    let containerElement ={poetryData:''}
    it("checkParentData",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkParentData');
        tcmSnapshotUtility.checkParentData(containerElement);
        expect(spyFunction).toHaveBeenCalledWith(containerElement);
    })
})
describe("setDefaultKeys funtion",()=>{
    config.tcmStatus=true
    let actionStatus={}, isContainer={}, inPopupSlate={}, slatePopupManifestUrn={}, cutCopyParentUrn={}
    it("setDefaultKeys",()=>{
        const spyFunction = jest.spyOn(tcmSnapshotUtility, 'setDefaultKeys');
        tcmSnapshotUtility.setDefaultKeys(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn);
        expect(spyFunction).toHaveBeenCalledWith(actionStatus, isContainer, inPopupSlate, slatePopupManifestUrn, cutCopyParentUrn);
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
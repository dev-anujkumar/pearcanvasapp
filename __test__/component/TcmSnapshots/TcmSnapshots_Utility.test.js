import * as tcmSnapshotUtility from '../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';
import config from '../../../src/config/config.js';
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
            let aside = slate1[manifest1].contents.bodymatter[2].elementdata.bodymatter[1];
             const spyFunction = jest.spyOn(tcmSnapshotUtility, 'prepareTcmSnapshots');
             tcmSnapshotUtility.prepareTcmSnapshots(aside,actionStatus,asideContainer,"SECTION_BREAK","");
             expect(spyFunction).toHaveBeenCalledWith(aside, actionStatus,asideContainer,"SECTION_BREAK","");
         })
    });
    describe('Test-3-Function--3--fetchElementWipData', () => {
        const { slate1, slate2 } = tcmTestData
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
        let bodymatter1 = slate1[manifest1].contents.bodymatter,
            bodymatter2 = slate2[manifest2].contents.bodymatter;

        it('Test-3.1-Function--3--fetchElementWipData - Paragraph in Slate', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, 0, 'element-authoredtext')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 0, 'element-authoredtext')
        })
        it('Test-3.2-Function--3--fetchElementWipData - Section-Break', () => {
            let entityUrn = "urn:pearson:entity:4e42d3a8-f794-4977-9e13-b1e76431d8bf"
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, ["2"], 'element-aside', entityUrn)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2"], 'element-aside', entityUrn)
        })
        it('Test-3.3-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "2-3-0", 'stanza')

        })
        it('Test-3.4-Function--3--fetchElementWipData - Element-Citation', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "1-1", 'element-citation')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "1-1", 'element-citation')

        })
        it('Test-3.5-Function--3--fetchElementWipData - BQ in WE-Body', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter1, "2-1-0", 'element-blockfeature')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "2-1-0", 'element-blockfeature')

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
    });
    describe('Test-4-Function--4--fetchParentData', () => {
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb";
        let bodymatter1 = tcmTestData.slate1[manifest1].contents.bodymatter;
        it('Test-4.1-Function--4--fetchParentData - Paragraph in Aside', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["1", "0"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["1", "0"])
        })
        it('Test-4.2-Function--4--fetchParentData - Aside', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, 1)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 1)
        })
        it('Test-4.3-Function--4--fetchParentData - WE with Section-Break', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchParentData');
            tcmSnapshotUtility.fetchParentData(bodymatter1, ["2", "1", "1"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1"])
        })
    });
    describe('Test-5-Function--5--checkContainerElementVersion', () => {
        it('Test-5.1-Function--5--checkContainerElementVersion - parentStatus !== "approved"', () => {
            let versionStatus = {
                parentStatus: "wip"
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
                    contentUrn: "content1"
                }, parentElement = {
                    asideData: undefined,
                    parentUrn: {
                        manifestUrn: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0",
                        contentUrn: "urn:pearson:entity:24209527-f5e8-419a-8c80-9b9e56c66f91"
                    },
                    poetryData: undefined
                }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'checkContainerElementVersion');
            tcmSnapshotUtility.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
            expect(spyFunction).toHaveBeenCalledWith(parentElement, versionStatus, currentSlateData);

        })
    });
    describe('Test-6-Function--6--fetchManifestStatus', () => {
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
        it('Test-6.3-Function--6--fetchManifestStatus - In WE-HEAD | Aside | Citations', () => {
            let bodymatter = bodymatter2, type = "element-citation", parentElement = {
                asideData: {},
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:8d910f79-780b-46b2-8762-f6d0b5f593e5"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
        it('Test-6.4-Function--6--fetchManifestStatus - In Section-Break', () => {
            let bodymatter = bodymatter1, type = "element-authoredtext", parentElement = {
                asideData: {
                    id: "urn:pearson:manifest:7d788d17-fc4e-4cf5-8581-8f6d1ee971f0"
                },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:a4100af0-6143-41ed-82a4-33012dd5f134"
                },
                poetryData: {}
            }
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
        it('Test-6.5-Function--6--fetchManifestStatus - In Poetry', () => {
            let bodymatter = bodymatter2, parentElement = {
                asideData: {},
                parentUrn: {},
                poetryData: {
                    parentUrn: "urn:pearson:manifest:d8666a10-dffd-4b16-ab75-ec714a3fc3a6"
                }
            }, type = "stanza"
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchManifestStatus');
            tcmSnapshotUtility.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
    });
})
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
    })
})
/**************************Import Modules**************************/
import config from '../../../src/config/config';
import * as externalLO_actions from '../../../src/component/ElementMetaDataAnchor/ExternalLO_helpers';
/*************************Import Constants*************************/
import testData from '../../../fixtures/ElementMetadataAnchorTestData';

describe('-----------------Testing ExternalLO_helpers-----------------', () => {
    describe('Test-1----------------- getMetadataAnchorLORef-----------------', () => {
        it('Test-1.1---getMetadataAnchorLORef - on Popup Slate', () => {
            config.tempSlateManifestURN = "urn:pearson:manifest:3894919a-4206-4f95-ac3e-3c2d9352e7c8"
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = true
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: { ...testData.slateLevelData_1_MainSlate, ...testData.slateLevelData_1_PopupSlate },
                    },
                    metadataReducer: {
                        currentSlateLOData: testData.currentSlateLOs_1
                    }
                };
            }
            let dispatch = jest.fn()
            let loUrnToLink = "urn:pearson:educationalgoal:a1917eb5-bafa-422e-9194-6076990b05b5";
            let result = externalLO_actions.getMetadataAnchorLORef()(dispatch, getState);
            expect(result).toBe(loUrnToLink);
        });
        it('Test-1.2---getMetadataAnchorLORef - on Normal Slate', () => {
            config.tempSlateManifestURN = null
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = false
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: { ...testData.slateLevelData_1_MainSlate, ...testData.slateLevelData_1_PopupSlate },
                    },
                    metadataReducer: {
                        currentSlateLOData: testData.currentSlateLOs_1
                    }
                };
            }
            let dispatch = jest.fn()
            let loUrnToLink = "urn:pearson:educationalgoal:a1917eb5-bafa-422e-9194-6076990b05b5";
            let result = externalLO_actions.getMetadataAnchorLORef()(dispatch, getState);
            expect(result).toBe(loUrnToLink);
        });
        it('Test-1.3---getMetadataAnchorLORef - on Popup Slate with repetition', () => {
            config.tempSlateManifestURN = "urn:pearson:manifest:3894919a-4206-4f95-ac3e-3c2d9352e7c8"
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = true
            let getState = () => {
                return {
                    appStore: {
                        slateLevelData: {
                            ...testData.slateLevelData_1_MainSlate,
                            ...testData.slateLevelData_2_PopupSlate
                        }

                    },
                    metadataReducer: {
                        currentSlateLOData: testData.currentSlateLOs_1
                    }
                };
            }
            let dispatch = jest.fn()
            let loUrnToLink = "urn:pearson:educationalgoal:a1917eb5-bafa-422e-9194-6076990b05b5";
            let result = externalLO_actions.getMetadataAnchorLORef()(dispatch, getState);
            expect(result).toBe(loUrnToLink);
        });
    });
    describe('Test-2----------------- prepareLODataForUpdate-----------------', () => {
        it('Test-2.1---prepareLODataForUpdate', () => {
            config.tempSlateManifestURN = null
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = false
            let message = {
                LO_Link_Status: true,
                LO_UnLink_Status: true,
                currentSlateLF: "externalLF",
                loLinked: [{
                    id: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528",
                    label: { en: "Some test inside " },
                    loUrn: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                }],
                loListLength: 4,
                loUnlinked: [testData.currentSlateLOs_1[3]],
                statusForExtLOSave: true,
                toastData: "Learning Objective(s) updated.",
            }
            let expectedResult = [{ "elementVersionType": "element-learningobjectivemapping", "elementdata": { "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528" }, "loIndex": ["1-0"], "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b80"], "slateVersionUrn": "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd" }]
            let slateLevelData = testData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"]
            let result = externalLO_actions.prepareLODataForUpdate(slateLevelData.contents.bodymatter, message);
            expect(result).toEqual(expectedResult);
        });
        it('Test-2.2---prepareLODataForUpdate', () => {
            config.tempSlateManifestURN = null
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = false
            let message = {
                LO_Link_Status: true,
                LO_UnLink_Status: true,
                currentSlateLF: "externalLF",
                loLinked: [{
                    id: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528",
                    label: { en: "Some test inside " },
                    loUrn: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                }],
                loListLength: 4,
                loUnlinked: [testData.currentSlateLOs_1[3]],
                statusForExtLOSave: true,
                toastData: "Learning Objective(s) updated.",
            }
            let expectedResult = [{
                elementdata:
                {
                    loref:
                        'urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528'
                },
                metaDataAnchorID: ['urn:pearson:work:f5beefb3-0042-4eba-a799-1af59546fa30'],
                elementVersionType: 'element-learningobjectivemapping',
                loIndex: [1],
                slateVersionUrn: 'urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd'
            }]
            let slateBodymatter = [testData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"].contents.bodymatter]
            slateBodymatter.push({
                contentUrn: "urn:pearson:entity:74fc4597-96d1-4528-ae3f-f45557a081c1",
                elementdata: { loref: "" },
                html: { text: "<p class='paragraphNumeroUno'><br></p>", footnotes: {}, assetsPopover: {}, glossaryentries: {} },
                id: "urn:pearson:work:f5beefb3-0042-4eba-a799-1af59546fa30",
                schema: "http://schemas.pearson.com/wip-authoring/element/1",
                type: "element-learningobjectivemapping",
                versionUrn: "urn:pearson:work:f5beefb3-0042-4eba-a799-1af59546fa30"
            })
            let result = externalLO_actions.prepareLODataForUpdate(slateBodymatter, message)
            expect(result).toEqual(expectedResult);
        });
    })
    describe('Test-3----------------- setCurrentSlateLOs-----------------', () => {
        it('Test-3.1---setCurrentSlateLOs', () => {
            config.tempSlateManifestURN = null
            config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"
            config.isPopupSlate = false
            let existingSlateLOs = testData.currentSlateLOs_1,
                unlinkedLOs = [testData.currentSlateLOs_1[3]],
                linkedLOs = [{
                    id: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528",
                    label: { en: "Some test inside " },
                    loUrn: "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                }]
            let expectedResult = [{
                alignmentDtTm: '2021-04-12T20:34:24.546Z',
                alignmentType: 'instructs',
                label: { en: 'Construct and Solve Quadratic Equation' },
                loUrn:
                    'urn:pearson:educationalgoal:a1917eb5-bafa-422e-9194-6076990b05b5',
                subject: 'https://schema.pearson.com/ns/domains/mathematics',
                id:
                    'urn:pearson:educationalgoal:a1917eb5-bafa-422e-9194-6076990b05b5'
            },
            {
                alignmentDtTm: '2021-04-12T20:34:24.526Z',
                alignmentType: 'instructs',
                label: { en: ' Sub-Topic Test for Willow.' },
                loUrn:
                    'urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7',
                subject: 'https://schema.pearson.com/ns/domains/mathematics',
                id:
                    'urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7'
            },
            {
                alignmentDtTm: '2021-04-12T20:34:24.518Z',
                alignmentType: 'instructs',
                label: { en: 'Construct and Solve Linear Equation' },
                loUrn:
                    'urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f',
                subject: 'https://schema.pearson.com/ns/domains/mathematics',
                id:
                    'urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f'
            },
            {
                id:
                    'urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528',
                label: { en: 'Some test inside ' },
                loUrn:
                    'urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528'
            }]
            let result = externalLO_actions.setCurrentSlateLOs(existingSlateLOs, unlinkedLOs, linkedLOs);
            expect(result).toEqual(expectedResult);
        });
    })
})
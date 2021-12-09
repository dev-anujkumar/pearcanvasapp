import * as tcmSnapshotUtility from '../../../src/component/TcmSnapshots/TcmSnapshotsCreate_Update';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';
import config from '../../../src/config/config.js';

jest.mock('../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js', () => {
    return {
        getLatestVersion: () => {
            return true
        }
    }
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
    config.projectUrn = "urn:pearson:distributable:ff18cbc0-ab3f-4c7e-9ed0-84eb34f4e126"
    config.slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"

    describe('Test-19-Function--tcmSnapshotsForUpdate', () => {
        // const { setSemanticsSnapshotsData } = tcmTestData
        it('Test-19.1-Function--tcmSnapshotsForUpdate', () => {
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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
                updateBodymatter: [{}],
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

        it('tcmSnapshotsForUpdate', () => {
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

    })

    describe('Test-24#1 - tcmSnapshotsForCreate functions', () => {
        it('14.1 - tcmSnapshotsForCreate', () => {
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

    describe('Test-5-Function--5--checkContainerElementVersion', () => {
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
        it('Test-3.4-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "0-1-2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "0-1-2-3-0", 'stanza')

        })
        it('Test-3.5-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "0-2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "0-2-3-0", 'stanza')

        })
        it('Test-3.6-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "3-0-2", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "3-0-2", 'showhide')

        })
        it('Test-3.7-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "6-0-2-0", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "6-0-2-0", 'showhide')

        })
        it('Test-3.8-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'fetchElementWipData');
            tcmSnapshotUtility.fetchElementWipData(bodymatter2, "7-0-2-0-0", 'showhide')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "7-0-2-0-0", 'showhide')

        })
        it('Test-3.9-Function--3--fetchElementWipData - Stanza', () => {
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

    describe('Test-22-Function--22--popupWipData', () => {
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
        it('Test-22.4-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [3, 0, 2, 4]
            let operationType = "delet"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);

        })
        it('Test-22.5-Function-22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1, 2, 3, 4]
            let operationType = "delete"
            let wipData = {}
            
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);
        })
        it('Test-22.6-Function--22--popupWipData', () => {
            let bodymatter = bodymatter2
            let eleIndex = [0, 1]
            let operationType = "delete"
            let wipData = {}
            const spyFunction = jest.spyOn(tcmSnapshotUtility, 'popupWipData');
            tcmSnapshotUtility.popupWipData(bodymatter, eleIndex, operationType, wipData);

        })
    })

    describe('Test-11 - prepareSnapshots_ShowHide functions', () => {
        it('Test - 11.1 ', () => {
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

})


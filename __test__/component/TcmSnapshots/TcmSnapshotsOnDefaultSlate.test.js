import * as tcmSnapshotsOnDefaultSlate from '../../../src/component/TcmSnapshots/TcmSnapshotsOnDefaultSlate';
import tcmTestData,{snapshotsData} from '../../../fixtures/tcmSnapshotTestData.js';
import config from '../../../src/config/config.js';
import { showHide } from '../../../fixtures/ElementSHowHideData.js';
import { poetryElem } from '../../../fixtures/ElementPoetryTestData.js';
import { MULTI_COLUMN } from '../../../src/constants/Element_Constants';

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

// describe('-----------------------Test TcmSnapshots_Utility Functions-----------------------', () => {
//     config.projectUrn = "urn:pearson:distributable:ff18cbc0-ab3f-4c7e-9ed0-84eb34f4e126"
//     config.slateManifestUrn = "urn:pearson:manifest:bca66109-2c69-4b1b-bea9-a057fd073d54"
// describe('Test-12 - tcmSnapshotsOnDefaultSlate functions', () => {
//     it('Test - 12.1 tcmSnapshotsMultiColumn  if()', () => {
//         let snapshotsData = {
//             "tag": { "parentTag": "POP" },
//             "wipData": {
//                 "interactivedata":{show:[{}]},
//                 "id": "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f",
//                 "type": "groupedcontent",
//                 "contentUrn": "urn:pearson:entity:5e2a5892-b71c-4e6c-83c6-ae3863fae832",
//                 "groupeddata": {
//                     "bodymatter": [{
//                         groupdata: {
//                             bodymatter: [{
//                                 "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67211",
//                                 "status": "wip",
//                                 type: "showhide",
//                                 "postertextobject": [{
//                                     "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
//                                     "status": "wip"
//                                 }]
//                             }, {
//                                 "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67213",
//                                 type: "element-aside",
//                                 "elementdata": {
//                                     bodymatter: [{
//                                         "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
//                                         "status": "wip"
//                                     }]
//                                 }
//                             }]
//                         }
//                     }]
//                 }
//             },
//             "elementId": { "parentId": "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f" },
//             "actionStatus": {
//                 "action": "create",
//                 "status": "pending",
//                 "fromWhere": "create"
//             }
//         },
//             defaultKeys = { action: 'create' },
//             containerElement = {}, index = 0, operationType = null;
//         const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
//         tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, "groupedcontent", index, "", operationType);
//         expect(spyFunction).toHaveBeenCalled();
//     })
// })

describe('Test-16-Function--tcmSnapshotsOnDefaultSlate', () => {
    it('Test-16.1-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
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
            slateManifestVersioning: {},
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

        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);
    })
    it('Test-16.2-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
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
            slateManifestVersioning: {},
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
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);

    })
    it('Test-16.3-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
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
            slateManifestVersioning: {},
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
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, "copy");

    })
    it('Test-16.4-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
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
            slateManifestVersioning: {},
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
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, "copy");
    })
    it('Test-16.5-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
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
            slateManifestVersioning: {},
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
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);

    })
    it('Test-16.5-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "delete",
            status: "accepted",
            fromWhere: "create"
        }
        const snapshotsData = {
            wipData: {
                type: "",
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
            slateManifestVersioning: {},
            popupInContainer: null,
            actionStatus,
            tag: {},
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            }
        }
        let containerElement = {
            showHideObj: {},
            sectionType: "section"
        }
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false);
    })
    it('Test-16.5-Function--tcmSnapshotsOnDefaultSlate', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "delete",
            status: "accepted",
            fromWhere: "create"
        }
        const snapshotsData = {
            wipData: {
                type: "",
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
            slateManifestVersioning: {},
            popupInContainer: null,
            actionStatus,
            tag: {},
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            }
        }
        let containerElement = {
            showHideObj: {},
            sectionType: "section"
        }
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, containerElement, null, true, {}, 1, false, 'check');
    })
})
describe('Test-4-Function--4--fetchParentData', () => {
    let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb";
    let bodymatter1 = tcmTestData.slate1[manifest1].contents.bodymatter;
    it('Test-4.1-Function--4--fetchParentData - Paragraph in Aside', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["1", "0"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["1", "0"])
    })
    it('Test-4.2-Function--4--fetchParentData - Aside', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, 1)
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 1)
    })
    it('Test-4.3-Function--4--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["4", "1", "1"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["4", "1", "1"])
    })
    it('Test-4.4-Function--4--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["5", "1", "1"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["5", "1", "1"])
    })
    it('Test-4.5-Function--4--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["2", "1", "1", "1"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1", "1"])
    })
    it('Test-4.6-Function--4--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["4", "1", "1", "1"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["4", "1", "1", "1"])
    })
    it('Test-4.7-Function--5--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["2", "1", "1", "1", "1"])
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1", "1", "1"])
    })
    it('Test-4.8-Function--4--fetchParentData', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'fetchParentData');
        tcmSnapshotsOnDefaultSlate.fetchParentData(bodymatter1, ["2", "1", "1"], {}, {type: 'figure'})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2", "1", "1"], {}, {type: 'figure'})
    })
});
describe('containerSnapshotsInShowhide', () => {
    const actionStatus = {
        action: "create",
        status: "accepted",
        fromWhere: "create"
    }
    const snapshotsData = {
        wipData: {
            type: "showhide",
            interactivedata: {
                show: [
                    { type: "element-aside" }
                ]
            },
            contents: {
                bodymatter: [{}]
            },
            elementdata: {
                bodymatter: [{}]
            }
        },
        slateManifestVersioning: {},
        popupInContainer: null,
        actionStatus,
        tag: {},
        elementId: {
            parentId: "urn:pearson:work:3525235-324323-4432sfe31"
        }
    }
    it('containerSnapshotsInShowhide if element type is not citations', () => {
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'containerSnapshotsInShowhide');
        tcmSnapshotsOnDefaultSlate.containerSnapshotsInShowhide(snapshotsData, 1, {}, actionStatus, { type: 'test' }, 'abc');
        expect(spyFunction).toHaveBeenCalled();
    })
})
// describe('Test-12 - tcmSnapshotsOnDefaultSlate functions', () => {
//     it('Test - 12.1 tcmSnapshotsMultiColumn  if()', () => {
//         let snapshotsData = {
//             "tag": { "parentTag": "POP" },
//             "wipData": {
//                 "id": "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f",
//                 "type": "groupedcontent",
//                 "contentUrn": "urn:pearson:entity:5e2a5892-b71c-4e6c-83c6-ae3863fae832",
//                 "groupeddata": {
//                     "bodymatter": [{
//                         groupdata: {
//                             bodymatter: [{
//                                 "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67211",
//                                 "status": "wip",
//                                 type: "showhide",
//                                 "postertextobject": [{
//                                     "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
//                                     "status": "wip"
//                                 }]
//                             }, {
//                                 "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67213",
//                                 type: "element-aside",
//                                 "elementdata": {
//                                     bodymatter: [{
//                                         "id": "urn:pearson:work:cb96c333-af60-47da-98d8-dff609e67214",
//                                         "status": "wip"
//                                     }]
//                                 }
//                             }]
//                         }
//                     }]
//                 }
//             },
//             "elementId": { "parentId": "urn:pearson:manifest:b7aca87b-cf1e-4677-8942-4ad00e5bfe1f" },
//             "actionStatus": {
//                 "action": "create",
//                 "status": "pending",
//                 "fromWhere": "create"
//             }
//         },
//             defaultKeys = { action: 'create' },
//             containerElement = {}, index = 0, operationType = null;
//         const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
//         tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, defaultKeys, containerElement, "groupedcontent", index, "", operationType);
//         expect(spyFunction).toHaveBeenCalled();
//     })
// })
describe('Test-17-Function--tcmSnapshotsInContainerElements', () => {
    it('Test-17.1-Function--tcmSnapshotsInContainerElements', () => {
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
                childTag: "P"
            },
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            },
            wipData: {
                type: "citations"
            }
        }
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
        expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);

    })
    it('Test-17.2-Function--tcmSnapshotsInContainerElements', () => {
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
                childTag: "P"
            },
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            },
            wipData: {
                type: "else case"
            }
        }
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
        expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);

    })
    it('Test-17.3-Function--tcmSnapshotsInContainerElements', () => {
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
                childTag: "P"
            },
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            },
            wipData: {
                type: "citations"
            }
        }
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsInContainerElements(containerElement, snapshotsData, {}, 0, true, null);
        expect(spyFunction).toHaveBeenCalledWith(containerElement, snapshotsData, {}, 0, true, null);
    })
})
describe("11", () => {
    const { setSemanticsSnapshotsData } = tcmTestData
    it('tcmSnapshotsOnDefaultSlate - showhide case', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
        }
        const snapshotsData = {
            wipData: showHide,
            slateManifestVersioning: {},
            popupInContainer: null,
            actionStatus,
            tag: {},
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            }
        }

        config.isPopupSlate = false;
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, {}, null, true, {}, 1, false);
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData, null, {}, null, true, {}, 1, false);
    })
    it('tcmSnapshotsOnDefaultSlate - poetry_element case', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
        }
        const snapshotsData = {
            wipData: poetryElem,
            slateManifestVersioning: {},
            popupInContainer: null,
            actionStatus,
            tag: {},
            elementId: {
                parentId: "urn:pearson:work:3525235-324323-4432sfe31"
            }
        }
        config.isPopupSlate = false;
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData, null, {}, null, true, {}, 1, false);

    })
    it('tcmSnapshotsInContainerElements - versioning delete case', () => {
        config.isPopupSlate = true;
        const actionStatus = {
            action: "create",
            status: "accepted",
            fromWhere: "create"
        }
        const snapshotsData = {
            wipData: {
                id: "urn:pearson:work:3525235-324323-4432sfe31"
            },
            slateManifestVersioning: {},
            popupInContainer: null,
            actionStatus,
            tag: { childTag: 'P' },
            elementId: { parentId: "" }
        }
        config.isPopupSlate = false;
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsInContainerElements(snapshotsData, snapshotsData, {}, true, {}, false);
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData, snapshotsData, {}, true, {}, false);
    })
})
describe('tcmSnapshotsOnDefaultSlate conditions',()=>{
    it('poetryData available in containerElement',()=>{
        let containerElement={poetryData:true}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'',containerElement,'','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'',containerElement,'','','');
    })
    it('asideData available in containerElement',()=>{
        let containerElement={asideData:true}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'',containerElement,'','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'',containerElement,'','','');
    })    
    it('parentUrn available in containerElement',()=>{
        let containerElement={parentUrn:true}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'',containerElement,'','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'',containerElement,'','','');
    })    
    it('showHideObj available in containerElement',()=>{
        let containerElement={showHideObj:{"1":1,"2":2}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'',containerElement,'','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'',containerElement,'','','');
    })
    it('witout operationType',()=>{
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','','','');
    })    
    it('wipdata type is ELEMENT_ASIDE',()=>{
        snapshotsData.wipData.type='element-aside';
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','test','','copy');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','test','','copy');
    })    
    it('wipdata type is showhide',()=>{
        snapshotsData.wipData.type='showhide'
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','test','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','test','','');
    })
    it('wipdata type is poetry',()=>{
        snapshotsData.wipData.type='poetry'
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','test','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','test','','');
    })    
    it('wipdata type is manifest',()=>{
        snapshotsData.wipData.type='manifest'
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','SECTION_BREAK','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','SECTION_BREAK','','');
    })
    it('wipdata type is citations',()=>{
        snapshotsData.wipData.type='citations'
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','','','');
    })    
    it('wipdata type is groupedcontent',()=>{
        snapshotsData.wipData.type='groupedcontent'
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsOnDefaultSlate');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsOnDefaultSlate(snapshotsData,'','','','','');
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData,'','','','','');
    })    
})
describe("tcmSnapshotsCreateAsideWE", () => {
    it('sectionType availabe in elementContainer', () => {
        const snapshotsData = {
            wipData: {
                id:'',
                type: 'group',
                subtype: "",
                contentUrn:'',
                interactivedata: {
                    'show': []
                },
                contents: {
                    bodymatter: [{}]
                },
                elementdata: {
                    bodymatter: [
                        {
                            type:'manifest',
                            id:'123',
                            contents:{
                                bodymatter:[
                                    {
                                        type:'',
                                        id:'123'
                                    },
                                ]
                            }
                        },
                    ]
                },      
                groupeddata: {
                    bodymatter: [
                        {
                        groupdata:{
                            bodymatter:[
                                {
                                type:'tcmSnapshotsMultiColumn'
                                }
                            ]
                        }
                        }
                    ]
                }
            },
            tag: {
                parentTag: "test"
            },
            elementId: {
                parentId: "test"
            },
            actionStatus: {
                action:"Test"
            }
        }
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}},sectionType:'test'}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateAsideWE(snapshotsData, '', '', '',containerElement);
    })
    it('sectionType availabe in elementContainer', () => {
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}},sectionType:'test'}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateAsideWE(snapshotsData, '', '', '',containerElement);
    })
    it('sectionType not availabe in elementContainer', () => {
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateAsideWE(snapshotsData, '', '', '',containerElement , '');
    })
    it('tcmSnapshotsCreateAsideWE for element-authoredtext type', () => {
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}}}
        let tempsnap={wipData:{contents:{bodymatter:[]},interactivedata:{'show':[]},elementdata:{bodymatter:[{type:'element-authoredtext'}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateAsideWE(tempsnap, '', '', '',containerElement , '');
    })
    it('tcmSnapshotsCreateAsideWE for showhide type', () => {
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}}}
        let tempsnap={wipData:{contents:{bodymatter:[]},interactivedata:{'show':[]},elementdata:{bodymatter:[{type:''}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsInContainerElements');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateAsideWE(tempsnap, '', '', '',containerElement , '');
    })              
})
describe("tcmSnapshotsPopup", () => {
    it('tcmSnapshotsPopup item availabe', () => {
        let containerElement={showHideObj:{currentElement:{type:'element-aside'},element:{sectionType:'test'}},sectionType:'test'}
        let item={popupdata:{'formatted-title':'test'}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsPopup');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsPopup(snapshotsData.wipData, '',containerElement,'',item);
    })
    it('sectionType elementType is multicoloum', () => {
        let item={popupdata:{}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsPopup');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsPopup(snapshotsData.wipData, '','','',item);
    })
    it('sectionType elementType is multicoloum', () => {
        let item={popupdata:{}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsPopup');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsPopup(snapshotsData.wipData, '','','',item,'cut');
    })    
    it('sectionType elementType is multicoloum else', () => {
        let item={popupdata:{}}
        jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsPopup');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsPopup(snapshotsData.wipData, '',{parentUrn: {elementType: 'group'}},'',item,'cut');
    })    
})
describe("parentData4CutCopyASWE_2C", () => {
    it('parentData4CutCopyASWE_2C all argument available', () => {
        let asideData={}, parentUrn={mcId:{}, manifestUrn:{}, columnName:{}, multiColumnType:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'parentData4CutCopyASWE_2C');
        tcmSnapshotsOnDefaultSlate.parentData4CutCopyASWE_2C(asideData,parentUrn)
        expect(spyFunction).toHaveBeenCalledWith(asideData,parentUrn);
    })
    it('parentData4CutCopyASWE_2C parentUrn not available', () => {
        let asideData={}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'parentData4CutCopyASWE_2C');
        tcmSnapshotsOnDefaultSlate.parentData4CutCopyASWE_2C(asideData)
        expect(spyFunction).toHaveBeenCalledWith(asideData);
    })
})
describe("setParentUrnData", () => {
    it('setParentUrnData if part', () => {
        let item={id:'123'}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrnData');
        tcmSnapshotsOnDefaultSlate.setParentUrnData(snapshotsData.wipData, item)
        expect(spyFunction).toHaveBeenCalledWith(snapshotsData.wipData, item);
    })
    it('setParentUrnData if part and id is same', () => {
        let item={id:'test'}
        let wipData = {elementdata:{bodymatter:[{type:'test'}] } }             
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrnData');
        tcmSnapshotsOnDefaultSlate.setParentUrnData(wipData, item)
        expect(spyFunction).toHaveBeenCalledWith(wipData, item);
    })
    it('setParentUrnData else part', () => {
        let item={id:'test'}
        let wipData = {elementdata:{bodymatter:[{type:'manifest',contents:{bodymatter:[{id:'123'}]}}] } }             
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrnData');
        tcmSnapshotsOnDefaultSlate.setParentUrnData(wipData, item)
        expect(spyFunction).toHaveBeenCalledWith(wipData, item);
    })
})
describe("tcmSnapshotsMultiColumn", () => {
    it('tcmSnapshotsMultiColumn if part', () => {
        let containerElement={parentUrn:{columnIndex:'test'}}, defaultKeys={}, isPopupSlate=true
        let tempsnap={wipData:{contents:{bodymatter:[]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsMultiColumn');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsMultiColumn(containerElement,tempsnap, defaultKeys,1, isPopupSlate)
        expect(spyFunction).toHaveBeenCalledWith(containerElement,tempsnap, defaultKeys,1, isPopupSlate);
    })
})

describe("tcmSnapshotsCreateSectionBreak", () => {
    it('tcmSnapshotsCreateSectionBreak if part', () => {
        let containerElement={asideData:{parent:{type:'showhide'},type:'groupedcontent'}, parentUrn:{manifestUrn:'123'}}
        let defaultKeys={},isPopupSlate={}
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreateSectionBreak');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateSectionBreak(containerElement, tempsnap, defaultKeys,1, isPopupSlate)
        expect(spyFunction).toHaveBeenCalledWith(containerElement, tempsnap, defaultKeys,1, isPopupSlate);
    })
    it('tcmSnapshotsCreateSectionBreak esle part', () => {
        let containerElement={asideData:{parent:{type:''},type:'groupedcontent'}, parentUrn:{manifestUrn:'123'}}
        let defaultKeys={},isPopupSlate={}
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreateSectionBreak');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateSectionBreak(containerElement, tempsnap, defaultKeys,1, isPopupSlate)
        expect(spyFunction).toHaveBeenCalledWith(containerElement, tempsnap, defaultKeys,1, isPopupSlate);
    })
})
describe("tcmSnapshotsAsideWE", () => {
    it('tcmSnapshotsAsideWE for columnIndex 0', () => {
        let containerElement={asideData:{parent:{type:'showhide'},type:'groupedcontent'}, parentUrn:{manifestUrn:'123'}}
        let actionStatus={}
        let item={id:'',type:'',subtype:''}
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsAsideWE');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsAsideWE(tempsnap.wipData,1,containerElement,actionStatus,item, 0)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,1,containerElement,actionStatus,item, 0);
    })
    it('tcmSnapshotsAsideWE columnIndex 1', () => {
        let containerElement={asideData:{parent:{type:'showhide'},type:'groupedcontent'}, parentUrn:{manifestUrn:'123'}}
        let actionStatus={}
        let item={id:'',type:'',subtype:''}
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsAsideWE');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsAsideWE(tempsnap.wipData,1,containerElement,actionStatus,item, 1)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,1,containerElement,actionStatus,item, 1);
    })
    it('tcmSnapshotsAsideWE columnIndex 2', () => {
        let containerElement={cutCopyParentUrn:true,asideData:{parent:{type:'showhide'},type:'groupedcontent'}, parentUrn:{manifestUrn:'123'}}
        let actionStatus={}
        let item={id:'',type:'',subtype:''}
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}},{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsAsideWE');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsAsideWE(tempsnap.wipData,1,containerElement,actionStatus,item, 4)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,1,containerElement,actionStatus,item, 4);
    })
})
describe("setParentUrn", () => {
    it('setParentUrn for tempIndex length is 5', () => {
        let bodymatter={}, tempIndex={length :5}, isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })

    it('setParentUrn for tempIndex length is 3 else', () => {
        let bodymatter={'element-aside': {type: 'element-aside', elementdata: {bodymatter: {'res': 'value'}}}}, tempIndex=['element-aside','res',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })

    it('setParentUrn for MULTI_COLUMN', () => {
        let bodymatter={'groupedcontent': {'type': 'groupedcontent','groupeddata': {'bodymatter': {'0': '2'}}, elementdata: {bodymatter: {'0': 'value'}}}}, tempIndex=['groupedcontent','0',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })

    it('setParentUrn for tempIndex length 4', () => {
        let bodymatter={'groupedcontent': {'type': 'groupedcontent','groupeddata': {'bodymatter': {'0': '2'}}, elementdata: {bodymatter: {'0': 'value'}}}}, tempIndex=['groupedcontent','0','',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })

    it('setParentUrn for tempIndex length 4 aside', () => {
        let bodymatter=[{'type': 'element-aside', elementdata: {bodymatter: [{type: 'showhide'}]}, 'element-aside': {type: 'element-aside'}}], tempIndex=['0','0','',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })

    it('setParentUrn for tempIndex length 4 showhide', () => {
        let bodymatter=[{interactivedata: [[{type: 'element-aside'}]], 'type': 'showhide', elementdata: {bodymatter: [{type: 'showhide'}]}, 'element-aside': {type: 'element-aside'}}], tempIndex=['0','0','0',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {parent: {showHideType: '0'}})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {parent: {showHideType: '0'}});
    })
    it('setParentUrn for tempIndex length 4 showhide else', () => {
        let bodymatter=[{interactivedata: [[{type: 'aside'}]], 'type': 'showhide', elementdata: {bodymatter: [{type: 'showhide'}]}, 'element-aside': {type: 'element-aside'}}], tempIndex=['0','0','0',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {parent: {showHideType: '0'}})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {parent: {showHideType: '0'}});
    })
    it('setParentUrn for tempIndex length 4 showhide else', () => {
        let bodymatter=[{interactivedata: [[{type: 'aside'}]], 'type': 'showhide', elementdata: {bodymatter: [{type: 'showhide'}]}, 'element-aside': {type: 'element-aside'}}], tempIndex=['0','0','0',''], isFigure=true, asideData = {}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'setParentUrn');
        tcmSnapshotsOnDefaultSlate.setParentUrn(bodymatter, tempIndex, isFigure, asideData = {})
        expect(spyFunction).toHaveBeenCalledWith(bodymatter, tempIndex, isFigure, asideData = {});
    })
})
describe("tcmSnapshotsShowHide", () => {
    it('tcmSnapshotsShowHide ', () => {
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        let containerElement={cutCopyParentUrn:{},asideData:{element:'123',parent:{source:'fromCutCopy'}}}, actionStatus={},index=1, item={type:''}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsShowHide(tempsnap.wipData,index,containerElement,actionStatus,item,1)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,index,containerElement,actionStatus,item,1);
    })
    it('tcmSnapshotsShowHide if source not available', () => {
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        let containerElement={cutCopyParentUrn:{},parentUrn:{elementType:'group'}}, actionStatus={},index=1, item={type:''}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsShowHide(tempsnap.wipData,index,containerElement,actionStatus,item,1,'copy')
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,index,containerElement,actionStatus,item,1,'copy');
    })
    it('tcmSnapshotsShowHide with no containerElement', () => {
        let tempsnap={wipData:{contents:{bodymatter:[{type:'element-list'}]},interactivedata:{'show':[]},groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}}, elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}}
        let  actionStatus={},index=1, item={}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsShowHide(tempsnap.wipData,index,'',actionStatus,item,1)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,index,'',actionStatus,item,1);
    })
    it('tcmSnapshotsShowHide with no containerElement', () => {
        let tempsnap={
            wipData: {
                type: MULTI_COLUMN,
                contents:{bodymatter:[{type:'element-list'}]},
                interactivedata:{'show':[]},
                groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:''}]}}]}},
                elementId:{}, tag:{}, actionStatus:{},popupInContainer:{},slateManifestVersioning:{}
        }
        let  actionStatus={},index=1, item={type: ''}
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsShowHide(tempsnap.wipData,index,'',actionStatus,item,1)
        expect(spyFunction).toHaveBeenCalledWith(tempsnap.wipData,index,'',actionStatus,item,1);
    })
})
describe("tcmSnapshotsCreateShowHide", () => {
    it('tcmSnapshotsCreateShowHide render', ()=>{
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreateShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateShowHide({wipData: {interactivedata: {show: [{type: 'element-list'}]}}, elementId: {}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample'}, parentUrn: {manifestUrn: '123'}})
        expect(spyFunction).toHaveBeenCalledWith({wipData: {interactivedata: {show: [{type: 'element-list'}]}}, elementId: {}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample'}, parentUrn: {manifestUrn: '123'}});
    })
    it('tcmSnapshotsCreateShowHide render', ()=>{
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreateShowHide');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreateShowHide({wipData: {interactivedata: {show: [{type: 'element-list'}]}}, elementId: {}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '123'}, parentUrn: {manifestUrn: '123'}})
        expect(spyFunction).toHaveBeenCalledWith({wipData: {interactivedata: {show: [{type: 'element-list'}]}}, elementId: {}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '123'}, parentUrn: {manifestUrn: '123'}});
    })
})
describe('tcmSnapshotsCreatePoetry', () => {
    it('tcmSnapshotsCreatePoetry render', ()=>{
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreatePoetry');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreatePoetry({wipData: {contents: {bodymatter: [{id: '1'}]}, interactivedata: {show: [{type: 'element-list'}]}}, elementId: {"childId": "1"}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '123'}, parentUrn: {manifestUrn: '123'}}, {})
        expect(spyFunction).toHaveBeenCalledWith({wipData: {contents: {bodymatter: [{id: '1'}]},interactivedata: {show: [{type: 'element-list'}]}}, elementId: {"childId": "1"}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '123'}, parentUrn: {manifestUrn: '123'}}, {});
    })
    it('tcmSnapshotsCreatePoetry render', ()=>{
        const spyFunction = jest.spyOn(tcmSnapshotsOnDefaultSlate, 'tcmSnapshotsCreatePoetry');
        tcmSnapshotsOnDefaultSlate.tcmSnapshotsCreatePoetry({wipData: {contents: {bodymatter: [{id: '1'}]}, interactivedata: {show: [{type: 'element-list'}]}}, elementId: {"childId": "1"}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '12'}, parentUrn: {manifestUrn: '123'}}, {})
        expect(spyFunction).toHaveBeenCalledWith({wipData: {contents: {bodymatter: [{id: '1'}]},interactivedata: {show: [{type: 'element-list'}]}}, elementId: {"childId": "1"}, tag: {}, actionStatus: 'cut', popupInContainer: {}, slateManifestVersioning: {}},[], 1, true, {asideData: {type: 'element-aside', subtype: 'workedexample', id: '12'}, parentUrn: {manifestUrn: '123'}}, {});
    })
})
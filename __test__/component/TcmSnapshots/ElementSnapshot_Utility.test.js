/**************************Import Modules**************************/
import * as elementSnapshotUtilityFn from '../../../src/component/TcmSnapshots/ElementSnapshot_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';

/**********************Mock Helper Functions**********************/
jest.mock("../../../src/component/AssetPopover/AssetPopover_Actions.js", () => {
    return { getCurrentlyLinkedImage: jest.fn() }
})
jest.mock("../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js", () => {
    return {
        getLatestVersion: () => {
            return "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a"
        }
    }
})

describe('-----------------------Test ElementSnapshot_Utility Functions-----------------------', () => {
    describe('Test-1-Function--1--setSemanticsSnapshots', () => {
        const { stanza, paragraph, blockquote } = tcmTestData.setSemanticsSnapshotsData
        let actionStatus = {
            action:"create",
            status:"accepted",
            fromWhere:"create"
        }
        it('Test-1.1-Function--1--setSemanticsSnapshots - Default', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots({ type: "element-learningobjectives" },"accepted" );
            expect(spyFunction).toHaveBeenCalledWith( { type: "element-learningobjectives" },"accepted",);
        })
        it('Test-1.2-Function--1--setSemanticsSnapshots - Paragraph', () => {
            
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(paragraph,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus);
        })
        it('Test-1.3-Function--1--setSemanticsSnapshots - Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(stanza,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(stanza,actionStatus);

        })
        it('Test-1.4-Function--1--setSemanticsSnapshots - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(blockquote,actionStatus );
            expect(spyFunction).toHaveBeenCalledWith(blockquote,actionStatus);

        })
    });
    describe('Test-2-Function--2--fetchElementsTag', () => {
        const { paragraph, heading, list, blockquote, aside, workedexample, stanza } = tcmTestData.fetchElementTagData
        it('Test-2.1-Function--2--fetchElementsTag - Paragraph', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(paragraph)
            expect(spyFunction).toHaveReturnedWith('P')
        })
        it('Test-2.2-Function--2--fetchElementsTag - Heading', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(heading)
            expect(spyFunction).toHaveReturnedWith('H3')
        })
        it('Test-2.3-Function--2--fetchElementsTag - List', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(list)
            expect(spyFunction).toHaveReturnedWith('OL+lower-alpha')
        })
        it('Test-2.4-Function--2--fetchElementsTag - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(blockquote)
            expect(spyFunction).toHaveReturnedWith('BQ+blockquote')
        })
        it('Test-2.5-Function--2--fetchElementsTag - Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(aside)
            expect(spyFunction).toHaveReturnedWith('AS')
        })
        it('Test-2.6-Function--2--fetchElementsTag - WorkedExample', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(workedexample)
            expect(spyFunction).toHaveReturnedWith('WE')
        })
        it('Test-2.7-Function--2--fetchElementsTag - Others-Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(stanza)
            expect(spyFunction).toHaveReturnedWith('ST')
        })
    });
    describe('Test-3-Function--3--fetchElementWipData', () => {
        const { slate1, slate2 } = tcmTestData
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb",
            manifest2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a";
        let bodymatter1 = slate1[manifest1].contents.bodymatter,
            bodymatter2 = slate2[manifest2].contents.bodymatter;

        it('Test-3.1-Function--3--fetchElementWipData - Paragraph in Slate', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter1, 0, 'element-authoredtext')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 0, 'element-authoredtext')
        })
        it('Test-3.2-Function--3--fetchElementWipData - Section-Break', () => {
            let entityUrn = "urn:pearson:entity:4e42d3a8-f794-4977-9e13-b1e76431d8bf"
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter1, ["2"], 'element-aside', entityUrn)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["2"], 'element-aside', entityUrn)
        })
        it('Test-3.3-Function--3--fetchElementWipData - Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter2, "2-3-0", 'stanza')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "2-3-0", 'stanza')

        })
        it('Test-3.4-Function--3--fetchElementWipData - Element-Citation', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter2, "1-1", 'element-citation')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter2, "1-1", 'element-citation')

        })
        it('Test-3.5-Function--3--fetchElementWipData - BQ in WE-Body', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter1, "2-1-0", 'element-blockfeature')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "2-1-0", 'element-blockfeature')

        })
        it('Test-3.6-Function--3--fetchElementWipData - LO in SB', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter1, "2-2-0", 'element-learningobjectives')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "2-2-0", 'element-learningobjectives')
        })
        it('Test-3.7-Function--3--fetchElementWipData - List in Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementWipData');
            elementSnapshotUtilityFn.fetchElementWipData(bodymatter1, "1-1", 'element-list')
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, "1-1", 'element-list')
        })
    });
    describe('Test-4-Function--4--fetchParentData', () => {
        let manifest1 = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb";
        let bodymatter1 = tcmTestData.slate1[manifest1].contents.bodymatter;
        it('Test-4.1-Function--4--fetchParentData - Paragraph in Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchParentData');
            elementSnapshotUtilityFn.fetchParentData(bodymatter1, ["1", "0"])
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, ["1", "0"])
        })
        it('Test-4.2-Function--4--fetchParentData - Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchParentData');
            elementSnapshotUtilityFn.fetchParentData(bodymatter1, 1)
            expect(spyFunction).toHaveBeenCalledWith(bodymatter1, 1)
        })
        it('Test-4.3-Function--4--fetchParentData - WE with Section-Break', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchParentData');
            elementSnapshotUtilityFn.fetchParentData(bodymatter1, ["2", "1", "1"])
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'checkContainerElementVersion');
            elementSnapshotUtilityFn.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'checkContainerElementVersion');
            elementSnapshotUtilityFn.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'checkContainerElementVersion');
            elementSnapshotUtilityFn.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'checkContainerElementVersion');
            elementSnapshotUtilityFn.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'checkContainerElementVersion');
            elementSnapshotUtilityFn.checkContainerElementVersion(parentElement, versionStatus, currentSlateData);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchManifestStatus');
            elementSnapshotUtilityFn.fetchManifestStatus(bodymatter, parentElement, type);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchManifestStatus');
            elementSnapshotUtilityFn.fetchManifestStatus(bodymatter, parentElement, type);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchManifestStatus');
            elementSnapshotUtilityFn.fetchManifestStatus(bodymatter, parentElement, type);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchManifestStatus');
            elementSnapshotUtilityFn.fetchManifestStatus(bodymatter, parentElement, type);
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
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchManifestStatus');
            elementSnapshotUtilityFn.fetchManifestStatus(bodymatter, parentElement, type);
            expect(spyFunction).toHaveBeenCalledWith(bodymatter, parentElement, type);
        })
    });
});

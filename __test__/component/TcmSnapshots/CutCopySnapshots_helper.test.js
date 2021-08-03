import * as CutCopySnapshots from '../../../src/component/TcmSnapshots/CutCopySnapshots_helper.js';
import config from '../../../src/config/config.js';
describe('Test-CutCopySnapshots_helper', () => {
    let elementId = "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb0",
        elementType = 'popup',
        projectUrn = "urn:pearson:distributable:45aee376-7a2a-47a5-b17d-3f687fc6336e",
        selection = {
            element: {
                type: 'popup',
                contentUrn: "urn:pearson:entity:3dac56c9-e0ad-452b-ad8e-213e082adef8",
                id: "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb0"
            },
            sourceSlateManifestUrn: "urn:pearson:manifest:67ebe5c9-9445-486f-b414-346650ec5179",
            sourceSlateEntityUrn: "urn:pearson:entity:274fab8a-11c3-4dda-bb0e-ccccd079249a",
            sourceElementIndex: "0",
            operationType: "cut"
        },
        oldElementId = "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb0",
        destnSlateManifestURN = "urn:pearson:manifest:cb9d008b-a705-4dd1-9edb-9a1138b676df",
        destnSlateEntityURN = "urn:pearson:entity:e88fbc35-6c0e-4397-8a46-5fea4654903f",
        elementNewEntityUrn = "urn:pearson:entity:3dac56c9-e0ad-452b-ad8e-213e082adef8",
        asideData = undefined,
        parentUrn = undefined,
        elementStatus = "approved"
    let pasteParams = {
        elementId,
        elementType,
        projectUrn,
        selection,
        destnSlateManifestURN,
        destnSlateEntityURN,
        asideData,
        parentUrn,
        oldElementId,
        elementNewEntityUrn,
        elementStatus
    }
    it('Test-1.1-Function--1--preparePayloadData - default -cut and paste on slate', () => {
        config.tcmStatus = false
        const spyFunction = jest.spyOn(CutCopySnapshots, 'preparePayloadData');
        CutCopySnapshots.preparePayloadData(pasteParams)
        const expectedResult = {
            destinationSlateEntityUrn: "urn:pearson:entity:e88fbc35-6c0e-4397-8a46-5fea4654903f",
            destinationSlateUrn: "urn:pearson:manifest:cb9d008b-a705-4dd1-9edb-9a1138b676df",
            elementEntityUrn: "urn:pearson:entity:3dac56c9-e0ad-452b-ad8e-213e082adef8",
            elementTag: "POP",
            elementUrn: "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb0",
            // oldElementUrn: "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb0",
            operationType: "cut",
            projectUrn: "urn:pearson:distributable:45aee376-7a2a-47a5-b17d-3f687fc6336e",
            sourceElementIndex: "0",
            sourceSlateEntityUrn: "urn:pearson:entity:274fab8a-11c3-4dda-bb0e-ccccd079249a",
            sourceSlateUrn: "urn:pearson:manifest:67ebe5c9-9445-486f-b414-346650ec5179",
            type: "popup",
            typeOfElement: "container",
            status: 'accepted',
            "elementVersionStatus": 'approved'
        }
        expect(spyFunction).toHaveReturnedWith(expectedResult)
    })
    it('Test-1.2-Function--1--preparePayloadData - default -cut and paste on 3c-we-body', () => {
        oldElementId = "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb1"
        asideData = {
            type: 'element-aside',
            id: "urn:pearson:manifest:8385f444-ad58-477e-9e47-8e8e76ac8265",
            contentUrn: "urn:pearson:entity:7bbfbd7c-8497-464a-9f28-974e1da55894",
            element: {
                type: 'element-aside',
                subtype: "workedexample",
                id: "urn:pearson:manifest:8385f444-ad58-477e-9e47-8e8e76ac8265",
                contentUrn: "urn:pearson:entity:7bbfbd7c-8497-464a-9f28-974e1da55894"
            },
            parent: {
                id: "urn:pearson:manifest:64386611-d4bf-4c80-bfb4-d53891e035fd",
                columnId: "urn:pearson:manifest:fb428196-af64-45b3-b168-2138e00f9e4a",
                type: "3C",
                columnName: "C2",
                parentContentUrn: "urn:pearson:entity:bde6a376-538f-49ec-838d-236e79795c6c",
                columnContentUrn: "urn:pearson:entity:3a3b7644-e1ed-4cbc-b8df-18785a505fce"
            }
        }
        parentUrn = {
            manifestUrn: "urn:pearson:manifest:8ae90b8d-6b06-49c0-bda9-cce7608653bf",
            contentUrn: "urn:pearson:entity:3e6b1f8c-2250-455c-a7ca-b1c71d30e9d8",
            elementType: "manifest"
        }
        const spyFunction = jest.spyOn(CutCopySnapshots, 'preparePayloadData');
        CutCopySnapshots.preparePayloadData({...pasteParams, asideData, parentUrn, oldElementId })
        expect(spyFunction).toHaveBeenCalledWith({...pasteParams, asideData, parentUrn, oldElementId })
    })
    it('Test-1.3-Function--1--preparePayloadData - default -cut and paste on aside', () => {
        oldElementId = "urn:pearson:manifest:60c0f346-75f7-43e7-ada4-22be752ffcb1"
        asideData = {
            type: 'element-aside',
            id: "urn:pearson:manifest:8385f444-ad58-477e-9e47-8e8e76ac8265",
            contentUrn: "urn:pearson:entity:7bbfbd7c-8497-464a-9f28-974e1da55894",
            element: {
                type: 'element-aside',
                subtype: "sidebar",
                id: "urn:pearson:manifest:8385f444-ad58-477e-9e47-8e8e76ac8265",
                contentUrn: "urn:pearson:entity:7bbfbd7c-8497-464a-9f28-974e1da55894"
            }
        }
        parentUrn = {
            manifestUrn: "urn:pearson:manifest:8385f444-ad58-477e-9e47-8e8e76ac8265",
            contentUrn: "urn:pearson:entity:7bbfbd7c-8497-464a-9f28-974e1da55894",
            elementType: "manifest"
        }
        const spyFunction = jest.spyOn(CutCopySnapshots, 'preparePayloadData');
        CutCopySnapshots.preparePayloadData({ ...pasteParams, asideData, parentUrn, oldElementId })
        expect(spyFunction).toHaveBeenCalledWith({ ...pasteParams, asideData, parentUrn, oldElementId })
    })
});
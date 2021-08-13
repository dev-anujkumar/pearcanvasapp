import { deleteElementAction, prepareDeleteRequestData, showError, updateStorePostDelete } from "../../../src/component/ElementContainer/ElementDeleteActions";
import config from '../../../src/config/config.js';

let elementId = 'elementId';
let type = 'popup';
let eleIndex = '12-34';
let activeElement = {};
let containerElements = {};
let cb = () => { };
let dispatch = () => { }


let deleteParams = {
    index: 0,
    newIndex: [{}],
    newParentData: { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter: [] } } },
    dispatch: dispatch
}


describe('deleteElementAction ', () => {
    it('testing------- deleteElementAction ------action-', async () => {
        await deleteElementAction(elementId, type, eleIndex, activeElement, containerElements, cb)
    });
});

describe('UpdateStorePostDelete all cases', () => {
    it('testing updateStorePostDelete', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        updateStorePostDelete(deleteParams)
    })
    it('testing updateStorePostDelete', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        updateStorePostDelete({...deleteParams,newIndex:[{},{}]})
    })
    it('testing updateStorePostDelete', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        updateStorePostDelete({...deleteParams,newIndex:[{},{},{}]})
    })
    // it('testing updateStorePostDelete', () => {
    //     config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
    //     let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:'' }} }
    //     updateStorePostDelete({...deleteParams,...newParentData,newIndex:[{},{},{},{}]})
    // })
    // it('testing updateStorePostDelete', () => {
    //     config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
    //     updateStorePostDelete({...deleteParams,newIndex:'10000'})
    // })
    // it('testing updateStorePostDelete', () => {
    //     config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
    //     updateStorePostDelete({...deleteParams,newIndex:'100000'})
    // })
});

describe('showError testing',() => {
    it('showError',() => {
        showError('error',dispatch,'errormessage')
    })
})


describe('prepareDeleteRequestData testing',() => {
    let elementType = '';
    let payloadParams = {
        elementId:'123',
        parentUrn:'123',
        elementIndex:1,
        activeElement:{},
        cutCopyParentUrn:'123',
        parentElement:'123'
    }
    it('prepareDeleteRequestData',() => {
        prepareDeleteRequestData(elementType,payloadParams)
    })
})
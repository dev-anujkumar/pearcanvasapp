import { deleteElementAction, prepareDeleteRequestData, showError, updateStorePostDelete } from "../../../src/component/ElementContainer/ElementDeleteActions";
import config from '../../../src/config/config.js';

const axios = require('axios');
jest.mock('axios');

let elementId = 'elementId';
let type = '';
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
        axios.post.mockImplementation(() => Promise.resolve({}))
        let result = await deleteElementAction(elementId, type, eleIndex, activeElement, containerElements, cb);
        result(dispatch);
    });
});

describe('UpdateStorePostDelete all cases', () => {
    it('testing updateStorePostDelete case 1', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        updateStorePostDelete(deleteParams)
    })
    it('testing updateStorePostDelete case 2', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{type:'element-aside',elementdata:{bodymatter:[]}}] } } }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0]})
    })
    it('testing updateStorePostDelete case 3', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{type:'showhide',interactivedata:{'show':[]}}] } } }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,'0',0]})
    })
    it('testing updateStorePostDelete case 4', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{elementdata:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,'0',0]})
    })
    it('testing updateStorePostDelete case 5', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{elementdata:{bodymatter:[{contents:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}  }]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,'0',0]})
    })
    it('testing updateStorePostDelete case 6', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{elementdata:{bodymatter:[{contents:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}  }]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,'0',0]})
    })
    it('testing updateStorePostDelete case 7', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{groupeddata:{bodymatter:[{groupdata:{bodymatter:[ {elementdata:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]} }  ]}  }]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,0,'0',0]})
    })
    it('testing updateStorePostDelete case 8', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{groupeddata:{bodymatter:[{groupdata:{bodymatter:[ {elementdata:{bodymatter: [{contents:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}}]  } }  ]}  }]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,0,0,'0',0]})
    })
});

describe('showError testing',() => {
    it('showError',() => {
        showError('error',dispatch,'errormessage')
    })
})


describe('prepareDeleteRequestData testing',() => {
    let payloadParams = {
        elementId:'123',
        parentUrn:'123',
        elementIndex:['0',0],
        activeElement:{},
        cutCopyParentUrn:{contentUrn:'a'},
        parentElement:{type:'showhide'}
    }
    it('prepareDeleteRequestData case 1',() => {
        prepareDeleteRequestData('',payloadParams)
    })
    it('prepareDeleteRequestData case 2',() => {
        prepareDeleteRequestData("element-aside",payloadParams)
    })
    it('prepareDeleteRequestData case 3',() => {
        prepareDeleteRequestData("element-aside",{...payloadParams,cutCopyParentUrn:undefined})
    })
    it('prepareDeleteRequestData case 4',() => {
        prepareDeleteRequestData("element-aside",{...payloadParams,cutCopyParentUrn:undefined,parentUrn:undefined})
    })
    it('prepareDeleteRequestData case 5',() => {
        prepareDeleteRequestData("element-aside",{...payloadParams,elementIndex:[],parentElement:{type:''}})
    })
})
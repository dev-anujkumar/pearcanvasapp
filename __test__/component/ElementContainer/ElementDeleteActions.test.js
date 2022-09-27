import { deleteElementAction, prepareDeleteRequestData, showError, updateStorePostDelete } from "../../../src/component/ElementContainer/ElementDeleteActions";
import config from '../../../src/config/config.js';
import { mockSlateLevelData } from "./ElementDeleteActionsMockData";

const axios = require('axios');
jest.mock('axios');

let elementId = 'elementId';
let type = '';
let eleIndex = '12-34';
let activeElement = {};
let containerElements = {};
let cb = () => { };
let dispatch = () => { }
let getState = () => {
    return {
        appStore: {
            slateLevelData: {
                ...mockSlateLevelData
            }
        },
        autoNumberReducer: {
            isAutoNumberingEnabled: true
        }
    }
}

jest.mock('../../../src/component/FigureHeader/AutoNumber_DeleteAndSwap_helpers', () => {
    return {
        handleAutoNumberingOnDelete: () => jest.fn()
    };
});


let deleteParams = {
    index: 0,
    newIndex: [{}],
    newParentData: { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter: [] } } },
    dispatch: dispatch
}

let  isSectionBreak={id:'urn:pearson:manifest:c6ea920d-80e5-4932-afbe-85c5447b7ad3',type:"manifest",schema:"http://schemas.pearson.com/wip-authoring/manifest/1",versionUrn:"urn:pearson:manifest:c6ea920d-80e5-4932-afbe-85c5447b7ad3",contentUrn:"urn:pearson:entity:72ca110d-0a48-4199-a627-d6351abd68ab",contents:{bodymatter:[{id:"urn:pearson:work:bc2fbe67-554b-41e7-933e-b69458066bed",type:"element-authoredtext",schema:"http://schemas.pearson.com/wip-authoring/element/1",elementdata:{schema:"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",text:"",headers:[{"level":5}]},html:{text:"<h5 class=\"heading5NummerEins\"><br></h5>"},versionUrn:"urn:pearson:work:bc2fbe67-554b-41e7-933e-b69458066bed",contentUrn:"urn:pearson:entity:6bd81333-9db8-4313-8f9c-31564fbbdca3",status:"wip"},{id:"urn:pearson:work:1ac43897-fec4-43ad-bfbc-960e06b4a42f",type:"element-authoredtext",schema:"http://schemas.pearson.com/wip-authoring/element/1",elementdata:{schema:"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",text:""},html:{text:"<p class=\"paragraphNumeroUno\"><br></p>"},versionUrn:"urn:pearson:work:1ac43897-fec4-43ad-bfbc-960e06b4a42f",contentUrn:"urn:pearson:entity:e229c3fc-58a9-4c5d-9e33-3ca6af259345",status:"wip"}],schema:"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"}}

describe('deleteElementAction ', () => {
    it('testing------- deleteElementAction ------action- config.tcmStatus = true', async () => {
        axios.post.mockImplementation(() => Promise.resolve({}))
        config.slateManifestURN = "urn:pearson:manifest:bf216cc4-4350-49e0-afd9-f0e3f1ab0be9";
        config.tcmStatus = true;
        let result = await deleteElementAction(elementId, type, eleIndex, activeElement, containerElements, cb);
        result(dispatch, getState);
    });
    it('testing------- deleteElementAction ------action- config.tcmStatus = false', async () => {
        axios.post.mockImplementation(() => Promise.resolve({}))
        config.slateManifestURN = "urn:pearson:manifest:bf216cc4-4350-49e0-afd9-f0e3f1ab0be9";
        config.tcmStatus = false;
        let result = await deleteElementAction(elementId, type, eleIndex, activeElement, containerElements, cb);
        result(dispatch, getState);
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
    it('testing updateStorePostDelete case 3 if case', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let newParentData = {'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{type:'showhide',interactivedata:{'show':[]}}] } } }
        updateStorePostDelete({...deleteParams,isSectionBreak,newParentData,newIndex:[0,0,0]})
    })
    it('testing updateStorePostDelete case 3 else case', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{type:'showhide',interactivedata:{'show':[]}}] } } }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,'0',0]})
    })
    it('testing updateStorePostDelete case 4', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{elementdata:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}}]}} }
        updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,'0',0]})
    })
    describe('testing updateStorePostDelete case 5', () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
        it('case in worked example', () => {
            let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{elementdata:{bodymatter:[{contents:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}  }]}}]}} }
            updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,'0',0]})
        })
        it('case in multicolumn', () => {
            let newParentData = { 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e': { contents: { bodymatter:[{groupeddata:{bodymatter:[{groupdata:{bodymatter:[{type:'showhide',interactivedata:{'show':[]}}]}  }]}}]}} }
            updateStorePostDelete({...deleteParams,newParentData,newIndex:[0,0,0,'0',0]})
        })
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
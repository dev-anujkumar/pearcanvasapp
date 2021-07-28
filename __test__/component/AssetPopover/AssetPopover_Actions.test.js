import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import configureMockStore from 'redux-mock-store'
import axios from 'axios';
const middlewares = [thunk]
import thunk from 'redux-thunk'
const mockStore = configureMockStore(middlewares)

jest.mock('axios');


import {
    apoSearchCloseAction, 
    removeAssetLinkAction, 
    selectedFigureAction, 
    apoSearchSaveAction, 
    getCurrentlyLinkedImage, 
    assetPopoverPopup, 
    getAssetPopoverId, 
    searchForFiguresAction
} from '../../../src/component/AssetPopover/AssetPopover_Actions';

jest.mock('../../../src/constants/Action_Constants', ()=> {
    return {
        APO_SEARCH_SAVE : 'TOGGLE_BORDERS',
        TOGGLE_APO_SEARCH: 'TOGGLE_LO_DROPDOWN',
        REMOVE_ASSET_LINK: 'REMOVE_ASSET_LINK',
        IMAGES_FROM_API: 'IMAGES_FROM_API',
        SELECTED_FIGURE: 'SELECTED_FIGURE',
        IMAGES_FROM_API_FAIL: 'IMAGES_FROM_API_FAIL'
    }
})
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    guid: jest.fn()
}))

jest.mock('../../../src/config/config.js', () => ({
    colors: "#000000",
}))

describe('testingAssetPopoverActions',() => {
    // beforeEach(() => {
    //     initialState = {
    //         slateLockInfo: {
    //             isLocked: false,
    //             timestamp: "",
    //             userId: ""
    //         },
    //         withinLockPeriod: false
    //     };

    //     moxios.install();
    // });

   // afterEach(() => moxios.uninstall());
   // let store = mockStore(() => initialState);    

    it('testing------- apoSearchCloseAction', () => {
        let result = apoSearchCloseAction();
        expect(result).toMatchObject({
            type: 'TOGGLE_LO_DROPDOWN'
        })    
    })
    it('testing------- removeAssetLinkAction', () => {
        let result = removeAssetLinkAction();
        expect(result).toMatchObject({
            type: 'REMOVE_ASSET_LINK',
           
        });
    })
    it('testing------- selectedFigureAction', () => {
        let data = "testingActionArg"
        let result = selectedFigureAction(data);
        expect(result).toMatchObject({
            type: 'SELECTED_FIGURE',
           
        });
    })
    it('testing------- apoSearchSaveAction', () => {
        let apoObjArg = {'data': 'testing'};
        let imageDataArg = 'TestingImage'
        let result = apoSearchSaveAction(apoObjArg, imageDataArg);
        expect(result).toMatchObject({
            type: 'TOGGLE_BORDERS',
           
        });
    })
    it('testing------- getCurrentlyLinkedImage if', () => {
        let id = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        const users = [{name: 'Bob'}];
        const resp = { data: users, json:jest.fn(() => [{}]) };
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
             resolve(resp);
           });
        });
        const cb = jest.fn()
        getCurrentlyLinkedImage(id, cb).then((data) => {
            expect(data).toEqual(users)
        }) .catch(e =>
            expect(e).toEqual({
              error: 'User with 2 not found.',
            }))
    })

    it('testing------- getCurrentlyLinkedImage else', () => {
        let id = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        const users = [];
        const resp = { data: users,json: jest.fn(() => []) };

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
             resolve(resp);
           });
        });
        const cb = jest.fn()
        getCurrentlyLinkedImage(id, cb).then((data) => {
            expect(data).toEqual(users)
        })
        .catch(e =>
            expect(e).toEqual({
              error: 'User with 2 not found.',
            }))
    })
    it('testing------- getCurrentlyLinkedImage catch', () => {
        let id = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d";
        const resp = {status:400,data:{}};   

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
             reject(resp);
           });
        });
        const cb = (obj) => {
            expect(obj).toEqual({});
        }
        getCurrentlyLinkedImage(id, cb);
    })
    it('testing------- searchForFiguresAction if', () => {
        let searchTerm = 'search', stateImageData = [{'a': '1', 'b' : '2'}]
        let result = searchForFiguresAction(searchTerm, stateImageData)
        expect(result).toMatchObject({
            type: 'USE_STATE_IMAGE_DATA'
        });
    })

    it('testing------- searchForFiguresAction else', async () => {
        let searchTerm = 'search', stateImageData = null, currentlySearching = false
        const users = [{name: 'Bob'}];
        const resp = {data: users, json: jest.fn(()=> [])};
        let  performance = {
            now : jest.fn()
        }
        // searchForFiguresAction(searchTerm, stateImageData).then((data) => {
        //     expect(data).toEqual(users)
        // })
        const store = mockStore({ todos: [] });
        let dispatch = (obj) => {
            if(obj.type){
                expect(obj.type).toEqual('IMAGES_FROM_API');
            }
        }
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve(resp);
            });
        });
        searchForFiguresAction(searchTerm, stateImageData)(dispatch);
    })
    it('testing------- assetPopoverPopup', () => {
        let argsObj = false;
        let result = assetPopoverPopup(argsObj);
        expect(result).toMatchObject({
            type: 'TOGGLE_LO_DROPDOWN',
           
        });
    })
    it('testing------- getAssetPopoverId', () => {
        // let result = getAssetPopoverId();
        // expect(result).toMatchObject({
        //     type: 'TOGGLE_BORDERS'
        // });
        let id = "urn:pearson:manifest:e55c1c98-ffe6-487d-b8b2-f8f45513d66d"
        const users = [{id : '123'}];
        const resp = {data: users, json: jest.fn(() => [])};   

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
             resolve(resp);
           });
        });
        const cb = jest.fn()
        getAssetPopoverId(id).then((data) => async function(){
            const response = await data

            expect(data).toEqual(users)
        })
        .catch(e =>
            expect(e).toEqual({
              error: 'User with 2 not found.',
            }))
    })
    

  
})
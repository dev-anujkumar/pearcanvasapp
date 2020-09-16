import React from 'react';
import { mount } from 'enzyme';
import AssetPopoverSearch from '../../../src/component/AssetPopover/AssetPopoverSearch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
jest.mock('../../../src/component/AssetPopover/openApoFunction.js', () => {
    return {
        saveAssetLinkedMedia: jest.fn(),
        clearAssetPopoverLink: jest.fn()
    }
});
import tinymce from 'tinymce/tinymce';

jest.mock('../../../src/component/AssetPopover/AssetPopover_Actions.js',() => ({
    getAssetPopoverId: () => Promise.resolve({})
}))

const mockStore = configureMockStore(middlewares);
const store = mockStore({
        assetPopOverSearch:{
            showApoSearch : false,                 // Weather show or not the popover window
            showApoCurrentlyLinked : false,        // Show or not currently linked part of the window
            showApoBody : false,                   // Show or not APO Body
            showApoFooter : true,                  // Show or not APO footer
            figures : [],                          // Array of search Results from API
            selectedFigureValue : {},              // Name of Selected Figure
            noSearchResultFound : false,           // If Error or No search results found from API
            figureIsSelected : false,              // Figure is selected or not
            apoObject : {},
            imageData : [],
            searchTerm : '' ,                        //Figure name to be find
            currentlyLinkedImageData : {},
            assetID: ""
    }
});

let wrapper;
const searchForFigures =jest.fn();
let props = {
    searchForFigures : jest.fn(),
    apoSearchClose: jest.fn(),
    selectedFigure:jest.fn(),
    saveAssetLinkedMedia : jest.fn(),
    assetIdForSnapshot: jest.fn()
}

beforeEach(() => {
    wrapper = mount(<Provider store={store}>< AssetPopoverSearch {...props}/> </Provider>)
})

global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({json:jest.fn(),id:'urn:pearson134'});
   });
 });
//Rendering test cases
describe('Test Rendering of AssetPopover', () => {
    it('Have 1 input Box', () => {
        expect(wrapper.find('.modal__close')).toHaveLength(1);
    })
});

//Interaction function test cases
describe('Interaction functions test cases', () => {
    it('Testing currentlyLinkedJsx function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let returnedValue = instance.currentlyLinkedJsx();
        expect(typeof returnedValue).toEqual('object');
    }),
    it('Testing apoBodyJsx function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let returnedValue = instance.apoBodyJsx();
        expect(typeof returnedValue).toEqual('object');
    }),
    it('Testing selectedFigure function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.selectedFigure();
        expect(instance.props.selectedFigure).toHaveBeenCalled();
    }), 
    it('Testing apoSearchClose props function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.props.apoSearchClose();
        expect(instance.props.apoSearchClose).toHaveBeenCalled();
    }),  
    it('Testing apoFooterJsx  function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = true, 
        shouldShowApoBody, 
        isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(tempWrapper.find('AssetPopoverSearch').props().selectedFigure).not.toHaveBeenCalled();
    })

    it('Testing apoFooterJsx else function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = true, 
        shouldShowApoBody, 
        isSearchResultFound = true;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch searchForFigures ={searchForFigures}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        tempWrapper.update();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(tempWrapper.find('AssetPopoverSearch').props().searchForFigures).not.toHaveBeenCalled();
    })

    it('Testing apoFooterJsx else if function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = false, 
        shouldShowApoBody = true, 
        isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(typeof tempWrapper.find('AssetPopoverSearch').props().apoSearchClose).toEqual('function');
    })

    it('Testing hideAPOOnOuterClick function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        instance.hideAPOOnOuterClick();
        expect(instance.apoSearchClose).toHaveBeenCalled();
    }) 

    it('Testing apoSearchSave function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        let apoObject = {}
        let imageObj = ['entityUrn', 'projectUrn'];
        instance.saveAssetLinkedMedia = jest.fn();
        instance.apoSearchSave(apoObject,imageObj);
        expect(instance.saveAssetLinkedMedia).toHaveBeenCalled();
    }) 
    it('Testing removeLink function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn();
        instance.removeLink();
        expect(instance.apoSearchClose).toHaveBeenCalled();
    })

    it('Testing apoSearchClose  function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'asset-popover-attacher');
        simpleDiv.innerHTML = 'test';
        document.body.appendChild(simpleDiv);
        instance.apoSearchClose()
        expect(instance.props.apoSearchClose).toHaveBeenCalled()
    })

    it('Testing searchForFigures function', () => {
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props}/> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        let event = {target : {value : 'abc'}}
        let stateImageData = []
        tempWrapper.setProps({
        searchForFigures : jest.fn()
        })
        tempWrapper.update();
        instance.searchForFigures(event, stateImageData);
        expect(instance.props.searchForFigures).toHaveBeenCalled();
    })

    it('Testing saveAssetLinkedMedia update function', ()=>{
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props}/> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        const spysaveAssetLinkedMedia = jest.spyOn(instance, 'saveAssetLinkedMedia')
        let apoObject = {'assetId': 'urn:work:1b4234nb234bv523b4v52b3v45'}, imageObj = {'entityUrn': 'urn:entity:12gdh1g34g12v12h34512'}
        tinymce.activeEditor = {'id' : 'cypress-1'}
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'cypress-1');
        simpleDiv.innerHTML = '<abbr asset-id="urn:work:1b4234nb234bv523b4v52b3v45"> Hello </abbr>';
        document.body.appendChild(simpleDiv);
        instance.saveAssetLinkedMedia(apoObject,imageObj)
        expect(spysaveAssetLinkedMedia).toHaveBeenCalled()
        spysaveAssetLinkedMedia.mockClear() 
    })

    it('Testing saveAssetLinkedMedia create function', ()=>{
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props}/> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        const spysaveAssetLinkedMedia = jest.spyOn(instance, 'saveAssetLinkedMedia')
        let apoObject = { }, imageObj = {'entityUrn': 'urn:entity:12gdh1g34g12v12h34512'}
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'asset-popover-attacher');
        simpleDiv.innerHTML = '<span> Hello </abbr>';
        document.body.appendChild(simpleDiv);
        instance.saveAssetLinkedMedia(apoObject,imageObj)
        expect(spysaveAssetLinkedMedia).toHaveBeenCalled()
        spysaveAssetLinkedMedia.mockClear() 
    })
})

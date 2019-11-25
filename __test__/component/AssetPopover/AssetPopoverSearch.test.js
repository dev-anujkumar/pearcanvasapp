import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
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
            currentlyLinkedImageData : {}
    }
});

let wrapper;
const searchForFigures = new stub();

beforeEach(() => {
    wrapper = mount(<Provider store={store}>< AssetPopoverSearch /> </Provider>)
})

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
      
        instance.currentlyLinkedJsx()
    }),
    it('Testing apoBodyJsx function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoBodyJsx()
    }),
    it('Testing selectedFigure function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.selectedFigure()
    }), 
    it('Testing apoSearchClose props function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        wrapper.setProps({
            apoSearchClose : jest.fn()
        })
        instance.props.apoSearchClose()
    }),  
    it('Testing apoFooterJsx  function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = true, 
        shouldShowApoBody, 
        isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch searchForFigures ={searchForFigures}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        wrapper.setProps({
            apoSearchClose : jest.fn(),
            selectedFigureValue : jest.fn()
        })
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound)
    })

    it('Testing apoFooterJsx else function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = true, 
        shouldShowApoBody, 
        isSearchResultFound = true;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch searchForFigures ={searchForFigures}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        wrapper.setProps({
            apoSearchClose : jest.fn(),
            selectedFigureValue : jest.fn()
        })
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound)
    })

    it('Testing apoFooterJsx else if function', () => {
        let isFigureSelected,
        shouldOpenCurrentlyLinked = false, 
        shouldShowApoBody = true, 
        isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch searchForFigures ={searchForFigures}/> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        wrapper.setProps({
            apoSearchClose : jest.fn(),
            selectedFigureValue : jest.fn()
        })
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound)
    })

    it('Testing hideAPOOnOuterClick function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        instance.hideAPOOnOuterClick()
    }) 

    xit('Testing apoSearchSave function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        let apoObject = {}
        let imageObj = {}
        instance.apoSearchSave()
    }) 
    it('Testing removeLink function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        let apoObject = {}
        let imageObj = {}
        instance.removeLink()
    })

    it('Testing apoSearchClose  function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'asset-popover-attacher');
        simpleDiv.innerHTML = 'test';
        document.body.appendChild(simpleDiv);
        instance.apoSearchClose ()
    })
})

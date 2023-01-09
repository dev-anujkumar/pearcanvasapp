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

jest.mock('../../../src/js/toggleLoader.js', () => ({
    hideToc: jest.fn(),
    disableHeader: jest.fn()
}))
import tinymce from 'tinymce/tinymce';

jest.mock('../../../src/component/AssetPopover/AssetPopover_Actions.js', () => ({
    getAssetPopoverId: () => Promise.resolve({})
}))
jest.mock('../../../src/js/utils', () => {
    return {
        customEvent: {
            trigger: () => Promise.resolve({})
        }
    }
})

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    assetPopOverSearch: {
        showApoSearch: false,                 // Weather show or not the popover window
        showApoCurrentlyLinked: false,        // Show or not currently linked part of the window
        showApoBody: false,                   // Show or not APO Body
        showApoFooter: true,                  // Show or not APO footer
        selectedFigureValue: {},              // Name of Selected Figure
        noSearchResultFound: false,           // If Error or No search results found from API
        figureIsSelected: false,              // Figure is selected or not
        apoObject: {},
        imageData: [],
        searchTerm: '',                        //Figure name to be find
        assetID: "",
        figures: [],
        audios: [],
        videos: [],
        interactives: [],
        smartLinkInteractives: [],
        asides: [],
        tables: [],
        workedExamples: [],
        currentlyLinkedImageData: {
            title: "test",
            caption: "caption"
        },
    }
});

const store2 = mockStore({
    assetPopOverSearch: {
        showApoSearch: false,                 // Weather show or not the popover window
        showApoCurrentlyLinked: true,        // Show or not currently linked part of the window
        showApoBody: true,                   // Show or not APO Body
        showApoFooter: false,                  // Show or not APO footer
        selectedFigureValue: {},              // Name of Selected Figure
        noSearchResultFound: false,           // If Error or No search results found from API
        figureIsSelected: false,              // Figure is selected or not
        apoObject: {},
        imageData: [],
        searchTerm: '',                        //Figure name to be find
        assetID: "",
        currentlyLinkedImageData: {},
    }
});

let wrapper, wrapper2;
const searchForFigures = jest.fn();
let props = {
    searchForFigures: jest.fn(),
    apoSearchClose: jest.fn(),
    selectedFigure: jest.fn(),
    saveAssetLinkedMedia: jest.fn(),
    assetIdForSnapshot: jest.fn(),
    showBlocker: jest.fn()
}

beforeEach(() => {
    wrapper = mount(<Provider store={store}>< AssetPopoverSearch {...props} /> </Provider>)
    wrapper2 = mount(<Provider store={store2}>< AssetPopoverSearch {...props} /> </Provider>)
})

global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
        resolve({ json: jest.fn(), id: 'urn:pearson134' });
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
    });

    it('Testing currentlyLinkedJsx function : false', () => {
        const instance = wrapper2.find('AssetPopoverSearch').instance();
        let returnedValue = instance.currentlyLinkedJsx();
        expect(typeof returnedValue).toEqual('object');
    });

    it('Testing apoBodyJsx function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let returnedValue = instance.apoBodyJsx();
        expect(typeof returnedValue).toEqual('object');
    });

    it('Testing apoBodyJsx function : false', () => {
        const instance = wrapper2.find('AssetPopoverSearch').instance();
        let returnedValue = instance.apoBodyJsx();
        expect(typeof returnedValue).toEqual('object');
    });

    it('Testing selectedFigure function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.selectedFigure();
        expect(instance.props.selectedFigure).toHaveBeenCalled();
    });

    it('Testing apoSearchClose props function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.props.apoSearchClose();
        expect(instance.props.apoSearchClose).toHaveBeenCalled();
    });

    it('Testing apoFooterJsx  function', () => {
        let isFigureSelected,
            shouldOpenCurrentlyLinked = true,
            shouldShowApoBody,
            isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(tempWrapper.find('AssetPopoverSearch').props().selectedFigure).not.toHaveBeenCalled();
    });

    it('Testing apoFooterJsx else function', () => {
        let isFigureSelected,
            shouldOpenCurrentlyLinked = true,
            shouldShowApoBody,
            isSearchResultFound = true;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch searchForFigures={searchForFigures} {...props} /> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        tempWrapper.update();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(tempWrapper.find('AssetPopoverSearch').props().searchForFigures).not.toHaveBeenCalled();
    });

    it('Testing apoFooterJsx else if function', () => {
        let isFigureSelected,
            shouldOpenCurrentlyLinked = false,
            shouldShowApoBody = true,
            isSearchResultFound = false;
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>)
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        instance.apoFooterJsx(isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound);
        expect(typeof tempWrapper.find('AssetPopoverSearch').props().apoSearchClose).toEqual('function');
    });

    it('Testing hideAPOOnOuterClick function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        instance.hideAPOOnOuterClick();
        expect(instance.apoSearchClose).toHaveBeenCalled();
    });

    it('Testing apoSearchSave function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn()
        let apoObject = {}
        let imageObj = ['entityUrn', 'projectUrn'];
        instance.saveAssetLinkedMedia = jest.fn();
        instance.apoSearchSave(apoObject, imageObj);
        expect(instance.saveAssetLinkedMedia).toHaveBeenCalled();
    });

    it('Testing removeLink function - if condition', () => {
        jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
            return 'cypress-1'
        })
        jest.spyOn(tinymce, '$').mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    return {
                        length: true
                    }
                })
            }
        }).mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    let arr = new Array();
                    arr.push({
                        focus: jest.fn()
                    })
                    return arr
                })
            }
        }).mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    let arr = new Array();
                    arr.push({
                        blur: jest.fn()
                    })
                    return arr
                })
            }
        })
        tinymce.activeEditor = { 'id': 'cypress-1' }
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn();
        jest.useFakeTimers();
        instance.removeLink();
        jest.advanceTimersByTime(1000);
        expect(instance.apoSearchClose).toHaveBeenCalled();
    });

    it('Testing removeLink function - else condition', () => {
        jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
            return {
                focus: jest.fn(),
                blur: jest.fn()
            }
        })
        jest.spyOn(tinymce, '$').mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    return {
                        length: false
                    }
                })
            }
        })
        tinymce.activeEditor = { 'id': 'cypress-1' }
        const instance = wrapper.find('AssetPopoverSearch').instance();
        instance.apoSearchClose = jest.fn();
        jest.useFakeTimers();
        instance.removeLink();
        jest.advanceTimersByTime(1000);
        expect(instance.apoSearchClose).toHaveBeenCalled();
    });

    it('Testing apoSearchClose  function', () => {
        const instance = wrapper.find('AssetPopoverSearch').instance();
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'asset-popover-attacher');
        simpleDiv.innerHTML = 'test';
        document.body.appendChild(simpleDiv);
        instance.apoSearchClose()
        expect(instance.props.apoSearchClose).toHaveBeenCalled()
    });

    it('Testing searchForFigures function', () => {
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        let event = { target: { value: 'abc' } }
        let stateImageData = []
        tempWrapper.setProps({
            searchForFigures: jest.fn()
        })
        tempWrapper.update();
        instance.searchForFigures(event, stateImageData);
        expect(instance.props.searchForFigures).toHaveBeenCalled();
    });

    it('Testing saveAssetLinkedMedia update function - if condition', () => {
        jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
            return {
                focus: jest.fn(),
                querySelector: jest.fn(() => {
                    return {
                        innerHTML: "innerHTML"
                    }
                })
            }
        }).mockImplementationOnce(() => {
            return true
        }).mockImplementationOnce(() => {
            return {
                outerHTML: "outerHTML"
            }
        }).mockImplementationOnce(() => {
            return 'cypress-1'
        })
        jest.spyOn(tinymce, '$').mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    return {
                        length: true
                    }
                })
            }
        }).mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    let arr = new Array();
                    arr.push({
                        focus: jest.fn()
                    })
                    return arr
                })
            }
        }).mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    let arr = new Array();
                    arr.push({
                        blur: jest.fn()
                    })
                    return arr
                })
            }
        })
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        const spysaveAssetLinkedMedia = jest.spyOn(instance, 'saveAssetLinkedMedia')
        let apoObject = { 'assetId': 'urn:work:1b4234nb234bv523b4v52b3v45' }, imageObj = { 'contentUrn': 'urn:entity:12gdh1g34g12v12h34512'}
        tinymce.activeEditor = { 'id': 'cypress-1' }
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'cypress-1');
        simpleDiv.innerHTML = '<abbr asset-id="urn:work:1b4234nb234bv523b4v52b3v45"> Hello </abbr>';
        document.body.appendChild(simpleDiv);
        jest.useFakeTimers();
        instance.saveAssetLinkedMedia(apoObject, imageObj)
        jest.advanceTimersByTime(1000);
        expect(spysaveAssetLinkedMedia).toHaveBeenCalled()
        spysaveAssetLinkedMedia.mockClear()
    });

    it('Testing saveAssetLinkedMedia update function - else condition', () => {
        jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
            return {
                focus: jest.fn(),
                querySelector: jest.fn(() => {
                    return {
                        innerHTML: "innerHTML"
                    }
                })
            }
        }).mockImplementationOnce(() => {
            return true
        }).mockImplementationOnce(() => {
            return {
                outerHTML: "outerHTML"
            }
        }).mockImplementationOnce(() => {
            return {
                blur: jest.fn()
            }
        })
        jest.spyOn(tinymce, '$').mockImplementationOnce(() => {
            return {
                find: jest.fn(() => {
                    return {
                        length: false
                    }
                })
            }
        })
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        const spysaveAssetLinkedMedia = jest.spyOn(instance, 'saveAssetLinkedMedia')
        let apoObject = { 'assetId': 'urn:work:1b4234nb234bv523b4v52b3v45' }, imageObj = { 'contentUrn': 'urn:entity:12gdh1g34g12v12h34512'}
        tinymce.activeEditor = { 'id': 'cypress-1' }
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'cypress-1');
        simpleDiv.innerHTML = '<abbr asset-id="urn:work:1b4234nb234bv523b4v52b3v45"> Hello </abbr>';
        document.body.appendChild(simpleDiv);
        jest.useFakeTimers();
        instance.saveAssetLinkedMedia(apoObject, imageObj)
        jest.advanceTimersByTime(1000);
        expect(spysaveAssetLinkedMedia).toHaveBeenCalled()
        spysaveAssetLinkedMedia.mockClear()
    });

    it('Testing saveAssetLinkedMedia create function', () => {
        jest.spyOn(document, 'getElementById').mockImplementationOnce(() => {
            return {
                focus: jest.fn()
            }
        }).mockImplementationOnce(() => {
            return true
        }).mockImplementationOnce(() => {
            return {
                outerHTML: "outerHTML"
            }
        })
        let tempWrapper = mount(<Provider store={store}><AssetPopoverSearch {...props} /> </Provider>);
        const instance = tempWrapper.find('AssetPopoverSearch').instance();
        const spysaveAssetLinkedMedia = jest.spyOn(instance, 'saveAssetLinkedMedia')
        let apoObject = {}, imageObj = { 'contentUrn': 'urn:entity:12gdh1g34g12v12h34512' }
        let simpleDiv = document.createElement('div');
        simpleDiv.setAttribute('id', 'asset-popover-attacher');
        simpleDiv.innerHTML = '<span> Hello </abbr>';
        document.body.appendChild(simpleDiv);
        jest.useFakeTimers();
        instance.saveAssetLinkedMedia(apoObject, imageObj)
        jest.advanceTimersByTime(100);
        expect(spysaveAssetLinkedMedia).toHaveBeenCalled()
        spysaveAssetLinkedMedia.mockClear()
    });
});

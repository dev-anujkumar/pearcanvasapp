import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
import MetaDataPopUpForTE from '../../../src/component/ElementFigure/MetaDataPopUpForTE';


describe('Testcase for MetaDataPopUpForTE Component', () => {
    let wrapper;
    let props = {
        togglePopup: jest.fn()
    }
    jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
        return { 
            updateEditedData: ()=>{
                return jest.fn()
            },
        }
    })
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
        appStore: {
            editedImageList: {
                    "altText": "TEst  new",
                    "longdescription": "Tet",
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg",
                    "imgId": "imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2703"
            }
        }
    })
    beforeEach(() => {
        
        let props = {
            "imageList" : [
                {   
                    "id": 1,
                    "altText": "one two three 4",
                    "longdescription": "one two threee <h#$",
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg",
                    "imgId": "imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2703"
                },
                {
                    "id": 2,
                    "altText": "Alt text ",
                    "longdescription": "This is for testing long desc new<html>",
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg",
                    "imgId": "imageAssetContent:31189d68-e07d-42f6-923e-a78955387c6f:3448"
                },
                {
                    "id": 3,
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/2e087bca-5f67-452e-9e15-96145584a12a/Qutub_Minar_in_the_monsoons_20170908115259.jpg",
                    "imgId": "imageAssetContent:2e087bca-5f67-452e-9e15-96145584a12a:2551"
                },
            ],
        }
        wrapper = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
     });
    
     it("MetaDataPopUpForTE component render without crashing", () => {
        expect(wrapper).toHaveLength(1);
        let instance = wrapper.instance();
        expect(instance).toBeDefined();
    });
    
    // it('onClick Event of cancel-button', () => {
    //     let togglePopup = jest.fn();
    //     let prepareImageDataFromTable = jest.fn();
        
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} imageList={props.imageList} togglePopup={togglePopup} 
    //         prepareImageDataFromTable={prepareImageDataFromTable}/></Provider>);
    //     component.find('#close-container').simulate('click');
    //     expect(component.instance().props.togglePopup).toHaveBeenCalled();
    //     // expect(component.instance().props.prepareImageDataFromTable).toHaveBeenCalled();
    // })

    // it('onClick Event of longDescription body', () => {
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
    //     component.find('.long-description-body').simulate('click');
    // })

    // it('onClick Event alt-text-body', () => {
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
    //     component.find('.alt-text-body').simulate('click');
    // })

    // it('onClick Event metadata-import-button', () => {
    //     let togglePopup = jest.fn();
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE togglePopup={togglePopup} /></Provider>);
    //     component.find('.metadata-import-button').simulate('click');
    // })
    // it('Changing input altText', () => {
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
    //     let event={ target: { value: '123' } }
    //     component.find('#altText_AM').simulate('change',event);
    // })

    // it('Changing input longDescription', () => {
    //     const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
    //     let event={ target: { value: '123' } }
    //     component.find('#longDescription_AM').simulate('change',event);
    // })

    it('Checking for disable right arrow button when condition is met', () => {
        const component = mount(<Provider store={store}><MetaDataPopUpForTE {...props} /></Provider>);
        let MetaDataPopUpForTEInstance = component.find('MetaDataPopUpForTE').instance()
        expect(component.state('index')).toBe(0)


    })

})
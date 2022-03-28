import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
import MetaDataPopUpForTE from '../../../src/component/ElementFigure/MetaDataPopUpForTE';


describe('Testcase for MetaDataPopUpForTE Component', () => {
    let wrapper;
    let props = {
        "showAlfrescoEditPopupforTE": true,
        "imageList": [
            { 
                "id": 1,
                "altText": "Alt text ",
                "longdescription": "This is for testing long desc new<html>",
                "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg",
                "imgId": "imageAssetContent:31189d68-e07d-42f6-923e-a78955387c6f:4749"
            },
            {
                "id": 2,
                "altText": "Image perf new123<h1>",
                "longdescription": "Alf Long description perf new 123 789",
                "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/4636470d-12c9-4416-928c-cd036a8618d3/07fig15.jpg",
                "imgId": "imageAssetContent:4636470d-12c9-4416-928c-cd036a8618d3:7579"
            },
            {
                "id": 3,
                "altText": "This is he sample alfresco asset<h1>",
                "longdescription": "222",
                "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/466410f5-3b38-4dc9-8caf-aa8705162990/m22_mari0999_11_se_c22-16.png",
                "imgId": "imageAssetContent:466410f5-3b38-4dc9-8caf-aa8705162990:5288"
            },
        ],
        "element": {
            "id": "urn:pearson:work:8ad4dfec-5d12-439a-99d4-52d863c9895a",
            "type": "figure",
            "figuretype": "tableasmarkup",
            "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
            "titlecontentintitlefield": true,
            "figuredata": {
                "schema": "http://schemas.pearson.com/wip-authoring/table/1/definitions/tableasmarkup",
                "tableasHTML": "<table style=\"border-collapse: collapse; width: 942px; word-break: normal; outline: none; height: 161.782px; text-align: left;\" class=\"mce-item-table\" contenteditable=\"false\"><tbody><tr style=\"height: 118.594px;\"><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/d8f28a48-63c1-42de-9ea6-0fcb6685ea54/flower.jpg\" width=\"48\" height=\"112\" data-id=\"imageAssetContent:d8f28a48-63c1-42de-9ea6-0fcb6685ea54:7332\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/d8f28a48-63c1-42de-9ea6-0fcb6685ea54/flower.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg\" width=\"150\" height=\"94\" data-id=\"imageAssetContent:31189d68-e07d-42f6-923e-a78955387c6f:4749\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\" width=\"149\" height=\"112\" data-id=\"imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2611\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4819307d-7857-44f6-809a-24cae6836ff6/carimageNew01-QA.jpg\" width=\"150\" height=\"84\" data-id=\"imageAssetContent:4819307d-7857-44f6-809a-24cae6836ff6:7902\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4819307d-7857-44f6-809a-24cae6836ff6/carimageNew01-QA.jpg\"/></td></tr><tr style=\"height: 21.5938px;\"><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/eab73fa2-fc4f-4ff3-adf3-cee2c3923861/car2.jpg\" width=\"148\" height=\"112\" data-id=\"imageAssetContent:eab73fa2-fc4f-4ff3-adf3-cee2c3923861:6140\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/eab73fa2-fc4f-4ff3-adf3-cee2c3923861/car2.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/2e087bca-5f67-452e-9e15-96145584a12a/Qutub_Minar_in_the_monsoons_20170908115259.jpg\" width=\"150\" height=\"101\" data-id=\"imageAssetContent:2e087bca-5f67-452e-9e15-96145584a12a:3916\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/2e087bca-5f67-452e-9e15-96145584a12a/Qutub_Minar_in_the_monsoons_20170908115259.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/61721d40-c456-45fc-a86e-fece7e578191/jp_2x.png\" width=\"112\" height=\"112\" data-id=\"imageAssetContent:61721d40-c456-45fc-a86e-fece7e578191:7576\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/61721d40-c456-45fc-a86e-fece7e578191/jp_2x.png\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4636470d-12c9-4416-928c-cd036a8618d3/07fig15.jpg\" width=\"150\" height=\"91\" data-id=\"imageAssetContent:4636470d-12c9-4416-928c-cd036a8618d3:7579\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4636470d-12c9-4416-928c-cd036a8618d3/07fig15.jpg\"/></td></tr><tr style=\"height: 21.5938px;\"><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/aeb9548c-c02b-4e80-bc70-1a4c76cbb915/IMG71004-1.jpg\" width=\"150\" height=\"81\" data-id=\"imageAssetContent:aeb9548c-c02b-4e80-bc70-1a4c76cbb915:2257\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/aeb9548c-c02b-4e80-bc70-1a4c76cbb915/IMG71004-1.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/466410f5-3b38-4dc9-8caf-aa8705162990/m22_mari0999_11_se_c22-16.png\" width=\"70\" height=\"112\" data-id=\"imageAssetContent:466410f5-3b38-4dc9-8caf-aa8705162990:5288\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/466410f5-3b38-4dc9-8caf-aa8705162990/m22_mari0999_11_se_c22-16.png\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4b5d7095-cbf7-4d92-95c0-9d7092afddc3/Tree.jpg\" width=\"150\" height=\"86\" data-id=\"imageAssetContent:4b5d7095-cbf7-4d92-95c0-9d7092afddc3:7503\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4b5d7095-cbf7-4d92-95c0-9d7092afddc3/Tree.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\" width=\"149\" height=\"112\" data-id=\"imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:5468\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\"/></td></tr></tbody></table>"
            },
            "html": {
                "title": "<p><br></p>",
                "tableasHTML": "<table style=\"border-collapse: collapse; width: 942px; word-break: normal; outline: none; height: 161.782px; text-align: left;\" class=\"mce-item-table\" contenteditable=\"false\"><tbody><tr style=\"height: 118.594px;\"><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/d8f28a48-63c1-42de-9ea6-0fcb6685ea54/flower.jpg\" width=\"48\" height=\"112\" data-id=\"imageAssetContent:d8f28a48-63c1-42de-9ea6-0fcb6685ea54:7332\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/d8f28a48-63c1-42de-9ea6-0fcb6685ea54/flower.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg\" width=\"150\" height=\"94\" data-id=\"imageAssetContent:31189d68-e07d-42f6-923e-a78955387c6f:4749\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/31189d68-e07d-42f6-923e-a78955387c6f/galaxy_assesttest%20%281%29.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\" width=\"149\" height=\"112\" data-id=\"imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2611\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 118.594px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4819307d-7857-44f6-809a-24cae6836ff6/carimageNew01-QA.jpg\" width=\"150\" height=\"84\" data-id=\"imageAssetContent:4819307d-7857-44f6-809a-24cae6836ff6:7902\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4819307d-7857-44f6-809a-24cae6836ff6/carimageNew01-QA.jpg\"/></td></tr><tr style=\"height: 21.5938px;\"><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/eab73fa2-fc4f-4ff3-adf3-cee2c3923861/car2.jpg\" width=\"148\" height=\"112\" data-id=\"imageAssetContent:eab73fa2-fc4f-4ff3-adf3-cee2c3923861:6140\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/eab73fa2-fc4f-4ff3-adf3-cee2c3923861/car2.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/2e087bca-5f67-452e-9e15-96145584a12a/Qutub_Minar_in_the_monsoons_20170908115259.jpg\" width=\"150\" height=\"101\" data-id=\"imageAssetContent:2e087bca-5f67-452e-9e15-96145584a12a:3916\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/2e087bca-5f67-452e-9e15-96145584a12a/Qutub_Minar_in_the_monsoons_20170908115259.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/61721d40-c456-45fc-a86e-fece7e578191/jp_2x.png\" width=\"112\" height=\"112\" data-id=\"imageAssetContent:61721d40-c456-45fc-a86e-fece7e578191:7576\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/61721d40-c456-45fc-a86e-fece7e578191/jp_2x.png\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4636470d-12c9-4416-928c-cd036a8618d3/07fig15.jpg\" width=\"150\" height=\"91\" data-id=\"imageAssetContent:4636470d-12c9-4416-928c-cd036a8618d3:7579\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4636470d-12c9-4416-928c-cd036a8618d3/07fig15.jpg\"/></td></tr><tr style=\"height: 21.5938px;\"><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/aeb9548c-c02b-4e80-bc70-1a4c76cbb915/IMG71004-1.jpg\" width=\"150\" height=\"81\" data-id=\"imageAssetContent:aeb9548c-c02b-4e80-bc70-1a4c76cbb915:2257\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/aeb9548c-c02b-4e80-bc70-1a4c76cbb915/IMG71004-1.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/466410f5-3b38-4dc9-8caf-aa8705162990/m22_mari0999_11_se_c22-16.png\" width=\"70\" height=\"112\" data-id=\"imageAssetContent:466410f5-3b38-4dc9-8caf-aa8705162990:5288\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/466410f5-3b38-4dc9-8caf-aa8705162990/m22_mari0999_11_se_c22-16.png\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/4b5d7095-cbf7-4d92-95c0-9d7092afddc3/Tree.jpg\" width=\"150\" height=\"86\" data-id=\"imageAssetContent:4b5d7095-cbf7-4d92-95c0-9d7092afddc3:7503\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/4b5d7095-cbf7-4d92-95c0-9d7092afddc3/Tree.jpg\"/></td><td style=\"width: 235.5px; outline: none; height: 21.5938px;\"><img class=\"imageAssetContent\" src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\" width=\"149\" height=\"112\" data-id=\"imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:5468\" data-mce-src=\"https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg\"/></td></tr></tbody></table>",
                "captions": "<p><br></p>",
                "credits": "<p><br></p>",
                "footnotes": {},
                "assetsPopover": {},
                "glossaryentries": {},
                "indexEntries": {}
            },
            "versionUrn": "urn:pearson:work:8ad4dfec-5d12-439a-99d4-52d863c9895a",
            "contentUrn": "urn:pearson:entity:55819b99-c270-48b0-b4ab-c9b74aafa951",
            "displayedlabel": "Table",
            "numberedandlabel": true,
            "indexPos": "1",
            "parentDetails": [],
            "slateEntityUrn": "urn:pearson:entity:1d157ee4-6766-497a-bf8e-6fc877ff60a3"
        },
        "index": 1,
        "editedImageList": {},
        prepareImageDataFromTable: jest.fn(),
        togglePopup: jest.fn(),
        updateEditedData: jest.fn(),
        updateFigureData: jest.fn(),
    
    }
    jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions.js', () => {
        return { 
            updateEditedData: ()=>{
                return jest.fn()
            },
            prepareImageDataFromTable: ()=>{
                return jest.fn()
            },
        }
    })
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
        appStore: {
            tableElementEditedData: {
                    "altText": "TEst  new",
                    "longdescription": "Tet",
                    "imgSrc": "https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg",
                    "imgId": "imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:2703"
            },
            
        },
    })
    beforeEach(() => {
        
        
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
        // const wrapper1 = mount(<Provider store={store}><MetaDataPopUpForTE {...props}/></Provider>);
        // const textArea = wrapper1.find('textarea');
        // console.log('textArea : ',textArea)
        // let event={ target: { value: '123<h1>' } }
        // textArea.simulate('change',event)
        // expect(component.find('.alt-text-span')).toHaveLength(1)
       
        const wrapper = mount(<Provider store={store}><MetaDataPopUpForTE {...props}/></Provider>);
        console.log('wrapper : ',wrapper)
        const container = wrapper.find('textarea')
        // expect(container.length).to.equal(1)
        // container.simulate('keyup', {keyCode: 27});
        // expect(store.getActions()[0]).to.deep.equal(expectedAction);


    })

})
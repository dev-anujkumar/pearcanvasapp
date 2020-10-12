import reducer from '../../src/appstore/assetPopoverReducer';
const INITIAL_STATE = {
    showApoSearch: false,                 // Weather show or not the popover window
    showApoCurrentlyLinked: false,        // Show or not currently linked part of the window
    showApoBody: false,                   // Show or not APO Body
    showApoFooter: true,                  // Show or not APO footer
    figures: [],                          // Array of search Results from API
    selectedFigureValue: {},              // Name of Selected Figure
    noSearchResultFound: false,           // If Error or No search results found from API
    figureIsSelected: false,              // Figure is selected or not
    apoObject: {},
    imageData: [],
    searchTerm: '',                        //Figure name to be find
    currentlyLinkedImageData: {},
    "assetID": ""
};

const mockFigureData = [{
    containerContentUrn: "urn:pearson:entity:bc0c2a40-d752-42a6-be72-f14faebde0d3",
    entityUrn: "urn:pearson:entity:e2bf268e-a156-4499-9c51-259af2e14404",
    imageId: "urn:pearson:work:b47ee1a3-e652-4b2b-bfc5-563d40a8373d",
    path: "https://cite-media-stg.pearson.com/legacy_paths/0d5ab99d-f5cc-4850-911f-d6cecace55ba/Reliefs",
    subTile: "Image - title",
    title: "Image",
    versionUrn: "urn:pearson:work:b328eb2a-19d6-4a41-bc7b-18903ad14577"
},
{
    containerContentUrn: "urn:pearson:entity:bc0c2a40-d752-42a6-be72-f14faebde0d3",
    entityUrn: "urn:pearson:entity:e15d9d5a-b3ef-4bcb-bdb3-c880db59a395",
    imageId: "urn:pearson:work:a077e172-147e-4dae-a5f2-2ccc89f8fe76",
    path: "https://cite-media-stg.pearson.com/legacy_paths/001b48bf-cf9c-409e-b2b9-b51a05e715c1/Hadrien-ven.JPG",
    subTile: "Table image - title",
    title: "Table image- label",
    versionUrn: "urn:pearson:work:ee520d1c-98ba-464a-9c14-e96c20ba1ae0"
}]
const selectedFigureData = {
    containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
    entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
    imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
    path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
    subTile: "",
    title: "Smart link - 3rd party",
    versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
}
const initialState5={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: true,             
    apoObject: {},
    imageData: [],
    searchTerm: '',                       
    currentlyLinkedImageData: {}
};
const expectedState5={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: false,             
    apoObject: {},
    imageData: [],
    searchTerm: '',                       
    currentlyLinkedImageData: {}
};
const initialState6={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: false,             
    apoObject: {},
    imageData: [],
    searchTerm: '',                       
    currentlyLinkedImageData: {}
};
const expectedState6={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: false,             
    apoObject: {},
    imageData: [],
    searchTerm: 'p',                       
    currentlyLinkedImageData: {}
};
const initialState7={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: false,             
    apoObject: {},
    imageData: [],
    searchTerm: 'p',                       
    currentlyLinkedImageData: {}
};
const expectedState7={
    showApoSearch: false,                
    showApoCurrentlyLinked: false,        
    showApoBody: false,                  
    showApoFooter: true,                 
    figures: [],                         
    selectedFigureValue:{
        containerContentUrn: "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6",
        entityUrn: "urn:pearson:entity:b2091e4a-7925-4d84-91fd-68cc43a431f7",
        imageId: "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        path: "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        subTile: "",
        title: "Smart link - 3rd party",
        versionUrn: "urn:pearson:work:0306c989-fc84-4ed8-8d51-fcde1813af98"
    },             
    noSearchResultFound: false,          
    figureIsSelected: false,             
    apoObject: {},
    imageData: [],
    searchTerm: 'p',                       
    currentlyLinkedImageData: {},
    removeAssetLink: true
};
describe('testing Asset Popover Reducer cases -->', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('Test 1- TOGGLE_APO_SEARCH', () => {
        reducer(INITIAL_STATE, {
            type: 'TOGGLE_APO_SEARCH',
            payload: {
                showApoSearch: true,
                apoObject: {},
                showApoCurrentlyLinked: false,
                currentlyLinkedImageData: {},
                showApoFooter: true,
                showApoBody: false,
                noSearchResultFound: true,
                figures: [],
                selectedFigureValue: '',
                figureIsSelected: false
            }
        })
    })
    it('Test 2- IMAGES_FROM_API', () => {
        reducer(INITIAL_STATE, {
            type: 'IMAGES_FROM_API',
            payload: {
                figures: mockFigureData,
                searchTerm: "p",
                noSearchResultFound: false,
                showApoBody: true,
                showApoFooter: true,
                timeByAPI: ''
            }
        })
    })
    it('Test 3- IMAGES_FROM_API_FAIL', () => {
        reducer(INITIAL_STATE, {
            type: 'IMAGES_FROM_API_FAIL',
            payload: {
                figures: [],
                noSearchResultFound: true,
                showApoBody: false
            }
        })
    })
    it('Test 4- SELECTED_FIGURE', () => {
        reducer(INITIAL_STATE, {
            type: 'SELECTED_FIGURE',
            payload: {
                selectedFigureValue: selectedFigureData,
                figureIsSelected: true
            }
        })
    })
    it('Test 5- APO_SEARCH_SAVE', () => {
        expect(reducer(initialState5, {
            type: 'APO_SEARCH_SAVE',
            payload: {
                apoObject: {},
                imageData: [],
                figureIsSelected: false
            }
        })).toEqual(expectedState5);
    })
    it('Test 6- USE_STATE_IMAGE_DATA', () => {
        expect(reducer(initialState6, {
            type: 'USE_STATE_IMAGE_DATA',
            payload: {
                searchTerm: 'p'
            }
        })).toEqual(expectedState6);
    })
    it('Test 7- REMOVE_ASSET_LINK', () => {
        expect(reducer(initialState7, {
            type: 'REMOVE_ASSET_LINK',
            payload: {
                removeAssetLink: true
            }
        })).toEqual(expectedState7);
    })
});

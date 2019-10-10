const INITIAL_STATE = {
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
};

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TOGGLE_APO_SEARCH': {              //Toggle APO search
            return {
                ...state,
                showApoSearch : action.payload.toggleApo,
                apoObject : action.payload.apoObject,
                showApoCurrentlyLinked : action.payload.showApoCurrentlyLinked,
                showApoFooter : true,
                showApoBody : false,
                noSearchResultFound : true,
                figures : [],
                selectedFigureValue : '',
                figureIsSelected : false
            }
        }
        case 'IMAGES_FROM_API': {             //Seacrch For figures
            return {
                ...state,
                figures : action.payload.images,
                searchTerm : action.payload.searchTerm,
                noSearchResultFound : false,
                showApoBody : true,
                showApoFooter : true,
                timeByAPI : action.payload.timeByAPI
            }
        }
        case 'IMAGES_FROM_API_FAIL': {         //If searching fails
            return {
                ...state,
                figures : [],
                noSearchResultFound : true,
                showApoBody : false
            }
        }
        case 'SELECTED_FIGURE': {                 //Selected Figure name
            return {
                ...state,
                selectedFigureValue : action.payload.selectedFigure,
                figureIsSelected : true
            }
        }
        case 'APO_SEARCH_SAVE': {
            return {
                ...state,
                apoObject : action.payload.apoObject,
                imageData : action.payload.imageData,
                figureIsSelected : false
            }
        }
        case 'USE_STATE_IMAGE_DATA' : {
            return {
                ...state,
                searchTerm : action.payload.searchTerm
            }
        }
        case 'REMOVE_ASSET_LINK' : {
            return {
                ...state,
                removeAssetLink : action.payload.removeAssetLink
            }
        }
        default:
            return state
    }
}
/**
 * Module - CanvasContext
 * Description - context container | contains context those are being used at various level of component tree
 */

// IMPORT - Plugins //
import React from 'react';

const ElementContainerContext = React.createContext({
    showHideId: "",
    index: "",
    createShowHideElement:null
})
export default ElementContainerContext
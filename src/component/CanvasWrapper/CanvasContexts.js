/**
 * Module - CanvasContext
 * Description - context container | contains context those are being used at various level of component tree
 * Developer - Abhay Singh
 * Last modified - 10-09-2019
 */

// IMPORT - Plugins //
import React from 'react';

const PageNumberContext = React.createContext({
    isPageNumberEnabled: false,
})
export default PageNumberContext
import React, { Component } from 'react'
import TinyMceEditor from "../tinyMceEditor";

/**
 * Renders Citation element
 * @param {object} props - CitationElement component properties
 */
const CitationElement = (props) => {
    const { index, elementId, element, className, model, handleFocus, handleBlur, slateLockInfo, permissions } = props
    return (
        <TinyMceEditor 
            index={index}
            elementId={elementId}
            element={element}
            placeholder="Type Something..."
            className={className}
            model={model}
            tagName = "element-citation"
            handleEditorFocus={handleFocus}
            handleBlur = {handleBlur}
            slateLockInfo={slateLockInfo}
            permissions={permissions}
        />
    )
}

export default CitationElement

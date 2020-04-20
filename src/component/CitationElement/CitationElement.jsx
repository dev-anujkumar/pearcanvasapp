import React from 'react'
import TinyMceEditor from "../tinyMceEditor";

/**
 * Renders Citation element
 * @param {object} props - CitationElement component properties
 */
const CitationElement = (props) => {
    const { index, element, className, model, handleFocus, handleBlur, slateLockInfo, permissions, currentElement } = props
    return (
        <TinyMceEditor 
            index={index}
            elementId={currentElement.id}
            element={element}
            currentElement={currentElement}
            placeholder="Type Something..."
            className={className}
            model={model}
            tagName = "element-citation"
            slateLockInfo={slateLockInfo}
            permissions={permissions}
            handleEditorFocus={handleFocus}
            handleBlur = {handleBlur}
        />
    )
}

export default CitationElement

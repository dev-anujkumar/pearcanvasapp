import React, { Component } from 'react'
import TinyMceEditor from "../tinyMceEditor";

const CitationElement = (props) => {
    const { index, elementId, element, className, model, tagName, handleFocus, handleBlur, slateLockInfo, permissions } = props
    return (
        <TinyMceEditor 
            index={index}
            elementId={elementId}
            element={element}
            placeholder="Type Something..."
            className={className}
            model={model}
            tagName={tagName}
            handleEditorFocus={handleFocus}
            handleBlur = {handleBlur}
            slateLockInfo={slateLockInfo}
            permissions={permissions}
        />
    )
}

export default CitationElement

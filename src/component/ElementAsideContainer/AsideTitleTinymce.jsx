import React from 'react';
import TinyMceEditor from '../tinyMceEditor.js';

const AsideTitleTinymce = (props) => {
    const { titleDetails: { titleClass, titleTag, titleIndex, titlePlaceholder } } = props;
	return (
        <TinyMceEditor
        isAsideTitle={true}
        index={`${props.index}-${titleIndex}`} 
        tagName={titleTag}
        className={titleClass} 
        placeholder={titlePlaceholder}
        model={props.model}
        element={props.model}
        elementId={props.elementId}
        saveContainerTitle={props.saveContainerTitle}
        handleBlur={props.handleBlur}
        permissions={props.permissions} 
        showHideType={props.showHideType}
        parentElement={props.parentElement} 
        slateLockInfo={props.slateLockInfo}
        handleEditorFocus={props.handleFocus}
        onFigureImageFieldBlur={props.onFigureImageFieldBlur}
        onFigureImageFieldFocus={props.onFigureImageFieldBlur}  
        glossaryFootnoteValue={props.glossaryFootnoteValue} 
        glossaaryFootnotePopup={props.glossaaryFootnotePopup}
        openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} 
        />
	)
}

export default AsideTitleTinymce;
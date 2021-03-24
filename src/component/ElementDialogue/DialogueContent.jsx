import React, { Fragment } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import tinymce from 'tinymce/tinymce';

function DialogueContent(props) {

    let editor = '';
    let placeholder = (props.labelText === 'DE') ? 'Enter Dialogue...' : 'Enter Stage Directions...';

    if (props.labelText === 'DE') {
        editor = <Fragment>
            <TinyMceEditor

                index={`${props.index}-0`}
                permissions={props.permissions}
                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                element={props.element}
                elementId={props.elementId}
                handleEditorFocus={props.handleFocus}
                handleBlur={() => {
                    console.log("the tiny active editor is", tinymce.activeEditor)
                }}
                placeholder="Enter Character Name..."
                tagName={'h4'}
                className={props.className}
                model={props.model.characterName}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
            />
            <TinyMceEditor
                index={`${props.index}-1`}
                permissions={props.permissions}
                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                element={props.element}
                elementId={props.elementId}
                handleEditorFocus={props.handleFocus}
                handleBlur={props.handleBlur}
                placeholder={placeholder}
                tagName={'div'}
                className={props.className}
                model={props.model.text}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
            />
        </Fragment>
    } else {
        editor = <TinyMceEditor
            index={props.index}
            permissions={props.permissions}
            openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
            element={props.element}
            elementId={props.elementId}
            handleEditorFocus={props.handleFocus}
            handleBlur={props.handleBlur}
            placeholder={placeholder}
            tagName={'div'}
            className={`stageDirectionItalicFont ${props.className}`}
            model={props.model.text}
            slateLockInfo={props.slateLockInfo}
            glossaryFootnoteValue={props.glossaryFootnoteValue}
            glossaaryFootnotePopup={props.glossaaryFootnotePopup}
        />;
    }
    return <header>{editor}</header>;
}

export default DialogueContent;
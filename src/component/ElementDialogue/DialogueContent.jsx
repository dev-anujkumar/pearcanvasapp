import React, { Fragment } from 'react';
import { removeBlankTags, prepareDialogueDom } from '../../constants/utility';
import TinyMceEditor from "../tinyMceEditor";

function DialogueContent(props) {

    let editor = '';
    let placeholder = (props.labelText === 'DE') ? 'Enter Dialogue...' : 'Enter Stage Directions...';
    if (props.labelText === 'DE') {
        let dialogueModel= prepareDialogueDom(props.model[props.index]?.text)
        editor = <Fragment>
            <TinyMceEditor

                index={`${props.elementIndex}-${props.index}-0`}
                permissions={props.permissions}
                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                element={props.element}
                elementId={props.elementId}
                handleEditorFocus={props.handleFocus}
                handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => {
                    let activeEditorId = eIndex ? `cypress-${eIndex}` : (tinyMCE.activeEditor ? tinyMCE.activeEditor.id : '')
                    let currentNode = document.getElementById(activeEditorId);
                    let innerHTML, innerText;
                    innerHTML = `<p>${currentNode.innerHTML}</p>`;
                    innerText = currentNode.innerText
                    const obj = { 
                         ...props.model[props.index],
                         characterName: innerHTML,
                    }
                    props.handleBlur("characterName", obj, props.index);
                }}
                placeholder="Enter Character Name..."
                tagName={'h4'}
                className={props.className}
                model={props.model[props.index]?.characterName}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
                handleAudioPopupLocation = {props.handleAudioPopupLocation}
                handleAssetsPopupLocation={props.handleAssetsPopupLocation}
                
            />
            <TinyMceEditor
                index={`${props.elementIndex}-${props.index}-1`}
                permissions={props.permissions}
                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
                element={props.element}
                elementId={props.elementId}
                handleEditorFocus={props.handleFocus}
                handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => {
                    let activeEditorId = eIndex ? `cypress-${eIndex}` : (tinyMCE.activeEditor ? tinyMCE.activeEditor.id : '')
                    let currentNode = document.getElementById(activeEditorId);
                    let innerHTML, innerText;
                    innerHTML = `<p>${currentNode.innerHTML}</p>`;
                    innerText = currentNode.innerText
                    const obj = { 
                         ...props.model[props.index],
                        text: innerHTML,
                    }
                    props.handleBlur("text", obj, props.index);
            }}
                placeholder={placeholder}
                tagName={'div'}
                className={props.className}
                model={dialogueModel ? dialogueModel : '<span class="dialogueLine"><br></span>'}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
                handleAudioPopupLocation = {props.handleAudioPopupLocation}
                handleAssetsPopupLocation={props.handleAssetsPopupLocation}
            />
        </Fragment>
    } else {
        editor = <TinyMceEditor
            index={`${props.elementIndex}-${props.index}`}
            permissions={props.permissions}
            openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp}
            element={props.element}
            elementId={props.elementId}
            handleEditorFocus={props.handleFocus}
            handleBlur={(forceupdate, currentElement, eIndex, showHideType, eventTarget) => {
                let activeEditorId = eIndex ? `cypress-${eIndex}` : (tinyMCE.activeEditor ? tinyMCE.activeEditor.id : '')
                let currentNode = document.getElementById(activeEditorId);
                let innerHTML, innerText;
                innerHTML = currentNode.innerHTML
                innerText = currentNode.innerText
                    const obj = { 
                         ...props.model[props.index],
                        text: innerHTML,
                    }
                    props.handleBlur("text", obj, props.index);
            }}
            placeholder={placeholder}
            tagName={'div'}
            className={`stageDirectionItalicFont ${props.className}`}
            model={props.model[props.index]?.text}
            slateLockInfo={props.slateLockInfo}
            glossaryFootnoteValue={props.glossaryFootnoteValue}
            glossaaryFootnotePopup={props.glossaaryFootnotePopup}
            handleAudioPopupLocation = {props.handleAudioPopupLocation}
            handleAssetsPopupLocation={props.handleAssetsPopupLocation}
        />;
    }
    return <header>{editor}</header>;
}

export default DialogueContent;
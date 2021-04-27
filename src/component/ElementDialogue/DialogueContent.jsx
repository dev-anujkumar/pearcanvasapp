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
                    const obj = { 
                         ...props.model[props.index],
                        characterName: `<p>${removeBlankTags(eventTarget?.innerHTML)}</p>`,
                    }
                    props.handleBlur("characterName", obj, props.index)
                }}
                placeholder="Enter Character Name..."
                tagName={'h4'}
                className={props.className}
                model={props.model[props.index]?.characterName}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
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
                    let previousElement = currentElement ? currentElement : props.element;
                    console.log("eveeeeeeeeeeeeeeeeeeeeeeeeeentttttttttttttt", currentNode, previousElement);
                    let innerHTML, innerText;
                    innerHTML = `<p>${currentNode.innerHTML}</p>`;
                    innerText = currentNode.innerText
                    console.log("tempDiv.innerHTML = html;", innerHTML, innerText);
                    const obj = { 
                         ...props.model[props.index],
                        text: innerHTML,
                    }
                    console.log("objjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", obj);
                    props.handleBlur("text", obj, props.index)
            }}
                placeholder={placeholder}
                tagName={'div'}
                className={props.className}
                model={dialogueModel ? dialogueModel : '<span class="dialogueLine"><br></span>'}
                slateLockInfo={props.slateLockInfo}
                glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup}
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
                let previousElement = currentElement ? currentElement : props.element;
                console.log("eveeeeeeeeeeeeeeeeeeeeeeeeeentttttttttttttt", currentNode, previousElement);
                let innerHTML, innerText;
                innerHTML = currentNode.innerHTML
                innerText = currentNode.innerText
                console.log("tempDiv.innerHTML = html;", innerHTML, innerText);
                    const obj = { 
                         ...props.model[props.index],
                        text: innerHTML,
                    }
                    console.log("objjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", obj);
                    props.handleBlur("text", obj, props.index)
            }}
            placeholder={placeholder}
            tagName={'div'}
            className={`stageDirectionItalicFont ${props.className}`}
            model={props.model[props.index]?.text}
            slateLockInfo={props.slateLockInfo}
            glossaryFootnoteValue={props.glossaryFootnoteValue}
            glossaaryFootnotePopup={props.glossaaryFootnotePopup}
        />;
    }
    return <header>{editor}</header>;
}

export default DialogueContent;
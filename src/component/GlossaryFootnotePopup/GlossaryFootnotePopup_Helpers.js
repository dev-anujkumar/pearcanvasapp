//Constants
const PRIMARY = "primary";
const SECONDARY = "secondary";

//Focus Element
export const focusElement = (element, value) => {
    if (element && element.classList) {
        element.classList.add(value);
        element.tabIndex = "-1";
        element.focus();
    }
}

//Blur Element
export const blurElement = (element, value) => {
    if (element && element.classList) {
        element.classList.remove(value);
        element.tabIndex = "0";
        element.blur();
    }
}

//Get Primary Button
export const getPrimaryButton = () => {
    const primaryButton = document.getElementById("glossary-save-button") ? document.getElementById("glossary-save-button") : null;
    return primaryButton;
}

//Get Secondary Button
export const getSecondaryButton = () => {
    const secondaryButton = document.getElementById("glossary-cancel-button") ? document.getElementById("glossary-cancel-button") : null;
    return secondaryButton;
}

//Check if Primary Button is focused
export const isPrimaryButtonFocused = () => {
    const primaryButton = getPrimaryButton();
    return (primaryButton && primaryButton.classList && primaryButton.classList.contains(PRIMARY));
}

//Check if Secondary Button is focused
export const isSecondaryButtonFocused = () => {
    const secondaryButton = getSecondaryButton();
    return (secondaryButton && secondaryButton.classList && secondaryButton.classList.contains(SECONDARY));
}

//Focus Popup Buttons
export const focusPopupButtons = () => {
    if (!isPrimaryButtonFocused() && !isSecondaryButtonFocused()) {
        const secondaryButton = getSecondaryButton();
        setTimeout(() => {
            focusElement(secondaryButton, SECONDARY);
        }, 0);
    }
}

//Blur Popup Buttons
export const blurPopupButtons = () => {
    const primaryButton = getPrimaryButton();
    blurElement(primaryButton, PRIMARY);
    const secondaryButton = getSecondaryButton();
    blurElement(secondaryButton, SECONDARY);
}

//When Tab key is pressed
export const handleTabKeyPress = (e) => {
    const restrictedIdList = ["glossary-1", "footnote-0", "glossary-save-button", "glossary-cancel-button"];
    if (e && e.target && e.target.id && (restrictedIdList.indexOf(e.target.id) > -1)) {
        e.preventDefault();
    }
}

//When Enter key is pressed
export const handleEnterKeyPress = (primaryButton, secondaryButton) => {
    let element;
    if (isPrimaryButtonFocused()) {
        element = primaryButton;
    } else if (isSecondaryButtonFocused()) {
        element = secondaryButton;
    }
    if (element) {
        element.click();
    }
}

//When Esc key is pressed
export const handleEscKeyPress = (secondaryButton) => {
    if (secondaryButton) {
        secondaryButton.click();
    }
}

//Handle navigation on buttons
export const handleKeyDownHelper = (e) => {
    const primaryButton = getPrimaryButton();
    const secondaryButton = getSecondaryButton();
    if (e.keyCode === 9) {
        handleTabKeyPress(e);
    } else if (e.keyCode === 13) {
        handleEnterKeyPress(primaryButton, secondaryButton);
    } else if (e.keyCode === 27) {
        handleEscKeyPress(secondaryButton);
    } else if (e.keyCode === 37 && isPrimaryButtonFocused()) {
        blurElement(primaryButton, PRIMARY);
        focusElement(secondaryButton, SECONDARY);
    } else if (e.keyCode === 39 && isSecondaryButtonFocused()) {
        blurElement(secondaryButton, SECONDARY);
        focusElement(primaryButton, PRIMARY);
    }
}

//Check if audio or image figure button clicked
export const clickedOnAudioImageButtons = (e) => {
    const glossaryAudioButton = document.getElementById("glossary-audio") ? document.getElementById("glossary-audio") : null;
    const glossaryFigureImageButton = document.getElementById("glossary-figure-image") ? document.getElementById("glossary-figure-image") : null;
    return (e && e.target && ((glossaryAudioButton && glossaryAudioButton.contains(e.target)) || (glossaryFigureImageButton && glossaryFigureImageButton.contains(e.target))));
}

//Check if editor is clicked
export const clickedOnEditor = (e) => {
    const glossaryEditor = document.getElementById("glossary-editor") ? document.getElementById("glossary-editor") : null;
    const glossaryEditorAttacher = document.getElementById("glossary-editor-attacher") ? document.getElementById("glossary-editor-attacher") : null;
    return (e && e.target && ((glossaryEditor && glossaryEditor.contains(e.target)) || (glossaryEditorAttacher && glossaryEditorAttacher.contains(e.target))));
}

//Check if glossary asset popup is clicked
export const clickedOnOpenGlossaryAssetsPopup = (e) => {
    const openGlossaryAssetsPopup = document.getElementById("openFigureGlossary") ? document.getElementById("openFigureGlossary") : null;
    return (e && e.target && openGlossaryAssetsPopup && openGlossaryAssetsPopup.contains(e.target));
}

//Check if primary button is clicked
export const clickedOnPrimaryButton = (e) => {
    const primaryButton = getPrimaryButton();
    return (e && e.target && primaryButton && primaryButton.contains(e.target));
}

//Check if secondary button is clicked
export const clickedOnSecondaryButton = (e) => {
    const secondaryButton = getSecondaryButton();
    return (e && e.target && secondaryButton && secondaryButton.contains(e.target));
}

//Check if toolbar button is clicked
export const clickedOnToolbarButton = (e) => {
    const glossaryFootnoteToolbar = document.getElementById("toolbarGlossaryFootnote") ? document.getElementById("toolbarGlossaryFootnote") : null;
    return (e && e.target && glossaryFootnoteToolbar && glossaryFootnoteToolbar.contains(e.target));
}

//Handle click outside of editor
export const handleMouseDownHelper = (e) => {
    if (clickedOnAudioImageButtons(e) || clickedOnEditor(e) || clickedOnOpenGlossaryAssetsPopup(e) || clickedOnToolbarButton(e)) {
        blurPopupButtons();
    } else if (clickedOnPrimaryButton(e)) {
        const primaryButton = getPrimaryButton();
        const secondaryButton = getSecondaryButton();
        blurElement(secondaryButton, SECONDARY);
        focusElement(primaryButton, PRIMARY);
    } else if (clickedOnSecondaryButton(e)) {
        const primaryButton = getPrimaryButton();
        const secondaryButton = getSecondaryButton();
        blurElement(primaryButton, PRIMARY);
        focusElement(secondaryButton, SECONDARY);
    } else {
        focusPopupButtons();
    }
}
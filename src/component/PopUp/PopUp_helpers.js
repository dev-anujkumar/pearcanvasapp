//Constants
export const PRIMARY_BUTTON = 'primary';
export const SECONDARY_BUTTON = 'secondary';

//Check if Primary Button is Focused
export const isPrimaryButtonFocused = () => {
    const primaryButton = document.querySelector(`[option=${PRIMARY_BUTTON}]`) ? document.querySelector(`[option=${PRIMARY_BUTTON}]`) : null;
    const secondaryButton = document.querySelector(`[option=${SECONDARY_BUTTON}]`) ? document.querySelector(`[option=${SECONDARY_BUTTON}]`) : null;
    return (primaryButton && primaryButton.classList && primaryButton.classList.contains(PRIMARY_BUTTON) && secondaryButton && secondaryButton.classList &&
    !secondaryButton.classList.contains(SECONDARY_BUTTON))
}

//Check if Secondary Button is Focused
export const isSecondaryButtonFocused = () => {
    const primaryButton = document.querySelector(`[option=${PRIMARY_BUTTON}]`) ? document.querySelector(`[option=${PRIMARY_BUTTON}]`) : null;
    const secondaryButton = document.querySelector(`[option=${SECONDARY_BUTTON}]`) ? document.querySelector(`[option=${SECONDARY_BUTTON}]`) : null;
    return (primaryButton && primaryButton.classList && !primaryButton.classList.contains(PRIMARY_BUTTON) && secondaryButton && secondaryButton.classList &&
    secondaryButton.classList.contains(SECONDARY_BUTTON))
}

/**Function to focus element by adding class to elements class list */
export const focusElement = (value) => {
    const button = document.querySelector(`[option=${value}]`) ? document.querySelector(`[option=${value}]`) : null;
    if (button && button.classList) {
        button.classList.add(value);
        button.tabIndex = '-1';
        button.focus();
    }
}

/**Function to remove focus of element by removing class from elements class list */
export const blurElement = (value) => {
    const button = document.querySelector(`[option=${value}]`) ? document.querySelector(`[option=${value}]`) : null;
    if (button && button.classList) {
        button.classList.remove(value);
        button.tabIndex = '0';
        button.blur();
    }
}

//Focus Popup Buttons
export const focusPopupButtons = () => {
    if (isPrimaryButtonFocused() || isSecondaryButtonFocused()) {
        return
    }
    const secondaryButton = document.querySelector(`[option=${SECONDARY_BUTTON}]`) ? document.querySelector(`[option=${SECONDARY_BUTTON}]`) : null;
    if (secondaryButton && secondaryButton.classList) {
        setTimeout(() => {
            secondaryButton.tabIndex = '-1';
            secondaryButton.focus();
            focusElement(SECONDARY_BUTTON);
        }, 0);
    }
}

//Blur Popup Buttons
export const blurPopupButtons = () => {
    blurElement(PRIMARY_BUTTON);
    blurElement(SECONDARY_BUTTON);
}

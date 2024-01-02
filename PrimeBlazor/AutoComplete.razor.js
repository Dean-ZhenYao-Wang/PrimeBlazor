var outsideClickListener = [];
export function bindOutsideClickListener(id, overlayVisible, overlay, multiple, input, dropdownButton, inputMultiple) {
    if (!outsideClickListener.some(o => o.id === id)) {
        let outsideClick =async (event) => {
            if (overlayVisible && overlay && isOutsideClicked(event, multiple, input, dropdownButton, inputMultiple)) {
                await dotNetHelper.invokeMethodAsync('hideOverlay');
            }
        };
        outsideClickListener.push({ id: id, o: outsideClick })
        document.addEventListener('click', outsideClick);
    }
}
export function isOutsideClicked(event, multiple, input, dropdownButton, inputMultiple) {
    if (multiple) {
        return !overlay.contains(event.target) && event.target !== getInputElement(multiple, input, inputMultiple) && !isDropdownClicked(event,dropdownButton);
    }
    else {
        return !overlay.contains(event.target) && event.target !== input;
    }
}
export function getInputElement(multiple, input, inputMultiple) {
    return multiple ? inputMultiple : input;
}
export function getInputElementValue(multiple, input, inputMultiple) {
    return multiple ? inputMultiple.value : input.value;
}
export function isDropdownClicked(event, dropdownButton) {
    return elementIsNull(dropdownButton) == false ? (event.target === dropdownButton || dropdownButton.$el.contains(event.target)) : false;
}
export function unbindOutsideClickListener(id) {
    if (outsideClickListener.some(o => o.id === id)) {
        let { outsideClick } = outsideClickListener.find(o => o.id === id);
        document.removeEventListener('click', outsideClick);
        outsideClickListener = outsideClickListener.filter(o => o.id !== id);
    }
}
export function onOverlayEnter(overlay) {
    overlay.style.zIndex = String(window.DomHandler.generateZIndex());
}
var outsideClickListener = [];
export function bindOutsideClickListener(id, overlayVisible, overlay, multiple, input, dropdownButton, inputMultiple, multiContainer) {
    if (!outsideClickListener.some(o => o.id === id)) {
        let outsideClick =async (event) => {
            if (overlayVisible && overlay && isOutsideClicked(event, multiple, input, dropdownButton, inputMultiple, multiContainer)) {
                await dotNetHelper.invokeMethodAsync('hideOverlay');
            }
        };
        outsideClickListener.push({ id: id, outsideClick: outsideClick })
        document.addEventListener('click', outsideClick);
    }
}
export function isOutsideClicked(event, multiple, input, dropdownButton, inputMultiple, multiContainer) {
    if (multiple) {
        return !overlay.contains(event.target) && event.target !== isInputClicked(event, multiple, input, multiContainer) && !isDropdownClicked(event,dropdownButton);
    }
    else {
        return !overlay.contains(event.target) && event.target !== input;
    }
}
export function isInputClicked(event, multiple, input, multiContainer) {
    if (multiple)
        return event.target === multiContainer || multiContainer.contains(event.target);
    else
        return event.target === input;
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
export async function onKeyDown(event, overlayVisible, overlay, suggestions, dotNetHelper, multiple,value,input) {
    if (overlayVisible) {
        let highlightItem = window.DomHandler.findSingle(overlay, 'li.p-highlight');

        switch (event.which) {
            //down
            case 40:
                if (highlightItem) {
                    let nextElement = highlightItem.nextElementSibling;
                    if (nextElement) {
                        window.DomHandler.addClass(nextElement, 'p-highlight');
                        window.DomHandler.removeClass(highlightItem, 'p-highlight');
                        window.DomHandler.scrollInView(overlay, nextElement);
                    }
                }
                else {
                    window.DomHandler.addClass(overlay.firstChild.firstChild, 'p-highlight');
                }

                event.preventDefault();
                break;

            //up
            case 38:
                if (highlightItem) {
                    let previousElement = highlightItem.previousElementSibling;
                    if (previousElement) {
                        window.DomHandler.addClass(previousElement, 'p-highlight');
                        window.DomHandler.removeClass(highlightItem, 'p-highlight');
                        window.DomHandler.scrollInView(overlay, previousElement);
                    }
                }

                event.preventDefault();
                break;

            //enter,tab
            case 13:
                if (highlightItem) {
                    await dotNetHelper.invokeMethodAsync("selectItem", suggestions[window.DomHandler.index(highlightItem)]);
                    dotNetHelper.invokeMethodAsync("hideOverlay");
                }

                event.preventDefault();
                break;

            //escape
            case 27:
                dotNetHelper.invokeMethodAsync("hideOverlay");
                event.preventDefault();
                break;

            //tab
            case 9:
                if (highlightItem) {
                    await dotNetHelper.invokeMethodAsync("selectItem", suggestions[window.DomHandler.index(highlightItem)]);
                }

                dotNetHelper.invokeMethodAsync("hideOverlay");
                break;

            default:
                break;
        }
    }

    if (multiple) {
        switch (event.which) {
            //backspace
            case 8:
                if (value && value.length && !input.value) {
                    let removedValue = value[value.length - 1];
                    let newValue = value.slice(0, -1);

                    await dotNetHelper.invokeMethodAsync("onKeyDownInputEmit", newValue);
                    await dotNetHelper.invokeMethodAsync("onKeyDownUnselect", removedValue);
                }
                break;

            default:
                break;
        }
    }
}
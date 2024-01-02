var outsideClickListener = [];
export function bindOutsideClickListener(id, overlayVisible, overlay, multiple,input) {
    if (!outsideClickListener.some(o => o.id === id)) {
        let outsideClick =async (event) => {
            if (overlayVisible && overlay && isOutsideClicked(event,multiple,input)) {
                await dotNetHelper.invokeMethodAsync('hideOverlay');
            }
        };
        outsideClickListener.push({ id: id, o: outsideClick })
        document.addEventListener('click', outsideClick);
    }
}
export function isOutsideClicked(event, multiple, input) {
    if (multiple) {
        return !overlay.contains(event.target) && event.target !== input;
    }
    else {
        return !overlay.contains(event.target) && event.target !== input;
    }
}
export function unbindOutsideClickListener(id) {
    if (outsideClickListener.some(o => o.id === id)) {
        let { outsideClick } = outsideClickListener.find(o => o.id === id);
        document.removeEventListener('click', outsideClick);
        outsideClickListener = outsideClickListener.filter(o => o.id !== id);
    }
}
var outsideClickListener = [];
export function bindOutsideClickListener(id, overlayVisible, container, overlay, dotNetHelper) {
    if (!outsideClickListener.some(o => o.id === id)) {
        let outsideClick = async (event) => {
            if (overlayVisible && isOutsideClicked(event, container, overlay)) {
                await dotNetHelper.invokeMethodAsync('setOverlayVisible', false);
            }
        }
        outsideClickListener.push({ id: id, o: outsideClick })
        document.addEventListener('click', outsideClick);
    }
}
export function isOutsideClicked(event, container, overlay) {
    return !(container.isSameNode(event.target) || container.contains(event.target) || (overlay && overlay.contains(event.target)));
}
export function unbindOutsideClickListener(id) {
    if (outsideClickListener.some(o => o.id === id)) {
        let { outsideClick } = outsideClickListener.find(o => o.id === id);
        document.removeEventListener('click', outsideClick);
        outsideClickListener = outsideClickListener.filter(o => o.id !== id);
    }
}
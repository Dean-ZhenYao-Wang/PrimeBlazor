export default class MultiSelect {
    static outsideClickListener = [];
    static bindOutsideClickListener(id, overlayVisible, container, overlay, dotNetHelper) {
        if (!MultiSelect.outsideClickListener.some(o => o.id === id)) {
            let outsideClick = async (event) => {
                if (overlayVisible && MultiSelect.isOutsideClicked(event, container, overlay)) {
                    await dotNetHelper.invokeMethodAsync('setOverlayVisible', false);
                }
            }
            MultiSelect.outsideClickListener.push({ id: id, o: outsideClick })
            document.addEventListener('click', outsideClick);
        }
    }
    static isOutsideClicked(event, container, overlay) {
        return !(container.isSameNode(event.target) || container.contains(event.target) || (overlay && overlay.contains(event.target)));
    }
    static unbindOutsideClickListener(id) {
        if (MultiSelect.outsideClickListener.some(o => o.id === id)) {
            let { outsideClick } = MultiSelect.outsideClickListener.find(o => o.id === id);
            document.removeEventListener('click', outsideClick);
            MultiSelect.outsideClickListener = MultiSelect.outsideClickListener.filter(o => o.id !== id);
        }
    }
}
window.MultiSelect = MultiSelect;
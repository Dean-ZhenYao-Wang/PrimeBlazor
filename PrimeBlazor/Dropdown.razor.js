export default class Dropdown {
    static outsideClickListener = [];
    static bindOutsideClickListener(id, overlayVisible, overlay, dotNetHelper) {
        if (!Dropdown.outsideClickListener.some(o => o.id === id)) {
            let outsideClick = async (event) => {
                if (overlayVisible && overlay && !overlay.contains(event.target)) {
                    await dotNetHelper.invokeMethodAsync('setOverlayVisible', false);
                }
            }
            Dropdown.outsideClickListener.push({ id: id, o: outsideClick })
            document.addEventListener('click', outsideClick);
        }
    }
    static unbindOutsideClickListener(id) {
        if (Dropdown.outsideClickListener.some(o => o.id === id)) {
            let { outsideClick } = Dropdown.outsideClickListener.find(o => o.id === id);
            document.removeEventListener('click', outsideClick);
            Dropdown.outsideClickListener = Dropdown.outsideClickListener.filter(o => o.id !== id);
        }
    }
}
window.Dropdown = Dropdown;
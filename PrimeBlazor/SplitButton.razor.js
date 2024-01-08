export default class SplitButton {
    static bindOutsideClickListener(dotNetHelper, componmentId, overlayVisible, overlay, container) {
        if (!this.outsideClickListener) this.outsideClickListener = [];
        if (!this.outsideClickListener.some(o => o.id === componmentId)) {
            let outsideClick =async (event) => {
                if (overlayVisible && overlay && !container.contains(event.target)) {
                    await dotNetHelper.invokeMethodAsync("setOverlayVisible", false);
                }
            };
            this.outsideClickListener.push({ id: componmentId, outsideClick: outsideClick })
            document.addEventListener('click', outsideClick);
        }
    }
    static unbindOutsideClickListener(componmentId) {
        if (this.outsideClickListener.some(o => o.id === componmentId)) {
            let { outsideClick } = this.outsideClickListener.find(o => o.id === componmentId);
            document.removeEventListener('click', outsideClick);
            this.outsideClickListener = this.outsideClickListener.filter(o => o.id !== componmentId);
        }
    }
}
window.SplitButton = SplitButton;
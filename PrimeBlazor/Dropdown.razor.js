var outsideClickListener = [];
export function bindOutsideClickListener(id,overlay,dotNetHelper) {
    if (!outsideClickListener.some(o => o.id === id)) {
        let outsideClick =async (event) => {
            if (overlay && !overlay.contains(event.target)) {
                await dotNetHelper.invokeMethodAsync('hideOverlay');
            }
        }
        outsideClickListener.push({ id: id, o: outsideClick })
        document.addEventListener('click', outsideClick);
    }
}
export function unbindOutsideClickListener(id) {
    if (outsideClickListener.some(o => o.id === id)) {
        let { outsideClick } = outsideClickListener.find(o => o.id === id);
        document.removeEventListener('click', outsideClick);
        outsideClickListener = outsideClickListener.filter(o => o.id !== id);
    }
}
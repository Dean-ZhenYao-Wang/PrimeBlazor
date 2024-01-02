var dialogMask = [];
export function focus(container) {
    let focusable = DomHandler.findSingle(container, 'input,button');
    if (focusable) {
        focusable.focus();
    }
}
export function enableModality(id, container) {
    
    if (!dialogMask.some(d => d.id === id)) {
        let mask = document.createElement('div');
        mask.style.zIndex = String(parseInt(container.style.zIndex, 10) - 1);
        window.DomHandler.addMultipleClasses(mask, 'p-component-overlay p-dialog-mask p-fadein');
        document.body.appendChild(mask);
        window.DomHandler.addClass(document.body, 'p-overflow-hidden');
        dialogMask.push({ id: id, mask: mask });
    }
}
export function disableModality(id) {
    if (dialogMask.some(d => d.id === id)) {
        let { mask } = dialogMask.find(d => d.id === id);
        document.body.removeChild(mask);
        window.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        dialogMask = dialogMask.filter(d => d.id !== id);
    }
}
export default class Dialog {
    static dialogMask = [];
    static focus(container) {
        let focusable = DomHandler.findSingle(container, 'input,button');
        if (focusable) {
            focusable.focus();
        }
    }
    static enableModality(id, container) {

        if (!Dialog.dialogMask.some(d => d.id === id)) {
            let mask = document.createElement('div');
            mask.style.zIndex = String(parseInt(container.style.zIndex, 10) - 1);
            DomHandler.addMultipleClasses(mask, 'p-component-overlay p-dialog-mask p-fadein');
            document.body.appendChild(mask);
            DomHandler.addClass(document.body, 'p-overflow-hidden');
            Dialog.dialogMask.push({ id: id, mask: mask });
        }
    }
    static disableModality(id) {
        if (Dialog.dialogMask.some(d => d.id === id)) {
            let { mask } = Dialog.dialogMask.find(d => d.id === id);
            document.body.removeChild(mask);
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
            Dialog.dialogMask = Dialog.dialogMask.filter(d => d.id !== id);
        }
    }
}
window.Dialog = Dialog;
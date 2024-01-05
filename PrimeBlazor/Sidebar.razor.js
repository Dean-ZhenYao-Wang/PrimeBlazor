var sidebarMask = [];
var sidebarMaskClickListener = [];
export function focus(container) {
    let focusable = DomHandler.findSingle(container, 'input,button');
    if (focusable) {
        focusable.focus();
    }
}
export function enableModality(id, container, dismissable, dotNetHelper) {
    
    if (!sidebarMask.some(d => d.id === id)) {
        let mask = document.createElement('div');
        mask.style.zIndex = String(parseInt(container.style.zIndex, 10) - 1);
        window.DomHandler.addMultipleClasses(mask, 'p-component-overlay');
        if (dismissable) {
            bindMaskClickListener(id, dotNetHelper);
        }
        document.body.appendChild(mask);
        sidebarMask.push({id:id,mask:mask})
        window.DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
}
export function disableModality(id) {
    if (sidebarMask.some(d => d.id === id)) {
        unbindMaskClickListener(id);
        let { mask } = sidebarMask.find(d => d.id === id);
        document.body.removeChild(mask);
        window.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        sidebarMask = sidebarMask.filter(d => d.id !== id);
    }
}
export function bindMaskClickListener(id,dotNetHelper) {
    if (!sidebarMaskClickListener.some(d => d.id === id)) {
        let maskClick =async () => {
            await dotNetHelper.invokeMethodAsync("hideEvent");
        };
        let { mask } = sidebarMask.find(d => d.id === id);
        mask.addEventListener('click', maskClick);
        sidebarMaskClickListener.push({ id: id, maskClick: maskClick });
    }
}
export function unbindMaskClickListener(id) {
    if (sidebarMaskClickListener.some(d => d.id === id)) {
        let { mask } = sidebarMask.find(d => d.id === id);
        let { maskClick } = sidebarMaskClickListener.find(d => d.id === id);
        mask.removeEventListener('click', maskClick);
        sidebarMaskClickListener = sidebarMaskClickListener.filter(d => d.id !== id);
    }
}
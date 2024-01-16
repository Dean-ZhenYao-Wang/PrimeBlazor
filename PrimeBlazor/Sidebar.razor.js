export default class Sidebar {
    static sidebarMask = [];
    static sidebarMaskClickListener = [];
    static focus(container) {
        let focusable = DomHandler.findSingle(container, 'input,button');
        if (focusable) {
            focusable.focus();
        }
    }
    static enableModality(id, container, dismissable, dotNetHelper) {

        if (!Sidebar.sidebarMask.some(d => d.id === id)) {
            let mask = document.createElement('div');
            mask.style.zIndex = String(parseInt(container.style.zIndex, 10) - 1);
            DomHandler.addMultipleClasses(mask, 'p-component-overlay');
            if (dismissable) {
                Sidebar.bindMaskClickListener(id, dotNetHelper);
            }
            document.body.appendChild(mask);
            Sidebar.sidebarMask.push({ id: id, mask: mask })
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }
    static disableModality(id) {
        if (Sidebar.sidebarMask.some(d => d.id === id)) {
            Sidebar.unbindMaskClickListener(id);
            let { mask } = Sidebar.sidebarMask.find(d => d.id === id);
            document.body.removeChild(mask);
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
            Sidebar.sidebarMask = Sidebar.sidebarMask.filter(d => d.id !== id);
        }
    }
    static bindMaskClickListener(id, dotNetHelper) {
        if (!Sidebar.sidebarMaskClickListener.some(d => d.id === id)) {
            let maskClick = async () => {
                await dotNetHelper.invokeMethodAsync("hideEvent");
            };
            let { mask } = Sidebar.sidebarMask.find(d => d.id === id);
            mask.addEventListener('click', maskClick);
            Sidebar.sidebarMaskClickListener.push({ id: id, maskClick: maskClick });
        }
    }
    static unbindMaskClickListener(id) {
        if (Sidebar.sidebarMaskClickListener.some(d => d.id === id)) {
            let { mask } = Sidebar.sidebarMask.find(d => d.id === id);
            let { maskClick } = Sidebar.sidebarMaskClickListener.find(d => d.id === id);
            mask.removeEventListener('click', maskClick);
            Sidebar.sidebarMaskClickListener = Sidebar.sidebarMaskClickListener.filter(d => d.id !== id);
        }
    }
}
window.Sidebar = Sidebar;
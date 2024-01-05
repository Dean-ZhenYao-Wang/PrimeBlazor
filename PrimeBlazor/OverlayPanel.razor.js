export default class OverlayPanel {
    constructor() {
        outsideClickListener = []
    }
    static async toggle(target, componmentId) {
        let thisComponent = document.getElementById(componmentId);
        let visible = await thisComponent.dotNetHelper.invokeMethodAsync('getVisible')
        if (visible) {
            await this.hide(thisComponent.dotNetHelper);
        } else {
            await this.show(thisComponent.dotNetHelper);
            thisComponent.target = target;
        }
    }
    static async hide(dotNetHelper) {
        await dotNetHelper.invokeMethodAsync('hide')
    }
    static async show(dotNetHelper) {
        await dotNetHelper.invokeMethodAsync('show');
    }
    static async onEnter(componmentId,appendTo, container, baseZIndex) {
        this.appendContainer(appendTo, container);
        let thisComponent = document.getElementById(componmentId);
        this.alignOverlay(container, thisComponent.target);
        let visible = await thisComponent.dotNetHelper.invokeMethodAsync('getVisible')
        await this.bindOutsideClickListener(componmentId, visible, container, thisComponent);
        if (autoZIndex) {
            container.style.zIndex = String(baseZIndex + DomHandler.generateZIndex());
        }
    }
    static onLeave(componmentId) {
        this.unbindOutsideClickListener(componmentId);
    }
    static alignOverlay(container, target) {
        window.DomHandler.absolutePosition(container, target);
    }
    static async bindOutsideClickListener(componmentId, visible, container, thisComponent) {
        if (!this.outsideClickListener.some(o => o.id === componmentId)) {
            let outsideClick = async (event) => {
                if (visible && container && !container.contains(event.target) && !this.isTargetClicked(thisComponent, event)) {
                    await this.hide(thisComponent.dotNetHelper)
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
    static isTargetClicked(thisComponent,event) {
        return thisComponent.target && (thisComponent.target === event.target || thisComponent.target.contains(event.target));
    }
    static appendContainer(appendTo,container) {
        if (appendTo) {
            if (appendTo === 'body') {
                document.body.appendChild(container);
            } else {
                document.getElementById(appendTo).appendChild(container);
            }
        }
    }
    static restoreAppend(appendTo, container) {
        if (container && appendTo) {
            if (this.appendTo === 'body') {
                document.body.removeChild(container);
            } else {
                document.getElementById(appendTo).removeChild(container);
            }
        }
    }
    static beforeDestroy(componmentId, appendTo, container) {
        this.restoreAppend(appendTo, container);
        this.unbindOutsideClickListener(componmentId);
        let thisComponent = document.getElementById(componmentId);
        thisComponent.target = null;
    }
}
window.OverlayPanel = OverlayPanel
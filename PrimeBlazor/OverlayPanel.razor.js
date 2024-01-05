export default class OverlayPanel {
    constructor() {
        outsideClickListener = [];
        resizeListener = [];
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
    static async onEnter(componmentId, appendTo, container, baseZIndex) {
        this.appendContainer(appendTo, container);
        let thisComponent = document.getElementById(componmentId);
        this.alignOverlay(container, thisComponent.target);
        let visible = await thisComponent.dotNetHelper.invokeMethodAsync('getVisible')
        await this.bindOutsideClickListener(componmentId, visible, container, thisComponent);
        this.bindResizeListener(componmentId);
        if (autoZIndex) {
            container.style.zIndex = String(baseZIndex + DomHandler.generateZIndex());
        }
    }
    static onLeave(componmentId) {
        this.unbindOutsideClickListener(componmentId);
        this.unbindResizeListener(componmentId);
    }
    static alignOverlay(container, target) {
        window.DomHandler.absolutePosition(container, target);
        if (window.DomHandler.getOffset(container).top < window.DomHandler.getOffset(target).top) {
            window.DomHandler.addClass(container, 'p-overlaypanel-flipped');
        }
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
    static bindResizeListener(componmentId) {
        if (!this.resizeListener.some(o => o.id === componmentId)) {
            let resize = (event) => {
                console.log('x');
                if (this.visible) {
                    this.visible = false;
                }
            };
            this.resizeListener.push({ id: componmentId, resize: resize })
            window.addEventListener('resize', resize);
        }
    }
    static unbindResizeListener(componmentId) {
        if (this.resizeListener.some(o => o.id === componmentId)) {
            let { resize } = this.resizeListener.find(o => o.id === componmentId);
            window.removeEventListener('resize', resizeListener);
            this.resizeListener = this.resizeListener.filter(o => o.id !== componmentId);
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
    static beforeDestroy(componmentId, appendTo, container, dismissable) {
        this.restoreAppend(appendTo, container);
        this.unbindResizeListener(componmentId);
        if (dismissable) {
            this.unbindOutsideClickListener(componmentId);
        }
        let thisComponent = document.getElementById(componmentId);
        thisComponent.target = null;
    }
}
window.OverlayPanel = OverlayPanel
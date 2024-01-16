export default class Menu {
    static dotNetHelperArray = [];
    static targetArray = [];
    static outsideClickListener = [];
    static resizeListener = [];
    static OnAfterRenderAsync(dotNetHelper, commponentId) {
        Menu.dotNetHelperArray.push({ id: commponentId, dotNetHelper: dotNetHelper });
    }
    static async toggle(event, commponentId) {
        let { dotNetHelper } = Menu.dotNetHelperArray.find(m => m.id === commponentId);
        if (await dotNetHelper.invokeMethodAsync("getVisible")) {
            await Menu.hide(dotNetHelper);
        } else {
            await Menu.show(event, dotNetHelper, commponentId);
        }
    }
    static async show(event, dotNetHelper, commponentId) {
        await dotNetHelper.invokeMethodAsync("show");
        if (Menu.targetArray.some(m => m.id === commponentId)) {
            let targetObject = Menu.targetArray.find(m => m.id === commponentId);
            targetObject.target = event.target;
        } else {
            Menu.targetArray.push({ id: commponentId, target: event.target });
        }
    }
    static async hide(dotNetHelper) {
        await dotNetHelper.invokeMethodAsync("hide");
    }
    static async onEnter(commponentId) {
        let { dotNetHelper } = Menu.dotNetHelperArray.find(m => m.id === commponentId);
        let container = await dotNetHelper.invokeMethodAsync("getContainer")
        await Menu.appendContainer(dotNetHelper, container);
        await Menu.alignOverlay(dotNetHelper, commponentId);
        Menu.bindOutsideClickListener(dotNetHelper, commponentId);
        Menu.bindResizeListener(dotNetHelper, commponentId);

        if (await dotNetHelper.invokeMethodAsync("getAutoZIndex")) {
            container.style.zIndex = String(await dotNetHelper.invokeMethodAsync("getBaseZIndex") + DomHandler.generateZIndex());
        }
    }
    static onLeave(commponentId) {
        Menu.unbindOutsideClickListener(commponentId);
        Menu.unbindResizeListener(commponentId);
    }
    static async alignOverlay(dotNetHelper, commponentId) {
        let container = await dotNetHelper.invokeMethodAsync("getContainer");
        if (Menu.targetArray && Menu.targetArray.length > 0) {
            let { target } = Menu.targetArray.find(m => m.id === commponentId);
            if (target) {
                DomHandler.absolutePosition(container, target);

                if (DomHandler.getOffset(container).top < DomHandler.getOffset(target).top) {
                    DomHandler.addClass(container, 'p-overlaypanel-flipped');
                }
            }
        }
    }
    static bindOutsideClickListener(dotNetHelper, commponentId) {
        if (!Menu.outsideClickListener.some(m => m.id === commponentId)) {
            let outsideClick = async (event) => {
                let container = await dotNetHelper.invokeMethodAsync("getContainer");
                if (await dotNetHelper.invokeMethodAsync("getVisible") && container && !container.contains(event.target) && !Menu.isTargetClicked(event, commponentId)) {
                    await dotNetHelper.invokeMethodAsync("setVisible", false)
                }
            };
            document.addEventListener('click', outsideClick);
            Menu.outsideClickListener.push({ id: commponentId, click: outsideClick })
        }
    }
    static unbindOutsideClickListener(commponentId) {
        if (Menu.outsideClickListener.some(m => m.id == commponentId)) {
            let { click } = Menu.outsideClickListener.find(m => m.id === commponentId);
            document.removeEventListener('click', click);
            Menu.outsideClickListener = Menu.outsideClickListener.filter(m => m.id !== commponentId)
        }
    }
    static bindResizeListener(dotNetHelper, commponentId) {
        if (!Menu.resizeListener.some(m => m.id == commponentId)) {
            let resizeListener = async () => {
                if (await dotNetHelper.invokeMethodAsync("getVisible")) {
                    await dotNetHelper.invokeMethodAsync("setVisible", false)
                }
            };
            addEventListener('resize', resizeListener);
            Menu.resizeListener.push({ id: commponentId, resize: resizeListener });
        }
    }
    static unbindResizeListener(commponentId) {
        if (Menu.resizeListener.some(m => m.id == commponentId)) {
            let { resize } = Menu.resizeListener.find(m => m.id === commponentId);
            removeEventListener('resize', resize);
            Menu.resizeListener = Menu.resizeListener.filter(m => m.id !== commponentId);
        }
    }
    static isTargetClicked(event, commponentId) {
        let { target } = Menu.targetArray.find(m => m.id === commponentId);
        return target && (target === event.target || target.contains(event.target));
    }
    static async appendContainer(dotNetHelper, container) {
        let appendTo = await dotNetHelper.invokeMethodAsync("getAppendTo");
        if (appendTo) {
            if (appendTo === 'body')
                document.body.appendChild(container);
            else
                document.getElementById(appendTo).appendChild(container);
        }
    }
    static async restoreAppend(commponentId) {
        let { dotNetHelper } = Menu.dotNetHelperArray.find(m => m.id === commponentId);
        let container = await dotNetHelper.invokeMethodAsync("getContainer")
        let appendTo = await dotNetHelper.invokeMethodAsync("getAppendTo");
        if (container && appendTo) {
            if (appendTo === 'body')
                document.body.removeChild(container);
            else
                document.getElementById(appendTo).removeChild(container);
        }
    }
}
window.Menu = Menu;
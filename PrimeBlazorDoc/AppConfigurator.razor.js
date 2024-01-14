export default class AppConfigurator {
    static dotNetHelper = null;
    static outsideClickListener = null;
    static OnInitialized(dotNetHelper) {
        AppConfigurator.dotNetHelper = dotNetHelper;
    }
    static bindOutsideClickListener(el) {
        if (!AppTopBar.outsideClickListener) {
            AppTopBar.outsideClickListener = async (event) => {
                let active =await AppTopBar.dotNetHelper.invokeMethodAsync("getActive");
                if (active && AppTopBar.isOutsideClicked(event,el)) {
                    await AppTopBar.dotNetHelper.invokeMethodAsync("setActive",false);
                }
            };
            document.addEventListener('click', AppTopBar.outsideClickListener);
        }
    }
    static isOutsideClicked(event,el) {
        return !(el.isSameNode(event.target) || el.contains(event.target));
    }
    static unbindOutsideClickListener() {
        if (AppTopBar.outsideClickListener) {
            document.removeEventListener('click', AppTopBar.outsideClickListener);
            AppTopBar.outsideClickListener = null;
        }
    }
    static applyScale(scale) {
        document.documentElement.style.fontSize = scale + 'px';
    }
}
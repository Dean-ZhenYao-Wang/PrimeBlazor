export default class AppTopBar {
    static dotNetHelper = null;
    static outsideClickListener = null;
    static OnInitialized(dotNetHelper) {
        AppTopBar.dotNetHelper = dotNetHelper;
    }
    static bindOutsideClickListener() {
        if (!AppTopBar.outsideClickListener) {
            AppTopBar.outsideClickListener = async (event) => {
                let activeMenuIndex = await AppTopBar.dotNetHelper.invokeMethodAsync("getActiveMenuIndex");
                let topbarMenu = await AppTopBar.dotNetHelper.invokeMethodAsync("getTopbarMenu");
                if ((activeMenuIndex != null && this.isOutsideTopbarMenuClicked(event, topbarMenu))) {
                    await AppTopBar.dotNetHelper.invokeMethodAsync("setActiveMenuIndex",null);
                    AppTopBar.unbindOutsideClickListener();
                }
            };
        }
    }
    static unbindOutsideClickListener() {
        if (AppTopBar.outsideClickListener) {
            document.removeEventListener('click', AppTopBar.outsideClickListener);
            AppTopBar.outsideClickListener = null;
        }
    }
    static isOutsideTopbarMenuClicked(event, topbarMenu) {
        return !(topbarMenu.isSameNode(event.target) || topbarMenu.contains(event.target));
    }
}
window.AppTopBar = AppTopBar;
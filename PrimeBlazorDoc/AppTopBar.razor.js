export default class AppTopBar {
    static themesMenuElement = null;
    static themesMenuOutsideClickListener = null;
    static darkDemoStyle = null;
    static dotNetHelper = null;
    static OnAfterRenderAsync(dotNetHelper) {
        AppTopBar.dotNetHelper = dotNetHelper;
    }
    static async changeTheme(event, theme, dark) {
        let thisTheme = await AppTopBar.dotNetHelper.invokeMethodAsync('getTheme');
        let themeElement = document.getElementById('theme-link');
        themeElement.setAttribute('href', themeElement.getAttribute('href').replace(thisTheme, theme));
        await AppTopBar.dotNetHelper.invokeMethodAsync('setTheme', theme);

        if (dark) {
            if (!AppTopBar.darkDemoStyle) {
                AppTopBar.darkDemoStyle = document.createElement('style');
                AppTopBar.darkDemoStyle.type = 'text/css';
                AppTopBar.darkDemoStyle.innerHTML = '.implementation { background-color: #3f3f3f !important; color: #dedede !important} .implementation > h3, .implementation > h4{ color: #dedede !important}';
                document.body.appendChild(AppTopBar.darkDemoStyle);
            }
        }
        else if (AppTopBar.darkDemoStyle) {
            document.body.removeChild(AppTopBar.darkDemoStyle);
            AppTopBar.darkDemoStyle = null;
        }

        await AppTopBar.dotNetHelper.invokeMethodAsync('setThemesMenuVisible', false)
        event.preventDefault();
    }
    static onThemesMenuEnter(el) {
        AppTopBar.themesMenuElement = el;
        AppTopBar.bindThemesMenuOutsideClickListener();
    }
    static onThemesMenuLeave() {
        AppTopBar.themesMenuElement = null;
        AppTopBar.unbindThemesMenuOutsideClickListener();
    }
    static bindThemesMenuOutsideClickListener() {
        if (!AppTopBar.themesMenuOutsideClickListener) {
            AppTopBar.themesMenuOutsideClickListener = async (event) => {
                let themesMenuVisible = await AppTopBar.dotNetHelper.invokeMethodAsync('getThemesMenuVisible');
                if (themesMenuVisible && AppTopBar.isOutsideOfThemesMenuClicked(event)) {
                    await AppTopBar.dotNetHelper.invokeMethodAsync('setThemesMenuVisible', false)
                }
            };
            document.addEventListener('click', AppTopBar.themesMenuOutsideClickListener);
        }
    }
    static isOutsideOfThemesMenuClicked(event) {
        return !(window.DomHandler.hasClass(event.target, 'themes-menu-link') || AppTopBar.themesMenuElement.isSameNode(event.target) || AppTopBar.themesMenuElement.contains(event.target));
    }
}
window.AppTopBar = AppTopBar;
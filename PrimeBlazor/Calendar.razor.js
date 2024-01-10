export default class Calendar {
    static maskArray = [];
    static outsideClickListener = [];
    static bindOutsideClickListener(dotNetHelper, commponentId, overlay) {
        if (!Calendar.outsideClickListener.some(o => o.id === commponentId)) {
            let outsideClick = async (event) => {
                let overlayVisible = await dotNetHelper.invokeMethodAsync("getOverlayVisible");
                if (overlayVisible && Calendar.isOutsideClicked(event, commponentId, overlay)) {
                    await dotNetHelper.invokeMethodAsync("setOverlayVisible", false);
                }
            }
            Calendar.outsideClickListener.push({ id: commponentId, outsideClick: outsideClick });
            document.addEventListener("click", outsideClick);
        }
    }
    static unbindOutsideClickListener(commponentId) {
        if (Calendar.outsideClickListener.some(o => o.id === commponentId)) {
            let { outsideClick } = Calendar.outsideClickListener.find(o => o.id === commponentId)
            document.removeEventListener("click", outsideClick);
            Calendar.outsideClickListener = Calendar.outsideClickListener.filter(o => o.id !== commponentId);
        }
    }
    static isOutsideClicked(event, commponentId, overlay) {
        let thisCommponent = document.getElementById(commponentId);
        return !(thisCommponent.isSameNode(event.target) || Calendar.isNavIconClicked(event) ||
            thisCommponent.contains(event.target) || (overlay && overlay.contains(event.target)));
    }
    static isNavIconClicked(event) {
        return (window.DomHandler.hasClass(event.target, 'p-datepicker-prev') || window.DomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
            || window.DomHandler.hasClass(event.target, 'p-datepicker-next') || window.DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }
    static enableModality(dotNetHelper, commponentId, overlay) {
        if (!Calendar.maskArray.some(o => o.id === commponentId)) {
            let mask = document.createElement('div');
            let maskId = commponentId + '_Mask';
            mask.setAttribute('id', maskId);
            mask.style.zIndex = String(parseInt(overlay.style.zIndex, 10) - 1);
            window.DomHandler.addMultipleClasses(mask, 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker');

            let maskClick = async () => {
                await Calendar.disableModality(dotNetHelper, commponentId, maskId);
            };
            mask.addEventListener('click', maskClick);

            document.body.appendChild(mask);
            window.DomHandler.addClass(document.body, 'p-overflow-hidden');
            Calendar.maskArray.push({ id: commponentId, mask: mask, maskClick: maskClick })
            return maskId;
        }
        return '';
    }
    static async disableModality(dotNetHelper, commponentId, maskId) {
        let mask = document.getElementById(maskId);
        let { maskClick } = Calendar.maskArray.find(o => o.id === commponentId);
        mask.removeEventListener('click', maskClick);
        Calendar.maskArray = Calendar.maskArray.filter(o => o.id !== commponentId);
        document.body.removeChild(mask);
        let bodyChildren = document.body.children;
        let hasBlockerMasks;
        for (let i = 0; i < bodyChildren.length; i++) {
            let bodyChild = bodyChildren[i];
            if (window.DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                hasBlockerMasks = true;
                break;
            }
        }
        if (!hasBlockerMasks) {
            window.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
        await dotNetHelper.invokeMethodAsync("setMaskIdNull");
    }
}
window.Calendar = Calendar;
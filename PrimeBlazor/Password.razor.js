export default class Password {
    static createMeter() {
        let meter = document.createElement('div');
        meter.className = 'p-password-meter';
        return meter;
    }
    static createInfo(promptLabel) {
        let info = document.createElement('div');
        info.className = 'p-password-info';
        info.textContent = promptLabel;
        return info;
    }
    static createPanel(inputElement, meterElement, infoElement) {
        let panel = document.createElement('div');
        panel.className = 'p-password-panel p-component p-hidden p-password-panel-overlay p-input-overlay';
        panel.style.minWidth = DomHandler.getOuterWidth(inputElement) + 'px';
        panel.appendChild(meterElement);
        panel.appendChild(infoElement);
        document.body.appendChild(panel);
        return panel;
    }
    static focus(inputElement, panelElement) {
        panelElement.style.zIndex = String(DomHandler.generateZIndex());
        panelElement.style.display = 'block';
        setTimeout(() => {
            DomHandler.addClass(panelElement, 'p-input-overlay-visible');
            DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
        }, 1);
        DomHandler.absolutePosition(panelElement, inputElement);
    }
    static blur(panelElement) {
        DomHandler.addClass(panelElement, 'p-input-overlay-visible');
        DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
        setTimeout(() => {
            panelElement.style.display = 'none';
            DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
        }, 150);
    }
    static keyup(meterElement, meterPos, infoElement, label) {
        meterElement.style.backgroundPosition = meterPos;
        infoElement.textContent = label;
    }
}
window.Password = Password;
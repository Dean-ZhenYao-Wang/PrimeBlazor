export function createMeter(){
    let meter = document.createElement('div');
    meter.className = 'p-password-meter';
    return meter;
}
export function createInfo(promptLabel){
    let  info = document.createElement('div');
    info.className = 'p-password-info';
    info.textContent = promptLabel;
    return info;
}
export function createPanel(inputElement,meterElement,infoElement){
    let panel = document.createElement('div');
    panel.className = 'p-password-panel p-component p-hidden p-password-panel-overlay p-input-overlay';
    panel.style.minWidth = window.DomHandler.getOuterWidth(inputElement) + 'px';
    panel.appendChild(meterElement);
    panel.appendChild(infoElement);
    document.body.appendChild(panel);
    return panel;
}
export function focus(inputElement,panelElement){
    panelElement.style.zIndex = String(window.DomHandler.generateZIndex());
    panelElement.style.display = 'block';
    setTimeout(() => {
        window.DomHandler.addClass(panelElement, 'p-input-overlay-visible');
        window.DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
    }, 1);
    window.DomHandler.absolutePosition(panelElement, inputElement);
}
export function blur(panelElement){
    window.DomHandler.addClass(panelElement, 'p-input-overlay-visible');
    window.DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
     setTimeout(() => {
         panelElement.style.display = 'none';
         window.DomHandler.removeClass(panelElement, 'p-input-overlay-hidden');
     }, 150);
}
export function keyup(meterElement,meterPos,infoElement,label){
    meterElement.style.backgroundPosition=meterPos;
    infoElement.textContent=label;
}
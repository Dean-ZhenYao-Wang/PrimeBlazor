export function resize(element) {
    element.style.height = '';
    element.style.height = element.scrollHeight + 'px';

    if (parseFloat(element.style.height) >= parseFloat(element.style.maxHeight)) {
        element.style.overflowY = "scroll";
        element.style.height = element.style.maxHeight;
    }
    else {
        element.style.overflow = "hidden";
    }
}
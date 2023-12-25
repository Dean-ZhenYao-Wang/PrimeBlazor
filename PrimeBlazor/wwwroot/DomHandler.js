export function innerWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
}

export function width(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
}

export function getWindowScrollTop() {
    let doc = document.documentElement;
    return (doc.scrollTop) - (doc.clientTop || 0);
}

export function getWindowScrollLeft() {
    let doc = document.documentElement;
    return (doc.scrollLeft) - (doc.clientLeft || 0);
}

export function getOuterWidth(el, margin) {
    if (el) {
        let width = el.offsetWidth;

        if (margin) {
            let style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
    }
    else {
        return 0;
    }
}

export function getOuterHeight(el, margin) {
    if (el) {
        let height = el.offsetHeight;

        if (margin) {
            let style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
    }
    else {
        return 0;
    }
}

export function getViewport() {
    let win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
}

export function getOffset(el) {
    var rect = el.getBoundingClientRect();

    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
}

export function generateZIndex() {
    this.zindex = this.zindex || 999;
    return ++this.zindex;
}

export function getCurrentZIndex() {
    return this.zindex;
}

export function index(element) {
    let children = element.parentNode.childNodes;
    let num = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
    }
    return -1;
}

export function addMultipleClasses(element, className) {
    if (element.classList) {
        let styles = className.split(' ');
        for (let i = 0; i < styles.length; i++) {
            element.classList.add(styles[i]);
        }

    }
    else {
        let styles = className.split(' ');
        for (let i = 0; i < styles.length; i++) {
            element.className += ' ' + styles[i];
        }
    }
}

export function addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
}

export function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

export function hasClass(element, className) {
    if (element.classList)
        return element.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
}

export function find(element, selector) {
    return element.querySelectorAll(selector);
}

export function findSingle(element, selector) {
    return element.querySelector(selector);
}

export function getHeight(el) {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);

    height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

    return height;
}

export function getWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    return width;
}

export function absolutePosition(element, target) {
    let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element)
    let elementOuterHeight = elementDimensions.height;
    let elementOuterWidth = elementDimensions.width;
    let targetOuterHeight = target.offsetHeight;
    let targetOuterWidth = target.offsetWidth;
    let targetOffset = target.getBoundingClientRect();
    let windowScrollTop = this.getWindowScrollTop();
    let windowScrollLeft = this.getWindowScrollLeft();
    let viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height)
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
    else
        top = targetOuterHeight + targetOffset.top + windowScrollTop;

    if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width)
        left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
    else
        left = targetOffset.left + windowScrollLeft;

    element.style.top = top + 'px';
    element.style.left = left + 'px';
}

export function relativePosition(element, target) {
    var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
    var targetHeight = target.offsetHeight;
    var targetWidth = target.offsetWidth;
    var targetOffset = target.getBoundingClientRect();
    var viewport = this.getViewport();
    var top, left;

    if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height)
        top = -1 * (elementDimensions.height);
    else
        top = targetHeight;

    if ((targetOffset.left + elementDimensions.width) > viewport.width)
        left = targetWidth - elementDimensions.width;
    else
        left = 0;

    element.style.top = top + 'px';
    element.style.left = left + 'px';
}
export function getHiddenElementOuterHeight(element) {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    let elementHeight = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementHeight;
}

export function getHiddenElementOuterWidth(element) {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    let elementWidth = element.offsetWidth;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementWidth;
}

export function getHiddenElementDimensions(element) {
    var dimensions = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
}

export function fadeIn(element, duration) {
    element.style.opacity = 0;

    var last = +new Date();
    var opacity = 0;
    var tick = function () {
        opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date();

        if (+opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

export function fadeOut(element, ms) {
    var opacity = 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;

    let fading = setInterval(() => {
        opacity -= gap;

        if (opacity <= 0) {
            opacity = 0;
            clearInterval(fading);
        }

        element.style.opacity = opacity;
    }, interval);
}

export function getUserAgent() {
    return navigator.userAgent;
}

export function appendChild(element, target) {
    if (this.isElement(target))
        target.appendChild(element);
    else if (target.el && target.el.nativeElement)
        target.el.nativeElement.appendChild(element);
    else
        throw new Error('Cannot append ' + target + ' to ' + element);
}

export function scrollInView(container, item) {
    let borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
    let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
    let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);

    if (offset < 0) {
        container.scrollTop = scroll + offset;
    }
    else if ((offset + itemHeight) > elementHeight) {
        container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
}

export function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
            window.getSelection().removeAllRanges();
        }
    }
    else if (document['selection'] && document['selection'].empty) {
        try {
            document['selection'].empty();
        } catch (error) {
            //ignore IE bug
        }
    }
}

export function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
        return this.calculatedScrollbarWidth;

    let scrollDiv = document.createElement("div");
    scrollDiv.className = "p-scrollbar-measure";
    document.body.appendChild(scrollDiv);

    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    this.calculatedScrollbarWidth = scrollbarWidth;

    return scrollbarWidth;
}

export function getBrowser() {
    if (!this.browser) {
        let matched = this.resolveUserAgent();
        this.browser = {};

        if (matched.browser) {
            this.browser[matched.browser] = true;
            this.browser['version'] = matched.version;
        }

        if (this.browser['chrome']) {
            this.browser['webkit'] = true;
        } else if (this.browser['webkit']) {
            this.browser['safari'] = true;
        }
    }

    return this.browser;
}

export function resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ ]([\w.]+)/.exec(ua) ||
        /(webkit)[ ]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [];

    return {
        browser: match[1] || "",
        version: match[2] || "0"
    };
}

export function isVisible(element) {
    return element.offsetParent != null;
}
export * from './Utils'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
window.dayGridPlugin = dayGridPlugin;
window.timeGridPlugin = timeGridPlugin;
window.listPlugin = listPlugin;
window.Calendar = Calendar;

window.bodyEventListener = {
    eventHandlers: {},
    register(eventName, dotNetRef) {
        var handler = async function (event) {
            await dotNetRef.invokeMethodAsync('InvokeCallback', event);
        };
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    },
    unregister(dotNetRef) {
        var eventName;
        for (eventName in this.eventHandlers) {
            if (this.eventHandlers.hasOwnProperty(eventName)) {
                var handlers = this.eventHandlers[eventName];
                var index = handlers.indexOf(dotNetRef);
                if (index !== -1) {
                    handlers.splice(index, 1);
                    if (handlers.length === 0) {
                        document.removeEventListener(eventName, this.createHandler(eventName));
                        delete this.eventHandlers[eventName];
                    }
                }
            }
        }
    },
    createHandler(eventName) {
        return function (event) {
            var handlers = this.eventHandlers[eventName];
            handlers.forEach(async function (handler) {
                await handler(event);
            });
        }.bind(this);
    }
};
window.QuillFunctions = {
    quillArray:[],
    createQuill: function (quillId,editorElement,toolbarElement,readonly,formats) {
        let options = {
            modules: {
                toolbar: toolbarElement
            },
            readOnly: readonly,
            theme: 'snow',
            formats: formats
        };
        let model = new Quill(editorElement, options);
        this.quillArray.push({ id: quillId, o: model })
    },
    on: function (quillId, eventName, editorElement, dotNetRef) {
        let { o:quill } = this.quillArray.find(q => q.id === quillId);
        quill.on(eventName, async (delta, source) => {
            let html = editorElement.children[0].innerHTML;
            if (html === '<p><br></p>') {
                html = '';
            }
            await dotNetRef.invokeMethodAsync('textChange', { htmlValue: html, textValue: quill.getText(), delta: delta, source: source });
        });
    },
    pasteHTML(quillId, value) {
        let { o: quill } = this.quillArray.find(q => q.id === quillId);
        quill.pasteHTML(value);
    },
    setText(quillId, value) {
        let { o: quill } = this.quillArray.find(q => q.id === quillId);
        quill.setText(value);
    },
    removeQuill(quillId) {
        this.quillArray = this.quillArray.filter(q => q.id !== quillId);
    },
    hasFocus(quillId) {
        let { o: quill } = this.quillArray.find(q => q.id === quillId);
        return quill.hasFocus();
    }
}
class appmenuHelpers {
    static dotNetHelper;
    static setDotNetHelper(value) {
        appmenuHelpers.dotNetHelper = value;
    }
    static async click(event) {
        if (event.target.nodeName === 'A') {
            await this.dotNetHelper.invokeMethodAsync('onClick', event);
        }
    }
}
window.appmenuHelpers = appmenuHelpers;

window.sliderHelpers = {
    dotNetHelper: [],
    setDotNetHelper(id, value) {
        this.dotNetHelper.push({ id: id, dotNetHelpe: value });
    },
    async addEventListener(element){
        element.addEventListener("click", async function(event) {
          await window.sliderHelpers.click(event.target.dataset.refid,event);
        });
    },
    async click(id, event) {
        if (this.disabled) {
            return;
        }
        let hasClass
        if (event.target.classList)
            hasClass = event.target.classList.contains("p-slider-handle");
        else
            hasClass = new RegExp('(^| )' + "p-slider-handle" + '( |$)', 'gi').test(element.className);
        let { dotNetHelpe } = this.dotNetHelper.find(q => q.id === id);
        await dotNetHelpe.invokeMethodAsync('onBarClick', {PageX:event.pageX,PageY:event.pageY}, hasClass);
    },
    removeDotNetHelpe(id) {
        this.dotNetHelper = this.dotNetHelper.filter(q => q.id !== id);
    }
}

window.assignDotNetHelper = (element, dotNetHelper) => {
    element.dotNetHelper = dotNetHelper;
}
window.isFileTypeImage = (base64Data)=> {
    var img = new Image();
    img.src = 'data:image;base64,' + base64Data;

    return img.width > 0 && img.height > 0;
}
window.previewImage = (file, imgElem) => {
    const url = URL.createObjectURL(file);
    imgElem.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
    imgElem.src = url;
}
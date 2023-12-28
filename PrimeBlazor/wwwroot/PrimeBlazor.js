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
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
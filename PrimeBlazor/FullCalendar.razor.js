var fullCalendar = [];
export function events(id,newValue) {
    let { calendar } = fullCalendar.find(c => c.id == id);
    calendar.removeAllEventSources();
    calendar.addEventSource(newValue);
}
export function options(id, newValue) {
    let { calendar } = fullCalendar.find(c => c.id == id);
    if (newValue && calendar) {
        for (let prop in newValue) {
            calendar.setOption(prop, newValue[prop]);
        }
    }
}
export function mounted(id, el,options,events) {
    if (el.offsetParent) {
        initialize(id, el, options,events);
    }
}
export function initialize(id,el,options,events) {
    let defaultConfig = { theme: false, plugins: [window.dayGridPlugin, window.timeGridPlugin, window.interactionPlugin] };
    let config = options ? { ...options, ...defaultConfig } : defaultConfig;

    let calendar = new window.Calendar(el, config);
    calendar.render();

    if (events) {
        calendar.removeAllEventSources();
        calendar.addEventSource(events);
    }
    fullCalendar.push({ id: id, calendar: calendar })
}
export function updated(id, el, options, events) {
    let { calendar } = fullCalendar.find(c => c.id === id);
    if (!calendar && el.offsetParent) {
        initialize(id, el, options, events);
    }
}
export function beforeDestroy(id) {
    let { calendar } = fullCalendar.find(c => c.id === id);
    if (calendar) {
        calendar.destroy();
        fullCalendar = fullCalendar.filter(c => c.id !== id)
    }
}
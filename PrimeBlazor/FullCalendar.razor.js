var fullCalendar = [];
export function events(id,newValue) {
    let { calendar } = fullCalendar.find(c => c.id == id);
    calendar.removeAllEventSources();
    calendar.addEventSource(newValue);
}
export function mounted(id, container,options,events) {
    if (container.offsetParent) {
        initialize(id, container, options,events);
    }
}
export function initialize(id,container,options,events) {
    let defaultConfig = { theme: true, plugins: [window.dayGridPlugin, window.timeGridPlugin, window.listPlugin] };
    let config = options ? { ...options, ...defaultConfig } : defaultConfig;

    let calendar = new window.Calendar(container, config);
    calendar.render();

    if (events) {
        calendar.removeAllEventSources();
        calendar.addEventSource(events);
    }
    fullCalendar.push({ id: id, calendar: calendar })
}
export function updated(id, container, options, events) {
    let { calendar } = fullCalendar.find(c => c.id === id);
    if (!calendar && container.offsetParent) {
        initialize(id, container, options, events);
    }
}
export function beforeDestroy(id) {
    let { calendar } = fullCalendar.find(c => c.id === id);
    if (calendar) {
        calendar.destroy();
        fullCalendar = fullCalendar.filter(c => c.id !== id)
    }
}
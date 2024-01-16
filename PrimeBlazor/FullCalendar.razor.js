export default class FullCalendar {
    static fullCalendar = [];
    static events(id, newValue) {
        let { calendar } = FullCalendar.fullCalendar.find(c => c.id == id);
        calendar.removeAllEventSources();
        calendar.addEventSource(newValue);
    }
    static options(id, newValue) {
        let { calendar } = FullCalendar.fullCalendar.find(c => c.id == id);
        if (newValue && calendar) {
            for (let prop in newValue) {
                calendar.setOption(prop, newValue[prop]);
            }
        }
    }
    static mounted(id, el, options, events) {
        if (el.offsetParent) {
            FullCalendar.initialize(id, el, options, events);
        }
    }
    static initialize(id, el, options, events) {
        let defaultConfig = { theme: false, plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin] };
        let config = options ? { ...options, ...defaultConfig } : defaultConfig;

        let calendar = new Calendar(el, config);
        calendar.render();

        if (events) {
            calendar.removeAllEventSources();
            calendar.addEventSource(events);
        }
        FullCalendar.fullCalendar.push({ id: id, calendar: calendar })
    }
    static updated(id, el, options, events) {
        let { calendar } = FullCalendar.fullCalendar.find(c => c.id === id);
        if (!calendar && el.offsetParent) {
            FullCalendar.initialize(id, el, options, events);
        }
    }
    static beforeDestroy(id) {
        let { calendar } = FullCalendar.fullCalendar.find(c => c.id === id);
        if (calendar) {
            calendar.destroy();
            FullCalendar.fullCalendar = FullCalendar.fullCalendar.filter(c => c.id !== id)
        }
    }
}
window.FullCalendar = FullCalendar;
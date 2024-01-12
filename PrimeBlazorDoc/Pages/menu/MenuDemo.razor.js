export default class MenuDemo {
    static async toggle(event, menuCommponentId) {
        let elements = document.elementsFromPoint(event.clientX, event.clientY);
        let target = elements.find(m => m.nodeName === 'BUTTON')
        event.target = target;
        await window.Menu.toggle(event, menuCommponentId)
    }
}

window.MenuDemo = MenuDemo
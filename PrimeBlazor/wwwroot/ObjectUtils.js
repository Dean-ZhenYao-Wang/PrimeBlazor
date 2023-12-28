import { hasClass } from './DomHandler.js'
export function equals(obj1, obj2, field) {
    if (field)
        return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
    else
        return this.equalsByValue(obj1, obj2);
}

export function equalsByValue(obj1, obj2) {
    if (obj1 === null && obj2 === null) {
        return true;
    }
    if (obj1 === null || obj2 === null) {
        return false;
    }

    if (obj1 === obj2) {
        delete obj1._$visited;
        return true;
    }

    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        obj1._$visited = true;
        for (var p in obj1) {
            if (p === "_$visited") continue;
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                return false;
            }

            switch (typeof (obj1[p])) {
                case 'object':
                    if ((obj1[p] && obj1[p]._$visited) || !this.equals(obj1[p], obj2[p])) return false;
                    break;

                case 'function':
                    if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
                    break;

                default:
                    if (obj1[p] !== obj2[p]) return false;
                    break;
            }
        }

        for (var pp in obj2) {
            if (typeof (obj1[pp]) === 'undefined') return false;
        }

        delete obj1._$visited;
        return true;
    }

    return false;
}

export function resolveFieldData(data, field) {
    if (data && field) {
        if (field.indexOf('.') === -1) {
            return data[field];
        }
        else {
            let fields = field.split('.');
            let value = data;
            for (var i = 0, len = fields.length; i < len; ++i) {
                value = value[fields[i]];
            }
            return value;
        }
    }
    else {
        return null;
    }
}
export function filter(value, fields, filterValue) {
    var filteredItems = [];

    if (value) {
        for (let item of value) {
            for (let field of fields) {
                if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                    filteredItems.push(item);
                    break;
                }
            }
        }
    }

    return filteredItems;
}

export function reorderArray(value, from, to) {
    let target;
    if (value && (from !== to)) {
        if (to >= value.length) {
            target = to - value.length;
            while ((target--) + 1) {
                value.push(undefined);
            }
        }
        value.splice(to, 0, value.splice(from, 1)[0]);
    }
}

export function findIndexInList(value, list) {
    let index = -1;

    if (list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === value) {
                index = i;
                break;
            }
        }
    }

    return index;
}

export async function optionKeyDown(dotNetHelper, event, option) {
    let item = event.currentTarget;

    switch (event.which) {
        //down
        case 40:
            let nextItem = this.findNextItem(item);
            if (nextItem) {
                nextItem.focus();
            }

            event.preventDefault();
            break;

        //up
        case 38:
            let prevItem = this.findPrevItem(item);
            if (prevItem) {
                prevItem.focus();
            }

            event.preventDefault();
            break;

        //enter
        case 13:
            await dotNetHelper.invokeMethodAsync('onOptionSelect',event, option);
            event.preventDefault();
            break;
    }
}
export function findNextItem(item) {
    let nextItem = item.nextElementSibling;

    if (nextItem)
        return hasClass(nextItem, 'p-disabled') ? this.findNextOption(nextItem) : nextItem;
    else
        return null;
}
export function findPrevItem(item) {
    let prevItem = item.previousElementSibling;

    if (prevItem)
        return hasClass(prevItem, 'p-disabled') ? this.findPrevItem(prevItem) : prevItem;
    else
        return null;
}
export function contains(value, list) {
    if (value != null && list && list.length) {
        for (let val of list) {
            if (this.equals(value, val))
                return true;
        }
    }

    return false;
}
//export default class filterConstraints {

//    startsWith(value, filter) {
//        if (filter === undefined || filter === null || filter.trim() === '') {
//            return true;
//        }

//        if (value === undefined || value === null) {
//            return false;
//        }

//        let filterValue = filter.toLowerCase();
//        return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
//    }

//    contains(value, filter) {
//        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
//            return true;
//        }

//        if (value === undefined || value === null) {
//            return false;
//        }

//        return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
//    }

//    endsWith(value, filter) {
//        if (filter === undefined || filter === null || filter.trim() === '') {
//            return true;
//        }

//        if (value === undefined || value === null) {
//            return false;
//        }

//        let filterValue = filter.toString().toLowerCase();
//        return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
//    }

//    equals(value, filter) {
//        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
//            return true;
//        }

//        if (value === undefined || value === null) {
//            return false;
//        }

//        return value.toString().toLowerCase() === filter.toString().toLowerCase();
//    }

//    notEquals(value, filter) {
//        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
//            return false;
//        }

//        if (value === undefined || value === null) {
//            return true;
//        }

//        return value.toString().toLowerCase() !== filter.toString().toLowerCase();
//    }

//    in(value, filter) {
//        if (filter === undefined || filter === null || filter.length === 0) {
//            return true;
//        }

//        if (value === undefined || value === null) {
//            return false;
//        }

//        for (let i = 0; i < filter.length; i++) {
//            if (filter[i] === value)
//                return true;
//        }

//        return false;
//    }
//}

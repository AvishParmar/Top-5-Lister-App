/**
 * Top5List.js
 * 
 * This class represents a list with all the items in our Top5 list.
 * 
 * @author McKilla Gorilla
 * @author Avish Parmar
 */
export default class Top5List {
    constructor(initId) {
        this.id = initId;
    }

    getName() {
        return this.name;
    }

    setName(initName) {
        this.name = initName;
    }

    getItemAt(index) {
        return this.items[index];
    }

    setItemAt(index, item) {
        this.items[index] = item;
    }

    setItems(initItems) {
        this.items = initItems;
    }

    moveItem(oldIndex, newIndex) {
        this.items.splice(newIndex, 0, this.items.splice(oldIndex, 1)[0]);
    }
}
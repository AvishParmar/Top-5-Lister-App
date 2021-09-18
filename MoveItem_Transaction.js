import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Avish Parmar
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {

    constructor(initModel, initOld, initNew) {
        super();
        this.model = initModel;
        this.oldItemIndex = initOld;
        this.newItemIndex = initNew;
    }

    doTransaction() {
        this.model.moveItem(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.model.moveItem(this.newItemIndex, this.oldItemIndex);
    }
}
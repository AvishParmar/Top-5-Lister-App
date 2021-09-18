/**
 * Top5ListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Avish Parmar
 */
export default class Top5Controller {
    constructor() {

    }

    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS

        document.getElementById("add-list-button").onmousedown = (event) => {
            let add = document.getElementById("add-list-button");
            if(!add.classList.contains("disabled")){
                let newList = this.model.addNewList("Untitled", ["?", "?", "?", "?", "?"]);
                this.model.loadList(newList.id);
                this.model.saveLists();
                let status = document.getElementById("top5-statusbar");
                status.innerHTML = "Top 5 " + this.model.getCurrentList().getName();
            }
        }
        document.getElementById("undo-button").onmousedown = (event) => {
            let undo = document.getElementById("undo-button");
            if(!undo.classList.contains("disabled")){
                this.model.undo();
            }
        }

        document.getElementById("redo-button").onmousedown = (event) => {
            let redo = document.getElementById("redo-button");
            if(!redo.classList.contains("disabled")){
                this.model.redo();
            }
        }

        document.getElementById("close-button").onmousedown = (event) => {
            let close = document.getElementById("close-button");
            if(!close.classList.contains("disabled")){
                this.model.unselectAll();
            }
           
        }

        // SETUP THE ITEM HANDLERS
        for (let i = 1; i <= 5; i++) {
            let item = document.getElementById("item-" + i);

            // AND FOR TEXT EDITING
            item.ondblclick = (ev) => {
                if (this.model.hasCurrentList()) {
                    // CLEAR THE TEXT
                    item.innerHTML = "";

                    // ADD A TEXT FIELD
                    let textInput = document.createElement("input");
                    textInput.setAttribute("type", "text");
                    textInput.setAttribute("id", "item-text-input-" + i);
                    textInput.setAttribute("value", this.model.currentList.getItemAt(i - 1));

                    item.appendChild(textInput);

                    textInput.ondblclick = (event) => {
                        this.ignoreParentClick(event);
                    }
                    textInput.onkeydown = (event) => {
                        if (event.key === 'Enter') {
                            this.model.addChangeItemTransaction(i - 1, event.target.value);
                        }
                    }
                    textInput.onblur = (event) => {
                        this.model.restoreList();
                    }
                }
            }

            item.ondragstart = (ev) => {
                ev.dataTransfer.setData("text", ev.target.id);
            }
            item.ondragover = (ev) => {
                ev.preventDefault();
            }
            item.ondrop = (ev) => {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text");
                data = data.charAt(data.length-1)-1;
                let target = ev.target.id.slice(-1)-1;
                this.model.makeMoveItem_Transaction(data, target);
            }
        }
    }

    registerListSelectHandlers(id) {
        // FOR SELECTING THE LIST
        document.getElementById("top5-list-" + id).onmousedown = (event) => {
            this.model.unselectAll();

            // GET THE SELECTED LIST
            this.model.loadList(id);


            let status = document.getElementById("top5-statusbar");
            status.innerHTML = "Top 5 " + this.model.getCurrentList().getName();
        }
        // FOR DELETING THE LIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            this.ignoreParentClick(event);
            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE LIST
            let modal = document.getElementById("delete-modal");
            this.listToDeleteIndex = id;
            let listName = this.model.getList(id).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            modal.classList.add("is-visible");

            document.getElementById("dialog-cancel-button").onmousedown = (event) => {
                modal.classList.remove("is-visible");
            } 

            document.getElementById("dialog-confirm-button").onmousedown = (event) => {
                this.model.removeList(id);
                this.model.saveLists();
                modal.classList.remove("is-visible");
            } 
        }

        
        document.getElementById("top5-list-"+id).ondblclick = (event) => {

            let list = document.getElementById("top5-list-"+id);
            list.innerHTML = ""; 
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "list-card-text-" + id); 
            textInput.setAttribute("value", this.model.getCurrentList().getName());

            list.appendChild(textInput);

            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    
                    this.model.setNewName(event.target.value);
                    this.model.restoreList();
                    this.model.sortLists();
                    this.model.loadList(this.model.getCurrentList().id);
                    let status = document.getElementById("top5-statusbar");
                    status.innerHTML = "Top 5 " + this.model.getCurrentList().getName();
                    
                }
            }
            textInput.onblur = (event) => {
                this.model.setNewName(event.target.value);
                this.model.restoreList();
                this.model.sortLists();
                this.model.loadList(this.model.getCurrentList().id);
                let status = document.getElementById("top5-statusbar");
                status.innerHTML = "Top 5 " + this.model.getCurrentList().getName();
            }
        }
        
    }

    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}
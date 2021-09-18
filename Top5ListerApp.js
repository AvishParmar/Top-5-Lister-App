import Top5Model from './Top5Model.js';
import Top5View from './Top5View.js';
import Top5Controller from './Top5Controller.js';

/**
 * Top5ListerApp
 * 
 * This is the entry point into our application, it launches the
 * app with all needed initialization.
 * 
 * @author McKilla Gorilla
 * @author Avish Parmar
 */

export class Top5ListerApp {
    constructor() {
        // FIRST MAKE THE APP COMPONENTS
        this.model = new Top5Model();
        this.view = new Top5View();
        this.controller = new Top5Controller();

        // THE MODEL NEEDS THE VIEW TO NOTIFY IT EVERY TIME DATA CHANGES
        this.model.setView(this.view);

        // THE VIEW NEEDS THE CONTROLLER TO HOOK UP HANDLERS TO ITS CONTROLS
        this.view.setController(this.controller);

        // AND THE CONTROLLER NEEDS TO MODEL TO UPDATE WHEN INTERACTIONS HAPPEN
        this.controller.setModel(this.model);
    }

    /**
     * launch
     * 
     * @param {*} testFile The JSON file containing initial top 5 lists of data.
     */
    launch() {
        // FIRST TRY AND GET THE LISTS FROM LOCAL STORAGE
        let success = this.model.loadLists();
        if (!success) {
            this.loadListsFromJSON("./data/default_lists.json");
        }
    }

    loadListsFromJSON(jsonFilePath) {
        let xmlhttp = new XMLHttpRequest();
        let modelToUpdate = this.model;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let lists = JSON.parse(this.responseText).top5Lists;

                // GO THROUGH THE DATA AND LOAD IT INTO OUR APP
                for (let i = 0; i < lists.length; i++) {
                    let listData = lists[i];
                    let items = [];
                    for (let j = 0; j < listData.items.length; j++) {
                        items[j] = listData.items[j];
                    }
                    modelToUpdate.addNewList(listData.name, items);
                }
            }
        };
        xmlhttp.open("GET", jsonFilePath, true);
        xmlhttp.send();
    }
}

window.onload = function() {
    // MAKE THE APP AND LAUNCH IT
    let app = new Top5ListerApp();
    app.launch();
}
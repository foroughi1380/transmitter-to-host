var context = chrome;

var OptionTemplate = document.querySelector("#option_row_template");

var OptionsContainer = document.querySelector("#option_containers")

var Options = []

function main() {
    addEvents()
    loadData();
}

function addEvents(){
    console.log(document.querySelector("#btn-add-option-row"))
    document.querySelector("#btn-add-option-row").addEventListener('click' , addOptionsRow)
}

function saveOptions(){
    context.storage.sync.set({
        'options': Options,
    });
}

function loadData(){
    context.storage.sync.get({'options' : []}, function(items) {
        Options = items.options;
        printOptions()
    });
}


function addOptionsRow(e = null, key="" , value=""){
    Options.push({key:key , value:value})
    printOptions()
    saveOptions();
}

function removeOptionRow(index){
    Options.splice(index , 1)
    printOptions()
}

function printOptions(){
    OptionsContainer.innerHTML = '';

    for (let i = 0; i < Options.length; i++) {
        let row = OptionTemplate.content.cloneNode(true);
        row.querySelector(".key-input-template").value = Options[i].key
        row.querySelector(".value-input-template").value = Options[i].value
        row.querySelector(".btn-remove-input-template").addEventListener('click' , () => {
            removeOptionRow(i)
            saveOptions()
        });
        row.querySelector(".value-input-template").addEventListener('change' , (e) => {
            Options[i].value = e.currentTarget.value
            saveOptions()
        });
        row.querySelector(".key-input-template").addEventListener('change' , (e) => {
            Options[i].key = e.currentTarget.value
            saveOptions()
        });
        OptionsContainer.appendChild(row);
    }

}


main();






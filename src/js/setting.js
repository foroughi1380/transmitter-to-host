var context = chrome;

var HostAddress = document.querySelector("#hostAddress")
var HeadersContainer = document.querySelector("#headers_container")
var rowTemplate = document.querySelector('#header_row_template')

var Headers = []

function main() {
    addEvents()
    loadData();
}

function addEvents(){
    document.querySelector("#btn_save_host").addEventListener('click' , saveHost)
    document.querySelector("#btn_add_header_row").addEventListener('click' , addHeaderRow)
    document.querySelector("#btn_save_headers").addEventListener('click' , saveHeaders)
}

function saveHeaders(){
    context.storage.sync.set({
        'headers': Headers,
    } , function () {
        window.alert('Headers saved')
    });
}

function loadData(){
    context.storage.sync.get({'host' : "http://example.com/api/headers.php" , 'headers' : []}, function(items) {
        HostAddress.value = items.host;
        Headers = items.headers;
        printHeaders()
    });
}


function addHeaderRow(e = null, key="" , value=""){
    Headers.push({key:key , value:value})
    printHeaders()
}

function removeHeaderRow(index){
    Headers.splice(index , 1)
    printHeaders()
}

function printHeaders(){
    HeadersContainer.innerHTML = '';

    for (let i = 0; i < Headers.length; i++) {
        let row = rowTemplate.content.cloneNode(true);
        row.querySelector(".key-input-template").value = Headers[i].key
        row.querySelector(".value-input-template").value = Headers[i].value
        row.querySelector(".btn-remove-input-template").addEventListener('click' , () => removeHeaderRow(i));
        row.querySelector(".value-input-template").addEventListener('input' , (e) => {
            Headers[i].value = e.target.value
        });
        row.querySelector(".key-input-template").addEventListener('input' , (e) => {
            Headers[i].key = e.target.value
        });
        HeadersContainer.appendChild(row);
    }

}

function saveHost(){
    let address = HostAddress.value;

    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (address.match(regex)) {
        context.storage.sync.set({
            'host': address,
        } , function () {
            window.alert('address saved')
        });
    }else{
        window.alert('address is invalid')
    }
}

main();






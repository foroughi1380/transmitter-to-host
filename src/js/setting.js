function main(){
    window.store = Alpine.store

    store('host' , '')
    store('headers', {
        data : [],
        get(key = null){
            if (key){
                for(let a in this.data){
                    if (a.key == key){
                        return a;
                    }
                }
            }
            return this.data;
        },
        append(key , value){
            console.log("value added")
            this.data.push({key : key , value : value});
        },
        set(index , key, value){
            this.data[index] = {key : key , value : value};
        },
        delete(index){
            console.log(index)
            this.data.splice(index , 1);
            console.log(this.data)
        }
    })

    Alpine.start();
    console.log("Alpine started")
}

main();






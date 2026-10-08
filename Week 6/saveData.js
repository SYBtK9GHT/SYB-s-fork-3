// let data = {
//     "bool": true,
//     "str": ":3",
//     "num": 69
// };
// module.export = {data};


let load

function preload(){
    load = loadJSON("./save.json")
}

function setup() {
    

    console.log(load)
    console.log(load["bool"])
}
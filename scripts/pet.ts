"use strict" 

let temperamentInput = (<HTMLInputElement>document.getElementById("temperament")!)
let temperamentText = (<HTMLInputElement>document.getElementById("temperamentValue"))
temperamentInput.addEventListener("input", showValue)
function showValue(){temperamentText.textContent = temperamentInput.value}

class Cat{

    name:string
    age:number
    breed:string
    isMale:boolean
    isNeutered:boolean
    isChipped:boolean
    temperament:string

    constructor(name:string, age:number, breed:string, isMale:boolean, isNeutered:boolean, isChipped:boolean, temperament:string){
        this.name = name
        this.age = age
        this.breed = breed
        this.isMale = isMale
        this.isNeutered = isNeutered
        this.isChipped = isChipped
        this.temperament = temperament
    }

}

function getValue(id:string){
    return (<HTMLInputElement>document.getElementById(id)!).value
}

function getChecked(id:string){
    return (<HTMLInputElement>document.getElementById(id)!).checked
}

function boolCheck(id:string, trueValue:string, falseValue:string){
        
    if((<HTMLInputElement>document.getElementById(id)!).checked){
        return trueValue
    } 
        
    else{
     return falseValue
    }
}

let cats:Record<string, Cat> = {}

function savePet(){
    let name:string = getValue("name") 
    let age:number = parseInt(getValue("age"))
    let breed:string = getValue("breed")
    let isMale:boolean = getChecked("male")
    let isNeutered:boolean = getChecked("neutered")
    let isChipped:boolean = getChecked("chipped")
    let temperament:string = getValue("temperament")
    let cat = new Cat(name, age, breed, isMale, isNeutered, isChipped, temperament)
        
    render(cat)
    localStorage.setItem("cats",JSON.stringify(cat))
    cats[cat.name] = cat 
}

function render(cat:Cat){

    let tile = document.createElement("div")
    tile.className="tile";
    (<HTMLInputElement>document.getElementById("tilecontainer")!).appendChild(tile)

    let name = document.createElement("h1")
    tile.appendChild(name)
    name.innerText=cat.name
    
    let age = document.createElement("p")
    tile.appendChild(age)
    age.innerText = "Age: " + cat.age.toString()

    let breed = document.createElement("p")
    tile.appendChild(breed)
    breed.innerText= "Breed: " + cat.breed

    let isMale = document.createElement("p")
    tile.appendChild(isMale)
    isMale.innerText = "Gender: " + (cat.isMale?"male":"female")

    let neutered = document.createElement("p")
    tile.appendChild(neutered)
    neutered.innerText= "Neutered: " + (cat.isNeutered? "yes":"no")

    let chipped = document.createElement("p")
    tile.appendChild(chipped)
    chipped.innerText= "Chipped: " + (cat.isChipped? "yes":"no")
    
    let temperament = document.createElement("p")
    tile.appendChild(temperament)
    temperament.innerText= "Temperament: " + cat.temperament

    let deleteButton = document.createElement("button") //creates button element//
    deleteButton.setAttribute("id", 'delete');
    deleteButton.innerText="Delete" //adds text to button/
    deleteButton.addEventListener("click",deletePet) //creates an action for the button second argument is function to envoke//
    deleteButton.dataset.catName = cat.name //index is just a word can be named anything//
    tile.appendChild(deleteButton) //adds button to each card//
}

function showPets(){
    cats = JSON.parse(localStorage.getItem("cats")!)
    if(cats==null){cats={}}
    let tiles = document.getElementById("tilecontainer")
    tiles!.innerHTML=""
    for(let catName in cats){
        render(cats[catName])
    }
}

function deletePet(e:any){
    let button = e.target
    delete cats[button.dataset.catName]
    
    localStorage.setItem("cats",JSON.stringify(cats)) 
    showPets()
}

showPets()
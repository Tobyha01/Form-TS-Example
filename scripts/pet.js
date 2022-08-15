"use strict";
let temperamentInput = document.getElementById("temperament");
let temperamentText = document.getElementById("temperamentValue");
temperamentInput.addEventListener("input", showValue);
function showValue() { temperamentText.textContent = temperamentInput.value; }
class Cat {
    constructor(name, age, breed, isMale, isNeutered, isChipped, temperament) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.isMale = isMale;
        this.isNeutered = isNeutered;
        this.isChipped = isChipped;
        this.temperament = temperament;
    }
}
function getValue(id) {
    return document.getElementById(id).value;
}
function getChecked(id) {
    return document.getElementById(id).checked;
}
function boolCheck(id, trueValue, falseValue) {
    if (document.getElementById(id).checked) {
        return trueValue;
    }
    else {
        return falseValue;
    }
}
let cats = {};
function savePet() {
    let name = getValue("name");
    let age = parseInt(getValue("age"));
    let breed = getValue("breed");
    let isMale = getChecked("male");
    let isNeutered = getChecked("neutered");
    let isChipped = getChecked("chipped");
    let temperament = getValue("temperament");
    let cat = new Cat(name, age, breed, isMale, isNeutered, isChipped, temperament);
    render(cat);
    localStorage.setItem("cats", JSON.stringify(cat));
    cats[cat.name] = cat;
}
function render(cat) {
    let tile = document.createElement("div");
    tile.className = "tile";
    document.getElementById("tilecontainer").appendChild(tile);
    let name = document.createElement("h1");
    tile.appendChild(name);
    name.innerText = cat.name;
    let age = document.createElement("p");
    tile.appendChild(age);
    age.innerText = "Age: " + cat.age.toString();
    let breed = document.createElement("p");
    tile.appendChild(breed);
    breed.innerText = "Breed: " + cat.breed;
    let isMale = document.createElement("p");
    tile.appendChild(isMale);
    isMale.innerText = "Gender: " + (cat.isMale ? "male" : "female");
    let neutered = document.createElement("p");
    tile.appendChild(neutered);
    neutered.innerText = "Neutered: " + (cat.isNeutered ? "yes" : "no");
    let chipped = document.createElement("p");
    tile.appendChild(chipped);
    chipped.innerText = "Chipped: " + (cat.isChipped ? "yes" : "no");
    let temperament = document.createElement("p");
    tile.appendChild(temperament);
    temperament.innerText = "Temperament: " + cat.temperament;
    let deleteButton = document.createElement("button"); //creates button element//
    deleteButton.setAttribute("id", 'delete');
    deleteButton.innerText = "Delete"; //adds text to button/
    deleteButton.addEventListener("click", deletePet); //creates an action for the button second argument is function to envoke//
    deleteButton.dataset.catName = cat.name; //index is just a word can be named anything//
    tile.appendChild(deleteButton); //adds button to each card//
}
function showPets() {
    cats = JSON.parse(localStorage.getItem("cats"));
    if (cats == null) {
        cats = {};
    }
    let tiles = document.getElementById("tilecontainer");
    tiles.innerHTML = "";
    for (let catName in cats) {
        render(cats[catName]);
    }
}
function deletePet(e) {
    let button = e.target;
    delete cats[button.dataset.catName];
    localStorage.setItem("cats", JSON.stringify(cats));
    showPets();
}
showPets();

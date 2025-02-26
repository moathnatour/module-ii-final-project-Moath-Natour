import { onAddFoodItem } from "./foodListController.js";
import {getItemsInFoodDatabase} from "./foodListModel.js"

export function init(foodItemsDisplaly : HTMLElement, addFoodItemForm : HTMLFormElement,
    errorDisplay : HTMLElement, addFoodItemButton : HTMLButtonElement, formDisplay : HTMLElement,
){

function renderFoodItems(){

    const foodItemsToRender = getItemsInFoodDatabase();
foodItemsDisplaly.innerHTML = "";
    for(const foodItem of foodItemsToRender){
        const newDiv= document.createElement('div');
        newDiv.innerText = foodItem.name;
        foodItemsDisplaly.appendChild(newDiv)
    }

}


addFoodItemButton.addEventListener('click', function(e){

    formDisplay.classList.toggle('hidden');
})


renderFoodItems();

addFoodItemForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(addFoodItemForm)
    const result  = onAddFoodItem(formData);
    if(typeof result === "string"){
errorDisplay.innerText = result;
    }
    else{
    renderFoodItems();
    addFoodItemForm.reset();
    }
})

}


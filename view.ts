import { onAddMeal} from "./controller.js"

export function init(addMealButton : HTMLElement, formDisplay : HTMLElement, displayCancel :HTMLElement ,
     ){
        const {onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd, getFoodItemName,
            getFoodItemWeight
        } = onAddMeal();
    addMealButton.addEventListener('click', function(e){
e.preventDefault();
e.stopPropagation();
formDisplay.style.display = "block"; 


    });

    document.addEventListener('click', function(e){
    formDisplay.style.display = "none"
    foodItemDisplay.innerHTML = "";
    
    })

    formDisplay.addEventListener("click", function(e){
        e.stopPropagation();
    })

    displayCancel.addEventListener("click", function(e){
        formDisplay.style.display = "none";
        foodItemDisplay.innerHTML = "";
    })

    const mealForm  = document.forms.namedItem('meal');
 const foodItemForm = document.forms.namedItem('food item form')
 const foodItemDisplay = document.getElementById('fooditems-display');
    foodItemForm.addEventListener("submit", function(e){
e.preventDefault();
e.stopPropagation();
const formData = new FormData(foodItemForm);
const foodItemId = onAddFoodItemToMeal(formData);
foodItemForm.reset();
const foodItemButton = document.createElement('button');
const foodItemName = getFoodItemName(formData);
const foodItemWeight = getFoodItemWeight(formData)
foodItemButton.innerHTML = `${foodItemName} | ${foodItemWeight} grams`;
foodItemButton.value = foodItemId;
foodItemButton.type = 'button';
foodItemDisplay.appendChild(foodItemButton);

    })

  foodItemDisplay.addEventListener('click', function(e){

const foodItemToRemove = e.target as HTMLButtonElement;
onRemoveFoodItemFromMeal(foodItemToRemove.value);
foodItemToRemove.remove();
  })

    mealForm.addEventListener("submit", function(e){
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(mealForm)
        onAdd(formData);
        foodItemDisplay.innerHTML = "";

    })

    
    
   


    }
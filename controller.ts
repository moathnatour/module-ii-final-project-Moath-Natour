import {searchFoodItemByName, addMeal , foodItem, foodItemsToAddToMeal, meals} from "./model.js"





export function onAddMeal(){

let foodItemsToAddToMeal : foodItem[]= [];

function onAddFoodItemToMeal(formData : FormData){

 const foodItemName  = formData.get('options') as string;
    const foodItemWeight = Number(formData.get('weight')) ;
    const id = crypto.randomUUID().replaceAll("-","").slice(-8);
    const newFoodItem  = searchFoodItemByName(foodItemName);
    if(newFoodItem){
    newFoodItem.weight = foodItemWeight;
    newFoodItem.id = id;
    foodItemsToAddToMeal.push(newFoodItem);
    return newFoodItem.id;
}
}

function getFoodItemName(formData:FormData){

  const foodItemName = formData.get('options') as string;

  return foodItemName;

}

function getFoodItemWeight(formData :FormData){

  const foodItemWeight = Number(formData.get('weight'));

  return foodItemWeight;
}

// function getFoodItemId(formData :FormData){

//   const foodItemId = formData.get('')
// }

function onRemoveFoodItemFromMeal(foodItemId :string){
 
console.log(foodItemsToAddToMeal);
 foodItemsToAddToMeal = foodItemsToAddToMeal.filter(foodItem =>{
  return foodItem.id !== foodItemId;
 })
console.log(foodItemsToAddToMeal);
}

function onAdd(formData : FormData){
console.log(foodItemsToAddToMeal);
  const name = formData.get('name') as string;
    const id = crypto.randomUUID().replaceAll("-", " ").slice(-8);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const content : foodItem[] = foodItemsToAddToMeal;
   

  addMeal({
    name,
    id,
    date,
    content,
  });
console.log(meals);
foodItemsToAddToMeal = [];
}

return { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd, getFoodItemName, getFoodItemWeight};

}


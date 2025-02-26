import {searchFoodItemByName, addMeal , foodItem, foodDatabase} from "./model.js"





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

function resetFoodItemsToAddToMealList(){
  foodItemsToAddToMeal = [];
}

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
    const rawDate = formData.get('date') as string
    let date = new Date(rawDate);
    date = isNaN(date.getTime()) ? new Date() :  date ;
    date.setHours(0, 0, 0, 0);
    const content : foodItem[] = foodItemsToAddToMeal;
   

  addMeal({
    name,
    id,
    date,
    content,
  });

foodItemsToAddToMeal = [];
}

return { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd,
   getFoodItemName, getFoodItemWeight, resetFoodItemsToAddToMealList};

}

export function getFoodItemsFromDatabase(){
  const foodItemsToShow : string[]= [];
  foodDatabase.forEach(foodItem =>{
    foodItemsToShow.push(foodItem.name);
  })
  return foodItemsToShow;
}

export function getFoodItemsByCategory(categories : string[]){

  const foodItemsToShow :string[] = [];
  
  foodDatabase.forEach(foodItem =>{
    categories.forEach(c =>{
      if(foodItem.category === c){
        foodItemsToShow.push(foodItem.name);
      }
    })
  })
  console.log(foodItemsToShow);
  return foodItemsToShow;
 
}



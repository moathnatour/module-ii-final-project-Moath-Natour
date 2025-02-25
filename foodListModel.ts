import { foodDatabase, foodItem }  from "./model.js"

export function addToFoodDatabase(foodItem : foodItem){

    foodDatabase.push(foodItem);
}

export function getItemsInFoodDatabase(){
    const dataBase = foodDatabase.slice();
    return dataBase;
}


export function checkForDuplicateItem(name : string){

  return  foodDatabase.find(foodItem =>(foodItem.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
}

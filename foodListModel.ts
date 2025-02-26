import { foodDatabase, foodItem, getCurrentUserId, saveUsersToLocalStorage, users, }  from "./model.js"

const currentUserId = getCurrentUserId();
const currentUser = users.find(u => u.id === currentUserId)
export function addToFoodDatabase(foodItem : foodItem){

    currentUser.foodDatabase.push(foodItem);
    saveUsersToLocalStorage();
}

export function getItemsInFoodDatabase(){
   return  currentUser.foodDatabase;
    
}


export function checkForDuplicateItem(name : string){

  return  foodDatabase.find(foodItem =>(foodItem.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
}

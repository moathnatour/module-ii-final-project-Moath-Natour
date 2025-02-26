import { foodDatabase, getCurrentUserId, saveUsersToLocalStorage, users, } from "./model.js";
const currentUserId = getCurrentUserId();
const currentUser = users.find(u => u.id === currentUserId);
export function addToFoodDatabase(foodItem) {
    currentUser.foodDatabase.push(foodItem);
    saveUsersToLocalStorage();
}
export function getItemsInFoodDatabase() {
    return currentUser.foodDatabase;
}
export function checkForDuplicateItem(name) {
    return foodDatabase.find(foodItem => (foodItem.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
}

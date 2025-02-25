import { foodDatabase } from "./model.js";
export function addToFoodDatabase(foodItem) {
    foodDatabase.push(foodItem);
}
export function getItemsInFoodDatabase() {
    const dataBase = foodDatabase.slice();
    return dataBase;
}
export function checkForDuplicateItem(name) {
    return foodDatabase.find(foodItem => (foodItem.name === name));
}

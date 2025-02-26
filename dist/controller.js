import { searchFoodItemByName, addMeal, saveUsersToLocalStorage, getCurrentUserId, users } from "./model.js";
const currentUserId = getCurrentUserId();
const currentUser = users.find(u => u.id === currentUserId);
export function onAddMeal() {
    let foodItemsToAddToMeal = [];
    function onAddFoodItemToMeal(formData) {
        const foodItemName = formData.get('options');
        const foodItemWeight = Number(formData.get('weight'));
        const id = crypto.randomUUID().replaceAll("-", "").slice(-8);
        const newFoodItem = searchFoodItemByName(foodItemName);
        if (newFoodItem) {
            newFoodItem.weight = foodItemWeight;
            newFoodItem.id = id;
            foodItemsToAddToMeal.push(newFoodItem);
            return newFoodItem.id;
        }
    }
    function getFoodItemName(formData) {
        const foodItemName = formData.get('options');
        return foodItemName;
    }
    function getFoodItemWeight(formData) {
        const foodItemWeight = Number(formData.get('weight'));
        return foodItemWeight;
    }
    function resetFoodItemsToAddToMealList() {
        foodItemsToAddToMeal = [];
    }
    function onRemoveFoodItemFromMeal(foodItemId) {
        foodItemsToAddToMeal = foodItemsToAddToMeal.filter(foodItem => {
            return foodItem.id !== foodItemId;
        });
    }
    function onAdd(formData) {
        const name = formData.get('name');
        const id = crypto.randomUUID().replaceAll("-", " ").slice(-8);
        const rawDate = formData.get('date');
        let date = new Date(rawDate);
        date = isNaN(date.getTime()) ? new Date() : date;
        date.setHours(0, 0, 0, 0);
        const content = foodItemsToAddToMeal;
        addMeal({
            name,
            id,
            date,
            content,
        });
        saveUsersToLocalStorage();
        foodItemsToAddToMeal = [];
    }
    return { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd,
        getFoodItemName, getFoodItemWeight, resetFoodItemsToAddToMealList };
}
export function getFoodItemsFromDatabase() {
    const foodItemsToShow = [];
    currentUser.foodDatabase.forEach(foodItem => {
        foodItemsToShow.push(foodItem.name);
    });
    return foodItemsToShow;
}
export function getFoodItemsByCategory(categories) {
    const foodItemsToShow = [];
    currentUser.foodDatabase.forEach(foodItem => {
        categories.forEach(c => {
            if (foodItem.category === c) {
                foodItemsToShow.push(foodItem.name);
            }
        });
    });
    console.log(foodItemsToShow);
    return foodItemsToShow;
}

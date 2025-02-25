import { searchFoodItemByName, addMeal, meals } from "./model.js";
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
    // function getFoodItemId(formData :FormData){
    //   const foodItemId = formData.get('')
    // }
    function onRemoveFoodItemFromMeal(foodItemId) {
        console.log(foodItemsToAddToMeal);
        foodItemsToAddToMeal = foodItemsToAddToMeal.filter(foodItem => {
            return foodItem.id !== foodItemId;
        });
        console.log(foodItemsToAddToMeal);
    }
    function onAdd(formData) {
        console.log(foodItemsToAddToMeal);
        const name = formData.get('name');
        const id = crypto.randomUUID().replaceAll("-", " ").slice(-8);
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const content = foodItemsToAddToMeal;
        addMeal({
            name,
            id,
            date,
            content,
        });
        console.log(meals);
        foodItemsToAddToMeal = [];
    }
    return { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd, getFoodItemName, getFoodItemWeight };
}

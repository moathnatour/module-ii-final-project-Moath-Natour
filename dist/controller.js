import { searchFoodItemByName, addMeal, meals, foodDatabase } from "./model.js";
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
    return { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd,
        getFoodItemName, getFoodItemWeight, resetFoodItemsToAddToMealList };
}
export function getFoodItemsFromDatabase() {
    const foodItemsToShow = [];
    foodDatabase.forEach(foodItem => {
        foodItemsToShow.push(foodItem.name);
    });
    return foodItemsToShow;
}
export function getFoodItemsByCategory(categories) {
    const foodItemsToShow = [];
    foodDatabase.forEach(foodItem => {
        categories.forEach(c => {
            if (foodItem.category === c) {
                foodItemsToShow.push(foodItem.name);
            }
        });
    });
    console.log(foodItemsToShow);
    return foodItemsToShow;
}
// export  function getFoodItemsByCategory(category :string){
//   const foodItemsToShow :string[] = [];
//   foodDatabase.forEach(foodItem =>{
//     if(foodItem.category === category){
//       foodItemsToShow.push(foodItem.name);
//     }
//   })
//   return foodItemsToShow;
// }

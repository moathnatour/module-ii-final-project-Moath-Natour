import { addToFoodDatabase, checkForDuplicateItem } from "./foodListModel.js";
import { saveDatabaseToLocalStorage } from "./model.js";
export function onAddFoodItem(formData) {
    const name = formData.get('name');
    const category = formData.get('category');
    const caloriesPer100g = Number(formData.get('calories'));
    const protein = Number(formData.get('protein'));
    const carbs = Number(formData.get('carbs'));
    const fat = Number(formData.get('fats'));
    if (isNaN(caloriesPer100g)) {
        return "calories and weights must be a number";
    }
    if (isNaN(protein)) {
        return "calories and weights must be a number";
    }
    if (isNaN(carbs)) {
        return "calories and weights must be a number";
    }
    if (isNaN(fat)) {
        return "calories and weights must be a number";
    }
    const foodItemAlreadyExists = checkForDuplicateItem(name);
    if (!foodItemAlreadyExists) {
        const newFoodItem = {
            name,
            category,
            caloriesPer100g,
            protein,
            carbs,
            fat,
        };
        addToFoodDatabase(newFoodItem);
        saveDatabaseToLocalStorage();
    }
    else {
        console.log('item already exists!');
        return "item already exists!";
    }
}

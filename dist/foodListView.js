import { onAddFoodItem } from "./foodListController.js";
import { getItemsInFoodDatabase } from "./foodListModel.js";
export function init(foodItemsDisplaly, addFoodItemForm, errorDisplay) {
    function renderFoodItems() {
        const foodItemsToRender = getItemsInFoodDatabase();
        foodItemsDisplaly.innerHTML = "";
        for (const foodItem of foodItemsToRender) {
            const newDiv = document.createElement('div');
            newDiv.innerText = foodItem.name;
            foodItemsDisplaly.appendChild(newDiv);
        }
    }
    function onUpdate() {
        renderFoodItems();
    }
    renderFoodItems();
    addFoodItemForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(addFoodItemForm);
        const result = onAddFoodItem(formData);
        if (typeof result === "string") {
            errorDisplay.innerText = result;
        }
        else {
            renderFoodItems();
            addFoodItemForm.reset();
        }
    });
}

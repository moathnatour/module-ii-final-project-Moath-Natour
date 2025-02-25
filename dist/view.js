import { onAddMeal, getFoodItemsFromDatabase, getFoodItemsByCategory } from "./controller.js";
export function init(addMealButton, formDisplay, displayCancel, options) {
    const { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd, getFoodItemName, getFoodItemWeight, resetFoodItemsToAddToMealList } = onAddMeal();
    addMealButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        formDisplay.style.display = "block";
        displayFoodItems();
    });
    const categories = document.querySelectorAll("#categories input");
    function displayFoodItems() {
        let checkedCategories = checkForCheckedCategories();
        if (checkedCategories.length === 0) {
            options.innerHTML = "";
            displayAllFoodItems();
        }
        else if (checkedCategories.length > 0) {
            checkedCategories = checkForCheckedCategories();
            options.innerHTML = "";
            displayCheckedCategories(checkedCategories);
        }
        function displayAllFoodItems() {
            const foodItemsToShow = getFoodItemsFromDatabase();
            for (const foodItem of foodItemsToShow) {
                const foodItemToShow = document.createElement('option');
                foodItemToShow.innerHTML = foodItem;
                foodItemToShow.value = foodItem;
                options.appendChild(foodItemToShow);
            }
        }
        function displayCheckedCategories(categories) {
            const categoriesToDisplay = getFoodItemsByCategory(categories);
            for (const foodItem of categoriesToDisplay) {
                const foodItemToShow = document.createElement('option');
                foodItemToShow.innerHTML = foodItem;
                foodItemToShow.value = foodItem;
                options.appendChild(foodItemToShow);
            }
        }
        function checkForCheckedCategories() {
            let categoriesToShow = [];
            categories.forEach(c => {
                if (c.checked) {
                    categoriesToShow.push(c.name);
                }
                if (!c.checked) {
                    categoriesToShow = categoriesToShow.filter(categoryName => {
                        return c.name !== categoryName;
                    });
                }
            });
            return categoriesToShow;
        }
    }
    categories.forEach(c => {
        c.addEventListener('change', function (e) {
            displayFoodItems();
        });
    });
    document.addEventListener('click', function (e) {
        formDisplay.style.display = "none";
        foodItemDisplay.innerHTML = "";
        resetFoodItemsToAddToMealList();
    });
    formDisplay.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    displayCancel.addEventListener("click", function (e) {
        formDisplay.style.display = "none";
        foodItemDisplay.innerHTML = "";
        resetFoodItemsToAddToMealList();
    });
    const mealForm = document.forms.namedItem('meal');
    const foodItemForm = document.forms.namedItem('food item form');
    const foodItemDisplay = document.getElementById('fooditems-display');
    foodItemForm.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(foodItemForm);
        const foodItemId = onAddFoodItemToMeal(formData);
        foodItemForm.reset();
        const foodItemButton = document.createElement('button');
        const foodItemName = getFoodItemName(formData);
        const foodItemWeight = getFoodItemWeight(formData);
        foodItemButton.innerHTML = `${foodItemName} | ${foodItemWeight} grams`;
        foodItemButton.value = foodItemId;
        foodItemButton.type = 'button';
        foodItemDisplay.appendChild(foodItemButton);
    });
    foodItemDisplay.addEventListener('click', function (e) {
        const foodItemToRemove = e.target;
        onRemoveFoodItemFromMeal(foodItemToRemove.value);
        foodItemToRemove.remove();
    });
    mealForm.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(mealForm);
        onAdd(formData);
        foodItemDisplay.innerHTML = "";
    });
}

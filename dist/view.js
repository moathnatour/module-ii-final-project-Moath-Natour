import { onAddMeal, getFoodItemsFromDatabase, getFoodItemsByCategory } from "./controller.js";
import { monthlyLog, getCaloriesPerDay, getTodaysMeals, getCaloriesByMeal } from "./model.js";
export function init(addMealButton, formDisplay, displayCancel, options, monthlyCaloriesChart, caloricIntakeChart) {
    const { onAddFoodItemToMeal, onRemoveFoodItemFromMeal, onAdd, getFoodItemName, getFoodItemWeight, resetFoodItemsToAddToMealList } = onAddMeal();
    console.log(monthlyLog);
    renderCalorieTrackerChart();
    renderTodayMealschart();
    function renderCalorieTrackerChart() {
        monthlyCaloriesChart.innerHTML = "";
        for (const day of monthlyLog) {
            const calories = getCaloriesPerDay(day);
            const height = (calories / 5000) * 100;
            const newDiv = document.createElement('div');
            newDiv.classList.add('day');
            newDiv.style.height = `${height}%`;
            if (calories > 0) {
                const caloriesDisplay = document.createElement('p');
                caloriesDisplay.innerText = calories.toString();
                newDiv.appendChild(caloriesDisplay);
            }
            monthlyCaloriesChart.appendChild(newDiv);
        }
    }
    function renderTodayMealschart() {
        caloricIntakeChart.innerHTML = "";
        const mealsToRender = getTodaysMeals();
        mealsToRender.forEach(m => {
            const calories = getCaloriesByMeal(m);
            let height = 0;
            if (typeof calories !== "string") {
                height = (calories / 5000) * 100;
            }
            const newDiv = document.createElement('div');
            newDiv.classList.add('day');
            newDiv.style.height = `${height}%`;
            if (typeof calories !== "string" && calories > 0) {
                const caloriesDisplay = document.createElement('p');
                caloriesDisplay.innerText = calories.toString();
                newDiv.appendChild(caloriesDisplay);
            }
            caloricIntakeChart.appendChild(newDiv);
        });
    }
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
        renderCalorieTrackerChart();
        renderTodayMealschart();
        console.log(monthlyLog);
    });
    const dateButton = document.getElementById('date-button');
    const logMealDate = document.getElementById('log-meal-date');
    dateButton.addEventListener("click", function (e) {
        logMealDate.classList.toggle('hidden');
    });
}

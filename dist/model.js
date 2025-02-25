export let monthlyLog = [];
monthlyLog = getMonthlyLogFromLocalStorage();
export function constructMonthlyLog() {
    let monthlyLog = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInCurrentMonth = getDaysInAMonth(currentYear, currentMonth);
    function getDaysInAMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const meals = [];
        const id = crypto.randomUUID().replaceAll("-", " ").slice(-9);
        const date = new Date(currentYear, currentMonth, i);
        const newDay = {
            date,
            id,
            meals,
        };
        monthlyLog.push(newDay);
    }
    return monthlyLog;
}
export function getCaloriesPerDay(day) {
    let totalCalories = 0;
    day.meals.forEach(m => {
        const caloriesToAdd = getCaloriesByMeal(m);
        if (typeof caloriesToAdd !== "string") {
            totalCalories += caloriesToAdd;
        }
    });
    return totalCalories;
}
export function getTodaysMeals() {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return monthlyLog.find(d => (d.date.getDate() === todayDate.getDate())).meals;
}
export function addMeal(meal) {
    const mealDate = meal.date;
    try {
        const day = monthlyLog.find(d => {
            return d.date.getDate() === mealDate.getDate();
        });
        if (day) {
            day.meals.push(meal);
            saveMonthlyLogToLocalStorage();
        }
    }
    catch (error) {
        console.log(error);
    }
}
export function searchFoodItemByName(name) {
    const foodItem = foodDatabase.find(foodItem => (foodItem.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
    return { ...foodItem };
}
export function getCaloriesByFoodType(foodItem) {
    let calories = 0;
    const foodItemFound = foodDatabase.find(f => f.name === foodItem.name);
    if (foodItemFound && foodItem.weight) {
        calories = foodItem.caloriesPer100g * foodItem.weight / 100;
        return calories;
    }
    else
        return "";
}
export function getCaloriesByMeal(meal) {
    let totalCalories = 0;
    const missingWeights = [];
    meal.content.forEach(foodItem => {
        const caloriesToAdd = getCaloriesByFoodType(foodItem);
        if (typeof caloriesToAdd === "string") {
            missingWeights.push(`the weight of ${foodItem.name} is missing`);
        }
        else {
            totalCalories += caloriesToAdd;
        }
    });
    if (missingWeights.length > 0) {
        for (const missingWeight of missingWeights) {
            console.log(missingWeight);
        }
        return "calculation failed, weights missing";
    }
    else {
        return totalCalories;
    }
}
export function addFoodItem(food) {
    foodDatabase.push(food);
}
export let foodDatabase = [
    {
        name: "Chicken breast",
        category: "Protein",
        caloriesPer100g: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
    },
    {
        name: "Salmon",
        category: "Protein",
        caloriesPer100g: 208,
        protein: 20,
        carbs: 0,
        fat: 13
    },
    {
        name: "Sweet potato",
        category: "Carbohydrate",
        caloriesPer100g: 86,
        protein: 1.6,
        carbs: 20,
        fat: 0.1
    },
    {
        name: "Banana",
        category: "Fruit",
        caloriesPer100g: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3
    },
    {
        name: "Egg",
        category: "Protein",
        caloriesPer100g: 143,
        protein: 12.6,
        carbs: 1.1,
        fat: 9.5
    },
    {
        name: "Almonds",
        category: "Fat",
        caloriesPer100g: 579,
        protein: 21.2,
        carbs: 21.6,
        fat: 49.9
    },
    {
        name: "Broccoli",
        category: "Vegetable",
        caloriesPer100g: 55,
        protein: 3.7,
        carbs: 11.2,
        fat: 0.6
    },
    {
        name: "Rice",
        category: "Carbohydrate",
        caloriesPer100g: 130,
        protein: 2.4,
        carbs: 28,
        fat: 0.3
    },
    {
        name: "Quinoa",
        category: "Carbohydrate",
        caloriesPer100g: 120,
        protein: 4.1,
        carbs: 21.3,
        fat: 1.9
    },
    {
        name: "Cheddar cheese",
        category: "Dairy",
        caloriesPer100g: 402,
        protein: 25,
        carbs: 1.3,
        fat: 33.1
    },
    {
        name: "Cucumber",
        category: "Vegetable",
        caloriesPer100g: 16,
        protein: 0.7,
        carbs: 3.6,
        fat: 0.1
    },
    {
        name: "Tomato",
        category: "Vegetable",
        caloriesPer100g: 18,
        protein: 0.9,
        carbs: 3.9,
        fat: 0.2
    },
    {
        name: "Carrot",
        category: "Vegetable",
        caloriesPer100g: 41,
        protein: 0.9,
        carbs: 9.6,
        fat: 0.2
    },
    {
        name: " Brown Rice",
        category: "Carbohydrate",
        caloriesPer100g: 111,
        protein: 2.6,
        carbs: 23,
        fat: 0.9
    },
    {
        name: "Yogurt",
        category: "Dairy",
        caloriesPer100g: 59,
        protein: 10,
        carbs: 7.7,
        fat: 0.4
    },
    {
        name: "Peanut butter",
        category: "Fat",
        caloriesPer100g: 588,
        protein: 25,
        carbs: 20,
        fat: 50
    },
    {
        name: "Avocado",
        category: "Fat",
        caloriesPer100g: 160,
        protein: 2,
        carbs: 9,
        fat: 15
    },
    {
        name: "Spinach",
        category: "Vegetable",
        caloriesPer100g: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4
    },
    {
        name: "Apple",
        category: "Fruit",
        caloriesPer100g: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2
    },
    {
        name: "Strawberry",
        category: "Fruit",
        caloriesPer100g: 32,
        protein: 0.8,
        carbs: 7.7,
        fat: 0.3
    },
    {
        name: "Blueberry",
        category: "Fruit",
        caloriesPer100g: 57,
        protein: 0.7,
        carbs: 14,
        fat: 0.3
    },
    {
        name: "Pork loin",
        category: "Protein",
        caloriesPer100g: 242,
        protein: 26,
        carbs: 0,
        fat: 14.5
    },
    {
        name: "Ground beef (80% lean)",
        category: "Protein",
        caloriesPer100g: 250,
        protein: 26,
        carbs: 0,
        fat: 17
    },
    {
        name: "Turkey breast",
        category: "Protein",
        caloriesPer100g: 135,
        protein: 30,
        carbs: 0,
        fat: 1
    },
    {
        name: "Tuna",
        category: "Protein",
        caloriesPer100g: 132,
        protein: 28,
        carbs: 0,
        fat: 1
    },
    {
        name: "Tofu (firm)",
        category: "Protein",
        caloriesPer100g: 144,
        protein: 15.7,
        carbs: 3.9,
        fat: 8.7
    },
    {
        name: "Lentils",
        category: "Carbohydrate",
        caloriesPer100g: 116,
        protein: 9,
        carbs: 20,
        fat: 0.4
    },
    {
        name: "Chickpeas",
        category: "Carbohydrate",
        caloriesPer100g: 164,
        protein: 8.9,
        carbs: 27.4,
        fat: 2.6
    },
    {
        name: "Cottage cheese",
        category: "Dairy",
        caloriesPer100g: 98,
        protein: 11,
        carbs: 3.4,
        fat: 4.3
    },
    {
        name: "Whole wheat bread",
        category: "Carbohydrate",
        caloriesPer100g: 247,
        protein: 13,
        carbs: 41.5,
        fat: 3.3
    },
    {
        name: "Oats",
        category: "Carbohydrate",
        caloriesPer100g: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9
    },
    {
        name: "Potato",
        category: "Carbohydrate",
        caloriesPer100g: 77,
        protein: 2,
        carbs: 17.5,
        fat: 0.1
    },
    {
        name: "Coconut oil",
        category: "Fat",
        caloriesPer100g: 892,
        protein: 0,
        carbs: 0,
        fat: 100
    }
];
foodDatabase = getUpdatedDatabaseFromLocalStorage();
export function saveMonthlyLogToLocalStorage() {
    localStorage.setItem('monthlyLog', JSON.stringify(monthlyLog));
}
function getMonthlyLogFromLocalStorage() {
    const logJSON = localStorage.getItem('monthlyLog');
    let monthlyLog = JSON.parse(logJSON);
    if (Array.isArray(monthlyLog)) {
        return monthlyLog.map(day => ({
            ...day,
            date: new Date(day.date),
            meals: day.meals.map((meal) => ({
                ...meal,
                date: new Date(meal.date),
            })),
        }));
    }
    else
        monthlyLog = constructMonthlyLog();
    return monthlyLog;
}
export function saveDatabaseToLocalStorage() {
    localStorage.setItem('database', JSON.stringify(foodDatabase));
}
function getUpdatedDatabaseFromLocalStorage() {
    const dataJSON = localStorage.getItem('database');
    const newDatabase = JSON.parse(dataJSON);
    return newDatabase ? newDatabase : foodDatabase;
}

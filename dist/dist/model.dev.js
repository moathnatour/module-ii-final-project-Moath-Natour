"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructMonthlyLog = constructMonthlyLog;
exports.getCaloriesPerDay = getCaloriesPerDay;
exports.getTodaysMeals = getTodaysMeals;
exports.addMeal = addMeal;
exports.searchFoodItemByName = searchFoodItemByName;
exports.getCaloriesByFoodType = getCaloriesByFoodType;
exports.getCaloriesByMeal = getCaloriesByMeal;
exports.addFoodItem = addFoodItem;
exports.saveMonthlyLogToLocalStorage = saveMonthlyLogToLocalStorage;
exports.saveDatabaseToLocalStorage = saveDatabaseToLocalStorage;
exports.getUpdatedDatabaseFromLocalStorage = getUpdatedDatabaseFromLocalStorage;
exports.saveUsersToLocalStorage = saveUsersToLocalStorage;
exports.getUsersFromLocalStorage = getUsersFromLocalStorage;
exports.foodDatabase = exports.monthlyLog = exports.users = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var users = [];
exports.users = users;
var usersKey = "users";
exports.users = users = getUsersFromLocalStorage();
var monthlyLog = [];
exports.monthlyLog = monthlyLog;
exports.monthlyLog = monthlyLog = getMonthlyLogFromLocalStorage();

function constructMonthlyLog() {
  var monthlyLog = [];
  var today = new Date();
  var currentYear = today.getFullYear();
  var currentMonth = today.getMonth();
  var daysInCurrentMonth = getDaysInAMonth(currentYear, currentMonth);

  function getDaysInAMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  for (var i = 1; i <= daysInCurrentMonth; i++) {
    var meals = [];
    var id = crypto.randomUUID().replaceAll("-", " ").slice(-9);
    var date = new Date(currentYear, currentMonth, i);
    var newDay = {
      date: date,
      id: id,
      meals: meals
    };
    monthlyLog.push(newDay);
  }

  return monthlyLog;
}

function getCaloriesPerDay(day) {
  var totalCalories = 0;
  day.meals.forEach(function (m) {
    var caloriesToAdd = getCaloriesByMeal(m);

    if (typeof caloriesToAdd !== "string") {
      totalCalories += caloriesToAdd;
    }
  });
  return totalCalories;
}

function getTodaysMeals() {
  var todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  return monthlyLog.find(function (d) {
    return d.date.getDate() === todayDate.getDate();
  }).meals;
}

function addMeal(meal) {
  var mealDate = meal.date;

  try {
    var day = monthlyLog.find(function (d) {
      return d.date.getDate() === mealDate.getDate();
    });

    if (day) {
      day.meals.push(meal);
      saveMonthlyLogToLocalStorage();
    }
  } catch (error) {
    console.log(error);
  }
}

function searchFoodItemByName(name) {
  var foodItem = foodDatabase.find(function (foodItem) {
    return foodItem.name.toLocaleLowerCase() === name.toLocaleLowerCase();
  });
  return _objectSpread({}, foodItem);
}

function getCaloriesByFoodType(foodItem) {
  var calories = 0;
  var foodItemFound = foodDatabase.find(function (f) {
    return f.name === foodItem.name;
  });

  if (foodItemFound && foodItem.weight) {
    calories = foodItem.caloriesPer100g * foodItem.weight / 100;
    return calories;
  } else return "";
}

function getCaloriesByMeal(meal) {
  var totalCalories = 0;
  var missingWeights = [];
  meal.content.forEach(function (foodItem) {
    var caloriesToAdd = getCaloriesByFoodType(foodItem);

    if (typeof caloriesToAdd === "string") {
      missingWeights.push("the weight of ".concat(foodItem.name, " is missing"));
    } else {
      totalCalories += caloriesToAdd;
    }
  });

  if (missingWeights.length > 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = missingWeights[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var missingWeight = _step.value;
        console.log(missingWeight);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return "calculation failed, weights missing";
  } else {
    return totalCalories;
  }
}

function addFoodItem(food) {
  foodDatabase.push(food);
}

var foodDatabase = [{
  name: "Chicken breast",
  category: "Protein",
  caloriesPer100g: 165,
  protein: 31,
  carbs: 0,
  fat: 3.6
}, {
  name: "Salmon",
  category: "Protein",
  caloriesPer100g: 208,
  protein: 20,
  carbs: 0,
  fat: 13
}, {
  name: "Sweet potato",
  category: "Carbohydrate",
  caloriesPer100g: 86,
  protein: 1.6,
  carbs: 20,
  fat: 0.1
}, {
  name: "Banana",
  category: "Fruit",
  caloriesPer100g: 89,
  protein: 1.1,
  carbs: 23,
  fat: 0.3
}, {
  name: "Egg",
  category: "Protein",
  caloriesPer100g: 143,
  protein: 12.6,
  carbs: 1.1,
  fat: 9.5
}, {
  name: "Almonds",
  category: "Fat",
  caloriesPer100g: 579,
  protein: 21.2,
  carbs: 21.6,
  fat: 49.9
}, {
  name: "Broccoli",
  category: "Vegetable",
  caloriesPer100g: 55,
  protein: 3.7,
  carbs: 11.2,
  fat: 0.6
}, {
  name: "Rice",
  category: "Carbohydrate",
  caloriesPer100g: 130,
  protein: 2.4,
  carbs: 28,
  fat: 0.3
}, {
  name: "Quinoa",
  category: "Carbohydrate",
  caloriesPer100g: 120,
  protein: 4.1,
  carbs: 21.3,
  fat: 1.9
}, {
  name: "Cheddar cheese",
  category: "Dairy",
  caloriesPer100g: 402,
  protein: 25,
  carbs: 1.3,
  fat: 33.1
}, {
  name: "Cucumber",
  category: "Vegetable",
  caloriesPer100g: 16,
  protein: 0.7,
  carbs: 3.6,
  fat: 0.1
}, {
  name: "Tomato",
  category: "Vegetable",
  caloriesPer100g: 18,
  protein: 0.9,
  carbs: 3.9,
  fat: 0.2
}, {
  name: "Carrot",
  category: "Vegetable",
  caloriesPer100g: 41,
  protein: 0.9,
  carbs: 9.6,
  fat: 0.2
}, {
  name: " Brown Rice",
  category: "Carbohydrate",
  caloriesPer100g: 111,
  protein: 2.6,
  carbs: 23,
  fat: 0.9
}, {
  name: "Yogurt",
  category: "Dairy",
  caloriesPer100g: 59,
  protein: 10,
  carbs: 7.7,
  fat: 0.4
}, {
  name: "Peanut butter",
  category: "Fat",
  caloriesPer100g: 588,
  protein: 25,
  carbs: 20,
  fat: 50
}, {
  name: "Avocado",
  category: "Fat",
  caloriesPer100g: 160,
  protein: 2,
  carbs: 9,
  fat: 15
}, {
  name: "Spinach",
  category: "Vegetable",
  caloriesPer100g: 23,
  protein: 2.9,
  carbs: 3.6,
  fat: 0.4
}, {
  name: "Apple",
  category: "Fruit",
  caloriesPer100g: 52,
  protein: 0.3,
  carbs: 14,
  fat: 0.2
}, {
  name: "Strawberry",
  category: "Fruit",
  caloriesPer100g: 32,
  protein: 0.8,
  carbs: 7.7,
  fat: 0.3
}, {
  name: "Blueberry",
  category: "Fruit",
  caloriesPer100g: 57,
  protein: 0.7,
  carbs: 14,
  fat: 0.3
}, {
  name: "Pork loin",
  category: "Protein",
  caloriesPer100g: 242,
  protein: 26,
  carbs: 0,
  fat: 14.5
}, {
  name: "Ground beef (80% lean)",
  category: "Protein",
  caloriesPer100g: 250,
  protein: 26,
  carbs: 0,
  fat: 17
}, {
  name: "Turkey breast",
  category: "Protein",
  caloriesPer100g: 135,
  protein: 30,
  carbs: 0,
  fat: 1
}, {
  name: "Tuna",
  category: "Protein",
  caloriesPer100g: 132,
  protein: 28,
  carbs: 0,
  fat: 1
}, {
  name: "Tofu (firm)",
  category: "Protein",
  caloriesPer100g: 144,
  protein: 15.7,
  carbs: 3.9,
  fat: 8.7
}, {
  name: "Lentils",
  category: "Carbohydrate",
  caloriesPer100g: 116,
  protein: 9,
  carbs: 20,
  fat: 0.4
}, {
  name: "Chickpeas",
  category: "Carbohydrate",
  caloriesPer100g: 164,
  protein: 8.9,
  carbs: 27.4,
  fat: 2.6
}, {
  name: "Cottage cheese",
  category: "Dairy",
  caloriesPer100g: 98,
  protein: 11,
  carbs: 3.4,
  fat: 4.3
}, {
  name: "Whole wheat bread",
  category: "Carbohydrate",
  caloriesPer100g: 247,
  protein: 13,
  carbs: 41.5,
  fat: 3.3
}, {
  name: "Oats",
  category: "Carbohydrate",
  caloriesPer100g: 389,
  protein: 16.9,
  carbs: 66.3,
  fat: 6.9
}, {
  name: "Potato",
  category: "Carbohydrate",
  caloriesPer100g: 77,
  protein: 2,
  carbs: 17.5,
  fat: 0.1
}, {
  name: "Coconut oil",
  category: "Fat",
  caloriesPer100g: 892,
  protein: 0,
  carbs: 0,
  fat: 100
}];
exports.foodDatabase = foodDatabase;
exports.foodDatabase = foodDatabase = getUpdatedDatabaseFromLocalStorage();

function saveMonthlyLogToLocalStorage() {
  localStorage.setItem('monthlyLog', JSON.stringify(monthlyLog));
}

function getMonthlyLogFromLocalStorage() {
  var logJSON = localStorage.getItem('monthlyLog');
  var monthlyLog = JSON.parse(logJSON);

  if (Array.isArray(monthlyLog)) {
    return monthlyLog.map(function (day) {
      return _objectSpread({}, day, {
        date: new Date(day.date),
        meals: day.meals.map(function (meal) {
          return _objectSpread({}, meal, {
            date: new Date(meal.date)
          });
        })
      });
    });
  } else monthlyLog = constructMonthlyLog();

  return monthlyLog;
}

function saveDatabaseToLocalStorage() {
  localStorage.setItem('database', JSON.stringify(foodDatabase));
}

function getUpdatedDatabaseFromLocalStorage() {
  var dataJSON = localStorage.getItem('database');
  var newDatabase = JSON.parse(dataJSON);
  return newDatabase ? newDatabase : foodDatabase;
}

function saveUsersToLocalStorage() {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function getUsersFromLocalStorage() {
  var usersJSON = localStorage.getItem(usersKey);
  var users = JSON.parse(usersJSON);

  try {
    if (Array.isArray(users)) {
      users.forEach(function (u) {
        u.monthlyLog.forEach(function (day) {
          return _objectSpread({}, day, {
            date: new Date(day.date),
            meals: day.meals.map(function (meal) {
              return {
                date: new Date(meal.date)
              };
            })
          });
        });
      });
      return users;
    } else {
      return users ? users : [];
    }
  } catch (error) {
    console.log(users, error);
  }

  return [];
}
import { constructMonthlyLog, getUpdatedDatabaseFromLocalStorage, users } from "./model.js";
import { registerUser } from "./registerModel.js";
export function onRegisterUser(formData) {
    const name = formData.get('name');
    const lastName = formData.get('lastname');
    const weight = Number(formData.get('weight'));
    const height = Number(formData.get('height'));
    const age = Number(formData.get('age'));
    const gender = formData.get('gender');
    const userName = formData.get('username');
    const password = formData.get('password');
    const id = crypto.randomUUID().replaceAll("-", "").slice(-9);
    const monthlyLog = constructMonthlyLog();
    const validatePassword = formData.get('validate-password');
    const foodDatabase = getUpdatedDatabaseFromLocalStorage();
    if (password !== validatePassword) {
        return 'Password confirmation failed!';
    }
    if (password === name || password === userName || password === lastName) {
        return "Can't set password to your name, username or last name.";
    }
    if (password.toLocaleLowerCase() === password) {
        return "Password must contain at least one UpperCase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must have at least one number.";
    }
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        return "Invalid input, weight height and age must be a valid number.";
    }
    const userIdAlreadyExists = users.find(u => (u.id === id));
    if (userIdAlreadyExists) {
        return "Oops, something went wrong, please try again.";
    }
    const userNameAlreadyExists = users.find(u => (u.userName === userName));
    if (userNameAlreadyExists) {
        return "Username is taken, please choose a different username";
    }
    if (password.length < 8 || password.length > 20) {
        return "Password must be between 8 and 20 letters";
    }
    else {
        const newUser = {
            name,
            lastName,
            userName,
            password,
            id,
            foodDatabase,
            monthlyLog,
            weight,
            height,
            age,
            gender
        };
        registerUser(newUser);
        return "success";
    }
}

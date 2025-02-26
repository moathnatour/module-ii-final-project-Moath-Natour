import { users, saveUsersToLocalStorage } from "./model.js";
export function registerUser(user) {
    users.push(user);
    saveUsersToLocalStorage();
}

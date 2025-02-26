import {users, user, saveUsersToLocalStorage} from "./model.js";

export function registerUser(user : user){
        users.push(user);
        saveUsersToLocalStorage();
    }


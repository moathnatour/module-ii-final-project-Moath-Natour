import { users } from "./model.js";
export function onLogin(formData) {
    const userName = formData.get('username');
    const password = formData.get('password');
    const currentUser = users.find(u => (u.userName === userName && u.password === password));
    if (currentUser) {
        return currentUser;
    }
    else
        return "Username or password is incorrect.";
}

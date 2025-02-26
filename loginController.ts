import {users} from "./model.js";
export function onLogin(formData : FormData){

    const userName = formData.get('username') as string;
    const password = formData.get('password') as string;

    const currentUser = users.find(u => (
        u.userName === userName && u.password === password
    ));

    if(currentUser){
        return currentUser;
    }
    else return "Username or password is incorrect.";
}
import { getUsersFromLocalStorage} from "./model.js";

const currentUserIdKey = 'currentUser';
export function onLogin(formData : FormData){

    const userName = formData.get('username') as string;
    const password = formData.get('password') as string;

    const users = getUsersFromLocalStorage();
    console.log(users);
    const currentUser = users.find(u => (
        u.userName === userName && u.password === password
    ));
console.log(currentUser);
    if(currentUser){
       const currentUserId = currentUser.id;
       localStorage.setItem(currentUserIdKey, JSON.stringify(currentUserId))
        return currentUser;
    }
    else return "Username or password is incorrect.";
}
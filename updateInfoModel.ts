import { getCurrentUserId, saveUsersToLocalStorage, users, } from "./model.js";

const currentUserId = getCurrentUserId();
const monthlyLog = users.find(u => (u.id === currentUserId)).monthlyLog;
monthlyLog.forEach(d =>{
    d.date = new Date(d.date);
    d.meals.forEach(m =>{
        m.date = new Date(m.date);
    })
})
export function logWeight(weight : number, date : Date){
let result  = ""
    for(const day of monthlyLog){

        if(day.date.getTime() === date.getTime()){
            day.userWeight = weight;
           saveUsersToLocalStorage();
           result = "success";
           
        }

        
    }
 if(result !== "success"){
    return "cannot find date to log weight"
 }

 else return result
    

}
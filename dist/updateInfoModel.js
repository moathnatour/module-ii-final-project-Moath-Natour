import { monthlyLog, saveMonthlyLogToLocalStorage } from "./model.js";
export function logWeight(weight, date) {
    let result = "success";
    for (const day of monthlyLog) {
        if (day.date.getTime() === date.getTime()) {
            day.userWeight = weight;
            saveMonthlyLogToLocalStorage();
        }
        else
            result = "cannot find date to log weight";
    }
    return result;
}

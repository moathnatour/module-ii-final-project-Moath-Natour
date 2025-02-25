import { logWeight } from "./updateInfoModel.js";
export function onUpdateWeight(formData) {
    const weight = Number(formData.get('weight'));
    const rawDate = formData.get('date');
    let date = new Date(rawDate);
    date = isNaN(date.getTime()) ? new Date() : date;
    date.setHours(0, 0, 0, 0);
    if (isNaN(weight)) {
        return "weight must be a number";
    }
    else if (weight > 150 || weight < 40) {
        return "weight must be between 40kg and 150kg";
    }
    else
        return logWeight(weight, date);
}

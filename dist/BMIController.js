import { calculateBmi } from "./BMIModel.js";
export function onCalculateBmi(formData) {
    const weight = Number(formData.get('weight'));
    const height = Number(formData.get('height'));
    if (isNaN(weight) || isNaN(height)) {
        return "weight and height must be valid numbers";
    }
    return calculateBmi(weight, height);
}

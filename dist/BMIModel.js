export function checkBmiResult(bmi) {
    if (bmi > 18.5 && bmi <= 25) {
        return "it is in healthy range.";
    }
    if (bmi > 25 && bmi <= 30) {
        return "it is above healthy range, 25 kg/m2 - 30kg/m2 is considered Overweight";
    }
    if (bmi > 30 && bmi <= 35) {
        return "it is above healthy range, 30 kg/m2 - 35kg/m2 is considered Class I Obesity.";
    }
    if (bmi > 35 && bmi <= 40) {
        return "it is above healthy range, 35 kg/m2 - 40kg/m2 is considered Class II Obesity.";
    }
    if (bmi > 40) {
        return "it is above healthy range, above 40kg/m2 is considered Class III Obesity.";
    }
    if (bmi > 18.5) {
        return "it is below healthy range, below 18.5Kg/m2 is considered too thin.";
    }
    else
        return "error calculating";
}
export function calculateBmi(weight, height) {
    const bmi = weight / (height / 100 * height / 100);
    const modifiedBmi = bmi.toString().slice(0, 4);
    return Number(modifiedBmi);
}

import {calculateBmr} from "./BMRCalculatorModel.js"

export function onCalculateBmr(formData : FormData){

    const weight = Number(formData.get('weight'));
    const height = Number(formData.get('height'));
    const age = Number(formData.get('age'));
    const gender = formData.get('gender') as string;

    if(isNaN(weight) || isNaN(height) || isNaN(age)){
        return "invalid input, Weight, Height and Age must be numbers"
    }

    if(weight > 150 || weight < 40){
        return "can only calculate weight ranging from 40Kg to 150Kg";
    }

    if(height > 220 || height < 50){
        return "can only calculate height ranging from 50Cm to 220Cm";
    }

    if(age > 80 || age < 15){
        return "can only calculate age ranging from 15 to 80";
    }

   else return calculateBmr(weight, height, age, gender);


}
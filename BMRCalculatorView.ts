import {onCalculateBmr} from "./BMRCalculatorController.js"

export function init (bmrForm : HTMLFormElement , errorDisplay  : HTMLElement, resultDisplay : HTMLElement){

    bmrForm.addEventListener('submit' , function(e){
    e.preventDefault();

    const formData = new FormData(bmrForm);
    const result = onCalculateBmr(formData);
errorDisplay.innerText = "";
resultDisplay.innerText = "";

    if(typeof result === "string"){
errorDisplay.innerText = result;
    }

    else{
        resultDisplay.innerText = `Your BMR is ${result};`;
        bmrForm.reset(); 
    }

    })
}
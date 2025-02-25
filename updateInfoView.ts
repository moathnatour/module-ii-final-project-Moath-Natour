import {onUpdateWeight} from "./updateInfoController.js"

export function init  (weightForm : HTMLFormElement, errorDisplay : HTMLElement,
    chooseDatebutton : HTMLButtonElement, dateInput : HTMLElement){

    weightForm.addEventListener("submit", function(e){
        
      e.preventDefault();

        const formData = new FormData(weightForm);
        const result  =  onUpdateWeight(formData);
        weightForm.reset();
        errorDisplay.innerText = "";
        if(result !== "success"){
            errorDisplay.innerText = result;
        }
    })

    chooseDatebutton.addEventListener("click" ,function(e){
        
                   dateInput.classList.toggle('hidden');
       })

}
import { onCalculateBmi } from "./BMIController.js";
import { checkBmiResult } from "./BMIModel.js";
export function init(bmiForm, errorDisplay, resultDisplay) {
    bmiForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(bmiForm);
        const result = onCalculateBmi(formData);
        bmiForm.reset();
        errorDisplay.innerText = "";
        resultDisplay.innerText = "";
        if (typeof result === "string") {
            errorDisplay.innerText = result;
        }
        else {
            const resultMessage = checkBmiResult(result);
            resultDisplay.innerText = `Your BMI is ${result} ${resultMessage}`;
        }
    });
}

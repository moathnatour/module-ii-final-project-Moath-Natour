import { onRegisterUser } from "./registerConroller.js";
export function init(registerFrom, errorDisplay) {
    registerFrom.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(registerFrom);
        const result = onRegisterUser(formData);
        if (result !== "success") {
            errorDisplay.innerText = result;
        }
        else {
            registerFrom.reset();
        }
    });
}

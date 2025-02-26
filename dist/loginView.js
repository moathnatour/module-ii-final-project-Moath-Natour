import { onLogin } from "./loginController.js";
export function init(loginForm, errorDisplay) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const result = onLogin(formData);
        if (typeof result === "string") {
            errorDisplay.innerText = result;
        }
        else {
            loginForm.reset();
            window.location.assign(`index.html#${result.id}`);
        }
    });
}

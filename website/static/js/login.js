import { isEmailValid, isPasswordValid } from "./validator.js";
import { showAlert } from "./alert.js";

/**
 * Event listener for the login form.
 */
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailValidation = isEmailValid(email);

    if (emailValidation !== true) {
        showAlert(emailValidation, "error");
        return;
    }

    var passwordValidation = isPasswordValid(password);

    if (passwordValidation !== true) {
        showAlert(passwordValidation, "error");
        return;
    }

    this.submit();    
});

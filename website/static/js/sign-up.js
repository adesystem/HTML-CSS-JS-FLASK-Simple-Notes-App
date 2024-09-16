import { isUsernameValid, isEmailValid, isPasswordValid } from "./validator.js";
import { showAlert } from "./alert.js";

/**
 * Event listener for the sign-up form.
*/
document.getElementById("sign-up-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var usernameValidation = isUsernameValid(username);

    if (usernameValidation !== true) {
        showAlert(usernameValidation, "error");
        return;
    }

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

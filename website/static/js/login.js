import { showAlert } from "./alert.js";

/**
 * Event listener for the login form.
 */
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username) {
        showAlert("Username is required.");
        return;
    }

    if (!password) {
        showAlert("Password is required.");
        return;
    }

    this.submit();    
});

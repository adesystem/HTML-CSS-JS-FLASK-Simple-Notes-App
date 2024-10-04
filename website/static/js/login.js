import { showAlert } from "./alert.js";

/**
 * Event listener for the login form.
 */
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username) {
        showAlert("USERNAME IS REQUIRED");
        return;
    }

    if (!password) {
        showAlert("PASSWORD IS REQUIARED");
        return;
    }

    this.submit();    
});

import { showAlert } from "./alert.js";


document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username) {
        showAlert("Username is required", "error");
        return;
    }

    if (!password) {
        showAlert("Password is required", "error");
        return;
    }

    this.submit();    
});

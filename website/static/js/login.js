import { showAlert } from "./alert.js";


document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email) {
        showAlert("Email is required.", "error");
        return;
    } else {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!pattern.test(email)) {
            showAlert("Email is not valid.", "error");
            return;
        }
    }

    if (!password) {
        showAlert("Password is required.", "error");
        return;
    }

    this.submit();    
});

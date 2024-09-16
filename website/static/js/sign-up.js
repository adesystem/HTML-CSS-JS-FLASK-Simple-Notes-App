import { showAlert } from "./alert.js";


document.getElementById("sign-up-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!username) {
        showAlert("Username is required", "error");
        return;
    } else {
        
        if (username.length < 6) {
            showAlert("Username must be at least 6 characters", "error");
            return;
        } 
        
        if (username.length > 30) {
            showAlert("Username must be at most 30 characters", "error");
            return;
        }
    }

    if (!email) {
        showAlert("Email is required", "error");
        return;
    } else {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!pattern.test(email)) {
            showAlert("Email is not valid", "error");
            return;
        }
    }

    if (!password) {
        showAlert("Password is required", "error");
        return;
    } else {
        
        if (password.length < 6) {
            showAlert("Password must be at least 6 characters", "error");
            return;
        } 
        
        if (password.length > 120) {
            showAlert("Password must be at most 120 characters", "error");
            return;
        }
        
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,120}$/;

        if (!pattern.test(password)) {
            showAlert("Password must contain at least one number, one lowercase and one uppercase letter", "error");
            return;
        }
    }

    this.submit();    
});

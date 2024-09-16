/**
 * Event listener for flash messages from backend.
 * Displays an alert message for each flash message.
 */
document.addEventListener("DOMContentLoaded", () => {
    const flashMessages = JSON.parse(document.getElementById("flash-messages").textContent);

    flashMessages.forEach( function(message) {
        const category = message[0]; 
        const text = message[1];
        
        if (!text) {
            return;
        }
        
        showAlert(text, category);   
    });
});

/**
 * Displays an alert message on the webpage.
 * 
 * @param {string} message - The message to be displayed in the alert.
 * @param {string} [type="info"] - The type of alert. Defaults to "info".
 * @param {number} [duration=5000] - The duration in milliseconds for which the alert should be displayed. Defaults to 5000.
 */
export function showAlert(message, type = "info", duration = 5000) {
    const alertContainer = document.getElementById("alert-container");

    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type}`;
    alertBox.innerHTML = `
        <span>${message}</span>
        <span class="close-button">&times;</span>
    `;

    alertContainer.appendChild(alertBox);

    alertBox.querySelector(".close-button").addEventListener("click", () => {
        alertBox.remove();
    });

    if (duration > 0) {
        setTimeout(() => {
            alertBox.remove();
        }, duration);
    }
}


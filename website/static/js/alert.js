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
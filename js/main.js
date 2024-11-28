document.addEventListener("DOMContentLoaded", () => {
    const updateCredentialsButton = document.getElementById("update-credentials");
    const modal = new bootstrap.Modal(document.getElementById("updateCredentialsModal"));
    const saveCredentialsButton = document.getElementById("save-credentials");
    const newUsernameInput = document.getElementById("new-username");
    const newPasswordInput = document.getElementById("new-password");

    // Open modal when "Update Credentials" button is clicked
    updateCredentialsButton.addEventListener("click", () => {
        modal.show();
    });

    // Save the updated credentials when "Save Changes" button is clicked
    saveCredentialsButton.addEventListener("click", () => {
        const username = newUsernameInput.value.trim();
        const password = newPasswordInput.value.trim();

        if (username && password) {
            localStorage.setItem("admin", JSON.stringify({ username, password }));
            alert("Credentials updated successfully!");
            modal.hide();
        } else {
            alert("Both username and password are required.");
        }
    });

    // Initialize default credentials if not set
    if (!localStorage.getItem("admin")) {
        localStorage.setItem("admin", JSON.stringify({ username: "admin", password: "admin123" }));
    }
});

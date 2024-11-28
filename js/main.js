document.addEventListener("DOMContentLoaded", () => {
    const updateCredentialsButton = document.getElementById("update-credentials");
    const modal = new bootstrap.Modal(document.getElementById("updateCredentialsModal"));
    const saveCredentialsButton = document.getElementById("save-credentials");
    const newUsernameInput = document.getElementById("new-username");
    const newPasswordInput = document.getElementById("new-password");


    const initializeData = () => {
        // Check if "students", "lecturers", and "subjects" already exist in localStorage
        if (!localStorage.getItem("students")) {
            const students = [
                { name: "John Doe", age: 20, course: "Computer Science" },
                { name: "Jane Smith", age: 22, course: "Mathematics" },
                { name: "Sara Lee", age: 21, course: "Physics" }
            ];
            localStorage.setItem("students", JSON.stringify(students));
        }

        if (!localStorage.getItem("lecturers")) {
            const lecturers = [
                { name: "Dr. Alice", subject: "Computer Science", experience: 5 },
                { name: "Prof. Bob", subject: "Mathematics", experience: 10 },
                { name: "Dr. Charlie", subject: "Physics", experience: 7 }
            ];
            localStorage.setItem("lecturers", JSON.stringify(lecturers));
        }

        if (!localStorage.getItem("subjects")) {
            const subjects = [
                { name: "Programming 101" },
                { name: "Advanced Mathematics" },
                { name: "Quantum Physics" }
            ];
            localStorage.setItem("subjects", JSON.stringify(subjects));
        }
    };

    // Call the initializeData function to set the default data if it's the user's first time
    initializeData();




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

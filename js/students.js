document.addEventListener("DOMContentLoaded", () => {
    const studentList = document.getElementById("student-list");
    const searchInput = document.getElementById("search-student");
    const addButton = document.getElementById("add-student");
    const modal = new bootstrap.Modal(document.getElementById("studentModal"));
    const saveButton = document.getElementById("save-student");
    const nameInput = document.getElementById("student-name");
    const emailInput = document.getElementById("student-email");
    const subjectsSelect = document.getElementById("student-subjects");

    let currentStudentIndex = -1;

    // Get students from localStorage or initialize as empty array
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Get subjects from localStorage
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    // Save students to localStorage
    const saveStudents = () => {
        localStorage.setItem("students", JSON.stringify(students));
    };

    // Render subjects in the select list for students
    const renderSubjects = () => {
        // Clear current subject options
        subjectsSelect.innerHTML = "";

        // Render all subjects saved in localStorage
        subjects.forEach(subject => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = subject.name;
            checkbox.id = `subject-${subject.name}`;
            checkbox.classList.add("form-check-input");

            const label = document.createElement("label");
            label.setAttribute("for", checkbox.id);
            label.classList.add("form-check-label");
            label.textContent = subject.name;

            const div = document.createElement("div");
            div.classList.add("form-check");
            div.appendChild(checkbox);
            div.appendChild(label);

            subjectsSelect.appendChild(div);
        });
    };

    // Render students on the page
    const renderStudents = () => {
        studentList.innerHTML = students.length
            ? students
                  .map(
                      (student, index) => `
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm p-3">
                                <h5 class="card-title">${student.name}</h5>
                                <p class="card-text">Email: ${student.email}</p>
                                <p class="card-text">Subjects: ${student.subjects.length ? student.subjects.join(", ") : "No subjects"}</p>
                                <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                            </div>
                        </div>`
                  )
                  .join("")
            : `<p>No students found.</p>`;
    };

    // Open modal for adding or editing a student
    const openModal = (studentIndex = -1) => {
        if (studentIndex !== -1) {
            const student = students[studentIndex];
            nameInput.value = student.name;
            emailInput.value = student.email;

            // Ensure student.subjects is defined as an array (default to an empty array if not)
            const subjects = student.subjects || [];

            // Loop through each checkbox and check if it's in the student's subjects list
            Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]')).forEach(checkbox => {
                checkbox.checked = subjects.includes(checkbox.value);  // Check if the subject is selected
            });
        } else {
            nameInput.value = "";
            emailInput.value = "";
            Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]')).forEach(checkbox => {
                checkbox.checked = false;  // Uncheck all when no student is selected
            });
        }
        currentStudentIndex = studentIndex;
        modal.show();
    };

    // Open modal when Add button is clicked
    addButton.addEventListener("click", () => {
        openModal();
    });

    // Save the student when Save button is clicked
    saveButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Get all checked checkboxes
        const selectedSubjects = Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

        if (name && email) {
            if (currentStudentIndex === -1) {
                // Add a new student
                students.push({ name, email, subjects: selectedSubjects });
            } else {
                // Update existing student
                students[currentStudentIndex] = { name, email, subjects: selectedSubjects };
            }
            saveStudents();
            renderStudents();
            modal.hide();
        } else {
            alert("Both name and email are required.");
        }
    });

    // Handle editing and deleting students
    studentList.addEventListener("click", event => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("delete-btn")) {
            students.splice(index, 1);
            saveStudents();
            renderStudents();
        } else if (event.target.classList.contains("edit-btn")) {
            openModal(index);
        }
    });

    // Filter students based on search input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredStudents = students.filter(
            student =>
                student.name.toLowerCase().includes(query) ||
                student.email.toLowerCase().includes(query)
        );
        studentList.innerHTML = filteredStudents.length
            ? filteredStudents
                  .map(
                      (student, index) => `
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm p-3">
                                <h5 class="card-title">${student.name}</h5>
                                <p class="card-text">Email: ${student.email}</p>
                                <p class="card-text">Subjects: ${student.subjects.join(", ")}</p>
                                <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                            </div>
                        </div>`
                  )
                  .join("")
            : `<p>No results found.</p>`;
    });

    // Initial rendering of subjects and students
    renderSubjects();
    renderStudents();
});

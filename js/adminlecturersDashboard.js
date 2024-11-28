document.addEventListener("DOMContentLoaded", () => {
    const lecturerList = document.getElementById("lecturer-list");
    const searchInput = document.getElementById("search-lecturer");
    const addButton = document.getElementById("add-lecturer");
    const modal = new bootstrap.Modal(document.getElementById("lecturerModal"));
    const saveButton = document.getElementById("save-lecturer");
    const nameInput = document.getElementById("lecturer-name");
    const emailInput = document.getElementById("lecturer-email");
    const subjectsSelect = document.getElementById("lecturer-subjects");

    let currentLecturerIndex = -1;

    const lecturers = JSON.parse(localStorage.getItem("lecturers")) || [];

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    const saveLecturers = () => {
        localStorage.setItem("lecturers", JSON.stringify(lecturers));
    };


    const renderSubjects = () => {

        subjectsSelect.innerHTML = "";

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


    const renderLecturers = () => {
        lecturerList.innerHTML = lecturers.length
            ? lecturers
                  .map(
                      (lecturer, index) => `
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm p-3">
                                <h5 class="card-title">${lecturer.name}</h5>
                                <p class="card-text">Email: ${lecturer.email}</p>
                                <p class="card-text">Subjects: ${lecturer.subjects.length ? lecturer.subjects.join(", ") : "No subjects"}</p>
                                <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                            </div>
                        </div>`
                  )
                  .join("")
            : `<p>No lecturers found.</p>`;
    };


    const openModal = (lecturerIndex = -1) => {
        if (lecturerIndex !== -1) {
            const lecturer = lecturers[lecturerIndex];
            nameInput.value = lecturer.name;
            emailInput.value = lecturer.email;


            const subjects = lecturer.subjects || [];


            Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]')).forEach(checkbox => {
                checkbox.checked = subjects.includes(checkbox.value);
            });
        } else {
            nameInput.value = "";
            emailInput.value = "";
            Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]')).forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        currentLecturerIndex = lecturerIndex;
        modal.show();
    };


    addButton.addEventListener("click", () => {
        openModal();
    });


    saveButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();


        const selectedSubjects = Array.from(subjectsSelect.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

        if (name && email) {
            if (currentLecturerIndex === -1) {

                lecturers.push({ name, email, subjects: selectedSubjects });
            } else {

                lecturers[currentLecturerIndex] = { name, email, subjects: selectedSubjects };
            }
            saveLecturers();
            renderLecturers();
            modal.hide();
        } else {
            alert("Both name and email are required.");
        }
    });

    lecturerList.addEventListener("click", event => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("delete-btn")) {
            lecturers.splice(index, 1);
            saveLecturers();
            renderLecturers();
        } else if (event.target.classList.contains("edit-btn")) {
            openModal(index);
        }
    });


    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredLecturers = lecturers.filter(
            lecturer =>
                lecturer.name.toLowerCase().includes(query) ||
                lecturer.email.toLowerCase().includes(query)
        );
        lecturerList.innerHTML = filteredLecturers.length
            ? filteredLecturers
                  .map(
                      (lecturer, index) => `
                        <div class="col-md-4 mb-4">
                            <div class="card shadow-sm p-3">
                                <h5 class="card-title">${lecturer.name}</h5>
                                <p class="card-text">Email: ${lecturer.email}</p>
                                <p class="card-text">Subjects: ${lecturer.subjects.join(", ")}</p>
                                <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                                <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                            </div>
                        </div>`
                  )
                  .join("")
            : `<p>No results found.</p>`;
    });

    renderSubjects();
    renderLecturers();
});

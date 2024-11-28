document.addEventListener("DOMContentLoaded", () => {
    const subjectList = document.getElementById("subject-list");
    const searchInput = document.getElementById("search-subject");
    const addButton = document.getElementById("add-subject");
    const modal = new bootstrap.Modal(document.getElementById("subjectModal"));
    const saveButton = document.getElementById("save-subject");
    const nameInput = document.getElementById("subject-name");

    let currentSubjectIndex = -1;

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    const saveSubjects = () => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    };

    const renderSubjects = () => {
        subjectList.innerHTML = subjects.length
            ? subjects
                  .map(
                      (subject, index) => `
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm p-3">
                            <h5 class="card-title">${subject.name}</h5>
                            <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                        </div>
                    </div>`
                  )
                  .join("")
            : `<p>No subjects found.</p>`;
    };

    const openModal = (subjectIndex = -1) => {
        if (subjectIndex !== -1) {
            const subject = subjects[subjectIndex];
            nameInput.value = subject.name;
        } else {
            nameInput.value = "";
        }
        currentSubjectIndex = subjectIndex;
        modal.show();
    };

    addButton.addEventListener("click", () => {
        openModal();
    });

    saveButton.addEventListener("click", () => {
        const name = nameInput.value.trim();

        if (name) {
            if (currentSubjectIndex === -1) {
                subjects.push({ name });
            } else {
                subjects[currentSubjectIndex] = { name };
            }
            saveSubjects();
            renderSubjects();
            modal.hide();
        } else {
            alert("Subject name is required.");
        }
    });

    subjectList.addEventListener("click", event => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("delete-btn")) {
            subjects.splice(index, 1);
            saveSubjects();
            renderSubjects();
        } else if (event.target.classList.contains("edit-btn")) {
            openModal(index);
        }
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredSubjects = subjects.filter(subject =>
            subject.name.toLowerCase().includes(query)
        );
        subjectList.innerHTML = filteredSubjects.length
            ? filteredSubjects
                  .map(
                      subject => `
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm p-3">
                            <h5 class="card-title">${subject.name}</h5>
                            <button class="btn btn-warning edit-btn" data-index="${index}">Edit</button>
                            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                        </div>
                    </div>`
                  )
                  .join("")
            : `<p>No results found.</p>`;
    });

    renderSubjects();
});

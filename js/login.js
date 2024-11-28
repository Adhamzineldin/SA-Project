const form = document.getElementById('form');
const id = document.getElementById('ID');
const ssn = document.getElementById("SSN");
const idError = document.getElementById("idError");
const ssnError = document.getElementById("ssnError");

const dummyAccounts = [
    { id: '10123456', ssn: '111-22-3333' },   // Admin
    { id: '20123456', ssn: '123-45-6789' },  // Student
    { id: '30123456', ssn: '987-65-4321' }  // Lecturer
];

// Store the dummy accounts in localStorage
localStorage.setItem('dummyAccounts', JSON.stringify(dummyAccounts));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
});

const validateInputs = () => {
    const idValue = id.value.trim();
    const ssnValue = ssn.value.trim();

    // Regex expression for ID checks if they are exactly 8 digits
    const regexID = /^\d{8}$/;
    // Regex expression for ssn checks xxx-xx-xxxx
    const regexSSN = /^\d{3}-\d{2}-\d{4}$/;

    let valid = true;

    // Clear previous error messages
    idError.textContent = '';
    ssnError.textContent = '';

    // Check if ID is entered
    if (idValue === '') {
        idError.textContent = 'ID is required';
        valid = false;
    } else if (!regexID.test(idValue)) {
        idError.textContent = 'ID must be 8 digits';
        valid = false;
    }

    // Check if SSN is entered
    if (ssnValue === '') {
        ssnError.textContent = 'SSN is required';
        valid = false;
    } else if (!regexSSN.test(ssnValue)) {
        ssnError.textContent = 'SSN must be in the format XXX-XX-XXXX';
        valid = false;
    }

    // If everything is valid, check credentials and redirect to chosen pages
    if (valid) {
        // Retrieve dummy accounts from localStorage
        const accounts = JSON.parse(localStorage.getItem('dummyAccounts'));

        // for each account find if it is equal the input value
        const account = accounts.find(account => account.id === idValue && account.ssn === ssnValue);

        if (account) {

            if (idValue.startsWith('20')) {

                alert("Login Successfully");
                window.location.href = '../html/students.html'; // Redirect to student page

            } else if (idValue.startsWith('30')) {

                alert("Login Successfully");
                window.location.href = '../html/lecturers.html'; // Redirect to lecturer page

            } else if (idValue.startsWith('10')) {

                alert("Login Successfully");
                window.location.href = '../index.html'; // Redirect to admin page

            } else {
                alert('Invalid ID prefix');
            }
        } else {
            alert('Invalid ID or SSN');
        }
    }
};

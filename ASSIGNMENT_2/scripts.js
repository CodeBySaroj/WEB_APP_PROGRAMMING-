// Element selection
const inputName = document.getElementById("name");
const inputRoll = document.getElementById("roll");
const inputAddress = document.getElementById("address");

const btnSubmit = document.querySelector(".btn_submit");
const btnOutput = document.querySelector(".btn_output");

const transcript = document.getElementById("transcript");
const showData = document.getElementById("show_data");

// Counter
let counter = parseInt(localStorage.getItem("counter")) || 0;


// Save user data
function saveUserData() {

    if (!inputName.value.trim()) {
        alert("Name is required");
        return;
    }

    if (!inputRoll.value || inputRoll.value <= 0) {
        alert("Enter a valid roll number");
        return;
    }

    if (!inputAddress.value.trim()) {
        alert("Address is required");
        return;
    }

    const user = {
        data_name: inputName.value.trim(),
        data_roll: Number(inputRoll.value),
        data_address: inputAddress.value.trim(),
    };

    counter++;
    localStorage.setItem("counter", counter);
    localStorage.setItem(`user${counter}`, JSON.stringify(user));

    updateTranscript(user);

    alert("Record saved successfully.");

    inputName.value = "";
    inputRoll.value = "";
    inputAddress.value = "";
}


// Display all
function displayAllUsers() {

    showData.innerHTML = "";

    const total = parseInt(localStorage.getItem("counter")) || 0;

    if (total === 0) {
        showData.innerHTML = `<p class="empty">No records found.</p>`;
        return;
    }

    for (let i = 1; i <= total; i++) {
        const data = JSON.parse(localStorage.getItem(`user${i}`));
        if (data) renderUser(data, i);
    }
}


// Transcript
function updateTranscript(user) {
    transcript.innerHTML = `
        <h2>Latest Submission</h2>
        ${createDescription(user)}
    `;
}


// Render card
function renderUser(user, index) {
    showData.innerHTML += `
        <div class="border">
            <h3>Student ${index}</h3>
            ${createDescription(user)}
        </div>
    `;
}


// Reusable template
function createDescription(obj) {
    return `
        <dl class="details">
            <dt>Name</dt>
            <dd>${obj.data_name}</dd>

            <dt>Roll</dt>
            <dd>${obj.data_roll}</dd>

            <dt>Address</dt>
            <dd>${obj.data_address}</dd>
        </dl>
    `;
}


// Events
btnSubmit.addEventListener("click", saveUserData);
btnOutput.addEventListener("click", displayAllUsers);

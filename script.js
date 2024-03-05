document.addEventListener("DOMContentLoaded", function () {
    var selectedRow = null;

    // Add an event listener for the form submission
    document.getElementById("StudentForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Get input values
        var name = document.getElementById("firstName").value;
        var gender = document.getElementById("gender").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;

        // Validate input (you can add more validation if needed)

        if (selectedRow) {
            // If a row is selected, update the data
            selectedRow.cells[0].textContent = name;
            selectedRow.cells[1].textContent = gender;
            selectedRow.cells[2].textContent = email;
            selectedRow.cells[3].textContent = phoneNumber;
            showAlert("Student Data Updated", "info");
            selectedRow = null; // Reset selectedRow after updating
        } else {
            // If no row is selected, add a new row
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${gender}</td>
                <td>${email}</td>
                <td>${phoneNumber}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;

            // Add an event listener for the edit button in the new row
            newRow.querySelector(".edit").addEventListener("click", function (e) {
                editRow(newRow);
            });

            // Add the new row to the table
            document.querySelector("#student-list tbody").appendChild(newRow);
            showAlert("Student Data Added", "success");
        }

        // Clear the form fields
        document.getElementById("StudentForm").reset();
    });

    // Event listener for delete and edit buttons
    document.getElementById("student-list").addEventListener("click", function (e) {
        var target = e.target;
        if (target.classList.contains("delete")) {
            // If the delete button is clicked
            target.parentElement.parentElement.remove();
            showAlert("Student Data Deleted", "danger");
        } else if (target.classList.contains("edit")) {
            // If the edit button is clicked
            var row = target.parentElement.parentElement;
            editRow(row);
        }
    });

    // Function to edit a row
    function editRow(row) {
        selectedRow = row;
        // Populate the form fields with the data from the selected row
        document.getElementById("firstName").value = row.cells[0].textContent;
        document.getElementById("gender").value = row.cells[1].textContent;
        document.getElementById("email").value = row.cells[2].textContent;
        document.getElementById("phoneNumber").value = row.cells[3].textContent;
    }

    // Function to show alerts
    function showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const main = document.querySelector(".main");
        container.insertBefore(div, main);

        setTimeout(() => document.querySelector(".alert").remove(), 1000);
    }
});

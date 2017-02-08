function validateTaskForm() {

	var checkCount = 0;

	var getTaskName = document.getElementById('taskName').value;
	var getTaskDetails = document.getElementById('taskDetails').value;
	var getTaskDate = document.getElementById('taskDate').value;
	var getRadioStatus = document.getElementById('status').required = true;

	var errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n"

	if (getTaskName === "") {
		errorMessage += "Task Name\n";
	}
	else {
		checkCount++;
	}

	if (getTaskDetails === "") {
		errorMessage += "Task Details\n";
	}
	else {
		checkCount++;
	}

	if (getTaskDate === "") {
		errorMessage += "Task Date\n";
	}
	else {
		checkCount++;
	}

	if (getRadioStatus === "") {
		errorMessage += "Status\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";
	}
}

function confirmDelete() {
	confirm("This item will be permanently deleted.")
}

function fieldValidate() {
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value
	var email = document.getElementById('email').value;

	var checkCount = 0;

	var errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";

	if(username === "") {
		errorMessage += "Username - this field must not be empty!\n"
	}
	else if(username.length < 8) {
		errorMessage += "Username - Should contain 8 characters or more!\n"
	}
	else {
		checkCount++;
	}

	if (username != "") {
		if(checkUserName() === false) {
			errorMessage += "Username - should not contain any numbers or special characters!\n";
		}
		else {
			checkCount++;	
		}	
	}
	else {
		checkCount++;
	}

	if(email === "") {
		errorMessage += "Email - this field must not be empty!\n"
	}
	else {
		checkCount++
	}

	if(password === "") {
		errorMessage += "Password - this field must not be empty!\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "Kindly fill up the following field/s or make sure that you entered a valid input to proceed: \n\n";
	}
}

function checkUserName() {
    var username = document.getElementById("username").value;
    var pattern = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/); //can not be accepted
    if (pattern.test(username)) {
        return false;
    }
    return true;
}

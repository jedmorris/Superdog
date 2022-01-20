// display message to the user
function getMessage() {
	let userMessage = document.getElementById("message").value;
	Swal.fire(
		'Button Clicked!',
		userMessage,
		'success!'
	)
}


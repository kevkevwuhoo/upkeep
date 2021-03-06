$(document).ready(function () {
	// Getting references to our form and inputs
	const loginForm = $("form.login");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");

	function handleLogInErr(err) {
		$("#alert .msg").text(err);
		$("#alert").fadeIn(500);
	}

	// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
	async function loginUser(email, password) {
		try {
			await $.post("/api/login", {
				email: email,
				password: password,
			});
			window.location.replace("/dashboard");
		} catch {
			// If there's an error, log the error
			handleLogInErr("Invalid credentials");
		}
	}

	// When the form is submitted, we validate there's an email and password entered
	loginForm.on("submit", function (event) {
		event.preventDefault();
		console.log("click");
		const userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};
		console.log(userData);

		if (!userData.email || !userData.password) {
			handleLogInErr("Email or Password cannot be empty.");
			return;
		}

		// If we have an email and password we run the loginUser function and clear the form
		loginUser(userData.email, userData.password);
		emailInput.val("");
		passwordInput.val("");
	});
});

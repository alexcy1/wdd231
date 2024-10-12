
// Sign-Up Form Submission
document.querySelector('.signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById('username-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Save the data to local storage
    const userData = {
        username: username,
        email: email,
        password: password // Avoid saving plain text password in real apps!
    };

    // Store userData object as JSON string in local storage
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirect to "Create Profile" page
    window.location.href = 'create-profile.html'; // Assuming you have this file
});

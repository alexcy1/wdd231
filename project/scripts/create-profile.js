// Function to convert image file to Base64
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
}

// Create Profile Form Submission
document.querySelector('.profile-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const profession = document.getElementById('profession').value;
    const company = document.getElementById('company').value;
    const aboutMe = document.getElementById('about-me').value;
    const profileImage = document.getElementById('profile-image').files[0];

    // Retrieve the user data from local storage or create a new object if null
    let userData = JSON.parse(localStorage.getItem('user')) || {};

    // Convert the image to base64 before saving
    if (profileImage) {
        getBase64(profileImage, function (base64Image) {
            // Update user data with additional profile details and base64 image
            userData = {
                ...userData, 
                firstName,
                lastName,
                phone,
                profession,
                company,
                aboutMe,
                profileImage: base64Image 
            };

            // Save the updated data back to local storage
            localStorage.setItem('user', JSON.stringify(userData));
            window.location.href = 'profile.html'; 
        });
    } else {
        // Handle case where no image is provided
        userData = {
            ...userData,
            firstName,
            lastName,
            phone,
            profession,
            company,
            aboutMe,
            profileImage: null 
        };

        // Save the updated data back to local storage
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'profile.html';
    }
});

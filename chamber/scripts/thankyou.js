    // THANK YOU PAGE

    // Function to get URL parameters
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            firstName: params.get('first-name'),
            lastName: params.get('last-name'),
            orgTitle: params.get('organization-title'), 
            email: params.get('email'),
            phone: params.get('phone'),
            organization: params.get('organization'),
            membershipLevel: params.get('membership-level'), 
            description: params.get('description'), 
            timestamp: params.get('timestamp')
        };
    }

    // Populate thankyou.html with form data
    const formData = getQueryParams();

    document.getElementById('first-name').textContent = formData.firstName;
    document.getElementById('last-name').textContent = formData.lastName;
    document.getElementById('org-title').textContent = formData.orgTitle; 
    document.getElementById('email').textContent = formData.email;
    document.getElementById('phone').textContent = formData.phone;
    document.getElementById('organization').textContent = formData.organization;
    document.getElementById('membership-level').textContent = formData.membershipLevel; 
    document.getElementById('description').textContent = formData.description; 
    document.getElementById('timestamp').textContent = formData.timestamp;
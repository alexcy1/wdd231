// Modal Logic
const modals = document.querySelectorAll('.modal');
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Add event listeners for "Learn More" buttons to open the respective modals
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const modalId = button.getAttribute('href').substring(1);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; 
        }
    });
});

// Add event listeners for close buttons to close modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        modal.style.display = 'none'; 
    });
});


// Function to format the date in 12-hour format
function formatTimestampTo12Hour(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Form submit logic: Set the timestamp just before form submission
const form = document.querySelector('.membership-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Set the hidden timestamp input to the current time in 12-hour format just before submission
    const submitTimestamp = formatTimestampTo12Hour(new Date());
    document.getElementById('timestamp').value = submitTimestamp;
    console.log('Timestamp set on form submission:', submitTimestamp);

    form.submit(); 
});



// ANIMATION FOR MEMBERSHIP CARD
function triggerInitialAnimation() {
    const cards = document.querySelectorAll('.membership-levels .card');
    
    setTimeout(() => {
        cards.forEach(card => {
            // Reset animation for the initial slide up effect
            card.style.animation = 'slideUp 2s ease-out forwards, changeColor 32s ease-in-out infinite'; 
        });
    }, 100); 
}
window.onload = () => {
    triggerInitialAnimation();
};






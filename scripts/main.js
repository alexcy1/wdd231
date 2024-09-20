
    // Header Image ------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        function addLogoImage() {
            const logoData = {
                src: 'images/Alexander.webp', // Update to the new image path
                alt: 'Alexander Cyril Logo',
                class: 'logo'
            };
    
            // Create the image element
            const image = document.createElement('img');
            image.src = logoData.src;
            image.alt = logoData.alt;
            image.className = logoData.class;
    
            // Create a container for the image and text
            const bannerContent = document.querySelector('.top-banner .container');
            if (bannerContent) {
                // Insert the image before the heading
                bannerContent.insertBefore(image, bannerContent.firstChild);
            }
        }
    
        addLogoImage();
    });

    

// Footer------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }
});



    // Footer Image ------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        function addFooterFlag() {
            const flagData = {
                src: 'images/Flag.png', // Update to the path of the flag image
                alt: 'Country Flag',
                class: 'footer-flag'
            };
    
            // Create the image element
            const flagImage = document.createElement('img');
            flagImage.src = flagData.src;
            flagImage.alt = flagData.alt;
            flagImage.className = flagData.class;
    
            // Find the footer element
            const footerContent = document.querySelector('footer div');
            if (footerContent) {
                // Add some space after "Nigeria"
                const textNode = document.createTextNode(' ');
                footerContent.appendChild(textNode);
    
                // Append the flag image
                footerContent.appendChild(flagImage);
            }
        }
    
        addFooterFlag();
    });
    


// Course Array ------------------------------------------------------------------------
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Completed courses array
const completedCourses = [210, 231];

// Mark courses as completed
courses.forEach(course => {
    if (completedCourses.includes(course.number)) {
        course.completed = true;
    }
});

// Select the course button container
const courseButtons = document.getElementById('courseButtons');


// Function to display courses as buttons
function displayCourseButtons(coursesToDisplay) {
    courseButtons.innerHTML = '';  // Clear previous buttons

    coursesToDisplay.forEach(course => {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'm-1', 'mb-3', 'mx-2', 'btn-block'); // Use btn-block for full width

        // Set button text
        btn.innerText = `${course.subject} ${course.number}`; // Display subject and number

        // Apply different styles based on completion status
        if (course.completed) {
            btn.classList.add('btn-completed');
        } else {
            btn.classList.add('btn-dark');
        }
        
        // Append the button to the container
        courseButtons.appendChild(btn);
    });
}

// Event listeners for filtering courses
document.getElementById('showAll').addEventListener('click', () => {
    displayCourseButtons(courses);
});

document.getElementById('showCSE').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourseButtons(cseCourses);
});

document.getElementById('showWDD').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourseButtons(wddCourses);
});

// Initially display all courses
displayCourseButtons(courses);


//  Display Total Credits Dynamically:
function displayTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const creditsElement = document.getElementById('totalCredits'); // Get the existing element
    creditsElement.innerHTML = totalCredits; // Update the inner HTML with total credits
}
displayTotalCredits();
 


// Toggle Menu
// document.addEventListener("DOMContentLoaded", function() {
//         const toggler = document.querySelector(".navbar-toggler");
//         const navCollapse = document.querySelector("#navbarNav");

//         toggler.addEventListener("click", function() {
//             // Toggle the 'open' class to show 'X' when clicked
//             toggler.classList.toggle("open");

//             // Check if the collapse menu is opened or closed
//             navCollapse.addEventListener('shown.bs.collapse', function () {
//                 toggler.classList.add('open'); // Add class 'open' when menu is open
//             });

//             navCollapse.addEventListener('hidden.bs.collapse', function () {
//                 toggler.classList.remove('open'); // Remove class 'open' when menu is closed
//             });
//         });
//     });




    // Header Image ------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        function addLogoImage() {
            const logoData = {
                src: 'images/Alexander.png', // Update to the new image path
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
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
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
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// List of completed courses (you can modify this array as per the completed courses)
const completedCourses = [110, 130, 210];

// Mark courses as completed based on the completedCourses array
courses.forEach(course => {
    if (completedCourses.includes(course.number)) {
        course.completed = true;
    }
});

// Log to verify if the changes were applied
console.log(courses);





// Render curses dynamically ----------------------------------------------------------------
const mainContent = document.querySelector('main');

// Function to display courses dynamically
function displayCourses(coursesToDisplay) {
    mainContent.innerHTML = '';  // Clear the existing content

    coursesToDisplay.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'p-3');
        
        // Apply different styles if the course is completed
        if (course.completed) {
            card.style.backgroundColor = '#d4edda';  // Greenish background for completed courses
        }
        
        // Create the course card's inner content
        card.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technology Used:</strong> ${course.technology.join(', ')}</p>
        `;
        
        // Append the card to the main content area
        mainContent.appendChild(card);
    });
}

// Event listener for filtering courses by CSE
document.querySelector('#showCSE').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

// Event listener for filtering courses by WDD
document.querySelector('#showWDD').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// Event listener to show all courses
document.querySelector('#showAll').addEventListener('click', () => {
    displayCourses(courses);
});

// Initially display all courses
displayCourses(courses);




//  Display Total Credits Dynamically:
function displayTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const creditsElement = document.createElement('div');
    creditsElement.innerHTML = `<p><strong>Total Credits Required: </strong>${totalCredits}</p>`;
    mainContent.appendChild(creditsElement);
}
displayTotalCredits();  // Call this function after displaying the courses

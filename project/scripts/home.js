// SLIDER ==============================================================================
import { fetchArticles } from './api.js'; 

let articles = [];
const sliderContainer = document.getElementById('slider');
let autoSlideInterval;

// Display random articles for the slider
function displayRandomArticles() {
    const shuffledArticles = articles.sort(() => 0.5 - Math.random()); // Shuffle articles array
    const randomArticles = shuffledArticles.slice(0, 3); // Get the first 3 randomized articles
    displayArticlesOnSlider(randomArticles); // Pass the randomized articles to the slider display function
}

function displayArticlesOnSlider(articlesToDisplay) {
    sliderContainer.innerHTML = ''; // Clear existing articles
    articlesToDisplay.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = `article-card ${index === 0 ? 'large' : ''}`;
        card.innerHTML = `
            <img src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p><a href="${article.url}" target="_blank">Read more</a></p>
        `;
        sliderContainer.appendChild(card);
    });
}

// Swap the current article for a new random article with a smooth transition
function swapArticle() {
    const randomArticleIndex = Math.floor(Math.random() * articles.length);
    const article = articles[randomArticleIndex];

    const newCard = document.createElement('div');
    newCard.className = 'article-card large';
    newCard.innerHTML = `
        <img src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" alt="${article.title}">
        <h2>${article.title}</h2>
        <p><a href="${article.url}" target="_blank">Read more</a></p>
    `;

    const existingCards = sliderContainer.children;
    if (existingCards.length > 0) {
        existingCards[0].classList.add('fade-out');
        setTimeout(() => {
            sliderContainer.replaceChild(newCard, existingCards[0]);
            newCard.classList.add('fade-in');
        }, 500);
    } else {
        sliderContainer.appendChild(newCard);
        newCard.classList.add('fade-in');
    }
}

// Move to the next article on button click
document.getElementById('next').addEventListener('click', swapArticle);
document.getElementById('prev').addEventListener('click', swapArticle);

// Start automatic sliding of articles
function startAutoSlide() {
    autoSlideInterval = setInterval(swapArticle, 5000); // Change slide every 5 seconds
}

// Stop auto sliding on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseout', startAutoSlide);

// Fetch articles when the page loads
fetchArticles().then(fetchedArticles => {
    articles = fetchedArticles;
    displayRandomArticles();
    startAutoSlide();
});




// ARTICLES =============================================================================

// let currentPage = 0;
// const articlesPerPage = 12;
// let filteredArticles = []; // Store filtered articles based on section
// let activeSectionElement = null; // Track the currently active section element

// // Display trending sections
// function displayTrendingSections() {
//     const trendingSections = document.querySelector('.trending-sections');
//     const sections = [...new Set(articles.map(article => article.section))];

//    // Create the HTML for trending sections
//     trendingSections.innerHTML = `
//     <h3>Trending News:</h3>
//     ${sections.map(section => `
//         <span class="trending-section" data-section="${section}">${section}</span>
//     `).join(', ')}
//     <button class="show-all">Show All</button> <!-- Show All button -->
//     <a href="index.html" class="reload-button">Reload</a> <!-- Reload button with link to index.html -->
//     `;

//     // Event delegation for trending sections and "Show All" button
//     trendingSections.addEventListener('click', (event) => {
//         const target = event.target;

//         // If a section is clicked
//         if (target.classList.contains('trending-section')) {
//             const selectedSection = target.getAttribute('data-section');
//             filterArticlesBySection(selectedSection);

//             // Manage active state
//             if (activeSectionElement) {
//                 activeSectionElement.classList.remove('active');
//             }
//             target.classList.add('active');
//             activeSectionElement = target;
//         }

//         // If "Show All" button is clicked
//         if (target.classList.contains('show-all')) {
//             filteredArticles = []; // Reset filtered articles
//             displayArticles(); // Display all articles

//             if (activeSectionElement) {
//                 activeSectionElement.classList.remove('active');
//                 activeSectionElement = null;
//             }
//         }
//     });
// }

// // Filter articles by section
// function filterArticlesBySection(section) {
//     filteredArticles = articles.filter(article => article.section === section); // Filter articles
//     currentPage = 0; // Reset current page
//     displayArticles(); // Display filtered articles
// }

// // Display articles with lazy loading for images
// function displayArticles() {
//     const articlesContainer = document.querySelector('.articles-container');
//     const articlesToDisplay = filteredArticles.length ? filteredArticles : articles;
//     const startIndex = currentPage * articlesPerPage;
//     const endIndex = startIndex + articlesPerPage;
//     const paginatedArticles = articlesToDisplay.slice(startIndex, endIndex);

//     articlesContainer.innerHTML = ''; // Clear the container

//     paginatedArticles.forEach(article => {
//         const articleCard = document.createElement('div');
//         articleCard.classList.add('articles-card');
//         articleCard.innerHTML = `
//             <img 
//                 src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" 
//                 alt="${article.title}" 
//                 class="article-image" 
//                 loading="lazy"
//             />
//             <h2 class="article-headline">${article.title}</h2>
//             <p class="article-date">${new Date(article.published_date).toLocaleDateString()}</p>
//             <button class="details-button" data-article='${JSON.stringify(article)}'>Details</button>
//             <a href="${article.url}" target="_blank" class="view-button">View</a>
//         `;
//         articlesContainer.appendChild(articleCard);
//     });

//     // Event delegation for "Details" buttons
//     articlesContainer.addEventListener('click', (event) => {
//         const target = event.target;
//         if (target.classList.contains('details-button')) {
//             const article = JSON.parse(target.dataset.article);
//             openModal(article);
//         }
//     });
// }

// // Open the modal with article details
// function openModal(article) {
//     document.getElementById('modal-title').innerText = article.title;
//     document.getElementById('modal-abstract').innerText = article.abstract;
//     document.getElementById('modal-image').src = article.multimedia[0]?.url || 'default-image-url.jpg';
//     document.getElementById('modal-date').innerText = new Date(article.published_date).toLocaleDateString();
//     document.getElementById('article-modal').style.display = 'block';
// }

// // Close the modal
// document.querySelector('.close-button').addEventListener('click', () => {
//     document.getElementById('article-modal').style.display = 'none';
// });

// // Load more articles on button click
// document.getElementById('load-more').addEventListener('click', () => {
//     currentPage++;
//     displayArticles();
// });

// // Fetch articles when the page loads
// fetchArticles().then(fetchedArticles => {
//     articles = fetchedArticles;
//     displayTrendingSections();
//     displayArticles();
// });







let currentPage = 0;
const articlesPerPage = 12;
let filteredArticles = []; // Store filtered articles based on section
let activeSectionElement = null; // Track the currently active section element

// Display trending sections
function displayTrendingSections() {
    const trendingSections = document.querySelector('.trending-sections');
    const sections = [...new Set(articles.map(article => article.section))];

    // Create the HTML for trending sections
    trendingSections.innerHTML = `
    <h3>Trending News:</h3>
    ${sections.map(section => `
        <span class="trending-section" data-section="${section}">${section}</span>
    `).join(', ')}
    <button class="show-all">Show All</button> <!-- Show All button -->
    <a href="index.html" class="reload-button">Reload</a> <!-- Reload button with link to index.html -->
    `;

    // Event delegation for trending sections and "Show All" button
    trendingSections.addEventListener('click', (event) => {
        const target = event.target;

        // If a section is clicked
        if (target.classList.contains('trending-section')) {
            const selectedSection = target.getAttribute('data-section');
            filterArticlesBySection(selectedSection);

            // Manage active state
            if (activeSectionElement) {
                activeSectionElement.classList.remove('active');
            }
            target.classList.add('active');
            activeSectionElement = target;
        }

        // If "Show All" button is clicked
        if (target.classList.contains('show-all')) {
            filteredArticles = []; // Reset filtered articles
            displayArticles(); // Display all articles

            if (activeSectionElement) {
                activeSectionElement.classList.remove('active');
                activeSectionElement = null;
            }
        }
    });
}

// Filter articles by section
function filterArticlesBySection(section) {
    filteredArticles = articles.filter(article => article.section === section); // Filter articles
    currentPage = 0; // Reset current page
    displayArticles(); // Display filtered articles
}

// Display articles with lazy loading for images
function displayArticles() {
    const articlesContainer = document.querySelector('.articles-container');
    const articlesToDisplay = filteredArticles.length ? filteredArticles : articles;
    const startIndex = currentPage * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = articlesToDisplay.slice(startIndex, endIndex);

    articlesContainer.innerHTML = ''; // Clear the container

    paginatedArticles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('articles-card');
        articleCard.innerHTML = `
            <img 
                src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" 
                alt="${article.title}" 
                class="article-image" 
                loading="lazy"
            />
            <h2 class="article-headline">${article.title}</h2>
            <p class="article-date">${new Date(article.published_date).toLocaleDateString()}</p>
            <button class="details-button" data-article='${JSON.stringify(article)}'>Details</button>
            <a href="${article.url}" target="_blank" class="view-button">View</a>
            <button class="favourite-button" data-article='${JSON.stringify(article)}'>Add to Favourites</button> <!-- Favourite button -->
        `;
        articlesContainer.appendChild(articleCard);
    });

    // Hide favourite buttons if user is not logged in
    hideFavouriteButtonsIfNotLoggedIn();

    // Event delegation for "Details" and "Favourite" buttons
    articlesContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('details-button')) {
            const article = JSON.parse(target.dataset.article);
            openModal(article);
        }

        // Handle adding to favourites
        if (target.classList.contains('favourite-button')) {
            const article = JSON.parse(target.dataset.article);
            addToFavourites(article); // Add article to favourites
        }
    });
}


// Open the modal with article details
function openModal(article) {
    document.getElementById('modal-title').innerText = article.title;
    document.getElementById('modal-abstract').innerText = article.abstract;
    document.getElementById('modal-image').src = article.multimedia[0]?.url || 'default-image-url.jpg';
    document.getElementById('modal-date').innerText = new Date(article.published_date).toLocaleDateString();
    
    // Set the URL for the "View Full Article" button in the modal
    const viewArticleButton = document.getElementById('view-article');
    viewArticleButton.setAttribute('data-url', article.url);

    // Show the modal
    document.getElementById('article-modal').style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('article-modal').style.display = 'none';
}

// Event listener for the close button
document.querySelector('.close-button').addEventListener('click', closeModal);

// Event listener for the "View Full Article" button inside the modal
document.getElementById('view-article').addEventListener('click', () => {
    const articleUrl = document.getElementById('view-article').getAttribute('data-url');
    
    if (articleUrl) {
        window.open(articleUrl, '_blank');
    }
    closeModal();
});

// Load more articles on button click
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    displayArticles();
});


// Function to add article to favourites
function addToFavourites(article) {
    const favouriteArticles = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the article is already in favourites
    const isAlreadyFavourite = favouriteArticles.some(fav => fav.title === article.title);

    if (!isAlreadyFavourite) {
        // Add the article and show success alert if it's not already a favourite
        favouriteArticles.push(article);
        localStorage.setItem('favourites', JSON.stringify(favouriteArticles));
        alert('Article added to favourites successfully!');
    }
}

// Separate function to handle already added articles
function handleAlreadyAdded(article) {
    const favouriteArticles = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the article is already in favourites
    const isAlreadyFavourite = favouriteArticles.some(fav => fav.title === article.title);

    if (isAlreadyFavourite) {
        // Show alert if the article is already in the favourites
        alert('This article has already been added to favourites.');
    }
}

// Event listener for the favourite button
document.querySelector('.articles-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('favourite-button')) {
        const article = JSON.parse(event.target.dataset.article);

        // Check if article is already in favourites
        const favouriteArticles = JSON.parse(localStorage.getItem('favourites')) || [];
        const isAlreadyFavourite = favouriteArticles.some(fav => fav.title === article.title);

        if (!isAlreadyFavourite) {
            // If not already in favourites, add it
            addToFavourites(article);
        } else {
            // If already in favourites, show the "already added" alert
            handleAlreadyAdded(article);
        }
    }
});

// Fetch articles when the page loads
fetchArticles().then(fetchedArticles => {
    articles = fetchedArticles;
    displayTrendingSections();
    displayArticles();
});


// After displaying articles===========================================================
displayArticles();

function hideFavouriteButtonsIfNotLoggedIn() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const favouriteButtons = document.querySelectorAll('.favourite-button');

    if (!userData) {
        favouriteButtons.forEach(button => {
            button.style.display = 'none'; // Hide the button if user is not logged in
        });
    }
}


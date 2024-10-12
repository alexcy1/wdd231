// Function to display favourite articles
function displayFavourites() {
    const favouritesContainer = document.querySelector('.articles-container');
    favouritesContainer.classList.add('favourites-page');
    const favouriteArticles = JSON.parse(localStorage.getItem('favourites')) || [];

    favouritesContainer.innerHTML = ''; // Clear the container

    if (favouriteArticles.length === 0) {
        favouritesContainer.innerHTML = '<p>No favourites added yet.</p>';
        return;
    }

    favouriteArticles.forEach((article, index) => {
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
            <button class="delete-favourite-button" data-index="${index}">Delete Favourite</button>
        `;

        favouritesContainer.appendChild(articleCard);
    });

    // Event delegation for details and delete buttons
    favouritesContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('details-button')) {
            const article = JSON.parse(target.dataset.article);
            openModal(article);
        }

        if (target.classList.contains('delete-favourite-button')) {
            const articleIndex = target.dataset.index;
            removeFavourite(articleIndex);
        }
    });
}

// Function to remove favourite article
function removeFavourite(index) {
    const favouriteArticles = JSON.parse(localStorage.getItem('favourites')) || [];
    favouriteArticles.splice(index, 1); // Remove article at the specific index
    localStorage.setItem('favourites', JSON.stringify(favouriteArticles)); // Save updated list
    displayFavourites(); // Refresh the display
}

// Function to open modal with article details
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

// Display favourites when the page loads
document.addEventListener('DOMContentLoaded', displayFavourites);




// Check if user data exists in local storage ==========================================================
const userData = JSON.parse(localStorage.getItem('user'));

if (!userData) {
    // If user does not exist, redirect to signup page
    window.location.href = 'signup.html';
}

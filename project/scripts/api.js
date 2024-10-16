const apiKey = 'O9xJTHU436vbdoL1yyrEkjIBCOBcCO4x'; 
const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;

// Function to fetch articles from the NY Times API
export async function fetchArticles() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}
// Netlify function endpoint
const NETLIFY_API = "https://ornate-cannoli-e71e06.netlify.app/.netlify/functions/omdb";

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('fetchBtn');
const output = document.getElementById('output');

searchBtn.addEventListener('click', async () => {
    const title = searchInput.value.trim();
    if (!title) return alert("Please enter a movie title!");

    try {
        // Call your Netlify backend
        const res = await fetch(`${NETLIFY_API}?title=${encodeURIComponent(title)}`);
        const data = await res.json();

        // Display the response
        output.textContent = JSON.stringify(data, null, 2);
        
    } catch (err) {
        console.error(err);
        output.textContent = "Error fetching movie data";
    }
});

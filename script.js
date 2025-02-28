const API_KEY = "32a587c90ada63aac4f51132ba8d4234";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let currentPage = "home";

// Fetch Movies
async function fetchMovies(endpoint) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`);
        const data = await response.json();
        displayMovies(data.results.slice(0, 6));
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Display Movies
function displayMovies(movies) {
    const moviesGrid = document.getElementById("moviesGrid");
    moviesGrid.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>${movie.overview.substring(0, 60)}...</p>
        `;

        moviesGrid.appendChild(movieCard);
    });
}

// Change Page
function setPage(page) {
    currentPage = page;
    document.getElementById("moviesTitle").textContent = 
        page === "trending" ? "Trending Now" : "Popular Movies";

    fetchMovies(page === "trending" ? "top_rated" : "popular");
}

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        document.getElementById("themeToggle").textContent = "🌙 Dark Mode";
    } else {
        body.classList.replace("light", "dark");
        document.getElementById("themeToggle").textContent = "☀️ Light Mode";
    }
});

// Initial Fetch
fetchMovies("popular");

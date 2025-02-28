document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'YOUR_SECURED_API_KEY';  // 🔒 Store in .env or backend
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const placeholderImg = "https://via.placeholder.com/200x300?text=No+Image";

    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;

    function showPage(pageId) {
        pages.forEach(page => page.classList.toggle('active', page.dataset.page === pageId));
        body.setAttribute('data-current-page', pageId);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.dataset.page;
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            showPage(pageId);
            window.history.pushState({}, '', `#${pageId}`);
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';

    async function fetchMovies(endpoint, containerId) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            const container = document.getElementById(containerId);

            container.innerHTML = data.results.length > 0 ? data.results.slice(0, 8).map(movie => `
                <div class="movie-card">
                    <img src="${movie.poster_path ? IMG_URL + movie.poster_path : placeholderImg}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.overview ? movie.overview.substring(0, 80) + "..." : "No review available"}</p>
                </div>
            `).join('') : `<p>No movies found</p>`;

        } catch (error) {
            console.error("Failed to fetch movies:", error);
            document.getElementById(containerId).innerHTML = `<p>Error loading movies. Try again later.</p>`;
        }
    }

    fetchMovies('popular', 'movies-list');
    fetchMovies('top_rated', 'trending-list');

    const hash = window.location.hash.substring(1);
    showPage(hash || 'home');
});

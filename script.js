document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '32a587c90ada63aac4f51132ba8d4234';  // Replace with your TMDb API key
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
                body.setAttribute('data-current-page', pageId);
            }
        });
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
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';
    });

    async function fetchMovies(endpoint, containerId) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`);
            const data = await res.json();
            const container = document.getElementById(containerId);
            container.innerHTML = data.results.slice(0, 8).map(movie => `
                <div class="movie-card">
                    <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.overview.substring(0, 80)}...</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading movies:', error);
            document.getElementById(containerId).innerHTML = "Error loading movies. Try again later.";
        }
    }

    fetchMovies('popular', 'movies-list');
    fetchMovies('top_rated', 'trending-list');

    const hash = window.location.hash.substring(1);
    const initialPage = hash || 'home';
    showPage(initialPage);
});

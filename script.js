document.addEventListener('DOMContentLoaded', () => {
    // Page navigation
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if(page.dataset.page === pageId) {
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

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';
    });

    // Initial page load
    const hash = window.location.hash.substring(1);
    const initialPage = hash || 'home';
    showPage(initialPage);
});
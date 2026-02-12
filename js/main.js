document.addEventListener("DOMContentLoaded", () => {
    // Navbar
    carregarHTML("components/navbar.html", "navbar")
        .then(() => {
            configurarLinksNavbar();
        });

    // Página inicial
    navegar("home");
});

function configurarLinksNavbar() {
    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            navegar(page);
        });
    });
}

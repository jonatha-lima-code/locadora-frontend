document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");
});

document.addEventListener("click", e => {
    const link = e.target.closest("a");

    if (!link) return;
    if (link.target === "_blank") return;
    if (!link.href) return;

    e.preventDefault();

    document.body.classList.remove("page-loaded");

    setTimeout(() => {
        window.location.href = link.href;
    }, 200);
});

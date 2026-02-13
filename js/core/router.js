const scriptsCarregados = new Set();

async function navegar(pagina) {

    await carregarNavbar();

    if (pagina !== "login" && !isAuthenticated()) {
        pagina = "login";
    }

    await carregarHTML(`pages/${pagina}.html`, "content");
    await inicializarPagina(pagina);
}

/* ==========================
   NAVBAR
========================== */

async function carregarNavbar() {
    await carregarHTML("components/navbar.html", "navbar");
    configurarNavbar();
}

function configurarNavbar() {
    const logado = isAuthenticated();

    // Mostra / esconde links
    document.querySelectorAll(".private").forEach(el => {
        el.style.display = logado ? "block" : "none";
    });

    // Ativa navegação SPA
    document.querySelectorAll("[data-page]").forEach(link => {
        link.onclick = e => {
            e.preventDefault();
            navegar(link.dataset.page);
        };
    });
}

/* ==========================
   PÁGINAS
========================== */

async function inicializarPagina(pagina) {

    if (pagina === "login") {
        await carregarScriptOnce("js/login/api.js");
        await carregarScriptOnce("js/login/page.js");
        initLoginPage();
    }

    if (pagina === "equipamentos") {
        await importarScriptsEquipamentos();
        initEquipamentosPage();
    }
}

/* ==========================
   SCRIPTS
========================== */

async function importarScriptsEquipamentos() {
    await carregarScriptOnce("js/equipamentos/api.js");
    await carregarScriptOnce("js/equipamentos/dom.js");
    await carregarScriptOnce("js/equipamentos/page.js");
}

function carregarScriptOnce(src) {
    return new Promise((resolve, reject) => {

        if (scriptsCarregados.has(src)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            scriptsCarregados.add(src);
            resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

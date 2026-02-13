const scriptsCarregados = new Set();

async function navegar(pagina) {

    await carregarNavbar();

    if (pagina !== "login" && !isAuthenticated()) {
        pagina = "login";
    }

    await carregarHTML(`pages/${pagina}.html`, "content");

    atualizarNavbar();

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

function atualizarNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    carregarHTML("components/navbar.html", "navbar")
        .then(() => {

            const linksContainer = document.getElementById("navbar-links");

            if (!isAuthenticated()) {
                linksContainer.innerHTML = "";
                return;
            }

            const auth = getAuth();

            linksContainer.innerHTML = `
                <a class="nav-link" href="#" data-page="home">Home</a>
                <a class="nav-link" href="#" data-page="equipamentos">Equipamentos</a>
                <a class="nav-link" href="#" data-page="meu-acesso">Meu Acesso</a>

                <span class="navbar-text text-white ms-3 me-2">
                    ${auth.usuario.nome}
                </span>

                <button class="btn btn-outline-light btn-sm" id="btnLogout">
                    Sair
                </button>
            `;

            configurarLinksNavbar();

            document
                .getElementById("btnLogout")
                ?.addEventListener("click", logout);
        });
}

function configurarLinksNavbar() {
    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            navegar(link.dataset.page);
        });
    });
}
const scriptsCarregados = new Set();

async function navegar(pagina) {
    await carregarHTML(`pages/${pagina}.html`, "content");
    await inicializarPagina(pagina);
}

async function inicializarPagina(pagina) {
    if (pagina === "equipamentos") {
        await importarScriptsEquipamentos();
        initEquipamentosPage();
    }
}

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

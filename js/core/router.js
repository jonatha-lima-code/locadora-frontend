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
    await carregarScript("js/equipamentos/api.js");
    await carregarScript("js/equipamentos/dom.js");
    await carregarScript("js/equipamentos/page.js");
}

function carregarScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}


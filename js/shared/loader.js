function carregarComponente(id, caminho) {
    fetch(caminho)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        });
}

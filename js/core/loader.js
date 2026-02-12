function carregarHTML(url, containerId) {
    return fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        });
}

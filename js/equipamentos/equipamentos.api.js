const API_URL = "http://localhost:8080/equipamentos";

function listarEquipamentosAPI() {
    return fetch(API_URL).then(res => res.json());
}

function criarEquipamentoAPI(payload) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar equipamento");
        return res.json();
    });
}

function atualizarEquipamentoAPI(id, payload) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar equipamento");
        return res.json();
    });
}

function excluirEquipamentoAPI(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(res => {
        if (!res.ok) {
            throw new Error("Erro ao excluir equipamento");
        }
    });
}

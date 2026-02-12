let identificacao;
let tipo;
let descricao;
let status;
let categoriaId;
let tabela;

let equipamentoIdParaExcluir = null;
let equipamentoIdEmEdicao = null;

let btnSalvar;
let btnCancelarEdicao;

function mapearDomEquipamentos() {
    identificacao = document.getElementById("identificacao");
    tipo = document.getElementById("tipo");
    descricao = document.getElementById("descricao");
    status = document.getElementById("status");
    categoriaId = document.getElementById("categoriaId");
    tabela = document.getElementById("equipamentosTable");

    btnSalvar = document.getElementById("btnSalvar");
    btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
}

function renderizarTabela(lista) {
    tabela.innerHTML = "";

    lista.forEach((e, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${e.identificacao}</td>
                <td>${e.tipo}</td>
                <td>${e.status}</td>
                <td>${e.categoria ?? "-"}</td>
                <td>
                    <button 
                        class="btn btn-sm btn-warning me-1"
                        onclick="editarEquipamento(${e.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button 
                        class="btn btn-sm btn-danger"
                        onclick="abrirModalExcluir(${e.id})"
                    >
                        🗑️ Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

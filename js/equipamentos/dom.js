const identificacao = document.getElementById("identificacao");
const tipo = document.getElementById("tipo");
const descricao = document.getElementById("descricao");
const status = document.getElementById("status");
const categoriaId = document.getElementById("categoriaId");
const tabela = document.getElementById("equipamentosTable");

let equipamentoIdParaExcluir = null;
let equipamentoIdEmEdicao = null; // ✅ FALTAVA

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");

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

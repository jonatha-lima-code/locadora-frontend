function initEquipamentosPage() {
    mapearDomEquipamentos();
    bindEventosEquipamentos();
    listarEquipamentos();
}

function bindEventosEquipamentos() {
    const form = document.getElementById("equipamentoForm");
    const btnConfirmar = document.getElementById("btnConfirmarExcluir");

    if (form) {
        form.addEventListener("submit", cadastrarEquipamento);
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", confirmarExclusao);
    }

    if (btnCancelarEdicao) {
        btnCancelarEdicao.addEventListener("click", cancelarEdicao);
    }
}

function cadastrarEquipamento(e) {
    e.preventDefault();

    const payload = {
        identificacao: identificacao.value,
        tipo: tipo.value,
        descricao: descricao.value,
        status: status.value,
        categoriaId: categoriaId.value
            ? Number(categoriaId.value)
            : null
    };

    const acao = equipamentoIdEmEdicao
        ? atualizarEquipamentoAPI(equipamentoIdEmEdicao, payload)
        : criarEquipamentoAPI(payload);

    acao
        .then(() => {
            e.target.reset();
            equipamentoIdEmEdicao = null;
            alterarModoEdicao(false);
            listarEquipamentos();
        })
        .catch(err => alert(err.message));
}

function listarEquipamentos() {
    listarEquipamentosAPI()
        .then(renderizarTabela)
        .catch(err => console.error(err));
}

function abrirModalExcluir(id) {
    equipamentoIdParaExcluir = id;

    const modal = new bootstrap.Modal(
        document.getElementById("modalExcluir")
    );

    modal.show();
}

function confirmarExclusao() {
    if (!equipamentoIdParaExcluir) return;

    excluirEquipamentoAPI(equipamentoIdParaExcluir)
        .then(() => {
            equipamentoIdParaExcluir = null;
            listarEquipamentos();

            const modalEl = document.getElementById("modalExcluir");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        })
        .catch(err => alert(err.message));
}

function editarEquipamento(id) {
    listarEquipamentosAPI()
        .then(lista => {
            const equipamento = lista.find(e => e.id === id);
            if (!equipamento) return;

            equipamentoIdEmEdicao = id;

            identificacao.value = equipamento.identificacao;
            tipo.value = equipamento.tipo;
            descricao.value = equipamento.descricao;
            status.value = equipamento.status;
            categoriaId.value = equipamento.categoriaId ?? "";

            alterarModoEdicao(true);
        });
}

function alterarModoEdicao(editando) {
    if (editando) {
        btnSalvar.textContent = "✏️ Atualizar Equipamento";
        btnSalvar.classList.replace("btn-primary", "btn-warning");
        btnCancelarEdicao.classList.remove("d-none");
    } else {
        btnSalvar.textContent = "💾 Cadastrar Equipamento";
        btnSalvar.classList.replace("btn-warning", "btn-primary");
        btnCancelarEdicao.classList.add("d-none");
    }
}

function cancelarEdicao() {
    equipamentoIdEmEdicao = null;
    document.getElementById("equipamentoForm").reset();
    alterarModoEdicao(false);
}

function initLoginPage() {
    // LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", realizarLogin);
    }

    // CADASTRO
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", realizarCadastro);
    }

    // // GOOGLE (futuro / placeholder)
    // const btnGoogle = document.getElementById("btnGoogle");
    // btnGoogle.addEventListener("click", () => {
    //     window.location.href = "http://192.168.0.5:8080/oauth2/authorization/google";
    // })
}

/**
 * LOGIN COM EMAIL/SENHA
 */
function realizarLogin(e) {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const senhaInput = document.getElementById("loginSenha");

    if (!emailInput || !senhaInput) {
        alert("Erro ao localizar campos de login");
        return;
    }

    const payload = {
        email: emailInput.value,
        senha: senhaInput.value
    };

    loginAPI(payload)
        .then(res => {
            setAuth({
                token: res.token,
                usuario: res.usuario
            });

            redirecionarAposLogin(res.usuario);
        })
        .catch(err => alert(err.message));
}

/**
 * REDIRECIONA APÓS LOGIN
 */
function redirecionarAposLogin(usuario) {
    if (usuario.role === "ADMIN") {
        navegar("equipamentos");
    } else {
        navegar("home");
    }
}

/**
 * CADASTRO
 */
function realizarCadastro(e) {
    e.preventDefault();

    const nomeInput = document.getElementById("registerNome");
    const emailInput = document.getElementById("registerEmail");
    const senhaInput = document.getElementById("registerSenha");

    if (!nomeInput || !emailInput || !senhaInput) {
        alert("Erro ao localizar campos de cadastro");
        return;
    }

    const payload = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value
    };

    registerAPI(payload)
        .then(() => {
            alert("Cadastro realizado com sucesso! Faça login.");
            e.target.reset();
        })
        .catch(err => alert(err.message));
}

// /**
//  * PLACEHOLDER LOGIN GOOGLE
//  */
// function loginGoogle() {
//     alert("Login com Google ainda não implementado");
// }

function initLoginPage() {
    const form = document.getElementById("loginForm");
    const btnGoogle = document.getElementById("btnGoogle");

    if (form) {
        form.addEventListener("submit", realizarLogin);
    }

    if (btnGoogle) {
        btnGoogle.addEventListener("click", loginGoogle);
    }
}

/**
 * Login com email/senha
 */
function realizarLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const payload = { email, senha };

    loginAPI(payload)
        .then(res => {
            // salva auth global
            setAuth({
                token: res.token,
                usuario: res.usuario
            });

            // redireciona conforme perfil
            redirecionarAposLogin(res.usuario);
        })
        .catch(err => alert(err.message));
}

/**
 * Decide para onde ir após login
 */
function redirecionarAposLogin(usuario) {
    if (usuario.role === "ADMIN") {
        navegar("equipamentos");
    } else {
        navegar("home");
    }
}

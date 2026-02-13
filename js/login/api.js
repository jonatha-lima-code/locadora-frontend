const AUTH_API_URL = "http://localhost:8080/auth";

/**
 * Login com email e senha
 */
function loginAPI(payload) {
    return fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(async res => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || "Erro ao realizar login");
        }
        return res.json();
    });
}

/**
 * Login com Google (OAuth)
 * Backend controla tudo
 */
function loginGoogle() {
    window.location.href = `${AUTH_API_URL}/google`;
}

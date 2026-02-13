const AUTH_API_URL = "http://localhost:8080/auth";

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

function registerAPI(payload) {
    return fetch(`${AUTH_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }
            return res.json();
        });
}

// function loginGoogle() {
//     window.location.href = `${AUTH_API_URL}/google`;
// }

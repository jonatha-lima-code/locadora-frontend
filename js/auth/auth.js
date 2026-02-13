const AUTH_KEY = "auth_user";

/**
 * Salva usuário autenticado
 */
function setAuth(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

/**
 * Retorna usuário autenticado
 */
function getAuth() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
}

/**
 * Retorna token JWT
 */
function getToken() {
    const auth = getAuth();
    return auth?.token || null;
}

/**
 * Verifica se está logado
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Logout
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    navegar("login");
}

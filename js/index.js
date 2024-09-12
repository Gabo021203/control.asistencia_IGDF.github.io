// js/index.js

document.addEventListener('DOMContentLoaded', function() {
    const usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = 'login.html'; // Redirige si no hay usuario en sesión
    }
});

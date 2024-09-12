document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;

        if ((username === "General" && password === "IGDF33") || (username === "Jovenes" && password === "JPZ33")) {
            window.location.href = "index.html";
        } else {
            document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos.";
        }
    });
});

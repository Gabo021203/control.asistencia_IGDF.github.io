document.getElementById('asistencia-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const fecha = document.getElementById("fecha-asistencia").value;
    const checkboxes = document.querySelectorAll(".asistencia-checkbox");
    const asistencia = {};

    checkboxes.forEach((checkbox) => {
        asistencia[checkbox.dataset.personaId] = checkbox.checked ? "✓" : "x";
    });

    // Guardar asistencia en localStorage
    localStorage.setItem(fecha, JSON.stringify(asistencia));

    // Mostrar mensaje de éxito directamente en la página
    const message = document.createElement("p");
    message.textContent = "¡Asistencia guardada exitosamente!";
    message.style.color = "green";
    document.querySelector("main").appendChild(message);
});

// Cargar la lista de personas al iniciar
document.addEventListener('DOMContentLoaded', cargarListaPersonas);

function cargarListaPersonas() {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const listaPersonasDiv = document.getElementById("lista-personas");

    listaPersonasDiv.innerHTML = ""; // Limpiar el contenido anterior

    personas.forEach((persona) => {
        const personaDiv = document.createElement("div");
        personaDiv.className = "persona-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "asistencia-checkbox";
        checkbox.dataset.personaId = persona.nombre; // Usamos el nombre como identificador único

        const label = document.createElement("label");
        label.textContent = persona.nombre;

        personaDiv.appendChild(checkbox);
        personaDiv.appendChild(label);

        listaPersonasDiv.appendChild(personaDiv);
    });
}

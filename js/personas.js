document.getElementById('agregar-persona').addEventListener('click', function () {
    document.getElementById('persona-form').style.display = 'block';
});

document.getElementById('cancelar-form').addEventListener('click', function () {
    document.getElementById('persona-form').style.display = 'none';
});

document.getElementById('persona-form-element').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;

    const nuevaPersona = { nombre, apellido, telefono };

    // Guardar persona en localStorage
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    personas.push(nuevaPersona);
    localStorage.setItem("personas", JSON.stringify(personas));

    // Actualizar la lista de personas
    actualizarListaPersonas();

    // Ocultar el formulario después de añadir
    document.getElementById("persona-form").style.display = "none";
});

function actualizarListaPersonas() {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const listaPersonas = document.getElementById("personas-list");

    listaPersonas.innerHTML = "";
    personas.forEach((persona, index) => {
        const fila = document.createElement("tr");

        const nombreCelda = document.createElement("td");
        nombreCelda.textContent = persona.nombre;
        fila.appendChild(nombreCelda);

        const apellidoCelda = document.createElement("td");
        apellidoCelda.textContent = persona.apellido;
        fila.appendChild(apellidoCelda);

        const telefonoCelda = document.createElement("td");
        telefonoCelda.textContent = persona.telefono;
        fila.appendChild(telefonoCelda);

        const eliminarCelda = document.createElement("td");
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function() {
            eliminarPersona(index);
        });
        eliminarCelda.appendChild(eliminarBtn);
        fila.appendChild(eliminarCelda);

        listaPersonas.appendChild(fila);
    });
}

function eliminarPersona(index) {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    personas.splice(index, 1);
    localStorage.setItem("personas", JSON.stringify(personas));
    actualizarListaPersonas();
}

// Cargar la lista de personas al iniciar
document.addEventListener('DOMContentLoaded', actualizarListaPersonas);

document.getElementById('report-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;
    
    generarReporte(fechaInicio, fechaFin);
});

function generarReporte(fechaInicio, fechaFin) {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const reporteDiv = document.getElementById("reporte-resultados");
    reporteDiv.innerHTML = "";

    const fechas = obtenerFechasRango(fechaInicio, fechaFin);

    const tabla = document.createElement("table");
    const encabezado = document.createElement("tr");

    encabezado.innerHTML = "<th>Nombre</th>";
    fechas.forEach(fecha => {
        const th = document.createElement("th");
        th.textContent = fecha;
        encabezado.appendChild(th);
    });

    tabla.appendChild(encabezado);

    personas.forEach((persona) => {
        const fila = document.createElement("tr");

        const nombreCelda = document.createElement("td");
        nombreCelda.textContent = persona.nombre;
        fila.appendChild(nombreCelda);

        fechas.forEach((fecha) => {
            const asistenciaCelda = document.createElement("td");
            const asistencia = JSON.parse(localStorage.getItem(fecha)) || {};
            asistenciaCelda.textContent = asistencia[persona.nombre] || "x";
            fila.appendChild(asistenciaCelda);
        });

        tabla.appendChild(fila);
    });

    reporteDiv.appendChild(tabla);
}

function obtenerFechasRango(inicio, fin) {
    let fechas = [];
    let fechaActual = new Date(inicio);
    const fechaFin = new Date(fin);

    while (fechaActual <= fechaFin) {
        fechas.push(fechaActual.toISOString().split('T')[0]);
        fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return fechas;
}

function obtenerFechaInicioMes() {
    const ahora = new Date();
    const primerDiaMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    return primerDiaMes.toISOString().split('T')[0];
}

function obtenerFechaFinMes() {
    const ahora = new Date();
    const ultimoDiaMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);
    return ultimoDiaMes.toISOString().split('T')[0];
}

// Cargar el reporte inicial (por ejemplo, para el mes actual)
document.addEventListener('DOMContentLoaded', function() {
    const fechaInicio = obtenerFechaInicioMes();
    const fechaFin = obtenerFechaFinMes();
    generarReporte(fechaInicio, fechaFin);
});

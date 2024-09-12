document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const mainContent = document.getElementById('main-content');
    const reportForm = document.getElementById('report-form');
    const reportContent = document.getElementById('report-content');
    const personaForm = document.getElementById('persona-form');
    const personList = document.getElementById('person-list');
    const attendanceList = document.getElementById('attendance-list');
    
    let personas = [];
    let asistencias = [];

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if ((username === 'General' && password === 'IGDF33') || 
            (username === 'Jovenes' && password === 'JPZ33')) {
            loginForm.style.display = 'none';
            mainContent.style.display = 'block';
            loadPage('home');
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(event) {
            const page = event.target.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(page) {
        document.getElementById('home-section').style.display = 'none';
        document.getElementById('personas-section').style.display = 'none';
        document.getElementById('asistencia-section').style.display = 'none';
        document.getElementById('reportes-section').style.display = 'none';

        if (page === 'home') {
            document.getElementById('home-section').style.display = 'block';
        } else if (page === 'personas') {
            document.getElementById('personas-section').style.display = 'block';
            updatePersonList();
        } else if (page === 'asistencia') {
            document.getElementById('asistencia-section').style.display = 'block';
        } else if (page === 'reportes') {
            document.getElementById('reportes-section').style.display = 'block';
        } else if (page === 'logout') {
            loginForm.style.display = 'block';
            mainContent.style.display = 'none';
        }
    }

    reportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        const reportTableBody = document.querySelector('#report-table tbody');
        reportTableBody.innerHTML = ''; // Limpiar contenido previo

        // Filtrar datos de asistencia por fecha
        const filteredData = asistencias.filter(item => item.fecha >= startDate && item.fecha <= endDate);

        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.nombre}</td><td>${item.fecha}</td><td>${item.asistencia}</td>`;
            reportTableBody.appendChild(row);
        });
        
        reportContent.style.display = 'block';
    });

    function updatePersonList() {
        personList.innerHTML = '';
        personas.forEach(person => {
            const li = document.createElement('li');
            li.textContent = `${person.nombre} - ${person.telefono}`;
            personList.appendChild(li);
        });
    }
});

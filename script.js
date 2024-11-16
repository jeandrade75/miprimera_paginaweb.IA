// Mostrar la fecha y hora actual
function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dateTimeElement.textContent = `Fecha y Hora: ${now.toLocaleString('es-ES', options)}`;
}

// Obtener la ubicación del usuario
function getLocation() {
    const locationElement = document.getElementById("location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationElement.textContent = `Ubicación: Latitud ${latitude.toFixed(2)}, Longitud ${longitude.toFixed(2)}`;
            },
            () => {
                locationElement.textContent = "No se pudo obtener la ubicación.";
            }
        );
    }
}

// Actualizar fecha, hora y ubicación al cargar la página
window.onload = () => {
    updateDateTime();
    getLocation();
    setInterval(updateDateTime, 60000);
};
// JavaScript para manejar el formulario modal
const uploadCvLink = document.getElementById('upload-cv-link');
const cvModal = document.getElementById('cv-modal');
const closeBtn = document.querySelector('.close-btn');

// Mostrar el modal al hacer clic en "Cargá tu CV"
uploadCvLink.addEventListener('click', (event) => {
    event.preventDefault();
    cvModal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en la "X"
closeBtn.addEventListener('click', () => {
    cvModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === cvModal) {
        cvModal.style.display = 'none';
    }
});







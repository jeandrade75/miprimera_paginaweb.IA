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
    dateTimeElement.textContent = `Fecha y Hora:\n${now.toLocaleString('es-ES', options)}`;
}

// Obtener la ubicación del usuario
function getLocation() {
    const locationElement = document.getElementById("location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationElement.textContent = `Ubicación:\nLatitud ${latitude.toFixed(2)}, Longitud ${longitude.toFixed(2)}`;
            },
            () => {
                locationElement.textContent = "No se pudo obtener la ubicación.";
            }
        );
    } else {
        locationElement.textContent = "La geolocalización no es compatible con este navegador.";
    }
}

// Funcionalidad para agregar una nueva entrada
document.getElementById("new-post").addEventListener("click", () => {
    const title = prompt("Ingrese el título de la nueva entrada:");
    const content = prompt("Ingrese el contenido de la nueva entrada:");
    if (title && content) {
        const postContainer = document.getElementById("posts-container");
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        postContainer.appendChild(postElement);
    }
});

// Manejo del formulario de contacto
document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
});

// Actualizar la fecha, hora y ubicación al cargar la página
window.onload = () => {
    updateDateTime();
    getLocation();
    setInterval(updateDateTime, 1000);
};


const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnClear = document.getElementById('btnClear');
const btnSave = document.getElementById('btnSave');
const btnListen = document.getElementById('btnListen');
const textArea = document.getElementById('textArea');

// Indicador visual
const recordingIndicator = document.getElementById('recordingIndicator');
const recordingText = document.getElementById('recordingText');

// Modal de confirmación para borrar texto
const modalConfirmDelete = document.getElementById('modalConfirmDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const btnCancelDelete = document.getElementById('btnCancelDelete');

// Configuración del reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'es-ES';

// Función para actualizar el estado de los botones
const actualizarEstadoBotones = () => {
    btnStop.disabled = recordingIndicator.style.display !== "block";
    btnClear.disabled = textArea.value.trim() === "";
    btnSave.disabled = textArea.value.trim() === "";
    btnListen.disabled = textArea.value.trim() === "";
};

// Función para iniciar la grabación
btnStart.addEventListener('click', () => {
    textArea.placeholder = "Escuchando...";
    recognition.start();

    // Mostrar indicador visual
    recordingIndicator.style.display = "block";
    recordingText.style.display = "block";

    // Actualizar botones
    actualizarEstadoBotones();
});

// Función para detener la grabación
btnStop.addEventListener('click', () => {
    if (recordingIndicator.style.display === "none") {
        alert("No hay grabación en curso.");
        return;
    }

    textArea.placeholder = "Grabación detenida.";
    recognition.stop();

    // Ocultar indicador visual
    recordingIndicator.style.display = "none";
    recordingText.style.display = "none";

    // Actualizar botones
    actualizarEstadoBotones();
});

// Función para abrir el modal de confirmación
const abrirModal = () => {
    modalConfirmDelete.style.display = 'flex';
};

// Función para cerrar el modal de confirmación
const cerrarModal = () => {
    modalConfirmDelete.style.display = 'none';
};

// Función para limpiar el texto (con modal)
btnClear.addEventListener('click', () => {
    if (textArea.value.trim() === "") {
        alert("No hay texto para borrar.");
        return;
    }
    
    abrirModal(); // Mostrar el modal de confirmación
});

// Confirmar la acción de borrar
btnConfirmDelete.addEventListener('click', () => {
    textArea.value = ""; // Limpiar el área de texto
    cerrarModal(); // Cerrar el modal después de borrar el texto
    actualizarEstadoBotones(); // Actualizar el estado de los botones
});

// Cancelar la acción de borrar
btnCancelDelete.addEventListener('click', () => {
    cerrarModal(); // Cerrar el modal sin borrar el texto
});

// Función para guardar el texto en un archivo
btnSave.addEventListener('click', () => {
    if (textArea.value.trim() === "") {
        alert("No hay texto para guardar.");
        return;
    }

    // Crear el documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurar el texto en el PDF
    const texto = textArea.value;
    const margenIzquierdo = 10; // Márgen en mm
    const margenSuperior = 10; // Márgen en mm
    const anchoLinea = 180; // Ancho de la línea (A4 tiene 210mm de ancho, con márgenes)

    // Dividir el texto en líneas para ajustarlo al ancho
    const lineas = doc.splitTextToSize(texto, anchoLinea);

    // Agregar texto al documento PDF
    doc.text(lineas, margenIzquierdo, margenSuperior);

    // Descargar el PDF
    doc.save("mi_carta.pdf");
});

// Agregar texto reconocido al área de texto en tiempo real
recognition.onresult = (event) => {
    let textoTemporal = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const resultado = event.results[i];
        textoTemporal += resultado[0].transcript;

        if (resultado.isFinal) {
            textArea.value += textoTemporal + " ";
            textoTemporal = '';
        }
    }

    if (textoTemporal) {
        textArea.placeholder = textoTemporal;
    }

    actualizarEstadoBotones();
};

// Manejo de errores
recognition.onerror = (event) => {
    alert(`Error: ${event.error}`);
};

// Función para leer el texto en voz alta
btnListen.addEventListener('click', () => {
    if (textArea.value.trim() === "") {
        alert("No hay texto para escuchar.");
        return;
    }

    const texto = textArea.value;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);
});

// Actualizar el estado de los botones al cargar
actualizarEstadoBotones();

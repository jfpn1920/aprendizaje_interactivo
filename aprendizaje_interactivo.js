const CLAVE = 'aprendizajeInteractivo';
// Respuesta correcta de la pregunta
const CORRECTA = 'css';
// Estado de la lección (se guarda y se recupera de localStorage)
let estado = { leida: false, respuesta: null, intentos: 0, acertada: false };
// ===== Referencias a elementos del HTML =====
const casillaLeida = document.getElementById('leida');           // casilla "He leído"
const opciones = document.querySelectorAll('input[name="respuesta"]'); // radios
const btnComprobar = document.getElementById('btn-comprobar');   // botón comprobar
const btnReiniciar = document.getElementById('btn-reiniciar');   // botón reiniciar
const resultado = document.getElementById('resultado');          // mensaje de resultado
const intentos = document.getElementById('intentos');            // contador de intentos
// ===== Funciones de localStorage =====
// Guarda el estado actual en el navegador (como texto JSON)
function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(estado));
}
// Carga el estado guardado (si existe) al abrir la página
function cargar() {
  const datos = localStorage.getItem(CLAVE); // lee el texto guardado
  if (datos) estado = { ...estado, ...JSON.parse(datos) }; // lo mezcla con el estado base
}
// ===== Funciones de la interfaz =====
// Dibuja en pantalla todo lo que está guardado en el estado
function actualizar() {
  // Marca o desmarca la casilla de lección leída
  casillaLeida.checked = estado.leida;
  // Marca el radio que coincide con la respuesta guardada
  opciones.forEach(radio => {
    radio.checked = radio.value === estado.respuesta;
    radio.disabled = estado.acertada; // si ya acertó, bloquea las opciones
  });
  btnComprobar.disabled = estado.acertada; // y también el botón
  // Muestra el número de intentos
  intentos.textContent = `Intentos: ${estado.intentos}`;
  // Limpia el mensaje y luego escribe el que corresponda
  resultado.className = 'resultado';
  resultado.textContent = '';
  if (estado.acertada) {
    resultado.textContent = '✅ ¡Correcto! CSS se encarga del diseño.';
    resultado.classList.add('correcto');
  } else if (estado.intentos > 0) {
    resultado.textContent = '❌ Incorrecto, vuelve a intentarlo.';
    resultado.classList.add('incorrecto');
  }
}
// Comprueba la respuesta elegida
function comprobar() {
  // Busca el radio seleccionado
  const elegida = document.querySelector('input[name="respuesta"]:checked');
  // Si no eligió nada, avisa y se detiene
  if (!elegida) {
    resultado.className = 'resultado incorrecto';
    resultado.textContent = '⚠️ Elige una respuesta primero.';
    return;
  }
  // Guarda la respuesta, suma un intento y revisa si es la correcta
  estado.respuesta = elegida.value;
  estado.intentos++;
  estado.acertada = elegida.value === CORRECTA;
  guardar();
  actualizar();
}
// Borra todo y deja la lección como al inicio
function reiniciar() {
  estado = { leida: false, respuesta: null, intentos: 0, acertada: false };
  localStorage.removeItem(CLAVE);
  actualizar();
}
// ===== Eventos =====
// Al marcar o desmarcar la casilla, se guarda el cambio
casillaLeida.addEventListener('change', () => {
  estado.leida = casillaLeida.checked;
  guardar();
});
// Botones de comprobar y reiniciar
btnComprobar.addEventListener('click', comprobar);
btnReiniciar.addEventListener('click', reiniciar);
cargar();
actualizar();
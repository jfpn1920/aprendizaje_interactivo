//-------------------------------------------//
//--|funcionalidad_aprendizaje_interactivo|--//
//-------------------------------------------//
const CLAVE = 'aprendizajeInteractivo';
const CORRECTA = 'css';
let estado = {
    leida: false,
    respuesta: null,
    intentos: 0,
    acertada: false
};
const casillaLeida = document.getElementById('leida');
const opciones = document.querySelectorAll('input[name="respuesta"]');
const btnComprobar = document.getElementById('btn-comprobar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const resultado = document.getElementById('resultado');
const intentos = document.getElementById('intentos');
//--------------------//
//--|guardar_estado|--//
//--------------------//
function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
function cargar() {
    const datos = localStorage.getItem(CLAVE);
    if (datos) {
        try {
            const guardado = JSON.parse(datos);
            estado = {
                ...estado,
                ...guardado
            };
        } catch (error) {
            localStorage.removeItem(CLAVE);
        }
    }
}
function actualizar() {
    casillaLeida.checked = estado.leida;
    opciones.forEach(function(radio) {
        radio.checked = radio.value === estado.respuesta;
        radio.disabled = estado.acertada;
    });
    btnComprobar.disabled = estado.acertada;
    intentos.textContent = `Intentos: ${estado.intentos}`;
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
//-------------------------//
//--|comprobar_respuesta|--//
//-------------------------//
function comprobar() {
    const elegida = document.querySelector('input[name="respuesta"]:checked');
    if (!elegida) {
        resultado.className = 'resultado incorrecto';
        resultado.textContent = '⚠️ Elige una respuesta primero.';
        return;
    }
    estado.respuesta = elegida.value;
    estado.intentos++;
    estado.acertada = elegida.value === CORRECTA;
    guardar();
    actualizar();
}
//-----------------------//
//--|reiniciar_leccion|--//
//-----------------------//
function reiniciar() {
    estado = {
        leida: false,
        respuesta: null,
        intentos: 0,
        acertada: false
    };
    localStorage.removeItem(CLAVE);
    actualizar();
}
casillaLeida.addEventListener('change', function() {
    estado.leida = casillaLeida.checked;
    guardar();
});
btnComprobar.addEventListener('click', comprobar);
btnReiniciar.addEventListener('click', reiniciar);
//------------------------//
//--|iniciar_aplicacion|--//       
//------------------------//
cargar();
actualizar();
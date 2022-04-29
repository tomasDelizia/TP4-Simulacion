// Imports.
import { HTMLUtils } from './HTMLUtils';
import { MCLoteria } from './MCLoteria';
import './style.css';

// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNros: HTMLInputElement = document.getElementById('txtCantNros') as HTMLInputElement;
const txtLambda: HTMLInputElement = document.getElementById('txtLambda') as HTMLInputElement;
const txtIndiceDesde: HTMLInputElement = document.getElementById('txtIndiceDesde') as HTMLInputElement;
const txtProbAtiende: HTMLInputElement = document.getElementById('txtProbAtiende') as HTMLInputElement;
const alertResIngresoPorHora: HTMLDivElement = document.getElementById('alertResIngresoPorHora') as HTMLDivElement;
const alertResIngresoComision: HTMLDivElement = document.getElementById('alertResIngresoComision') as HTMLDivElement;
const alertResIngresoMaximo: HTMLDivElement = document.getElementById('alertResIngresoMaximo') as HTMLDivElement;
const alertResIngresoMinimo: HTMLDivElement = document.getElementById('alertResIngresoMinimo') as HTMLDivElement;

// Definición de botones de la interfaz de usuario.
const btnSimular: HTMLButtonElement = document.getElementById('btnSimular') as HTMLButtonElement;

// Definición de la secciones de la simulación.
const divTablaMontecarlo: HTMLDivElement = document.getElementById('divTablaMontecarlo') as HTMLDivElement;

// Definición de la tabla de Montecarlo.
const tablaMontecarlo: HTMLTableElement = document.getElementById('tablaMontecarlo') as HTMLTableElement;

// Definición de los parámetros.
let n: number;
let lambda: number;
let indiceDesde: number;
let probAtiende: number;

// Definición del elemento spinner.
const spinnerSimular: HTMLSpanElement = document.getElementById('spinnerSimular') as HTMLSpanElement;

// Definición del objeto que realiza la simulación de Monte Carlo.
const monteCarlo: MCLoteria = new MCLoteria();

//Ocultamos la seccion en donde esta la tabla.
HTMLUtils.ocultarSeccion(divTablaMontecarlo);

// Disparamos la simulación.
btnSimular.addEventListener('click', async () => {
  HTMLUtils.mostrarSpinner(spinnerSimular, btnSimular);
  await simular();
  HTMLUtils.ocultarSpinner(spinnerSimular, btnSimular);
});

const simular = async () => {
  alertResIngresoPorHora.innerHTML = 'Ingreso Promedio Por Hora: ';
  alertResIngresoComision.innerHTML = 'Ingreso Promedio Por Hora con Comisión (35%): ';
  alertResIngresoMaximo.innerHTML = 'Ingreso Máximo: ';
  alertResIngresoMinimo.innerHTML = 'Ingreso Mínimo: ';
  
  // Validamos los parámetros ingresados por el usuario.
  if (!validarParametros())
    return;

  HTMLUtils.limpiarTabla(tablaMontecarlo);
  HTMLUtils.mostrarSeccion(divTablaMontecarlo);

  // Realizamos la simulación.
  var startTime = performance.now()
  await monteCarlo.simular(n, lambda, indiceDesde, probAtiende);

  // Cargamos la tabla a mostrar.
  const cantColumnas: number = monteCarlo.getCantColumnas();

  HTMLUtils.agregarEncabezadoATabla(cantColumnas, tablaMontecarlo);
  for (let i: number = 0; i < monteCarlo.getTablaMuestra().length; i++)
    await HTMLUtils.agregarFilaATabla(monteCarlo.getTablaMuestra()[i], cantColumnas, tablaMontecarlo);

  // Cargamos las métricas.
  alertResIngresoPorHora.innerHTML += monteCarlo.getingresoPromedioPorHora().toFixed(2) + ' €';
  const ingresoComision: number = monteCarlo.getingresoPromedioPorHora() * 0.65;
  alertResIngresoComision.innerHTML += ingresoComision.toFixed(2) + ' €';
  alertResIngresoMaximo.innerHTML += monteCarlo.getingresoMaximmo() + ' €';
  alertResIngresoMinimo.innerHTML += monteCarlo.getingresoMinimo() + ' €';

  var endTime = performance.now();

  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
}

function validarParametros(): boolean {
  if (txtCantNros.value === '' || txtLambda.value === '' || txtProbAtiende.value === '' || txtIndiceDesde.value === '') {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }

  n = Number(txtCantNros.value);
  lambda = Number(txtLambda.value);
  probAtiende = Number(txtProbAtiende.value);
  indiceDesde = Number(txtIndiceDesde.value);

  if (n <= 0) {
    alert('La cantidad de números a generar debe ser mayor a cero.');
    return false;
  }
  if (lambda < 0) {
    alert('Lambda no puede ser un valor negativo');
    return false;
  }
  if (indiceDesde <= 0 || indiceDesde > n) {
    alert('El valor de probabilidad ingresado debe estar comprendido entre 1 y ' + n + '.');
    return false;
  }
  if (!(probAtiende >= 0 && probAtiende <= 1)) {
    alert('El valor de probabilidad ingresado debe estar comprendido entre 0 y 1.');
    return false;
  }
  return true;
}

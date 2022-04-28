// Import stylesheets
import { HTMLUtils } from './HTMLUtils';
import { MCLoteria } from './MCLoteria';
import './style.css';

const txtCantNros: HTMLInputElement = document.getElementById('txtCantNros') as HTMLInputElement;
const txtLambda: HTMLInputElement = document.getElementById('txtLambda') as HTMLInputElement;
const txtProbAtiende: HTMLInputElement = document.getElementById('txtProbAtiende') as HTMLInputElement;
const txtIndiceDesde: HTMLInputElement = document.getElementById('txtIndiceDesde') as HTMLInputElement;

const btnSimular: HTMLButtonElement = document.getElementById('btnSimular') as HTMLButtonElement;

const divTablaMontecarlo: HTMLDivElement = document.getElementById('tablaMontecarlo') as HTMLDivElement;

// Definición de los parámetros.
let n: number;
let indiceDesde: number;
let lambda: number;
let probAtiende: number;

HTMLUtils.ocultarSeccion(divTablaMontecarlo);

btnSimular.addEventListener('click', () => {
  if (!validarParametros())
    return;
  HTMLUtils.mostrarSeccion(divTablaMontecarlo);
});

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
  if (lambda < 0){
    alert('Lambda no puede ser un valor negativo');
    return false;
  }
  if (!(probAtiende >= 0 && probAtiende <= 1)) {
    alert('El valor de probabilidad ingresado debe estar comprendido entre 0 y 1.');
    return false;
  }

  return true;
}

const monteCarlo: MCLoteria = new MCLoteria();

var startTime = performance.now()

monteCarlo.simular(500, 20, 5, 0.85);
    
var endTime = performance.now()

console.log(monteCarlo.getTablaMuestra());
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
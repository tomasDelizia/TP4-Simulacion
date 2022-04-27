// Import stylesheets
import { MCLoteria } from './MCLoteria';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const monteCarlo: MCLoteria = new MCLoteria();

var startTime = performance.now()

monteCarlo.simular(500, 20, 5, 0.85);
    
var endTime = performance.now()

console.log(monteCarlo.getTablaMuestra());
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

console.log(monteCarlo.getTablaProbabilidad());
// Import stylesheets
import { MCLoteria } from './MCLoteria';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const monteCarlo: MCLoteria = new MCLoteria();
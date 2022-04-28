export module HTMLUtils {

  // Función para ocultar un elemento div.
  export function ocultarSeccion(div: HTMLDivElement): void {
    div.style.display = 'none';
  }

  // Función para mostrar un elemento div.
  export function mostrarSeccion(div: HTMLDivElement): void {
    div.style.display = 'block';
  }

    // Función que elimina todas las filas de la tabla HTML.
    export function limpiarTabla(tabla: HTMLTableElement): void {
      tabla.deleteTHead();

      for (let i: number = tabla.rows.length; i >= 1; i--) {
        tabla.deleteRow(i - 1);
      }
    }
  
    // Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
    export async function agregarFilaATabla(fila: number[], cantColumnas: number, tabla: HTMLTableElement): Promise<void> {
      const tamFila: number = fila.length;
      let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
      for (let i: number = 0; i < cantColumnas - 2; i++) {
        // Agregamos guiones para las horas que tengan menos columnas que la hora con la mayor cantidad de horas.
        const valor: string = !(typeof fila[i] === 'undefined') ? String(fila[i]) : '-';

        let celda: HTMLTableDataCellElement = filaHTML.insertCell();
        if (i == tamFila - 2 || i == tamFila - 1)
          celda.appendChild(document.createTextNode('-'));
        else
          celda.appendChild(document.createTextNode(valor));  
      }

      let celdaTotal: HTMLTableDataCellElement = filaHTML.insertCell();
      celdaTotal.appendChild(document.createTextNode(String(fila[tamFila-2])));

      let celdaAc: HTMLTableDataCellElement = filaHTML.insertCell();
      celdaAc.appendChild(document.createTextNode(String(fila[tamFila-1])));
    }

    // Agregar las columnas al encabezado de la tabla.
    export function agregarEncabezadoATabla(cantColumnas: number, tabla: HTMLTableElement): void {
      tabla.createTHead();
      let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('thead')[0].insertRow();

      let reloj: HTMLTableHeaderCellElement = filaHTML.insertCell();
      reloj.appendChild(document.createTextNode('Reloj (Hs)'));

      let cont: number = 1;
      for (let i: number = 1; i <= cantColumnas - 3; i += 2) {
        let celdaRnd: HTMLTableHeaderCellElement = filaHTML.insertCell();
        celdaRnd.appendChild(document.createTextNode('RND Llamado ' + cont));
        let celdaIngreso: HTMLTableHeaderCellElement = filaHTML.insertCell();
        celdaIngreso.appendChild(document.createTextNode('Ingreso (€)'));
        cont++;
      }
      
      let ingresoHora: HTMLTableHeaderCellElement = filaHTML.insertCell();
      ingresoHora.appendChild(document.createTextNode('Ingreso Hora (€)'));

      let ingresoTotal: HTMLTableHeaderCellElement = filaHTML.insertCell();
      ingresoTotal.appendChild(document.createTextNode('Ingreso Total (€)'));
      
    }
}
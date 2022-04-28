export module HTMLUtils {

  // Función para ocultar un elemento div.
  export function ocultarSeccion(div: HTMLDivElement): void {
    div.style.display = 'none';
  }

  // Función para mostrar un elemento div.
  export function mostrarSeccion(div: HTMLDivElement): void {
    div.style.display = 'block';
  }

    // Función que elimina todas las filas de la tabla HTML excepto los encabezados.
    export function limpiarTabla(tabla: HTMLTableElement): void {
      tabla.deleteTHead();

      for (let i: number = tabla.rows.length; i > 1; i--) {
        tabla.deleteRow(i - 1);
      }
    }
  
    // Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
    export function agregarFilaATabla(fila: any[], cantColumnas: number, tabla: HTMLTableElement): void {
      const tamFila: number = fila.length;
      let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
      for (let i: number = 0; i < cantColumnas - 2; i++) {
        const valor: number = !(typeof fila[i] === 'undefined') ? fila[i] : '-';
        let celda: HTMLTableDataCellElement = filaHTML.insertCell();
        if (i == tamFila - 2 || i == tamFila - 1)
          celda.appendChild(document.createTextNode('-'));
        else
          celda.appendChild(document.createTextNode(String(valor)));  
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
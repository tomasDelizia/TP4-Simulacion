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
      for (let i: number = tabla.rows.length; i > 1; i--) {
        tabla.deleteRow(i - 1);
      }
    }
  
    // Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
    export function agregarFilaATabla(fila: any[], tabla: HTMLTableElement): void {
    let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
    for (let i: number = 0; i < fila.length; i++) {
      let celda: HTMLTableDataCellElement = filaHTML.insertCell();
      celda.appendChild(document.createTextNode(String(fila[i])));
      }
    }

    // Agregar las columnas al encabezado de la tabla.
    export function agregarEncabezadoATabla(cantColumnas: number, tabla: HTMLTableElement): void {
      let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('thead')[0].insertRow();

      let reloj: HTMLTableHeaderCellElement = filaHTML.insertCell();
      reloj.appendChild(document.createTextNode('Reloj'));

      let cont: number = 1;
      for (let i: number = 1; i <= cantColumnas - 2; i += 2) {
        let celdaRnd: HTMLTableHeaderCellElement = filaHTML.insertCell();
        celdaRnd.appendChild(document.createTextNode('RND' + cont));
        let celdaIngreso: HTMLTableHeaderCellElement = filaHTML.insertCell();
        celdaIngreso.appendChild(document.createTextNode('Ingreso'));
        cont++;
      }
      
      let ingresoHora: HTMLTableHeaderCellElement = filaHTML.insertCell();
      ingresoHora.appendChild(document.createTextNode('Ingreso Hora'));

      let ingresoTotal: HTMLTableHeaderCellElement = filaHTML.insertCell();
      ingresoTotal.appendChild(document.createTextNode('Ingreso Total'));
      
    }
}
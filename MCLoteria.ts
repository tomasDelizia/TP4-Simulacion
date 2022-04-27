export class MCLoteria {
  private tabla: number[][];
  private ingresosPorLlamado: number [][];

  public simular(n: number, lambda: number, indiceDesde: number, probAtienden: number): void {
    this.tabla = [];

    this.generarTablaIngresos(probAtienden);

    
  }

  private generarTablaIngresos(probAtienden: number) {
    this.ingresosPorLlamado = [];

    // Definición de las probabilidades.
    let probNoAtienden: number = 1 - probAtienden;
    
    let probHombre: number = 0.2;
    let probMujer: number = 1 - probHombre;

    let probHSi: number = 0.4;
    let probHNo: number = 1 - probHSi;

    let probMSi: number = 0.7;
    let probMNo: number = 1 - probMSi;

    let probH0Eur: number = probAtienden * probHombre * probHNo;
    let probH5Eur: number = probAtienden * probHombre * probHSi * 0.05;
    let probH10Eur: number = probAtienden * probHombre * probHSi * 0.2;
    let probH15Eur: number = probAtienden * probHombre * probHSi * 0.35;
    let probH25Eur: number = probAtienden * probHombre * probHSi * 0.4;

    let probM0Eur: number = probAtienden * probMujer * probMNo;
    let probM5Eur: number = probAtienden * probMujer * probMSi * 0.2;
    let probM10Eur: number = probAtienden * probMujer * probMSi * 0.6;
    let probM15Eur: number = probAtienden * probMujer * probMSi * 0.15;
    let probM25Eur: number = probAtienden * probMujer * probMSi * 0.05;

    this.ingresosPorLlamado.push(
      [0, probNoAtienden + probH0Eur + probM0Eur],
      [5, probH5Eur + probM5Eur],
      [10, probH10Eur + probM10Eur],
      [15, probH15Eur + probM15Eur],
      [25, probH25Eur + probM25Eur],
    );

    let probAc: number = 0;

    for (let i: number = 0; i < this.ingresosPorLlamado.length; i++) {
      const fila: number[] = this.ingresosPorLlamado[i];
      const probabilidad: number = fila[1];
      probAc += probabilidad;
      fila.push(probAc);
    }
  }

  // Método que obtiene el ingreso de la tabla de ingresos para un número aleatorio U(0, 1).
  private getIngreso(): number {
    const rnd: number = Math.random();
    for (let i: number = 0; i < this.generarTablaIngresos.length; i++) {
      const fila: number[] = this.ingresosPorLlamado[i];
      if (rnd < fila[2])
        return fila[0]; 
    }
    return -1; 
  }

  // Método que genera una variable de Poisson dado un valor de lambda.
  private getRndPoisson(lambda: number): number {
    // Producto de números uniformes (0, 1).
    let p: number = 1;
    // Iniciamos la variable Poisson en -1.
    let rnd: number = -1;
    // Constante de corte.
    let a: number = Math.exp(-lambda);
    do {
      // Obtenemos un RND uniforme (0, 1).
      let u: number = Math.random();
      p = p * u;
      rnd = rnd + 1;
    } while (p >= a);
    return rnd;
  }
}
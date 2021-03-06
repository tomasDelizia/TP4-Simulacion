export class MCLoteria {
  private ingresosPorLlamado: number [][];
  private tablaMuestra: number [][];
  private maxColumnas: number;
  private ingresoPromedioPorHora: number;
  private ingresoMaximo: number;
  private ingresoMinimo: number;

  public async simular(n: number, lambda: number, indiceDesde: number, probAtiende: number): Promise<void> {
    this.tablaMuestra = [];
    this.maxColumnas = 0;
    this.ingresoPromedioPorHora = 0;
    
    // Definimos el rango de filas que vamos a mostrar.
    let indiceHasta: number = indiceDesde + 399;
    if (indiceHasta > n - 1)
      indiceHasta = n;

    // Generamos la tabla de probabilidades de ingreso por llamado.
    this.generarTablaIngresos(probAtiende);

    let ingresoTotal: number = 0;
    this.ingresoMaximo = 0;
    this.ingresoMinimo = Math.pow(10, 1000)
    let hora: number[];

    // Iteramos por cada hora.
    for (let i: number = 1; i <= n; i++) {
      hora = [i];

      const cantLlamados: number = this.getRndPoisson(lambda);
      hora.push(cantLlamados);

      let ingresoHora: number = 0;

      // Iteramos mientras haya llamados.
      for (let j: number = 0; j < cantLlamados; j++) {
        const rndIngreso: number = Math.random();
        const ingresoLlamado: number = this.getIngreso(rndIngreso);
        ingresoHora += ingresoLlamado;
        hora.push(Number(rndIngreso.toFixed(4)), ingresoLlamado);
      }

      // Definimos el ingreso en esa hora y el ingreso total.
      ingresoTotal += ingresoHora;
      hora.push(ingresoHora, ingresoTotal);

      // Calculamos métricas necesarias
      this.ingresoMaximo = Math.max(this.ingresoMaximo, ingresoHora);     
      this.ingresoMinimo = Math.min(this.ingresoMinimo, ingresoHora);

      // Cargamos la tabla a mostrar con las filas correspondientes mas la última fila.
      if ((i >= indiceDesde && i <= indiceHasta) || i == n) {
        this.tablaMuestra.push(hora);
        this.maxColumnas = Math.max(this.maxColumnas, hora.length);
      }
    }
    this.ingresoPromedioPorHora = ingresoTotal/n;
  }

  // Método que genera la tabla de ingreso en euros por llamado.
  private generarTablaIngresos(probAtiende: number) {
    this.ingresosPorLlamado = [];

    // Definición de las probabilidades.
    let probNoAtienden: number = 1 - probAtiende;
    
    let probHombre: number = 0.2;
    let probMujer: number = 1 - probHombre;

    let probHSi: number = 0.4;
    let probHNo: number = 1 - probHSi;

    let probMSi: number = 0.7;
    let probMNo: number = 1 - probMSi;

    let probH0Eur: number = probAtiende * probHombre * probHNo;
    let probH5Eur: number = probAtiende * probHombre * probHSi * 0.05;
    let probH10Eur: number = probAtiende * probHombre * probHSi * 0.2;
    let probH15Eur: number = probAtiende * probHombre * probHSi * 0.35;
    let probH25Eur: number = probAtiende * probHombre * probHSi * 0.4;

    let probM0Eur: number = probAtiende * probMujer * probMNo;
    let probM5Eur: number = probAtiende * probMujer * probMSi * 0.2;
    let probM10Eur: number = probAtiende * probMujer * probMSi * 0.6;
    let probM15Eur: number = probAtiende * probMujer * probMSi * 0.15;
    let probM25Eur: number = probAtiende * probMujer * probMSi * 0.05;

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

  // Método que obtiene el ingreso de la tabla de ingresos para un número aleatorio U(0, 1) pasado por parámetro.
  private getIngreso(rnd: number): number {
    for (let i: number = 0; i < this.ingresosPorLlamado.length; i++) {
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

  public getTablaMuestra(): number[][] {
    return this.tablaMuestra;
  }

  public getTablaProbabilidad(): number[][] {
    return this.ingresosPorLlamado;
  }

  public getCantColumnas(): number {
    return this.maxColumnas;
  }

  public getingresoPromedioPorHora(): number {
    return this.ingresoPromedioPorHora;
  }

  public getingresoMaximmo(): number {
    return this.ingresoMaximo;
  }

  public getingresoMinimo(): number {
    return this.ingresoMinimo;
  }
}
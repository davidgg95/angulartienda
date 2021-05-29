export class Producto {
  _id: number;
  _nombre: String;
  _precio: number;
  _cantidad: number;
  _entrada: Date;
  _tienda: String;

  public constructor(
    id: number,
    nombre: String,
    precio: number,
    cantidad: number,
    entrada: Date,
    tienda: String
  ) {
    this._id = id;
    this._nombre = nombre;
    this._precio = precio;
    this._cantidad = cantidad;
    this._entrada = entrada;
    this._tienda = tienda;
  }
  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get precio() {
    return this._precio;
  }
  get cantidad() {
    return this._cantidad;
  }
  get entrada() {
    return this._entrada;
  }
  get tienda() {
    return this._tienda;
  }

  pedido1(){
    if (this._nombre == "Botas Adidas" || this._nombre == "Camiseta Nike" ) {
      let precio = this._precio * 2;
      return precio;
    }
  }




  /*salida(){

    let cantidad = this._precio * this._cantidad;
    return cantidad;
    
  }*/

  iva() {
    let precioIVA = this._precio * 0.21 + this._precio;
    return precioIVA;
  }
}

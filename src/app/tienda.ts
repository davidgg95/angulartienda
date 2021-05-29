import { Producto } from './producto';

export class Tienda {
  _id: number;
  _nombre: String;
  _provincia: String;
  _direccion: String;
  _ingresos: number;
  _productos: Array<Producto>;

  constructor(
    id: number,
    nombre: String,
    provincia: String,
    direccion: String,
    ingresos: number,
    productos: Array<Producto>
  ) {
    this._id = id;
    this._nombre = nombre;
    this._provincia = provincia;
    this._direccion = direccion;
    this._ingresos = ingresos;
    this._productos = productos;
  }

  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get provincia() {
    return this._provincia;
  }
  get direccion() {
    return this._direccion;
  }
  get ingresos() {
    return this._ingresos;
  }
  get productos() {
    return this._productos;
  } 


}

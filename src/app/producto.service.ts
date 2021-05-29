import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from './producto';

@Injectable()
export class ProductoService {
  private url2 = 'https://restapitienda.herokuapp.com/producto';
  private url3 = 'https://restapitienda.herokuapp.com/actualizaProducto';
  private url4 = 'https://restapitienda.herokuapp.com/nuevoProducto';
  //private url5 = 'https://restapitienda.herokuapp.com/borrarProducto';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getProductosApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url2);
  }

  updateProducto(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url3}/${doc.nombre}`;
    return this.http.post(url2Id, doc);
  }

  deleteProducto(producto: Producto) {
    const url5 = `https://restapitienda.herokuapp.com/borrarProducto/${
      producto._nombre}`;
    return this.http.get(url5);
  }

  nuevoProductoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  getProducto(nombre: string) {
    const url2 = `https://restapitienda.herokuapp.com/producto/${nombre}`;
    return this.http.get(url2);
  }
}

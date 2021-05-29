import { Injectable } from '@angular/core';
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Tienda } from "./tienda";


@Injectable()
export class TiendaService {
  private url1 = "https://restapitienda.herokuapp.com";
  private url2 = "https://restapitienda.herokuapp.com/nuevotienda";
  private url4 = "https://restapitienda.herokuapp.com/nuevoProducto";
  private url5 =
    "https://restapitienda.herokuapp.com/actualizaTienda";
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getTiendasApi() {
    this.messageService.add("Cargamos los documentos");
    return this.http.get(this.url1);
  }

  updateTienda(doc: any) {
    console.log("en update");
    console.log(doc);
    const url2Id = `${this.url5}/${doc.nombre}`;
    return this.http.post(url2Id, doc);
  }

  deleteTienda(tienda: Tienda) {
    const url2Id = `https://restapitienda.herokuapp.com/borrarTienda/${
      tienda._nombre
    }`;
    return this.http.get(url2Id);
  }

  nuevoTiendaPost(doc: any) {
    return this.http.post(this.url2, doc);
  }
  nuevoProductoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  getTienda(_nombre: string) {
    const url1id = `https://restapitienda.herokuapp.com/tienda/${_nombre}`;
    return this.http.get(url1id);
  }


}
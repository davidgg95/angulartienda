import { Component, OnInit } from '@angular/core';
import { Tienda } from '../tienda';
import { TiendaService } from '../tienda.service';
import { MessageService } from '../message.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  tiendas: Array<Tienda> = [];
  tiendasApi = null;
  tiendaTmp: any;

  constructor(
    private tiendaService: TiendaService,
    private messageService: MessageService
  ) {}

  getTiendasApi() {
    this.messageService.add('Mostrando Tiendas');
    this.tiendaService.getTiendasApi().subscribe(tiendas => {
      this.tiendasApi = tiendas;
      for (let tienda of this.tiendasApi) {
        let productos: Array<Producto> = new Array();
        for (let producto of tienda.productos) {
          let p = new Producto(
            producto._id,
            producto._nombre,
            producto._precio,
            producto._cantidad,
            producto._entrada,
            producto._tienda
          );
          productos.push(p);
        }
        let t = new Tienda(
          tienda._id,
          tienda._nombre,
          tienda._provincia,
          tienda._direccion,
          tienda._ingresos,
          productos
        );
        this.tiendas.push(t);
      }
    });
  }

  delete(tienda: Tienda): void {
    this.tiendas = this.tiendas.filter(h => h !== tienda);
    this.tiendaService.deleteTienda(tienda).subscribe();
  }

  add(
    id: string,
    nombre: string,
    provincia: string,
    direccion: string,
    ingresos: string
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const provinciaV = provincia;
    const direccionV = direccion;
    const ingresosV = parseInt(ingresos);

    if (!id) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      provincia: provinciaV,
      direccion: direccionV,
      ingresos: ingresosV
    };
    this.tiendaService.nuevoTiendaPost(newDoc).subscribe(tienda => {
      this.tiendaTmp = tienda;
      this.tiendas.push(this.tiendaTmp);
    });
  }

  ngOnInit() {
    this.getTiendasApi();
  }
}

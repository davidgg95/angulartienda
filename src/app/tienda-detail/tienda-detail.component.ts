import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from '../tienda';
import { Producto } from '../producto';
import { TiendaService } from '../tienda.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tienda-detail',
  templateUrl: './tienda-detail.component.html',
  styleUrls: ['./tienda-detail.component.css']
})
export class TiendaDetailComponent implements OnInit {
  tienda: Tienda;
  tiendaApi = null;

  constructor(
    private route: ActivatedRoute,
    private tiendaService: TiendaService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getTienda();
  }

  getTienda(): void {
    let nombre = this.route.snapshot.paramMap.get('_nombre');
    this.tiendaService.getTienda(nombre).subscribe(t => {
      this.tiendaApi = t;
      let productos: Array<Producto> = new Array();
      for (let producto of this.tiendaApi[0].productos) {
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
      this.tienda = new Tienda(
        this.tiendaApi[0]._id,
        this.tiendaApi[0]._nombre,
        this.tiendaApi[0]._provincia,
        this.tiendaApi[0]._direccion,
        this.tiendaApi[0]._ingresos,
        productos
      );
    });
  }

  add(
    id: string,
    nombre: string,
    precio: string,
    cantidad: string,
    entrada: string
  ): void {
    const idV = id;
    const nombreV = nombre.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const entradaV = new Date(entrada);
    if (!id) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      precio: precioV,
      cantidad: cantidadV,
      entrad: entradaV,
      tienda: this.tienda._nombre
    };
    this.tiendaService.nuevoProductoPost(newDoc).subscribe(producto => {
      const productoTmp: any = newDoc;
      this.tienda._productos.push(productoTmp);
    });
  }

  save(_provincia: string): void {
    const doc = {
      id: this.tienda._id,
      nombre: this.tienda._nombre,
      provincia: this.tienda._provincia,
      direccion: this.tienda._direccion,
      numtelefono: this.tienda._ingresos
    };
    this.tiendaService.updateTienda(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

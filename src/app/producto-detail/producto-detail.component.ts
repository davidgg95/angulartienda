import { Component, OnInit } from '@angular/core';
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {
  producto: Producto;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getProducto();
  }

  save(_precio: string, _cantidad: string): void {
    const doc = {
      id: this.producto._id,
      nombre: this.producto._nombre,
      precio: parseInt(_precio),
      cantidad: parseInt(_cantidad),
      entrada: new Date(this.producto._entrada),
      tienda: this.producto._tienda
    };
    this.productoService.updateProducto(doc).subscribe(() => this.goBack());
  }

  getProducto(): void {
    const nombre = this.route.snapshot.paramMap.get("nombre");
    this.messageService.add(
      `ProductosComponent: Selected producto=${nombre}`
    );
    this.productoService.getProducto(nombre).subscribe(producto => {
      const productoTmp: any = producto;
      this.producto = productoTmp[0];
    });
  }

  goBack(): void {
    this.location.back();
  }

}
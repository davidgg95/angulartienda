import { Component, OnInit } from '@angular/core';
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { MessageService } from "../message.service";


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  productosApi = null;
  productoTmp: any;
  constructor(
    private productoService: ProductoService,
    private messageService: MessageService
  ) { }

  getProductosApi() {
    this.messageService.add("Mostrando Productos");
    this.productoService.getProductosApi().subscribe(productos => {
      this.productosApi = productos;
      this.productos = this.productosApi;
      this.productoTmp = this.productos.map((x: Producto) => {
        return new Producto(
          x._id,
          x._nombre,
          x._precio,
          x._cantidad,
          x._entrada,
          x._tienda
        );
      });
    });
  }

  delete(producto: Producto): void {
   this.productos = this.productos.filter(h => h !== producto);
    this.productoService.deleteProducto(producto).subscribe();
  
  }

  add(id: string, nombre: string, precio: string, cantidad: string, entrada: string, tienda: string): void {
    const idV = id;
    const nombreV = nombre.trim();
    const precioV = parseInt(precio);
    const cantidadV = parseInt(cantidad);
    const entradaV = new Date(entrada);
    const tiendaV = tienda;
    if (!id) {
      return;
    }
    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      precio: precioV,
      cantidad: cantidadV,
      entrada: entradaV,
      tienda: tiendaV
    };
    this.productoService.nuevoProductoPost(newDoc).subscribe(producto => {
      this.productoTmp = producto;
      this.productos.push(this.productoTmp);
    });
  }

  ngOnInit() {
    this.getProductosApi();
  }

}
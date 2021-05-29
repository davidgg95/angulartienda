import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { TiendaDetailComponent } from './tienda-detail/tienda-detail.component';
import { Grafico01Component } from './grafico01/grafico01.component';
import { Grafico02Component } from './grafico02/grafico02.component';
import { Grafico03Component } from './grafico03/grafico03.component';
import { Grafico04Component } from './grafico04/grafico04.component';


const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'detail/:nombre', component: ProductoDetailComponent },
  { path: 'detail2/:_nombre', component: TiendaDetailComponent },
  { path: 'graficobarra', component: Grafico01Component },
  { path: 'graficolineas', component: Grafico02Component },
  { path: 'graficopastel', component: Grafico03Component },
  { path: 'graficobarras2', component: Grafico04Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

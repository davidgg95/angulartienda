import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import {APP_BASE_HREF} from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProductoService } from './producto.service';
import { TiendaService } from './tienda.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { ProductosComponent } from './productos/productos.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { TiendaDetailComponent } from './tienda-detail/tienda-detail.component';
import { Grafico01Component } from './grafico01/grafico01.component';
import { Grafico02Component } from './grafico02/grafico02.component';
import { Grafico03Component } from './grafico03/grafico03.component';
import { Grafico04Component } from './grafico04/grafico04.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    MessagesComponent,
    ProductosComponent,
    TiendasComponent,
    ProductoDetailComponent,
    TiendaDetailComponent,
    Grafico01Component,
    Grafico02Component,
    Grafico03Component,
    Grafico04Component
  ],
  bootstrap: [AppComponent],
  providers: [ProductoService, TiendaService, MessageService, {provide:
    APP_BASE_HREF, useValue: '/tienda'}]
})
export class AppModule {}

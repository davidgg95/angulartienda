import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-grafico02',
  templateUrl: './grafico02.component.html',
  styleUrls: ['./grafico02.component.css']
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  productos: Producto[];
  productosApi = null;
  productoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Gráfico de Lineas',
      
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Cantidad',
      }
    },
    colors: ['#FF0400'],
    xAxis: {
      accessibility: {},
      title: {
        text: 'Productos'
      }
    },
    series: [
      {
        type: 'area',
        data: [],
        name: 'Cantidad',
        lineColor: '#FF0400'
      }
    ],

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      backgroundColor: '#FF04'
    }
  };
  

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.productoService.getProductosApi().subscribe(
      result => {
        const misDatos: Array<Producto> = [];
        let api = null;
        api = result;
        for (let x of api) {
          let p = new Producto(
            x._id,
            x._nombre,
            x._precio,
            x._cantidad,
            x._entrada,
            x._tienda
          );
          misDatos.push(p);
        }
        const dataSeries = misDatos.map((x: Producto) => x._cantidad);
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico02', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}

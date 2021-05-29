import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { ProductoService } from "../producto.service";
import { Producto } from "../producto";

@Component({
  selector: 'app-grafico04',
  templateUrl: './grafico04.component.html',
  styleUrls: ['./grafico04.component.css']
})
export class Grafico04Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  productos: Producto[];
  productosApi = null;
  productoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Pedido Nº1',
      style: {
        color: '#'
      }
    },
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Productos'
      }
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Precios'
      }
    },

    series: [
      {
        type: 'column',
        data: [],
        name: 'Precio'
      }
    ],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    }
  };

  constructor(private productoService: ProductoService) { }

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
        const dataSeries = misDatos.map((x: Producto) => x.pedido1());
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico04", this.chartOptions);
      },
      error => console.log(error)
    );
  }

}
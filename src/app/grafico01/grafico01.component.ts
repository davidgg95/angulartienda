import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-grafico01',
  templateUrl: './grafico01.component.html',
  styleUrls: ['./grafico01.component.css']
})
export class Grafico01Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  productos: Producto[];
  productosApi = null;
  productoTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Gráfico de Barras',
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
        name: 'Precio en € (sin IVA)'
      },
      {
        type: "column",
        data: [],
        name: "Precio en € (IVA)"
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
        const dataSeries = misDatos.map((x: Producto) => x._precio);
        const dataSeries1 = misDatos.map((x: Producto) => x.iva());
        const dataCategorias = misDatos.map((x: Producto) => x._nombre);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.series[1]['data'] = dataSeries1;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico01', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}

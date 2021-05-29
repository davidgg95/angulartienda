import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Tienda } from '../tienda';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-grafico03',
  templateUrl: './grafico03.component.html',
  styleUrls: ['./grafico03.component.css']
})
export class Grafico03Component implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    tienda: Tienda;
    tiendaApi = null;


   chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Gráfico de Pastel"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    

    series: [
      {
        type: "pie",
        data: []
      }
    ]
  };

  constructor(
    private tiendaService: TiendaService,
  ) { }

   ngOnInit() {
    this.getTienda();
  }

  getTienda(): void {
     this.tiendaService.getTiendasApi().subscribe(
      result => {
        const misDatos: Array<Tienda> = [];
        let api = null;
        api = result;
        for (let x of api) {
          let p = new Tienda(
          x._id,
          x._nombre,
          x._provincia,
          x._direccion,
          x._ingresos,
          x._productos
          );
          misDatos.push(p);
        }
        type tDoc = {
        name: string;
        y: number;
      };
        let ingreso: Array<tDoc> = new Array();
        for (let x of api) {
        let a: tDoc = {
          y: x._ingresos,
          name: x._nombre,
          
        };
        ingreso.push(a);
      }

        this.chartOptions.series[0]["data"] = ingreso;
         this.chartOptions.series[0]["name"] = "Ingresos";
        Highcharts.chart("miGrafico03", this.chartOptions);
     
    });
  }

}
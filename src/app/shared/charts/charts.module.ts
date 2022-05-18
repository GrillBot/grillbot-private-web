import { LineChartComponent } from './line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    imports: [
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    declarations: [
        LineChartComponent
    ],
    exports: [
        LineChartComponent
    ]
})
export class ChartsModule { }

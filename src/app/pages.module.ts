import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { pages_routes } from './pages/pages.routes';
import { FormsModule } from "@angular/forms";
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        pages_routes,
        FormsModule,
        ChartsModule,
    ]
})

export class PagesModule{
    
}
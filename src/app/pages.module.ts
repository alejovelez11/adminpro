import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { pages_routes } from './pages/pages.routes';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        pages_routes
    ]
})

export class PagesModule{
    
}
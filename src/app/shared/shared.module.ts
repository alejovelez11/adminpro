import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
// el CommonModule es todas la directivas de angular
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        PipesModule
    ]
})

export class SharedModule{
    
}
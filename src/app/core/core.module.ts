import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    providers: [],
})
export class CoreModule { }

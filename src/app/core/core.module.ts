import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        CommonModule,
        RouterModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    providers: [],
})
export class CoreModule { }

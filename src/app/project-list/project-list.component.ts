import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';

import { ProjectItemService } from './project-item.service';

@Component({
    selector: 'app-project-list',
    templateUrl: 'project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    providers: [ ProjectItemService ]
})

export class ProjectListComponent {
    constructor(public projectItemService: ProjectItemService) { }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatCardModule],
    exports: [ProjectListComponent],
    declarations: [ProjectListComponent],
  })
  export class ProjectListModule {}

import { Component, OnInit, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html'
})

export class EditCollectionComponent implements OnInit {
    id: string;

    constructor(private route: ActivatedRoute, public router: Router) {
        route.params.subscribe(p => {
            this.id = p.id;
        });
    }

    ngOnInit() { }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule],
    exports: [EditCollectionComponent],
    declarations: [EditCollectionComponent],
  })
  export class EditCollectionModule {}

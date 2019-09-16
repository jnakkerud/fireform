import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html'
})

export class EditCollectionComponent {
    id: string;

    constructor(private route: ActivatedRoute) {
        route.params.subscribe(p => {
            this.id = p.id;
        });
    }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule],
    exports: [EditCollectionComponent],
    declarations: [EditCollectionComponent],
  })
  export class EditCollectionModule {}

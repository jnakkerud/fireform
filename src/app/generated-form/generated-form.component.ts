import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormService } from '../dynamic-form/services/dynamic-form.service';
import { DynamicFormModel } from '../dynamic-form/models/dynamic-form.model';
import { DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { LinkService, Link } from '../core/link-service/link.service';
import { DataService } from '../core/data-service/data.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generated-form',
    templateUrl: 'generated-form.component.html',
    styleUrls: ['./generated-form.component.scss']
})

export class GeneratedFormComponent implements OnInit {

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    collectionItem: CollectionItem;
    link: Link;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dynamicFormService: DynamicFormService,
        private collectionService: CollectionService,
        private linkService: LinkService,
        private dataService: DataService
    ) {
        this.route.params.subscribe(p => {
            this.link = this.linkService.getLink(p.id);
            this.collectionItem = this.collectionService.getItem(this.link.collectionId);
        });
    }

    ngOnInit() {
        this.createForm();
    }

    async createForm() {
        this.formModel = await this.getFormMetadata(this.collectionItem);
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    onSubmit() {
        // save the document to the collection
        this.dataService.add(this.formGroup.value);

        // forward to completed form
        this.router.navigate(['/formcomplete', this.link.id]);
    }

    public isValid() {
        let valid = true;

        if (this.formGroup) {
            valid = this.formGroup.valid;
        }

        return valid;
    }

    getFormMetadata(item: CollectionItem): Promise<DynamicFormControlModel[]> {
        return Promise.resolve(JSON.parse(item.form));
    }
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-complete',
    template: `
    <mat-card>
    <mat-card-title>{{title}}</mat-card-title>
    <mat-card-content>
        <p>Your response has been saved</p>
        <a href="{{url}}">Submit another response</a>
    </mat-card-content>
    </mat-card>
    `
})
export class FormCompleteComponent {
    title = 'Success';
    url = '';

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(p => {
            this.url = `${window.location.origin}/forms/${p.id}`;
            // TODO get and show the collection title
        });
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        RouterModule,
        ReactiveFormsModule,
        DynamicFormModule,
        CommonModule],
    exports: [GeneratedFormComponent, FormCompleteComponent],
    declarations: [GeneratedFormComponent, FormCompleteComponent],
  })
export class GeneratedFormModule {}

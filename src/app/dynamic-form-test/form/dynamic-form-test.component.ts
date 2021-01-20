import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DYNAMIC_FORM_WRAPPER_CONFIG, DynamicFormWrapperConfig } from 'src/app/dynamic-form-wrapper/dynamic-form-wrapper-config';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-form-test',
    templateUrl: 'dynamic-form-test.component.html'
})
export class DynamicFormTestComponent {

    collection: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        @Inject(DYNAMIC_FORM_WRAPPER_CONFIG) public config: DynamicFormWrapperConfig
    ) {
        this.route.params.subscribe(p => {
            if (p.id === 'create') {
                this.collection = config.collectionPath; 
            } else {
                this.collection = `${config.collectionPath}/${p.id}`
            }            
        }); 
    }

    afterSubmit() {
        // return to table
        this.router.navigate(['/test-table']);
    }
}


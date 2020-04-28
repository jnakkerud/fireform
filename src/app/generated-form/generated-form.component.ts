import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { tap, concatMap } from 'rxjs/operators';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormService } from '../dynamic-form/services/dynamic-form.service';
import { DynamicFormModel } from '../dynamic-form/models/dynamic-form.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { LinkService, Link } from '../core/link-service/link.service';
import { DataService } from '../core/data-service/data.service';
import { AuthService } from '../core/auth/auth.service';
import { TrackingUserService, TrackingUser} from '../core/tracking-user-service/tracking-user.service';

function getUserToken() {
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('token')) {
            // and decode it
            return decodeURI(urlParams.get('token'));
        }
    }
    return null;
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generated-form',
    templateUrl: 'generated-form.component.html',
    styleUrls: ['./generated-form.component.scss']
})

export class GeneratedFormComponent implements OnInit {

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    collectionItem: CollectionItem = {id: '', name: ''};
    link: Link;
    trackingUser: TrackingUser;
    token: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dynamicFormService: DynamicFormService,
        private collectionService: CollectionService,
        private linkService: LinkService,
        private dataService: DataService,
        private authService: AuthService,
        private trackingUserService: TrackingUserService
    ) {}

    ngOnInit() {
        this.authService.authenticate().then(valid => {
            if (valid) {
                this.loadFormMetaData();
            } else {
                console.log('anonymous login error');
            }
        });
    }

    loadFormMetaData() {
        this.route.params.subscribe(p => {
            this.linkService.getLink(p.id).pipe(
                tap(l => this.link = l),
                concatMap(l => this.collectionService.getItem(l.collectionId))
            ).subscribe(res => {
                this.collectionItem = res;
                this.setupForm();
            });
        });
    }

    async setupForm() {
        // detect the tracking user
        if (this.collectionItem.trackResponses) {
            this.trackingUser = await this.getTrackingUser();
        }
        const canCreate = await this.canCreateForm();
        if (canCreate) {
            this.createForm();
            // update the tracking user
            this.updateTrackingUser();
        } else {
            // TODO show the error/warning page
        }
    }

    createForm() {
        this.formModel = this.dynamicFormService.fromJSON(this.collectionItem.form);
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    getTrackingUser(): Promise<TrackingUser>  {
        return new Promise<TrackingUser>(resolve  => {
            // look for the token in the url
            this.token = getUserToken();

            // lookup the user, if not found return a anon user
            this.trackingUserService.lookupTrackingUserByToken(this.collectionItem, this.token).then(result => {
                resolve(result);
            });
        });
    }

    updateTrackingUser() {
        if (this.trackingUser) {
            if (!this.trackingUser.collectionId) {
                this.trackingUser.collectionId = this.collectionItem.id;
            }
            this.trackingUserService.upsert(this.token, this.trackingUser);
        }
    }

    canCreateForm(): Promise<boolean> {
        // allow multiple responses ? then create the form
        // TODO look for an existing response, if existing then show 'response already submitted'
        const allowMultiple = this.collectionItem.allowMultiple;
        if (!allowMultiple) {
            // this.dataService.get(trackingUser.email?);
        }
        return Promise.resolve(true);
    }

    onSubmit() {
        // TODO add the user  to the data, if tracking is on

        // save the document to the collection
        this.dataService.add(this.collectionItem, this.formGroup.value);

        // forward to completed form
        this.router.navigate(['/formcomplete', this.collectionItem.id]);
    }

    public isValid() {
        let valid = true;

        if (this.formGroup) {
            valid = this.formGroup.valid;
        }

        return valid;
    }

}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-complete',
    template: `
    <mat-card style="text-align: center;">
    <mat-card-title>{{title}}</mat-card-title>
    <mat-card-content>
        <div>
        <p>Your response has been saved</p>
        <p>
            <a href="{{url}}">Submit another response</a>
        </p>
        </div>
    </mat-card-content>
    </mat-card>
    `,
    styles:
    [':host {display: flex;justify-content: center;margin: 100px 0px;}']
})
export class FormCompleteComponent {
    title = '';
    url = '';

    constructor(private route: ActivatedRoute, private collectionService: CollectionService) {
        this.route.params.subscribe(p => {
            this.collectionService.getItem(p.id).subscribe(item => {
                this.title = item.name;
                this.url = `${window.location.origin}/form/${item.activeLink}`;
            });
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

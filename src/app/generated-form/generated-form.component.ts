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

export enum RESPONSE_STATUS {
    SUCCESS,
    ALREADY_RESPONDED,
    ERROR
}

function getTrackingIdFromUrl() {
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('t')) {
            // and decode it
            return decodeURI(urlParams.get('t'));
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
    trackingId: string;

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
                this.collectionItem = {...{allowMultiple: true}, ...res};
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
        } else {
            // Show the error/warning page
            this.router.navigate(['/formcomplete', this.collectionItem.id], {queryParams: {s: RESPONSE_STATUS.ALREADY_RESPONDED}});
        }
    }

    createForm() {
        this.formModel = this.dynamicFormService.fromJSON(this.collectionItem.form);
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    getTrackingUser(): Promise<TrackingUser>  {
        this.trackingId = getTrackingIdFromUrl();
        return this.trackingUserService.lookupTrackingUserById(this.collectionItem, this.trackingId);
    }

    updateTrackingUser() {
        if (this.trackingUser) {
            if (!this.trackingUser.collectionId) {
                this.trackingUser.collectionId = this.collectionItem.id;
            }
            this.trackingUserService.upsert(this.trackingUser, this.trackingId);
        }
    }

    canCreateForm(): Promise<boolean> {
        // allow multiple responses ? then create the form
        if (!this.collectionItem.allowMultiple) {
            // look for an existing response by the tracking user, if existing then show 'response already submitted'
            return new Promise<boolean>(resolve => {
                this.dataService.queryByTrackingUser(this.collectionItem, this.trackingUser.email || this.trackingId).then(data => {
                    resolve(!data);
                });
            });
        }
        return Promise.resolve(true);
    }

    onSubmit() {
        let data = this.formGroup.value;

        // add the user  to the data, if tracking is on
        if (this.trackingUser) {
            const user = {tracking_user: this.trackingUser.email || this.trackingId};
            data = {...user, ...data};
        }

        // save the document to the collection
        this.dataService.add(this.collectionItem, data);

        // update the tracking user for only single responses
        if (!this.collectionItem.allowMultiple) {
            this.updateTrackingUser();
        }

        // forward to completed form
        this.router.navigate(['/formcomplete', this.collectionItem.id], {queryParams: {s: RESPONSE_STATUS.SUCCESS}});
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
    <div class="card-container">
        <ng-container *ngIf="item">
            <mat-card style="text-align: center;">
            <mat-card-title>{{item.name}}</mat-card-title>
            <mat-card-content>
                <div>
                <h3 [ngStyle] = "{'color': messageColor}">{{message}}</h3>
                <ng-container *ngIf="url">
                    <p>
                        <a href="{{url}}">Submit another response</a>
                    </p>
                </ng-container>
                </div>
            </mat-card-content>
            </mat-card>
        </ng-container>
    </div>
    `,
    styles:
    [':host {display: flex;justify-content: center; height: 100vh; background-color: #ECEFF1;}',
    '.card-container {margin: 104px 0px;}'
    ]
})
export class FormCompleteComponent {
    item: CollectionItem;
    url: string;
    message = '';
    messageColor = 'black';

    constructor(private route: ActivatedRoute, private collectionService: CollectionService) {
        this.route.params.subscribe(p => {
            this.collectionService.getItem(p.id).then(item => {
                this.item = item;
                this.url = item?.allowMultiple === false ? null : `${window.location.origin}/form/${item.activeLink}`;
                const s = this.route.snapshot.queryParamMap.get('s');
                if (s) {
                    const status = +s;
                    switch (status) {
                        case RESPONSE_STATUS.SUCCESS:
                            this.message = 'Your response has been saved';
                            break;
                        case RESPONSE_STATUS.ALREADY_RESPONDED:
                            this.message = 'You have already submitted a response';
                            this.messageColor = 'red';
                            break;
                        case RESPONSE_STATUS.ERROR:
                            this.message = 'Error: unable to proceed';
                            this.messageColor = 'red';
                    }
                }
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

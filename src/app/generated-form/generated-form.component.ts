import { Component, OnInit, NgModule, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { tap, concatMap } from 'rxjs/operators';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormLibModule, DynamicFormModel, DynamicFormService } from 'dynamic-form-lib';
import { ConvertorsMap } from '../core/data-service/convertors';
import { ConvertorFactoryService } from '../dynamic-form-wrapper/convertor-factory.service';
import { DynamicFormWrapperModule } from '../dynamic-form-wrapper/dynamic-form-wrapper.module';
import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { LinkService, Link } from '../core/link-service/link.service';
import { DataService, totalGrade } from '../core/data-service/data.service';
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
interface ResultParam {
    s: number;
    g?: number;
}
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generated-form',
    templateUrl: 'generated-form.component.html',
    styleUrls: ['./generated-form.component.scss']
})
export class GeneratedFormComponent implements OnInit, OnDestroy {

    public formGroup: UntypedFormGroup;
    public formModel: DynamicFormModel;

    collectionItem: CollectionItem = {id: '', name: ''};
    link: Link;
    trackingUser: TrackingUser;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dynamicFormService: DynamicFormService,
        private convertorFactory: ConvertorFactoryService,
        private collectionService: CollectionService,
        private linkService: LinkService,
        private dataService: DataService,
        private authService: AuthService,
        private trackingUserService: TrackingUserService,
        @Inject(DOCUMENT) private document?: any
    ) {}

    ngOnInit() {
        this.document.body.classList.add('body-background-color');
        this.authService.authenticate().then(valid => {
            if (valid) {
                this.loadFormMetaData();
            } else {
                console.log('anonymous login error');
            }
        });
    }

    ngOnDestroy(): void {
        this.document.body.classList.remove('body-background-color');
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
            // if a tracking user is not found in the db, then an anonymous tracking user will be returned with a fingerprint id
            this.trackingUser = await this.trackingUserService.lookupTrackingUserById(this.collectionItem, getTrackingIdFromUrl());
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

    updateTrackingUser() {
        if (this.trackingUser && this.trackingUser.isRegistered) {
            if (!this.trackingUser.collectionId) {
                this.trackingUser.collectionId = this.collectionItem.id;
            }
            this.trackingUserService.upsert(this.trackingUser, this.trackingUser.id);
        }
    }

    canCreateForm(): Promise<boolean> {
        if (!this.collectionItem.allowMultiple) {
            // look for an existing response by the tracking user, if existing then show 'response already submitted'
            return new Promise<boolean>(resolve => {
                this.dataService.queryByTrackingUser(this.collectionItem, this.trackingUser.id).then(data => {
                    resolve(!data);
                });
            });
        }
        return Promise.resolve(true);
    }

    async onSubmit() {
        let data = this.formGroup.value;

        // add the user  to the data, if tracking is on
        if (this.trackingUser) {
            const user = {tracking_user_id: this.trackingUser.id, tracking_user_email: this.trackingUser.email || 'anonymous'};
            data = {...user, ...data};
        }

        // save the document to the collection
        const result = await this.dataService.add(this.collectionItem, data, this.getConvertors());

        // update the tracking user for only single responses
        if (!this.collectionItem.allowMultiple) {
            this.updateTrackingUser();
        }

        const params: ResultParam = {s: RESPONSE_STATUS.SUCCESS};
        if (result.grade) {
            params.g = result.grade;
        }

        // forward to completed form
        this.router.navigate(['/formcomplete', this.collectionItem.id], {queryParams: params});
    }

    public isValid() {
        let valid = true;

        if (this.formGroup) {
            valid = this.formGroup.valid;
        }

        return valid;
    }

    private getConvertors(): ConvertorsMap | undefined {
        const cv = this.convertorFactory.getConvertors(this.formModel);
        return cv.size > 0 ? cv : undefined;
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
                <ng-container *ngIf="scoreMessage">
                    <h4>{{scoreMessage}}</h4>
                </ng-container>
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

    scoreMessage: string;

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
                const g = this.route.snapshot.queryParamMap.get('g');
                if (g) {
                    totalGrade(item.gradeResponse).subscribe(total => {
                        this.scoreMessage = `You scored ${g} out of ${total} points`;
                    });
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
        DynamicFormLibModule,
        DynamicFormWrapperModule,
        CommonModule],
    exports: [GeneratedFormComponent, FormCompleteComponent],
    declarations: [GeneratedFormComponent, FormCompleteComponent],
  })
export class GeneratedFormModule {}

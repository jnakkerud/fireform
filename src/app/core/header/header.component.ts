import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Overlay, OverlayRef, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { CollectionItem } from '../collection-service/collection.service';
import { RecentlyUsedService } from '../recently-used-service/recently-used.service';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    selected: string;
    activeUrl: string;
    showSelect: boolean;
    recentlyUsedItems: Observable<CollectionItem[]>;

    @ViewChild(CdkOverlayOrigin) overlayOrigin: CdkOverlayOrigin;
    @ViewChild('overlay') overlayTemplate: TemplateRef<any>;

    overlayRef: OverlayRef | null;
    private popupCloseSubscription = Subscription.EMPTY;
    userEmail: string;

    constructor(
        public overlay: Overlay, public viewContainerRef: ViewContainerRef,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private authService: AuthService,
        private recentlyUsedService: RecentlyUsedService) { }

    ngOnInit() {
        // Detect global router changes and set drop down if needed
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                let active = this.route;
                while (active.firstChild) { active = active.firstChild; }
                this.handleParam(active.snapshot.params.id);
                this.activeUrl = active.snapshot.url.join('');
            });
    }

    private handleParam(id: string) {
        this.showSelect = false;
        if (id && id !== 'create') {
            this.showSelect = true;
            if (!this.recentlyUsedItems) {
                this.recentlyUsedItems = this.recentlyUsedService.get();
            }

            this.selected = id;
        }
    }

    onSelectChange() {
        if (this.selected === 'all') {
            this.router.navigate(['/']);
        } else if (this.selected === 'create') {
            this.router.navigate(['/collections/create'], {queryParams: {returnUrl: this.activeUrl}});
        } else {
            this.router.navigate(['/collections', this.selected]);
        }
    }

    openUserPanel() {
        this.userService.getCurrentUser().subscribe(user => {
            if (user) {
                // console.log('panel opened: ' + JSON.stringify(user));
                this.userEmail = user.email;
                this.createUserPanel();
            } else {
                this.userEmail = null;
                console.log('no user');
            }
        });
    }

    createUserPanel() {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.overlayOrigin.elementRef)
            .withFlexibleDimensions(true)
            .withPush(true)
            .withViewportMargin(10)
            .withGrowAfterOpen(true)
            .withPositions([{
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            }
            ]);

        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            minWidth: 200,
            minHeight: 50
        });

        this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.viewContainerRef));

        this.popupCloseSubscription = this.overlayRef.backdropClick().subscribe(() => this.destroyUserPopup());
    }

    logout() {
        this.destroyUserPopup();
        this.authService.doLogout().then(() => this.router.navigate(['login']) );
    }

    private destroyUserPopup() {
        if (!this.overlayRef) {
            return;
        }

        this.popupCloseSubscription.unsubscribe();
        this.overlayRef.detach();
    }
}

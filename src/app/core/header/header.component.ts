import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';

import { filter } from 'rxjs/operators';

import { CollectionItem } from '../collection-service/collection.service';
import { RecentlyUsedService } from '../recently-used-service/recently-used.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    selected: string;
    showSelect: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private rencentlyUsedService: RecentlyUsedService) {
    }

    ngOnInit() {
        // Detect global router changes and set drop down if needed
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                let active = this.route;
                while (active.firstChild) { active = active.firstChild; }
                active.params.subscribe((params: Params) => {
                    this.handleParam(params.id);
                });
            });
    }

    private handleParam(id: string) {
        this.showSelect = false;
        if (id && id !== 'create') {
            this.showSelect = true;
            this.selected = id;
            // TODO make sure id is in recently selected
        }
    }

    onSelectChange() {
        if (this.selected === 'all') {
            this.router.navigate(['/']);
        } else if (this.selected === 'create') {
            this.router.navigate(['/createCollection']);
        } else {
            this.router.navigate(['/collections', this.selected]);
        }
    }

    getRecentlyUsedItems(): CollectionItem[] {
        return this.rencentlyUsedService.get();
    }
}

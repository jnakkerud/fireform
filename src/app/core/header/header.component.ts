import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    selected: string;
    showSelect: boolean;

    constructor(private router: Router, private route: ActivatedRoute) {
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
}

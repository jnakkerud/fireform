import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    constructor(private router: Router) { }

    // TODO detect initial Router state and set drop down
    selected = '2';

    onSelectChange() {
        if (this.selected === 'all') {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/collections', this.selected]);
        }
    }
}

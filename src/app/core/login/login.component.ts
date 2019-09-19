import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {  AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    return = '';

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    @Input() error: string | null;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        // Get the query params
        this.route.queryParams
          .subscribe(params => this.return = params.return || '/collections');
      }

    submit() {
        if (this.form.valid) {
            if (!this.authService.authenticate(this.form.value)) {
                this.error = 'Invalid username or password';
            }
            this.router.navigateByUrl(this.return);
        }
    }
}

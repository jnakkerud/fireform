import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';

import { AngularMaterialModule } from '../angular-material.module';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    return = '';

    form: UntypedFormGroup = new UntypedFormGroup({
        username: new UntypedFormControl(''),
        password: new UntypedFormControl(''),
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

            this.authService.authenticate(this.form.value).then(valid => {
                if (!valid) {
                    this.error = 'Invalid username or password';
                }
                this.router.navigateByUrl(this.return);
            });

        }
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
  })
export class LoginModule {}
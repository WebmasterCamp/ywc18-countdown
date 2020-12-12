import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, CODE } from 'src/app/services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-signin-card',
  templateUrl: './admin-signin-card.component.html',
  styleUrls: ['./admin-signin-card.component.scss']
})
export class AdminSigninCardComponent implements OnInit {
  signInForm: FormGroup;
  signingIn = false;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  signIn({ email, password }) {
    this.signingIn = true;
    this.signInForm.disable();
    const signingInSnack = this.snackBar.open('Signing in...');
    this.auth
      .signIn(email, password)
      .pipe(
        catchError(error => {
          if (error.code === CODE.USER_NOT_FOUND) {
            // signingInSnack.dismiss();
            const creatingSnack = this.snackBar.open(
              'User not found, creating new user...'
            );
            return this.auth.create(email, password).pipe(
              map(user => {
                creatingSnack.dismiss();
                return user;
              })
            );
          }
          throw error;
        })
      )
      .subscribe({
        error: error => {
          signingInSnack.dismiss();
          this.signingIn = false;
          this.signInForm.enable();
          this.snackBar.open(error.toString(), '', {
            duration: 3000
          });
        },
        complete: () => {
          this.signingIn = false;
          this.signInForm.enable();
          signingInSnack.dismiss();
        }
      });
  }
}

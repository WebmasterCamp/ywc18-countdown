import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  checkingPermission = false;
  permission = false;
  user: firebase.User;

  constructor(private auth: AuthService, private db: AngularFirestore) {}

  ngOnInit() {
    this.checkingPermission = true;
    this.authSubscription = this.auth.user
      .pipe(
        flatMap(user => {
          this.user = user;
          if (user && user.uid) {
            this.checkingPermission = true;
            return this.auth.isAdmin(user.uid);
          }
          return of(null);
        })
      )
      .subscribe({
        next: isAdmin => {
          this.checkingPermission = false;
          this.permission = isAdmin;
        },
        error: () => {
          this.checkingPermission = false;
        }
      });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  signOut() {
    this.auth.signOut();
  }
}

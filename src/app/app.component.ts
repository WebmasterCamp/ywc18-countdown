import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) {}
  ngOnInit() {
    this.afAuth.auth.setPersistence('session');
  }
}

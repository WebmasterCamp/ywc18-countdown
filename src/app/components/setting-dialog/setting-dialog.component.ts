import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { CountdownConfig } from '../../type';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent implements OnInit {
  timeControl = new FormControl('10:00');
  password = '';

  constructor(
    public dialogRef: MatDialogRef<SettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFirestore
  ) {}

  ngOnInit() {}

  updateCountdown() {
    const [hour, minute] = this.timeControl.value.split(':');
    const until = new Date();
    until.setHours(until.getHours() + Number(hour));
    until.setMinutes(until.getMinutes() + Number(minute));
    return this.db.doc('config/countdown').set({ until }, { merge: true });
  }
  alertWrongPassword() {
    alert('Invalid password');
    this.password = '';
    return null;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOk(event: any) {
    event.preventDefault();
    this.db
      .doc<CountdownConfig>('config/countdown')
      .get()
      .pipe(
        map(snapshot => snapshot.data() as CountdownConfig),
        map(({ password }) => password && password === this.password),
        flatMap(pass =>
          pass ? this.updateCountdown() : this.alertWrongPassword()
        )
      )
      .subscribe({
        complete: () => {
          this.onNoClick();
        },
        error: error => {
          console.error(error);
          this.onNoClick();
        }
      });
  }
}

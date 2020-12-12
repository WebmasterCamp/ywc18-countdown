import { CountdownService } from '../../../services/countdown.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-action-card',
  templateUrl: './admin-action-card.component.html',
  styleUrls: ['./admin-action-card.component.scss']
})
export class AdminActionCardComponent implements OnInit {
  timeHourControl = new FormControl(10);
  timeMinuteControl = new FormControl(0);
  endHrsControl = new FormControl();
  endDateControl = new FormControl();
  textControl = new FormControl('');
  showingControl = new FormControl('');
  constructor(
    private db: AngularFirestore,
    private countdown: CountdownService
  ) {}

  ngOnInit() {
    this.countdown.config.subscribe({
      next: config => {
        const endMoment = moment(config.until.toDate());
        this.endDateControl.setValue(endMoment, { emitEvent: true });
        this.endHrsControl.setValue(endMoment.format('hh:mm'), {
          emitEvent: true
        });
        this.showingControl.setValue(config.showing, { emitEvent: true });
        this.textControl.setValue(config.text, { emitEvent: true });
      }
    });
    this.showingControl.valueChanges.subscribe(showing =>
      this.handleShowingChange(showing)
    );
  }
  updateCountdown() {
    const hour = this.timeHourControl.value;
    const minute = this.timeMinuteControl.value;
    const until = new Date();
    until.setHours(until.getHours() + Number(hour));
    until.setMinutes(until.getMinutes() + Number(minute));
    return this.countdown.update({ until });
  }
  updateCountdownWithDateTime() {
    const until = this.endDateControl.value.toDate();
    const [hour, minute] = this.endHrsControl.value.split(':');
    until.setHours(Number(hour), Number(minute), 0, 0);
    this.countdown.update({ until });
  }
  updateText() {
    const text = this.textControl.value;
    return this.countdown.update({ text });
  }
  handleShowingChange(showing) {
    return this.countdown.update({ showing });
  }
}

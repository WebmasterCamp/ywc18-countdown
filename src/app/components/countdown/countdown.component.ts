import { CountdownService } from './../../services/countdown.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap, startWith } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';

const fillZero = (input: number, n: number) =>
  (input / 10 ** n).toFixed(n).split('.')[1];

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdownSubscription: Subscription;
  isEnd: boolean;
  text: string;
  showText: boolean;
  timeLetters: string[];

  isLiveMode: boolean

  constructor(private countdown: CountdownService) {}

  ngOnInit() {
    this.countdownSubscription = this.countdown.config
      .pipe(
        map(config => {
          this.text = config.text;
          this.showText = config.showing === 'text';
          return config;
        }),
        map(config => config.until.toDate()),
        switchMap(date =>
          interval(19).pipe(
            map(() => this.getTimeDiff(date)),
            map(timeDiff => this.formatTime(timeDiff))
          )
        ),
        map(time => (this.isEnd ? '00:00:00' : time)),
        startWith('LOADING..')
      )
      .subscribe({
        next: letters => {
          this.timeLetters = letters.split('');
        }
      });
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }

  toggleLiveMode() {
    // Config for live
    this.isLiveMode = !this.isLiveMode
  }

  getTimeDiff(date: Date) {
    const timeDiff = date.getTime() - new Date().getTime();
    if (timeDiff > 0) {
      this.isEnd = false;
      return timeDiff;
    }
    this.isEnd = true;
    return 0;
  }

  formatTime(timeDiff: number) {
    const hour = Math.floor(timeDiff / (60 * 60 * 1000));
    const minute = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
    const second = Math.floor((timeDiff % (60 * 1000)) / 1000);
    const millisecond = timeDiff % 1000;
    return `${fillZero(hour, 2)}:${fillZero(minute, 2)}:${fillZero(second, 2)}`;
    // return `${fillZero(hour, 2)}:${fillZero(minute, 2)}:${fillZero(
    //   second,
    //   2
    // )}.${fillZero(millisecond, 3)}`;
  }
}

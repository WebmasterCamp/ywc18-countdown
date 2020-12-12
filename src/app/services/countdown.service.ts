import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CountdownConfig } from '../type';
import { BehaviorSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  doc = this.db.doc<CountdownConfig>('config/countdown');
  private configSubject = new BehaviorSubject<CountdownConfig | null>(null);
  private configChanges = this.doc.valueChanges();
  constructor(private db: AngularFirestore) {
    this.configChanges.subscribe(config => this.configSubject.next(config));
  }
  update(data) {
    this.doc.set(data, { merge: true });
  }
  get config() {
    return this.configSubject.pipe(skipWhile(val => !val));
  }
}

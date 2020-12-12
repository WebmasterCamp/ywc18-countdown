export interface CountdownConfig {
  until: firebase.firestore.Timestamp;
  password: string;
  text: string;
  showing: string;
}

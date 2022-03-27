import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spiinerLoad = new BehaviorSubject<boolean>(false);
  currentSpinnerState = this.spiinerLoad.asObservable();
  constructor() {
    console.log('In Spinner Service : ');
  }

  changeSpinnerState(message: boolean) {
    this.spiinerLoad.next(message);
  }
}

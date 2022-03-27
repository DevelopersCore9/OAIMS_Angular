import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  spinShow: boolean = true;
  title = 'OAIMS';

  constructor(
    protected _spinner: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._spinner.currentSpinnerState.subscribe((res) => {
      console.log('Response of Spinner  1 ', res);
      setTimeout(() => {
        this.spinShow = res;
      }, 5000);
    });

    this.cdr.detectChanges();
  }

  overflowy() {
    return this.spinShow ? 'hidden' : '';
  }

  margin() {
    return this.spinShow ? '0' : '';
  }

  height() {
    return this.spinShow ? '100%' : '';
  }

  overflow() {
    return this.spinShow ? 'hidden' : '';
  }
}

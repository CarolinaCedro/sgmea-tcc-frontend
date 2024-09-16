import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Subject} from "rxjs/internal/Subject";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {takeUntil} from "rxjs/operators";
import {NgIf} from "@angular/common";
import {SgmeaLoadingService} from "../services/sgmea-loading.service";

@Component({
  selector: 'sgmea-loanding',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  exportAs     : 'sgmeaLoadingBar',
  imports: [
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './sgmea-loanding.component.html',
  styleUrl: './sgmea-loanding.component.scss'
})
export class SgmeaLoandingComponent implements OnChanges, OnInit, OnDestroy {

  @Input() autoMode: boolean = true;
  mode: 'determinate' | 'indeterminate';
  progress: number = 0;
  show: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _sgmeaLoadingService: SgmeaLoadingService) {
  }


  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Auto mode
    if ('autoMode' in changes) {
      // Set the auto mode in the service
      this._sgmeaLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
    }
  }


  ngOnInit(): void {
    // Subscribe to the service
    this._sgmeaLoadingService.mode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.mode = value;
      });

    this._sgmeaLoadingService.progress$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.progress = value;
      });

    this._sgmeaLoadingService.show$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.show = value;
      });

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

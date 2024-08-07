import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'sgmea-list',
  standalone: true,
  imports: [
    NgIf,
    AngularSvgIconModule,
  ],
  templateUrl: './sgmea-list.component.html',
  styleUrls: ['./sgmea-list.component.scss']
})
export class SgmeaListComponent {

  @Input() listTitle: string = "Seu título aqui";
  @Input() itensCount!: number;

  @ViewChild("tdSearchGtXs", { static: true })
  searchTerm: string = "";

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  private unsubscribes: Subject<void> = new Subject();

  constructor(private ref: ChangeDetectorRef, private router: Router, private activatedRoute: ActivatedRoute) {}

  newRecordOnClick(): void {
    this.router.navigate(["./new_record"], { relativeTo: this.activatedRoute });
  }
}

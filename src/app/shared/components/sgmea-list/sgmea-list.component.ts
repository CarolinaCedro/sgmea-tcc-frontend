import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ListResource} from "../../../modules/utis/http/model/list-resource.model";

@Component({
  selector: 'sgmea-list',
  standalone: true,
  imports: [
    NgIf,
    MatPaginatorModule,
  ],
  templateUrl: './sgmea-list.component.html',
  styleUrls: ['./sgmea-list.component.scss']
})
export class SgmeaListComponent implements OnInit {

  @Input() viewOnly: boolean = false

  @Input() listTitle: string = "Seu título aqui";
  @Input() itensCount!: number;

  @ViewChild("tdSearchGtXs", {static: true})
  searchTerm: string = "";

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  private unsubscribes: Subject<void> = new Subject();

  constructor(private ref: ChangeDetectorRef, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  newRecordOnClick(): void {
    this.router.navigate(["./new_record"], {relativeTo: this.activatedRoute});
  }

  ngOnInit() {
  }


}

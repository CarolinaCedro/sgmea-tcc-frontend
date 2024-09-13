import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

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
export class SgmeaListComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


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

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel="Itens por página ";
  }
}

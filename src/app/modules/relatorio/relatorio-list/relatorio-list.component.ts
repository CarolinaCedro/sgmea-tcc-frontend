import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {RelatorioFilter, RelatorioFilterComponent} from "../filter/relatorio-filter/relatorio-filter.component";
import {GestorFilterComponent} from "../../gestor/filter/gestor-filter/gestor-filter.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {PDFDocumentProxy, PdfViewerComponent, PdfViewerModule} from "ng2-pdf-viewer";
import {BehaviorSubject, distinctUntilChanged, Observable, of, skip, Subscription} from "rxjs";
import {Subject} from "rxjs/internal/Subject";
import {debounceTime, map, mergeMap, takeUntil, tap} from "rxjs/operators";
import {isEmpty, isEquals, isNotNullOrUndefined} from "../../utis/utils";
import {MatDialog} from "@angular/material/dialog";
import {Report} from "./Report";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {RelatorioService} from "../service/relatorio.service";
import {downloadFile} from "./downliad";
import printJS from "print-js";


// const printJS = require("print-js");


@Component({
  selector: 'app-relatorio-list',
  standalone: true,
  imports: [
    RelatorioFilterComponent,
    GestorFilterComponent,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    NgForOf,
    SgmeaContainerListComponent,
    SgmeaListComponent,
    SgmeaNoDataComponent,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    PdfViewerModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './relatorio-list.component.html',
  styleUrl: './relatorio-list.component.scss'
})
export class RelatorioListComponent implements OnInit, OnDestroy {

  private _snackBar = inject(MatSnackBar);


  localReport: Report;
  rotation: number = 0;
  page: number = 1;
  zoom: number = 0.65;
  originalSize: boolean = false;
  pdfQuery: string = "";
  private _subscription: Subscription = Subscription.EMPTY;
  pdfDocumentProxy: PDFDocumentProxy;
  private querySuject: Subject<string> = new BehaviorSubject("");
  private zoomSubject: Subject<number> = new BehaviorSubject(1.0);
  private unsubscribes: Subject<void> = new Subject();
  @ViewChild(PdfViewerComponent)
  private pdfViewerComponent: PdfViewerComponent;

  @Output()
  status: EventEmitter<"loading" | "loaded"> = new EventEmitter();

  @Input() component: any;

  @Input()
  set report(value: Observable<Report>) {
    this._subscription.unsubscribe();
    this.status.emit("loading");
    this._subscription = of(null)
      .pipe(
        tap(() => this.localReport = null
        ),
        mergeMap(() => value),
        map(report => {
          if (isNotNullOrUndefined(report)) {
            return report.generateLocalUrl();
          }
          return null;
        }),
        takeUntil(this.unsubscribes)
      ).subscribe(value => {
        this.page = 1;
        this.localReport = value;
        this.status.emit("loaded");
      }, (error) => {
        console.log("chegou no erro", error);
        this.localReport = null;
        this.status.emit("loaded");
        this.openSnackBar("Não foi possível carregar o PDF");
      });
  }

  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
              private reportService: RelatorioService) {
    this.form = formBuilder.group({
      search: [""],
      zoom: [0.95],
      page: [""]
    });
  }


  loadingReport(filter?: RelatorioFilter) {

    console.log("fffffffffff", filter)
    // Carrega o relatório como blob
    this.reportService.loadingReport(filter).subscribe(response => {
      if (response === null) {
        this.localReport = null
      }
      const blob = new Blob([response?.report], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      this.localReport = response;
      console.log(this.localReport?.getLocalUrl());
      // Gera o URL para o PDF
    }, error => {
      console.error('Erro ao carregar o relatório', error);
      this.openSnackBar("Não foi possível carregar o PDF");
    });
  }


  ngOnInit() {
    this.querySuject
      .pipe(
        skip(1),
        //debounceTime(600),
      ).subscribe(newQuery => {
      this.findNext(newQuery);
    });

    this.form.get("zoom").valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((a, b) => isEquals(a, b)),
        takeUntil(this.unsubscribes)
      ).subscribe(zoom => this.zoom = zoom);
  }

  afterLoadComplete(pdfDocumentProxy: PDFDocumentProxy) {
    this.pdfDocumentProxy = pdfDocumentProxy;

    if (isNotNullOrUndefined(this.pdfDocumentProxy)) {
      const pageControl = this.form.get("page");
      pageControl.patchValue(1, {emitEvent: false});
      if (this.pdfDocumentProxy.numPages === 1) {
        pageControl.disable({emitEvent: false});
      } else {
        pageControl.enable({emitEvent: false});
      }
    }
    //this.updateStyle();
  }

  rotate(angle: number): void {
    this.rotation += angle;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.querySuject.unsubscribe();
    this.zoomSubject.unsubscribe();
    if (this.reportIsLoaded()) {
      this.localReport.revolkerUrl();
    }
    this.unsubscribes.next();
  }

  reportIsLoaded(): boolean {
    return isNotNullOrUndefined(this.localReport);
  }

  incrementPage(value: number): void {
    this.page += value;
  }

  printReport(): void {
    printJS(this.localReport.getLocalUrl(), "pdf");
  }

  downloadReport(): void {
    downloadFile(this.localReport.report, this.localReport.fileName, this.localReport.getLocalUrl());

  }


  private findNext(newQuery) {
    console.log("caindo aqui simmm")
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
    } else {
      console.log("não achou findNext")
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Sair");
  }


}

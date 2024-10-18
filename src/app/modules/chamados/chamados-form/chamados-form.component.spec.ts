import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChamadosFormComponent } from './chamados-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelService } from "../../../core/abstract/service/model/model-service";
import { ChamadoCriado } from "../../../model/chamado-criado";
import { Model } from "../../utis/http/model/model";

describe('ChamadosFormComponent', () => {
  let component: ChamadosFormComponent;
  let fixture: ComponentFixture<ChamadosFormComponent>;

  let mockModelService: jasmine.SpyObj<ModelService<Model>>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // Mock do serviço ModelService
    mockModelService = jasmine.createSpyObj('ModelService', ['findByIdFully', 'save', 'update']);
    mockModelService.findByIdFully.and.returnValue(of({} as Model)); // Retorna um observable vazio
    mockModelService.save.and.returnValue(of({} as Model));
    mockModelService.update.and.returnValue(of({} as Model));

    // Mock do Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock do ActivatedRoute
    mockActivatedRoute = {
      params: of({ id: 'new_record' }), // Mocka um id como se fosse um novo registro
      snapshot: {
        queryParamMap: {
          get: () => ''
        }
      }
    };

    // Mock do MatSnackBar
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [ChamadosFormComponent], // Certifique-se de declarar o componente
      providers: [
        { provide: ModelService, useValue: mockModelService }, // Corrige o ModelService como mock
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChamadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should save a new record', () => {
    const testValue: ChamadoCriado = new ChamadoCriado();
    component.form.patchValue(testValue);

    component.save(testValue);

    expect(mockModelService.save).toHaveBeenCalledWith(testValue);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Registro salvo com sucesso!', 'Fechar', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
  });

  it('should update an existing record', () => {
    const testValue: ChamadoCriado = new ChamadoCriado();
    component.form.patchValue(testValue);

    component.save(testValue);

    expect(mockModelService.update).toHaveBeenCalledWith(testValue);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Registro salvo com sucesso!', 'Fechar', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
  });

  it('should load an existing record by ID', () => {
    const testValue: ChamadoCriado = new ChamadoCriado();
    mockModelService.findByIdFully.and.returnValue(of(testValue));

    component.loadById();

    expect(mockModelService.findByIdFully).toHaveBeenCalled();
    expect(component.value).toEqual(testValue);
  });

  it('should cancel the operation', () => {
    spyOn(component, 'returnList').and.callThrough();
    component.cancel();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Operação Cancelada!', 'Fechar', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['../'], { relativeTo: mockActivatedRoute });
  });
});

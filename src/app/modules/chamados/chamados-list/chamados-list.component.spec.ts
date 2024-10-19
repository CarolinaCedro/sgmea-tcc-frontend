import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ChamadoCriadoService } from '../service/chamado-criado.service';
import { ChamadoAtribuidoService } from '../../consolidacao/service/chamado-atribuido.service';
import { ChamadosListComponent } from './chamados-list.component';
import { ActivatedRoute } from '@angular/router';
import { ListResource } from '../../utis/http/model/list-resource.model';
import { ChamadoCriado } from "../../../model/chamado-criado";

fdescribe('ChamadosListComponent', () => { // Usando "fdescribe" aqui
  let component: ChamadosListComponent;
  let fixture: ComponentFixture<ChamadosListComponent>;

  // Mock services
  let mockChamadoCriadoService: jasmine.SpyObj<ChamadoCriadoService>;
  let mockChamadoAtribuidoService: jasmine.SpyObj<ChamadoAtribuidoService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockChamadoCriadoService = jasmine.createSpyObj('ChamadoCriadoService', ['listFully', 'listAdvanced']);
    mockChamadoAtribuidoService = jasmine.createSpyObj('ChamadoAtribuidoService', ['listFully']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ChamadosListComponent],
      providers: [
        { provide: ChamadoCriadoService, useValue: mockChamadoCriadoService },
        { provide: ChamadoAtribuidoService, useValue: mockChamadoAtribuidoService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChamadosListComponent);
    component = fixture.componentInstance;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should list chamados on init', () => {
    const mockChamadoList: ListResource<ChamadoCriado> = new ListResource<ChamadoCriado>();
    mockChamadoCriadoService.listFully.and.returnValue(of(mockChamadoList));
    // mockChamadoAtribuidoService.listFully.and.returnValue(of(mockChamadoList));

    component.ngOnInit();

    expect(mockChamadoCriadoService.listFully).toHaveBeenCalled();
    expect(mockChamadoAtribuidoService.listFully).toHaveBeenCalled();
  });

  // it('should call customList with filter', () => {
  //   const mockFilter = { someFilterField: 'value' };
  //   const mockResult = { records: [], count: 0 };
  //   mockChamadoCriadoService.listAdvanced.and.returnValue(of(mockResult));
  //
  //   component.customList(mockFilter);
  //
  //   expect(mockChamadoCriadoService.listAdvanced).toHaveBeenCalledWith(mockFilter);
  //   expect(component.values).toEqual(mockResult);
  // });
  //
  // it('should navigate to edit chamado', () => {
  //   const chamado = { id: 1 } as any;
  //   component.edit(chamado);
  //
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['../1'], { relativeTo: component.route });
  // });
});

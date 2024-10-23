import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';

import {DepartamentoFormComponent} from './departamento-form.component';
import {DepartamentoService} from '../service/departamento.service';
import {Departamento} from '../../../model/departamento';

fdescribe('DepartamentoFormComponent', () => {
  let component: DepartamentoFormComponent;
  let fixture: ComponentFixture<DepartamentoFormComponent>;
  let departamentoServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Mock do DepartamentoService
    departamentoServiceMock = {
      save: jasmine.createSpy('save').and.returnValue(of({})), // Simula o comportamento de sucesso
      update: jasmine.createSpy('update').and.returnValue(of({}))
    };

    // Mock do Router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    // Mock do ActivatedRoute
    activatedRouteMock = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para testar formulários
      declarations: [DepartamentoFormComponent],
      providers: [
        FormBuilder,
        {provide: DepartamentoService, useValue: departamentoServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if form is invalid', () => {
    // Simula o formulário inválido
    component.form.controls['nome'].setValue(''); // Campo obrigatório vazio
    spyOn(component, 'openSnackBar'); // Espionar o método openSnackBar

    component.save({} as Departamento);

    expect(component.openSnackBar).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios.');
    expect(departamentoServiceMock.save).not.toHaveBeenCalled(); // O serviço não deve ser chamado
    expect(departamentoServiceMock.update).not.toHaveBeenCalled();
  });

  it('should call save method from service if form is valid for new record', () => {
    // Simula um formulário válido e um novo registro
    component.form.controls['nome'].setValue('Departamento 1');
    spyOn(component, 'openSnackBar');

    const departamento: Departamento = new Departamento("1", "Departamento 1", "uma descricao")

    component.save(departamento);

    expect(departamentoServiceMock.save).toHaveBeenCalled();
    expect(component.openSnackBar).toHaveBeenCalledWith('Registro salvo com sucesso!');
  });

  it('should call update method from service if form is valid for existing record', () => {
    // Simula um formulário válido e um registro existente
    component.form.controls['nome'].setValue('Departamento 1');
    spyOn(component, 'openSnackBar');

    const departamento: Departamento = new Departamento("1", "Departamento 1", "uma descricao")


    component.save(departamento);

    expect(departamentoServiceMock.update).toHaveBeenCalled();
    expect(component.openSnackBar).toHaveBeenCalledWith('Registro salvo com sucesso!');
  });

  it('should handle error if service call fails', () => {
    // Simula erro no serviço
    departamentoServiceMock.save.and.returnValue(throwError({details: {message: 'Erro ao salvar'}}));
    component.form.controls['nome'].setValue('Departamento 1');
    spyOn(component, 'openSnackBar');


    const departamento: Departamento = new Departamento("1", "Departamento 1", "uma descricao")


    component.save(departamento);

    expect(component.openSnackBar).toHaveBeenCalledWith('Erro ao salvar');
  });
});

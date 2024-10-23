import 'reflect-metadata';
import { DepartamentoFormComponent } from "./departamento-form.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DepartamentoService } from "../service/departamento.service";
import { of } from 'rxjs';
import {Departamento} from "../../../model/departamento";
import {By} from "@angular/platform-browser";


class MockDepartamentoService {}


const mockRouter = {
  navigate: () => {}
};

const mockActivatedRoute = {
  params: of({ id: 1 })
};

fdescribe('DepartamentoFormComponent', () => {
  let component: DepartamentoFormComponent;
  let fixture: ComponentFixture<DepartamentoFormComponent>;
  let departamentoService: MockDepartamentoService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        DepartamentoFormComponent
      ],
      providers: [
        { provide: DepartamentoService, useClass: MockDepartamentoService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente DepartamentoFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método save quando o id estiver vazio', () => {
    const novoDepartamento = new Departamento('1', 'Novo Departamento', 'Descrição do novo departamento');
    component.form.setValue({ nome: novoDepartamento.nome, descricao: novoDepartamento.descricao, disponibilidade: false });
    component.save(novoDepartamento);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });


  it('deve exibir o rótulo do input "Nome do Departamento"', () => {
    const nomeLabel = fixture.debugElement.query(By.css('label[for="nome"]')).nativeElement;
    expect(nomeLabel.textContent).toContain('Nome do Departamento');
  });

  it('deve exibir o rótulo do input "Descrição"', () => {
    const descricaoLabel = fixture.debugElement.query(By.css('label[for="descricao"]')).nativeElement;
    expect(descricaoLabel.textContent).toContain('Descrição');
  });

  it('deve exibir a indicação de obrigatório para "Nome do Departamento"', () => {
    const nomeLabel = fixture.debugElement.query(By.css('label[for="nome"] i.text-red')).nativeElement;
    expect(nomeLabel).toBeTruthy();
  });

  it('deve deixar o formulário inválido quando os campos obrigatórios estiverem vazios', () => {
    component.form.controls['nome'].setValue('');
    component.form.controls['descricao'].setValue('');
    expect(component.form.invalid).toBeTruthy();
  });

  it('deve deixar o formulário válido quando todos os campos estiverem preenchidos', () => {
    component.form.controls['nome'].setValue('Departamento de TI');
    component.form.controls['descricao'].setValue('Descrição do departamento de TI');
    expect(component.form.valid).toBeTruthy();
  });


});

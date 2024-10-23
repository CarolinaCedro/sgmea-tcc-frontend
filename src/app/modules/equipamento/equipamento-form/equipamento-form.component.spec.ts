import 'reflect-metadata'; // Importa o reflect-metadata, se necessário
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { of } from 'rxjs';
import { By } from "@angular/platform-browser";
import { EquipamentoFormComponent } from "./equipamento-form.component";
import { EquipamentoService } from "../service/equipamento.service";
import { Equipamento } from "../../../model/equipamento"; // Importa para usar no mock do ActivatedRoute

// Mock do serviço EquipamentoService
class MockEquipamentoService {
}

// Mock do Router
const mockRouter = {
  navigate: () => {}
};

// Mock do ActivatedRoute
const mockActivatedRoute = {
  params: of({ id: 1 }) // Simula o parâmetro de rota id
};

describe('EquipamentoFormComponent', () => {
  let component: EquipamentoFormComponent;
  let fixture: ComponentFixture<EquipamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        EquipamentoFormComponent // Mova o componente para a matriz de imports
      ],
      providers: [
        { provide: EquipamentoService, useClass: MockEquipamentoService }, // Mock do serviço
        { provide: Router, useValue: mockRouter }, // Mock do Router
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Mock do ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipamentoFormComponent); // Cria a instância do componente
    component = fixture.componentInstance; // Acessa o componente
    fixture.detectChanges(); // Dispara a detecção de mudanças
  });

  it('deve criar o componente EquipamentoFormComponent', () => {
    expect(component).toBeTruthy(); // Verifica se o componente foi criado corretamente
  });



  it('deve exibir o rótulo do input "Nome do Equipamento"', () => {
    const nomeLabel = fixture.debugElement.query(By.css('label[for="nome"]')).nativeElement;
    expect(nomeLabel.textContent).toContain('Nome');
  });

  it('deve exibir o rótulo do input "Descrição"', () => {
    const descricaoLabel = fixture.debugElement.query(By.css('label[for="descricao"]')).nativeElement;
    expect(descricaoLabel.textContent).toContain('Descrição');
  });

  it('deve exibir a indicação de obrigatório para "Nome do Equipamento"', () => {
    const nomeLabel = fixture.debugElement.query(By.css('label[for="nome"] i.text-red')).nativeElement;
    expect(nomeLabel).toBeTruthy(); // Verifica se o ícone de campo obrigatório aparece
  });

  it('deve deixar o formulário inválido quando os campos obrigatórios estiverem vazios', () => {
    component.form.controls['nome'].setValue(''); // Define o valor vazio
    component.form.controls['descricao'].setValue(''); // Define o valor vazio
    expect(component.form.invalid).toBeTruthy(); // Verifica se o formulário está inválido
  });

  it('deve deixar o formulário válido quando todos os campos estiverem preenchidos', () => {
    component.form.controls['nome'].setValue('Departamento de TI');
    component.form.controls['descricao'].setValue('Descrição do departamento de TI');
    component.form.controls['fabricante'].setValue('Fabricante XYZ');
    component.form.controls['patrimonio'].setValue('12345'); // ou outro valor de patrimônio válido

    expect(component.form.valid).toBeTruthy(); // Verifica se o formulário está válido
  });

});

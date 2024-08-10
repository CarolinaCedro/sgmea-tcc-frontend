import {User} from "./user";
import {ChamadoCriado} from "./chamado-criado";
import {Departamento} from "./departamento";
import {UserRole} from "./enum/user-role";
import {Perfil} from "./enum/perfil";
import {Gestor} from "./gestor";


export class Funcionario extends User {


  departamento?: Departamento;
  funcao?: string;
  chamadoCriados: ChamadoCriado[] = [];


  constructor(departamento: Departamento, funcao: string, chamadoCriados: ChamadoCriado[]) {
    super();
    this.departamento = departamento;
    this.funcao = funcao;
    this.chamadoCriados = chamadoCriados;
  }
}

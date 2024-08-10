import {User} from "./user";
import {AreaGestao} from "./enum/area-gestao";
import {ChamadoAtribuido} from "./chamado-atribuido";
import {UserRole} from "./enum/user-role";
import {Perfil} from "./enum/perfil";

export class Gestor extends User {
  areaGestao: AreaGestao;
  chamadoAtribuidos: ChamadoAtribuido[] = [];
  usuariosAlocados: User[] = [];

  constructor(
    id: string,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    role: UserRole,
    perfil: Perfil,
    areaGestao: AreaGestao,
    chamadoAtribuidos: ChamadoAtribuido[] = [],
    usuariosAlocados: User[] = []
  ) {
    super(id, nome, cpf, email, senha, role, perfil);
    this.areaGestao = areaGestao;
    this.chamadoAtribuidos = chamadoAtribuidos;
    this.usuariosAlocados = usuariosAlocados;
  }
}

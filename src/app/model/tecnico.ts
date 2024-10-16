import {User} from "./user";
import {Especialidade} from "./especialidade";
import {ChamadoAtribuido} from "./chamado-atribuido";
import {Transform, Type} from "class-transformer";
import {Model} from "../modules/utis/http/model/model";
import {Gestor} from "./gestor";
import {Perfil} from "./enum/perfil";


export class Tecnico extends User {


  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, Especialidade), Model.deserializeOpts())
  @Type(() => Especialidade)
  especialidades: Especialidade[] = [];
  disponibilidade?: boolean;

  @Transform(value => Model.serialize(value), Model.serializeOpts())
  @Transform(value => Model.deserialize(value, ChamadoAtribuido), Model.deserializeOpts())
  @Type(() => ChamadoAtribuido)
  chamadoAtribuidos: ChamadoAtribuido[] = [];


  constructor(id: string, nome: string, cpf: string, email: string, gestor: Gestor, perfil: Perfil, senha: string, authorities: [], especialidades: Especialidade[], disponibilidade: boolean, chamadoAtribuidos: ChamadoAtribuido[]) {
    super(id, nome, cpf, email, gestor, perfil, senha, authorities);
    this.especialidades = especialidades;
    this.disponibilidade = disponibilidade;
    this.chamadoAtribuidos = chamadoAtribuidos;
  }
}

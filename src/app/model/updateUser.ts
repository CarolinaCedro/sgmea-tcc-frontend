export class UpdateUser {


  id: string
  nome: string
  cpf: string
  email: string
  oldSenha: string
  novaSenha: string
  confirmSenha: string


  constructor(id: string, nome: string, cpf: string, email: string, oldSenha: string, novaSenha: string, confirmSenha: string) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.oldSenha = oldSenha;
    this.novaSenha = novaSenha;
    this.confirmSenha = confirmSenha;
  }
}

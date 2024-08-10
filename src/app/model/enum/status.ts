// status.enum.ts
export enum Status {
  ABERTO = 0,
  ANDAMENTO = 1,
  ENCERRADO = 2,
}

// Função para obter a descrição a partir do código
export function getStatusDescricao(codigo: Status): string {
  switch (codigo) {
    case Status.ABERTO:
      return 'ABERTO';
    case Status.ANDAMENTO:
      return 'ANDAMENTO';
    case Status.ENCERRADO:
      return 'ENCERRADO';
    default:
      throw new Error('Status inválido');
  }
}

// Função para converter código para o enum Status
export function toEnumStatus(cod: number): Status | null {
  switch (cod) {
    case Status.ABERTO:
      return Status.ABERTO;
    case Status.ANDAMENTO:
      return Status.ANDAMENTO;
    case Status.ENCERRADO:
      return Status.ENCERRADO;
    default:
      throw new Error('Status inválido');
  }
}

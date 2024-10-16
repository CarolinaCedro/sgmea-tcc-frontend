// area-gestao.enum.ts
export enum AreaGestao {
  ACADEMICO = 'Acadêmico',
  ADMINISTRATIVO = 'Administrativo',
  FINANCEIRO = 'Financeiro',
  BIBLIOTECA = 'Biblioteca',
  INFRAESTRUTURA = 'Infraestrutura',
  TI = 'Tecnologia da Informação',
  MARKETING = 'Marketing',
  RELACOES_ESTUDANTIS = 'Relações Estudantis',
  OUTROS = 'Outros',
}

// Função para obter a descrição a partir do enum AreaGestao
export function getAreaGestaoDescricao(area: AreaGestao): string {
  return area;
}

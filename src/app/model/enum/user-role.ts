// user-role.enum.ts

export enum UserRole {
  ADMIN = 'admin',
  GESTOR = 'gestor',
  FUNCIONARIO = 'funcionario',
  TECNICO = 'tecnico',
}

export namespace UserRole {
  const roleMap: { [key: string]: UserRole } = {
    'admin': UserRole.ADMIN,
    'gestor': UserRole.GESTOR,
    'funcionario': UserRole.FUNCIONARIO,
    'tecnico': UserRole.TECNICO,
  };

  export function fromRole(role: string): UserRole | null {
    return roleMap[role] || null;
  }

  export function getRole(userRole: UserRole): string {
    return userRole;
  }
}

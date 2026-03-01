export type Role = 'user' | 'admin' | 'agency';

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}

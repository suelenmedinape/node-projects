import type { Role } from "../enums/Role.ts";

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
  role: Role;
}

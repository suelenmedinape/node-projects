import { z } from "zod";
import { Role } from "../enums/Role";
import { randomUUID } from "node:crypto";
import type { IUsuario } from "../interface/IUsuario.ts";
import { UsuarioZod } from "../zod/UsuarioZod.js";

export class Usuario {
  private id: string = "";
  private nome: string = "";
  private email: string = "";
  private senha: string = "";
  private role: Role = Role.VISITANTE;

  constructor(usuario: z.infer<typeof UsuarioZod>) {
    this.id = randomUUID();
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.role = usuario.role;
  }

  static parser(data: IUsuario): z.infer<typeof UsuarioZod> {
    return UsuarioZod.parse(data);
  }
}

import { z } from "zod";
import { ClienteZod } from "../zod/ClienteZod";
import type { ICliente } from "../interface/ICliente";
import { Emprestimo } from "./Emprestimo";
import { Usuario } from "./Usuario";
import { Endereco } from "./Endereco";

export class Cliente extends Usuario {
  private cpf: string = "";
  private telefone: string = "";

  private endereco: Endereco | null = null;
  private emprestimos: Emprestimo[] = [];

  constructor(cliente: z.infer<typeof ClienteZod>) {
    super(cliente);
    this.cpf = cliente.cpf;
    this.telefone = cliente.telefone;
    this.endereco = cliente.endereco ? new Endereco(cliente.endereco) : null;
    this.emprestimos = cliente.emprestimos.map(emp => new Emprestimo(emp));
  }

  static parser(data: ICliente): z.infer<typeof ClienteZod> {
    return ClienteZod.parse(data);
  }
}

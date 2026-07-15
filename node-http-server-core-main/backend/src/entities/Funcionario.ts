import type z from "zod";
import type { IFuncionario } from "../interface/IFuncionario";
import { FuncionarioZod } from "../zod/FuncionarioZod";
import { Usuario } from "./Usuario";
import type { Emprestimo } from "./Emprestimo";

export class Funcionario extends Usuario {
  private matricula: number;

  private emprestimos: Emprestimo[] = [];

  constructor(funcionario: z.infer<typeof FuncionarioZod>) {
    super(funcionario);

    this.matricula = funcionario.matricula;
    this.emprestimos = funcionario.emprestimos;
  }

  static parser(data: IFuncionario): z.infer<typeof FuncionarioZod> {
    return FuncionarioZod.parse(data);
  }
}

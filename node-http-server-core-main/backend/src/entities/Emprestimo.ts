import { z } from "zod";
import { randomUUID } from "node:crypto";
import { EmprestimoZod } from "../zod/EmprestimoZod";
import type { IEmprestimo } from "../interface/IEmprestimo";
import type { Cliente } from "./Cliente";
import type { Funcionario } from "./Funcionario";
import type { Livro } from "./Livro";

export class Emprestimo {
  private id: string = "";
  private dataEmprestimo: Date = new Date();
  private dataDevolucao: Date = new Date();
  private devolvido: boolean = true;

  private cliente: Cliente | null = null;
  private funcionario: Funcionario | null = null;
  private livro: Livro | null = null;

  constructor(emprestimo: z.infer<typeof EmprestimoZod>) {
    this.id = randomUUID();
    this.dataEmprestimo = emprestimo.dataEmprestimo;
    this.dataDevolucao = emprestimo.dataDevolucao;
    this.devolvido = emprestimo.devolvido;
    this.cliente = emprestimo.cliente;
    this.funcionario = emprestimo.funcionario;
    this.livro = emprestimo.livro;
  }

  static parser(data: IEmprestimo): z.infer<typeof EmprestimoZod> {
    return EmprestimoZod.parse(data);
  }
}

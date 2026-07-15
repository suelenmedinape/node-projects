import { z } from "zod";
import { CategoriaLivro } from "../enums/CategoriaLivro";
import { StatusLivro } from "../enums/StatusLivro";
import type { ILivro } from "../interface/ILivro";
import { LivroZod } from "../zod/LivroZod";
import { Emprestimo } from "./Emprestimo";
import { randomUUID } from "node:crypto";

export class Livro {
  private id: string = "";
  private titulo: string = "";
  private autor: string = "";
  private categoriaLivro: CategoriaLivro = CategoriaLivro.NAO_FICCAO;
  private quantidadeTotal: number = 0;
  private quantidadeDisponivel: number = 0;
  private statusLivro: StatusLivro = StatusLivro.DISPONIVEL;

  private emprestimos: Emprestimo[] = [];

  constructor(livro: z.infer<typeof LivroZod>) {
    this.id = randomUUID();
    this.titulo = livro.titulo;
    this.autor = livro.autor;
    this.categoriaLivro = livro.categoriaLivro;
    this.quantidadeTotal = livro.quantidadeTotal;
    this.quantidadeDisponivel = livro.quantidadeDisponivel;
    this.statusLivro = livro.statusLivro;
    this.emprestimos = livro.emprestimos.map(emp => new Emprestimo(emp));
  }

  static parser(data: ILivro): z.infer<typeof LivroZod> {
    return LivroZod.parse(data);
  }
}

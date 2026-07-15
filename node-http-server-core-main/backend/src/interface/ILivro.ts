import type { CategoriaLivro } from "../enums/CategoriaLivro";
import type { StatusLivro } from "../enums/StatusLivro";
import type { IEmprestimo } from "./IEmprestimo";

export interface ILivro {
  id: string;
  titulo: string;
  autor: string;
  categoriaLivro: CategoriaLivro;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  statusLivro: StatusLivro;
  emprestimos: IEmprestimo[];
}

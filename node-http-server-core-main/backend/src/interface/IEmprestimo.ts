import type { ICliente } from "./ICliente";
import type { IFuncionario } from "./IFuncionario";
import type { ILivro } from "./ILivro";

export interface IEmprestimo {
  id: string;
  dataEmprestimo: Date;
  dataDevolucao: Date;
  devolvido: boolean;
  cliente: ICliente
  funcionario: IFuncionario
  livro: ILivro
}

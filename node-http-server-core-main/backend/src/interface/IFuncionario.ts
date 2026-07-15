import type { IEmprestimo } from "./IEmprestimo";
import type { IUsuario } from "./IUsuario";

export interface IFuncionario extends IUsuario {
  matricula: string;
  emprestimos: IEmprestimo;
}

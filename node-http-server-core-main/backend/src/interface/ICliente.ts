import type { Endereco } from "../entities/Endereco";
import type { IEmprestimo } from "./IEmprestimo";
import type { IUsuario } from "./IUsuario";

export interface ICliente extends IUsuario {
  cpf: string;
  telefone: string;
  endereco: Endereco;
  emprestimos: IEmprestimo[];
}

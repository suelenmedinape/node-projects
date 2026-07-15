import z from "zod";
import { UsuarioZod } from "./UsuarioZod";
import { EmprestimoZod } from "./EmprestimoZod";

export const FuncionarioZod = UsuarioZod.extend({
  matricula: z.number(),
  emprestimos: z.array(EmprestimoZod).default([]),
});

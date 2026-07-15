import z from "zod";
import { CategoriaLivro } from "../enums/CategoriaLivro";
import { StatusLivro } from "../enums/StatusLivro";
import { EmprestimoZod } from "./EmprestimoZod";

export const LivroZod = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string(),
  autor: z.string(),
  categoriaLivro: z.enum(CategoriaLivro),
  quantidadeTotal: z.number(),
  quantidadeDisponivel: z.number(),
  statusLivro: z.enum(StatusLivro),
  emprestimos: z.array(EmprestimoZod).default([]),
});

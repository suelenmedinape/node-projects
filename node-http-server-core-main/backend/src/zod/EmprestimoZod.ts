import { z } from "zod";
import { ClienteZod } from "./ClienteZod";
import { FuncionarioZod } from "./FuncionarioZod";

export const EmprestimoZod = z.object({
  id: z.string().uuid().optional(),
  dataEmprestimo: z.date(),
  dataDevolucao: z.date(),
  devolvido: z.boolean(),
  cliente: z.lazy(() => z.any()).nullable().default(null),
  funcionario: z.lazy(() => z.any()).nullable().default(null),
  livro: z.lazy(() => z.any()).nullable().default(null)
});

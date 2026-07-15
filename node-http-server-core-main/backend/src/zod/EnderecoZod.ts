import { number, z } from "zod";
import { ClienteZod } from "./ClienteZod";

export const EnderecoZod = z.object({
  id: z.string().uuid().optional(),
  rua: z.string(),
  numero: z.string(),
  cidade: z.string(),
  bairro: z.string(),
  estado: z.string().max(2),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  cliente: z.lazy(() => z.any()).nullable().default(null),
});

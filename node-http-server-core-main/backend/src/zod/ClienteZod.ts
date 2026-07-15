import { z } from "zod";
import { EmprestimoZod } from "./EmprestimoZod";
import { UsuarioZod } from "./UsuarioZod";
import { EnderecoZod } from "./EnderecoZod";

export const ClienteZod = UsuarioZod.extend({
  cpf: z
    .string()
    .max(14, "O CPF não pode ter mais de 14 caracteres")
    .min(11, "O CPF não pode ter menos de 11 caracteres")
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido"),
  telefone: z
    .string()
    .regex(/^\(\d{2}\)\s?\d{4,5}\-\d{4}$/, "Telefone inválido"),
  endereco: EnderecoZod.nullable().default(null),
  emprestimos: z.array(EmprestimoZod).default([]),
});

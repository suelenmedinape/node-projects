import { z } from "zod";
import { Role } from "../enums/Role";

export const UsuarioZod = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(2),
  email: z.email(),
  senha: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "Deve conter pelo menos um número.")
    .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial."),
  role: z.enum(Role),
});

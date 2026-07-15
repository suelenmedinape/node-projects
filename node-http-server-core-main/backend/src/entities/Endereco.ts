import { randomUUID } from "node:crypto";
import { EnderecoZod } from "../zod/EnderecoZod";
import { z } from "zod";
import type { IEndereco } from "../interface/IEndereco";
import type { Cliente } from "./Cliente";

export class Endereco {
  private id: string = "";
  private rua: string = "";
  private numero: string = "";
  private cidade: string = "";
  private bairro: string = "";
  private estado: string = "";
  private cep: string = "";

  private cliente: Cliente | null = null;

  constructor(endereco: z.infer<typeof EnderecoZod>) {
    this.id = randomUUID();
    this.rua = endereco.rua;
    this.numero = endereco.numero;
    this.cidade = endereco.cidade;
    this.bairro = endereco.bairro;
    this.estado = endereco.estado;
    this.cep = endereco.cep;
    this.cliente = endereco.cliente;
  }

  static parser(data: IEndereco): z.infer<typeof EnderecoZod> {
    return EnderecoZod.parse(data);
  }
}

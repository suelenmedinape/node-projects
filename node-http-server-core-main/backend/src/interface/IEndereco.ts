import type { ICliente } from "./ICliente";

export interface IEndereco {
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
  estado: string;
  cep: string;
  cliente: ICliente;
}

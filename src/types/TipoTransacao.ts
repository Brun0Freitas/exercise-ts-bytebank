import { OpcoesTransacao } from "./OpcoesTransacao.js";

export type TipoTransacao = {
  tipo: OpcoesTransacao;
  valor: number;
  data: Date;
};

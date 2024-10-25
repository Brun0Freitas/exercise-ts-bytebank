import { OpcoesTransacao } from "./OpcoesTransacao.js";

export type Transacao = {
  tipoTransacao: OpcoesTransacao;
  valor: number;
  data: Date;
};

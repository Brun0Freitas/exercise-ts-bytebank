import { OpcoesTransacao } from "./OpcoesTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

let saldo: number = 3000;

const Conta = {
  getSaldo(): number {
    return saldo;
  },

  getDataAcesso() {
    return new Date();
  },

  registrarTransacao(novaTransacao: TipoTransacao): void {
    if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
      saldo += novaTransacao.valor;
    } else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
      saldo -= novaTransacao.valor;
    } else {
      alert("Tipo de transação é invalido!");
    }
  },
};

export default Conta;

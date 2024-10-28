import { OpcoesTransacao } from "./OpcoesTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const historico: TipoTransacao[] =
  JSON.parse(localStorage.getItem("historico"), (key: string, value: string) => {
    if (key === "data") {
      return new Date(value);
    }
    return value;
  }) || [];

// funcoes para validar e realizar as operacoes
function depositar(valor: number) {
  if (valor <= 0) {
    throw new Error("O valor a depositar deve ser maior que zero.");
  }
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString());
}

function debitar(valor: number) {
  if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  } else if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }
  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString());
}

// objeto conta e seus metodos
const Conta = {
  getSaldo(): number {
    return saldo;
  },

  getDataAcesso() {
    return new Date();
  },

  registrarTransacao(novaTransacao: TipoTransacao): void {
    if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
      debitar(novaTransacao.valor);
    } else {
      throw new Error("Tipo de transação é invalido!");
    }

    historico.push(novaTransacao);
    console.log(historico);
    localStorage.setItem("historico", JSON.stringify(historico));
  },
};

export default Conta;

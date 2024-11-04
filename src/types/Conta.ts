import { ListaTransacoes } from "./ListaTransacoes.js";
import { OpcoesTransacao } from "./OpcoesTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

export class Conta {
  protected nome: string;
  protected saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
  private historico: TipoTransacao[] =
    JSON.parse(localStorage.getItem("historico"), (key: string, value: any) => {
      if (key === "data") {
        return new Date(value);
      }
      return value;
    }) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  public getTitularConta() {
    return this.nome;
  }

  getSaldo(): number {
    return this.saldo;
  }

  getDataAcesso() {
    return new Date();
  }

  depositar(valor: number) {
    if (valor <= 0) {
      throw new Error("O valor a depositar deve ser maior que zero.");
    }
    this.saldo += valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }

  debitar(valor: number) {
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente!");
    } else if (valor <= 0) {
      throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    this.saldo -= valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }

  getListaTransacoes(): ListaTransacoes[] {
    const listaPrincipal: ListaTransacoes[] = [];
    const copiaHistoricoLocal: TipoTransacao[] = structuredClone(this.historico); //criada cópia do histórico por questão de segurança
    const historicoOrdenado: TipoTransacao[] = copiaHistoricoLocal.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
    let labelAtual: string = "";

    for (let transacao of historicoOrdenado) {
      let labelMes: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
      if (labelAtual != labelMes) {
        labelAtual = labelMes;
        listaPrincipal.push({
          label: labelAtual,
          registros: [],
        });
      }
      listaPrincipal.at(-1).registros.push(transacao);
    }
    return listaPrincipal;
  }

  registrarTransacao(novaTransacao: TipoTransacao): void {
    if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de transação é invalido!");
    }

    this.historico.push(novaTransacao);
    localStorage.setItem("historico", JSON.stringify(this.historico));
  }
}

const conta = new Conta("Bruno Oliveira");

export default conta;

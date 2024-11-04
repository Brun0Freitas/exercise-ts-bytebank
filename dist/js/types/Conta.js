import { OpcoesTransacao } from "./OpcoesTransacao.js";
export class Conta {
    nome;
    saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
    historico = JSON.parse(localStorage.getItem("historico"), (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getTitularConta() {
        return this.nome;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a depositar deve ser maior que zero.");
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    debitar(valor) {
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        else if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    getListaTransacoes() {
        const listaPrincipal = [];
        const copiaHistoricoLocal = structuredClone(this.historico); //criada cópia do histórico por questão de segurança
        const historicoOrdenado = copiaHistoricoLocal.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtual = "";
        for (let transacao of historicoOrdenado) {
            let labelMes = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de transação é invalido!");
        }
        this.historico.push(novaTransacao);
        localStorage.setItem("historico", JSON.stringify(this.historico));
    }
}
const conta = new Conta("Bruno Oliveira");
export default conta;

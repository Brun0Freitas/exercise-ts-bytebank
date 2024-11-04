import { OpcoesTransacao } from "./OpcoesTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const historico = JSON.parse(localStorage.getItem("historico"), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
// funcoes para validar e realizar as operacoes
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a depositar deve ser maior que zero.");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
function debitar(valor) {
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    else if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
// objeto conta e seus metodos
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getListaTransacoes() {
        const listaPrincipal = [];
        const copiaHistoricoLocal = structuredClone(historico); //criada cópia do histórico por questão de segurança
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
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de transação é invalido!");
        }
        historico.push(novaTransacao);
        localStorage.setItem("historico", JSON.stringify(historico));
    },
};
export default Conta;

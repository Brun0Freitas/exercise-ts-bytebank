import { OpcoesTransacao } from "./OpcoesTransacao.js";
let saldo = 3000;
function depositar(valor) {
    if (valor <= 0) {
        throw new Error("O valor a depositar deve ser maior que zero.");
    }
    saldo += valor;
}
function debitar(valor) {
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    else if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    saldo -= valor;
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error("Tipo de transação é invalido!");
        }
    },
};
export default Conta;

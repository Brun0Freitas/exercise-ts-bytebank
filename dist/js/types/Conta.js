import { OpcoesTransacao } from "./OpcoesTransacao.js";
let saldo = 3000;
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipo == OpcoesTransacao.DEPOSITO) {
            saldo += novaTransacao.valor;
        }
        else if (novaTransacao.tipo == OpcoesTransacao.TRANSFERENCIA || novaTransacao.tipo == OpcoesTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valor;
        }
        else {
            alert("Tipo de transação é invalido!");
        }
    },
};
export default Conta;

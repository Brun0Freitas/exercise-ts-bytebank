import { atualizaSaldo, getSaldo } from "./saldo-component.js";
import { OpcoesTransacao } from "../types/OpcoesTransacao.js";
const elForm = document.querySelector(".block-nova-transacao form");
elForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elForm.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }
    const inputTipoTransacao = elForm.querySelector("#tipoTransacao");
    const inputValor = elForm.querySelector("#valor");
    const inputData = elForm.querySelector("#data");
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    if (tipoTransacao == OpcoesTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == OpcoesTransacao.TRANSFERENCIA || tipoTransacao == OpcoesTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert("Tipo de transação é invalido!");
    }
    atualizaSaldo(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    console.log(novaTransacao);
    elForm.reset();
});

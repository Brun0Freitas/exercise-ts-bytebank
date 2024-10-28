import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!elementoForm.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }
    const inputTipo = elementoForm.querySelector("#tipoTransacao");
    const inputValor = elementoForm.querySelector("#valor");
    const inputData = elementoForm.querySelector("#data");
    let tipo = inputTipo.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    const novaTransacao = {
        tipo: tipo,
        valor: valor,
        data: data,
    };
    console.log(novaTransacao);
    Conta.registrarTransacao(novaTransacao);
    SaldoComponent.atualizar();
    elementoForm.reset();
});

import conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-components.js";
const elementoForm = document.querySelector(".block-nova-transacao form");
elementoForm.addEventListener("submit", function (event) {
    try {
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
        let data = new Date(inputData.value + " 00:00:00"); //precisa colocar a hora para o JS entender a data correta
        const novaTransacao = {
            tipo: tipo,
            valor: valor,
            data: data,
        };
        conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoForm.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});

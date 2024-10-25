import { atualizaSaldo, getSaldo } from "./saldo-component.js";
import { OpcoesTransacao } from "../types/OpcoesTransacao.js";
import { Transacao } from "../types/Transacao.js";

const elForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!elForm.checkValidity()) {
    alert("Por favor, preencha todos os campos da transação!");
    return;
  }

  const inputTipoTransacao = elForm.querySelector("#tipoTransacao") as HTMLSelectElement;
  const inputValor = elForm.querySelector("#valor") as HTMLInputElement;
  const inputData = elForm.querySelector("#data") as HTMLInputElement;

  let tipoTransacao: OpcoesTransacao = inputTipoTransacao.value as OpcoesTransacao;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);
  let saldo: number = getSaldo();

  if (tipoTransacao == OpcoesTransacao.DEPOSITO) {
    saldo += valor;
  } else if (tipoTransacao == OpcoesTransacao.TRANSFERENCIA || tipoTransacao == OpcoesTransacao.PAGAMENTO_BOLETO) {
    saldo -= valor;
  } else {
    alert("Tipo de transação é invalido!");
  }

  atualizaSaldo(saldo);

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  elForm.reset();
});

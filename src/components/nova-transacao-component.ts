import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import { OpcoesTransacao } from "../types/OpcoesTransacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";

const elementoForm = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!elementoForm.checkValidity()) {
    alert("Por favor, preencha todos os campos da transação!");
    return;
  }

  const inputTipo = elementoForm.querySelector("#tipoTransacao") as HTMLSelectElement;
  const inputValor = elementoForm.querySelector("#valor") as HTMLInputElement;
  const inputData = elementoForm.querySelector("#data") as HTMLInputElement;

  let tipo: OpcoesTransacao = inputTipo.value as OpcoesTransacao;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  const novaTransacao: TipoTransacao = {
    tipo: tipo,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  Conta.registrarTransacao(novaTransacao);
  SaldoComponent.atualizar();
  elementoForm.reset();
});

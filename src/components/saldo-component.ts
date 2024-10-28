import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector(".valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

// atualiza a data de acesso na tela
if (elementoDataAcesso != null) {
  elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

const SaldoComponent = {
  atualizar() {
    //atualiza o saldo na tela
    if (elementoSaldo != null) {
      elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
  },
};

SaldoComponent.atualizar();
export default SaldoComponent;
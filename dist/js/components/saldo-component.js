import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
// atualiza a data de acesso na tela
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
const SaldoComponent = {
    atualizar() {
        //atualiza o saldo na tela
        if (elementoSaldo != null) {
            elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
        }
    },
};
SaldoComponent.atualizar();
export default SaldoComponent;

import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
let saldo = 3000;
const elSaldo = document.querySelector(".valor");
const elDataAcesso = document.querySelector(".block-saldo time");
if (elDataAcesso != null) {
    const dataAcesso = new Date();
    elDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
export function getSaldo() {
    return saldo;
}
atualizaSaldo(saldo);
export function atualizaSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elSaldo != null) {
        elSaldo.textContent = saldo.toLocaleString("pt-br", { currency: "BRL", style: "currency" });
    }
}

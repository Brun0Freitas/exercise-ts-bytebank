import conta from "../types/Conta.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
const elementoExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const lista = conta.getListaTransacoes();
    elementoExtrato.innerHTML = "";
    let htmlTransacoesConjunto = "";
    for (let grupo of lista) {
        let htmlTransacoesItens = "";
        for (let transacao of grupo.registros) {
            htmlTransacoesItens += `
          <div class="transacao-item">
              <div class="transacao-info">
                  <span class="tipo">${transacao.tipo}</span>
                  <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
              </div>
              <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
          </div>
          `;
        }
        htmlTransacoesConjunto += `
        <div class="transacoes-group">
          <strong class="mes-group">${grupo.label}</strong>
          ${htmlTransacoesItens}
        </div>
        `;
    }
    if (htmlTransacoesConjunto === "") {
        htmlTransacoesConjunto = "<div>Não há transações registradas </div>";
    }
    elementoExtrato.innerHTML = htmlTransacoesConjunto;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    },
};
export default ExtratoComponent;

import { ListaTransacoes } from "../types/ListaTransacoes.js";
import conta from "../types/Conta.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

const elementoExtrato = document.querySelector(".extrato .registro-transacoes") as HTMLElement;

renderizarExtrato();
function renderizarExtrato(): void {
  const lista: ListaTransacoes[] = conta.getListaTransacoes();
  elementoExtrato.innerHTML = "";
  let htmlTransacoesConjunto: string = "";
  for (let grupo of lista) {
    let htmlTransacoesItens: string = "";
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
  atualizar(): void {
    renderizarExtrato();
  },
};

export default ExtratoComponent;

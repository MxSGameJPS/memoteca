import api from "./api.js";

const ui = {
  async preencherFormulario(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);
    document.getElementById("pensamento-id").value = pensamento.id;
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
  },

  limparFormulario() {
    document.getElementById("pensamento-form").reset();
    console.log(manipularCancelamento);
  },
  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const mensagemVazia = document.getElementById("mensagem-vazia")
    listaPensamentos.innerHTML = ""

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(ui.adicionarPensamentosNaLista);

      if (pensamentos.length === 0) {
        mensagemVazia.style.display = "block";
      } else {
        mensagemVazia.style.display = "none";
        //pensamentos.forEach(ui.adicionarPensamentosLista);
      }
    } catch {
      alert("Erro ao renderizar pensamentos");
    }
    
  },

  adicionarPensamentosNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const li = document.createElement("li");
    li.setAttribute("data-id", pensamento.id);
    li.classList.add("li-pensamento");

    const iconeAspas = document.createElement("img");
    iconeAspas.src = "assets/imagens/aspas-azuis.png";
    iconeAspas.alt = "Aspas azuis";
    iconeAspas.classList.add("icone-aspas");

    const conteudoPensamento = document.createElement("div");
    conteudoPensamento.textContent = pensamento.conteudo;
    conteudoPensamento.classList.add("pensamento-conteudo");

    const autoriaPensamento = document.createElement("div");
    autoriaPensamento.textContent = pensamento.autoria;
    autoriaPensamento.classList.add("pensamento-autoria");

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);
    
    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    botaoEditar.appendChild(iconeEditar);
    

    const botaoExcluir = document.createElement("button")
    botaoExcluir.classList.add("botao-excluir")
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id)
        ui.renderizarPensamentos()
      } catch (error) {
        alert("Erro ao excluir pensamnto")
      }
    }

    const iconeExcluir = document.createElement("img")
    iconeExcluir.src = "assets/imagens/icone-excluir.png"
    iconeExcluir.alt = "Excluir"
    botaoExcluir.appendChild(iconeExcluir)


    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);
    

    li.appendChild(iconeAspas);
    li.appendChild(conteudoPensamento);
    li.appendChild(autoriaPensamento);
    li.appendChild(icones);
    listaPensamentos.appendChild(li);
  },
};

export default ui;

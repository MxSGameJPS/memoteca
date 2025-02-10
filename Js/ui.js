import api from "./api.js";

const ui = { 
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
    console.log(manipularCancelamento)
  },
  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(ui.adicionarPensamentosNaLista);
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

    li.appendChild(iconeAspas);
    li.appendChild(conteudoPensamento);
    li.appendChild(autoriaPensamento);
    listaPensamentos.appendChild(li);
  } 
};

export default ui;

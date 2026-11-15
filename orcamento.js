/*
    EMOBRAS - Empreiteira de Obras com Tijolo Ecológico
    Arquivo: orcamento.js
    Função: salvar, listar, editar e excluir pedidos de orçamento usando o localStorage
    Autores: Gustavo Volpato e Gustavo Salazar
*/

const formulario = document.getElementById("form-orcamento");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoTelefone = document.getElementById("telefone");
const campoCidade = document.getElementById("cidade");
const campoServico = document.getElementById("servico");
const campoMensagem = document.getElementById("mensagem");
const botaoEnviar = document.getElementById("botao-enviar");
const alerta = document.getElementById("alerta-sucesso");
const listaPedidos = document.getElementById("lista-pedidos");
const semPedidos = document.getElementById("sem-pedidos");

let pedidos = JSON.parse(localStorage.getItem("pedidosEmobras")) || [];
let indiceEditando = -1;

function salvarPedidos() {
    localStorage.setItem("pedidosEmobras", JSON.stringify(pedidos));
}

function mostrarAlerta(texto) {
    alerta.textContent = texto;
    alerta.classList.remove("d-none");

    setTimeout(function () {
        alerta.classList.add("d-none");
    }, 4000);
}

function criarParagrafo(rotulo, valor) {
    const paragrafo = document.createElement("p");
    const negrito = document.createElement("strong");
    negrito.textContent = rotulo + ": ";
    paragrafo.appendChild(negrito);
    paragrafo.appendChild(document.createTextNode(valor));
    return paragrafo;
}

function mostrarPedidos() {
    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
        semPedidos.classList.remove("d-none");
    } else {
        semPedidos.classList.add("d-none");
    }

    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];

        const cartao = document.createElement("div");
        cartao.className = "card card-pedido";

        const titulo = document.createElement("h3");
        titulo.textContent = pedido.servico + " - " + pedido.cidade;

        const data = document.createElement("span");
        data.className = "badge text-bg-light";
        data.textContent = "Enviado em " + pedido.data;

        const botoes = document.createElement("div");
        botoes.className = "card-pedido-botoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "btn btn-sm btn-outline-secondary";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function () {
            editarPedido(i);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn btn-sm btn-outline-danger";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function () {
            excluirPedido(i);
        });

        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);

        cartao.appendChild(titulo);
        cartao.appendChild(data);
        cartao.appendChild(criarParagrafo("Nome", pedido.nome));
        cartao.appendChild(criarParagrafo("E-mail", pedido.email));
        cartao.appendChild(criarParagrafo("Telefone", pedido.telefone));
        cartao.appendChild(criarParagrafo("Mensagem", pedido.mensagem));
        cartao.appendChild(botoes);

        listaPedidos.appendChild(cartao);
    }
}

function editarPedido(indice) {
    const pedido = pedidos[indice];

    campoNome.value = pedido.nome;
    campoEmail.value = pedido.email;
    campoTelefone.value = pedido.telefone;
    campoCidade.value = pedido.cidade;
    campoServico.value = pedido.servico;
    campoMensagem.value = pedido.mensagem;

    indiceEditando = indice;
    botaoEnviar.value = "Salvar alterações";
    campoNome.focus();
}

function excluirPedido(indice) {
    const confirmou = confirm("Deseja excluir este pedido?");

    if (confirmou) {
        pedidos.splice(indice, 1);
        indiceEditando = -1;
        botaoEnviar.value = "Enviar pedido";
        salvarPedidos();
        mostrarPedidos();
        mostrarAlerta("Pedido excluído.");
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const pedido = {
        nome: campoNome.value,
        email: campoEmail.value,
        telefone: campoTelefone.value,
        cidade: campoCidade.value,
        servico: campoServico.value,
        mensagem: campoMensagem.value,
        data: new Date().toLocaleDateString("pt-BR")
    };

    if (indiceEditando === -1) {
        pedidos.push(pedido);
        mostrarAlerta("Obrigado, " + pedido.nome + "! Seu pedido foi enviado.");
    } else {
        pedidos[indiceEditando] = pedido;
        indiceEditando = -1;
        botaoEnviar.value = "Enviar pedido";
        mostrarAlerta("Pedido atualizado com sucesso.");
    }

    salvarPedidos();
    mostrarPedidos();
    formulario.reset();
});

mostrarPedidos();

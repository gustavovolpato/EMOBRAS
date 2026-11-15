/*
    EMOBRAS - Empreiteira de Obras com Tijolo Ecológico
    Arquivo: menu.js (JavaScript puro)
    Função: abrir e fechar o menu no celular nas páginas sem Bootstrap
    Autores: Gustavo Volpato e Gustavo Salazar
*/

const botaoMenu = document.getElementById("botao-menu");
const listaMenu = document.getElementById("lista-menu");

botaoMenu.addEventListener("click", function () {
    listaMenu.classList.toggle("aberto");

    if (listaMenu.classList.contains("aberto")) {
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.textContent = "☰";
    }
});

/*
    EMOBRAS - Empreiteira de Obras com Tijolo Ecológico
    Arquivo: comparativo.js (JavaScript puro)
    Função: destacar a coluna do tijolo ecológico na tabela
    Autores: Gustavo Volpato e Gustavo Salazar
*/

const botaoDestacar = document.getElementById("botao-destacar");
const celulasEcologico = document.querySelectorAll(".col-ecologico");
let destacado = false;

botaoDestacar.addEventListener("click", function () {
    destacado = !destacado;

    for (let i = 0; i < celulasEcologico.length; i++) {
        celulasEcologico[i].classList.toggle("coluna-destaque", destacado);
    }

    if (destacado) {
        botaoDestacar.textContent = "Remover destaque";
    } else {
        botaoDestacar.textContent = "Destacar o tijolo ecológico";
    }
});

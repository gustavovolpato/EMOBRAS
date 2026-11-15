/*
    EMOBRAS - Empreiteira de Obras com Tijolo Ecológico
    Arquivo: obras.js
    Função: filtrar as obras do portfólio por categoria
    Autores: Gustavo Volpato e Gustavo Salazar
*/

const botoesFiltro = document.querySelectorAll(".botao-filtro");
const obras = document.querySelectorAll(".obra-item");
const contador = document.getElementById("contador-obras");

function filtrarObras(categoria) {
    let visiveis = 0;

    for (let i = 0; i < obras.length; i++) {
        if (categoria === "todas" || obras[i].dataset.categoria === categoria) {
            obras[i].classList.remove("d-none");
            visiveis++;
        } else {
            obras[i].classList.add("d-none");
        }
    }

    if (visiveis === 1) {
        contador.textContent = "1 obra encontrada";
    } else {
        contador.textContent = visiveis + " obras encontradas";
    }
}

for (let i = 0; i < botoesFiltro.length; i++) {
    botoesFiltro[i].addEventListener("click", function () {
        for (let j = 0; j < botoesFiltro.length; j++) {
            botoesFiltro[j].classList.remove("ativo");
        }

        botoesFiltro[i].classList.add("ativo");
        filtrarObras(botoesFiltro[i].dataset.categoria);
    });
}

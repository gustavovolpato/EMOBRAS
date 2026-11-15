/*
    EMOBRAS - Empreiteira de Obras com Tijolo Ecológico
    Arquivo: galeria.js (JavaScript puro)
    Função: filtrar as fotos por obra e abrir as fotos em tamanho grande
    Autores: Gustavo Volpato e Gustavo Salazar
*/

const fotos = document.querySelectorAll(".galeria-item");
const botoesObra = document.querySelectorAll(".filtro-galeria");
const tituloFiltro = document.getElementById("titulo-filtro");
const totalFotos = document.getElementById("total-fotos");
const visualizador = document.getElementById("visualizador");
const fotoGrande = document.getElementById("foto-grande");
const legendaFoto = document.getElementById("legenda-foto");
const botaoFechar = document.getElementById("fechar-visualizador");
const botaoAnterior = document.getElementById("foto-anterior");
const botaoProxima = document.getElementById("foto-proxima");

let fotosVisiveis = [];
let posicaoAtual = 0;

function filtrarGaleria(obra) {
    fotosVisiveis = [];

    for (let i = 0; i < fotos.length; i++) {
        if (obra === "todas" || fotos[i].dataset.obra === obra) {
            fotos[i].classList.remove("escondida");
            fotosVisiveis.push(fotos[i]);
        } else {
            fotos[i].classList.add("escondida");
        }
    }

    for (let i = 0; i < botoesObra.length; i++) {
        if (botoesObra[i].dataset.obra === obra) {
            botoesObra[i].classList.add("ativo");

            if (obra === "todas") {
                tituloFiltro.textContent = "Todas as obras";
            } else {
                tituloFiltro.textContent = "Obra " + botoesObra[i].textContent;
            }
        } else {
            botoesObra[i].classList.remove("ativo");
        }
    }

    totalFotos.textContent = fotosVisiveis.length;
}

function mostrarFoto(posicao) {
    if (posicao < 0) {
        posicao = fotosVisiveis.length - 1;
    }

    if (posicao >= fotosVisiveis.length) {
        posicao = 0;
    }

    posicaoAtual = posicao;
    const imagem = fotosVisiveis[posicao].querySelector("img");

    fotoGrande.src = imagem.src;
    fotoGrande.alt = imagem.alt;
    legendaFoto.textContent = (posicao + 1) + " de " + fotosVisiveis.length + " - " + imagem.alt;
    visualizador.classList.add("aberto");
}

function fecharVisualizador() {
    visualizador.classList.remove("aberto");
}

for (let i = 0; i < botoesObra.length; i++) {
    botoesObra[i].addEventListener("click", function () {
        filtrarGaleria(botoesObra[i].dataset.obra);
    });
}

for (let i = 0; i < fotos.length; i++) {
    fotos[i].addEventListener("click", function () {
        mostrarFoto(fotosVisiveis.indexOf(fotos[i]));
    });
}

botaoAnterior.addEventListener("click", function () {
    mostrarFoto(posicaoAtual - 1);
});

botaoProxima.addEventListener("click", function () {
    mostrarFoto(posicaoAtual + 1);
});

botaoFechar.addEventListener("click", fecharVisualizador);

visualizador.addEventListener("click", function (evento) {
    if (evento.target === visualizador) {
        fecharVisualizador();
    }
});

document.addEventListener("keydown", function (evento) {
    if (!visualizador.classList.contains("aberto")) {
        return;
    }

    if (evento.key === "Escape") {
        fecharVisualizador();
    } else if (evento.key === "ArrowLeft") {
        mostrarFoto(posicaoAtual - 1);
    } else if (evento.key === "ArrowRight") {
        mostrarFoto(posicaoAtual + 1);
    }
});

const parametros = new URLSearchParams(window.location.search);
let obraInicial = parametros.get("obra");
let obraExiste = false;

for (let i = 0; i < botoesObra.length; i++) {
    if (botoesObra[i].dataset.obra === obraInicial) {
        obraExiste = true;
    }
}

if (!obraExiste) {
    obraInicial = "todas";
}

filtrarGaleria(obraInicial);

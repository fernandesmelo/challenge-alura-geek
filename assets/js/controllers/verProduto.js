import { produtoServices } from '../services/produtos-services.js'

async function carregaProdutos() {
    const listaProdutos = await produtoServices.listaProdutos()

    const url = new URL(window.location)
    let idParametro = url.searchParams.get("id") 

    let produtoSelecionado = listaProdutos.find(item => item.id === idParametro)  
    chamaProdutoSelecionado(produtoSelecionado);
    carregaSimilares(produtoSelecionado, listaProdutos);
}

function chamaProdutoSelecionado(produtoSelecionado) {
    const secaoProduto = document.querySelector(".selected__container");

    const produtoEscolhido = document.createElement("div");
    produtoEscolhido.classList.add("selected__product");

    const imagemProduto = document.createElement("div");
    imagemProduto.classList.add("selected__img");
    imagemProduto.style.backgroundImage = `url("${produtoSelecionado.imageUrl}")`;

    const conteudo = `
        <div class="selected__info">
            <h1 class="selected__title">${produtoSelecionado.name}</h1>
            <p class="selected__price">R$ ${produtoSelecionado.price},99</p>
            <p class="selected__description">${produtoSelecionado.description}</p>
        </div>`;

    produtoEscolhido.appendChild(imagemProduto);
    produtoEscolhido.innerHTML += conteudo;
    secaoProduto.appendChild(produtoEscolhido);
}

function carregaSimilares(produtoSelecionado, listaProdutos) {
    const similaresSection = document.querySelector(".similar__products");

    let produtosSimilares = listaProdutos.filter(item => item.section === produtoSelecionado.section)
  
    produtosSimilares = produtosSimilares.filter(item => item.id !== produtoSelecionado.id)

    produtosSimilares = produtosSimilares.slice(0, 5)

    produtosSimilares.forEach(product =>
        similaresSection.appendChild(criaSimilares(product.name, product.id, product.imageUrl, product.price))
    )
}

function criaSimilares(name, id, imageUrl, price) {
    const card = document.createElement("li")
    card.className = `product-card`
    const conteudo = `
                        <a href="./produto.html?id=${id}">
                            <img src="${imageUrl}"
                            alt="imagem do produto">
                        </a>
                        <p class="card-nome">${name}</p>
                        <p class="card-preco">R$ ${price},99</p>
                        <a href="./produto.html?id=${id}" class="card-link">Ver produto</a>
        `

    card.innerHTML = conteudo
    return card
}

carregaProdutos();
document.addEventListener("DOMContentLoaded", () => {
    destacarLinkAtivo();
    const btnTema = document.querySelector('.btn-tema');
    const body = document.body;
    
    // Verificar tema salvo
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        body.classList.add('tema-escuro');
        btnTema.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Alternar tema
    btnTema.addEventListener('click', () => {
        body.classList.toggle('tema-escuro');
        const temaAtual = body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
        localStorage.setItem('tema', temaAtual);
        btnTema.innerHTML = temaAtual === 'escuro' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});

function destacarLinkAtivo() {
    const linksNavegacao = document.querySelectorAll("nav ul li a");
    const caminhoAtual = window.location.pathname;
    
    linksNavegacao.forEach(link => {
        if (link.getAttribute("href").includes(caminhoAtual.split("/").pop())) {
            link.classList.add("link-ativo");
        }
    });
}

function validarFormulario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;
    
    if (!nome || !email || !assunto || !mensagem) {
        alert("Por favor, preencha todos os campos do formulário.");
        return false; 
    }
    
    alert("Mensagem enviada com sucesso!");
    return true;
}

function mostrarMensagemBoasVindas() {
    if (!localStorage.getItem("boasVindasMostrada")) {
        alert("Bem-vindo ao meu portfólio!");
        localStorage.setItem("boasVindasMostrada", "true");
    }
}

if (window.location.pathname.includes("index.html")) {
    mostrarMensagemBoasVindas();
}

const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})

// Carrinho de Compras
class Carrinho {
    constructor() {
        this.itens = JSON.parse(localStorage.getItem('carrinho')) || [];
        this.atualizarCarrinho();
    }

    adicionarItem(produto) {
        const itemExistente = this.itens.find(item => item.id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            this.itens.push({
                ...produto,
                quantidade: 1
            });
        }
        
        this.salvarCarrinho();
        this.atualizarCarrinho();
    }

    removerItem(id) {
        this.itens = this.itens.filter(item => item.id !== id);
        this.salvarCarrinho();
        this.atualizarCarrinho();
    }

    atualizarQuantidade(id, quantidade) {
        const item = this.itens.find(item => item.id === id);
        if (item) {
            item.quantidade = quantidade;
            if (item.quantidade <= 0) {
                this.removerItem(id);
            } else {
                this.salvarCarrinho();
                this.atualizarCarrinho();
            }
        }
    }

    salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(this.itens));
    }

    atualizarCarrinho() {
        const carrinhoElement = document.querySelector('.carrinho');
        if (!carrinhoElement) return;

        const totalItens = this.itens.reduce((total, item) => total + item.quantidade, 0);
        const totalPreco = this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

        carrinhoElement.innerHTML = `
            <h3>Carrinho (${totalItens})</h3>
            ${this.itens.map(item => `
                <div class="item-carrinho">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="info-item">
                        <h4>${item.nome}</h4>
                        <p>R$ ${item.preco.toFixed(2)}</p>
                        <div class="controles-quantidade">
                            <button onclick="carrinho.atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                            <span>${item.quantidade}</span>
                            <button onclick="carrinho.atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                        </div>
                    </div>
                    <button class="remover-item" onclick="carrinho.removerItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
            <div class="total-carrinho">
                <h4>Total: R$ ${totalPreco.toFixed(2)}</h4>
                <button class="btn-finalizar">Finalizar Compra</button>
            </div>
        `;
    }
}

// Inicializar carrinho
const carrinho = new Carrinho();

// Adicionar eventos aos botões de compra
document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const produto = {
            id: parseInt(btn.dataset.id),
            nome: btn.dataset.nome,
            preco: parseFloat(btn.dataset.preco),
            imagem: btn.dataset.imagem
        };
        carrinho.adicionarItem(produto);
    });
});

// Carrossel de Produtos
class Carrossel {
    constructor(elemento) {
        this.elemento = elemento;
        this.slides = elemento.querySelectorAll('.slide');
        this.indicadores = elemento.querySelectorAll('.indicador');
        this.indiceAtual = 0;
        this.iniciar();
    }

    iniciar() {
        this.mostrarSlide(0);
        setInterval(() => this.proximoSlide(), 5000);
    }

    mostrarSlide(indice) {
        this.slides.forEach(slide => slide.classList.remove('ativo'));
        this.indicadores.forEach(ind => ind.classList.remove('ativo'));
        
        this.slides[indice].classList.add('ativo');
        this.indicadores[indice].classList.add('ativo');
        this.indiceAtual = indice;
    }

    proximoSlide() {
        this.indiceAtual = (this.indiceAtual + 1) % this.slides.length;
        this.mostrarSlide(this.indiceAtual);
    }
}

// Inicializar carrosséis
document.querySelectorAll('.carrossel').forEach(carrossel => {
    new Carrossel(carrossel);
});


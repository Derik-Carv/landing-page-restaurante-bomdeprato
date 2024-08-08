// desativando menu mobile para view de pc
const noMob = document.querySelector('.menuMob i')
const janela = window.innerWidth
if (janela > 776) {
    noMob.style.display = 'none';
}

change()
// seleciona apenas uma opção de checkbox por vez
function change () {
    document.querySelectorAll('.info input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Desmarca outros checkboxes na mesma div
        const checkboxes = checkbox.closest('.info').querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (cb !== checkbox) cb.checked = false;
        });
    });
});   
}

// array que armazena os itens do carrinho
let carrinho = [];
console.log(carrinho, 'fora')
let separado = []

function naoRepetir (a, b) {
    document.querySelectorAll('.pedir').forEach(button => {
        button.addEventListener('click', () => {
            console.log(a, b, 'norepet')
                if(a == b) {
                    confirm(`Deseja adicionar novamente?`)
                }
        })
    })
}

// function para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // desmarca todos os checkboxs
    desmarcaCaixas()
    function desmarcaCaixas() {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                // pega cada checkbox da pagina e desmarca
                checkboxes.forEach(function(checkbox) {
                    checkbox.checked = false;
                });
    }
    
    console.log(nome, 'addcar')
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        atualizarCarrinho()
        itemExistente.quantidade++;
        itemExistente.precoTotal = itemExistente.preco * itemExistente.quantidade;
        separado = carrinho
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1,
            precoTotal: preco
        });
    }
    nomeItem = (separado = [nome])
    verCar(nomeItem, preco.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'}))
    naoRepetir(nomeItem, nome)
    atualizarCarrinho();
}

// function para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const totalPreco = carrinho.reduce((acc, item) => acc + item.precoTotal, 0).toFixed(2);
    
    // atualizar a visualização do carrinho
    const carrinhoIcon = document.querySelector('.linkGuia i.bi-cart');
    carrinhoIcon.innerHTML = `<span> ${totalItens} = R$${totalPreco} </span>    `;
}

// adicionar evento de clique ao pedir prato
document.querySelectorAll('.pedir').forEach(button => {
    button.addEventListener('click', () => {
        const infoDiv = button.closest('.info');
        const nome = infoDiv.querySelector('h3').textContent;
        // Obtém o checkbox selecionado
        const selectedCheckbox = infoDiv.querySelector('input[type="checkbox"]:checked');
        if (selectedCheckbox) {
            const preco = parseFloat(selectedCheckbox.closest('h4').querySelector('span').textContent.replace('R$', '').replace(',', '.'));
            adicionarAoCarrinho(nome, preco);
        } else {
            alert("Por favor, selecione uma opção.");
        }
    });
});
atualizarCarrinho();
// abrir o carrrinho para ver as compras.
let btnAbrirCar = document.querySelector('#ulCar button');
btnAbrirCar.addEventListener('click', verCar());
function verCar (a, b) {
    let li = document.createElement('li');
    btnAbrirCar.appendChild(li)
    let verNome = document.createElement('span');
    let verPreco = document.createElement('span');
    verNome.textContent = (a)
    verPreco.textContent = (b)
    li.appendChild(verNome)
    li.appendChild(verPreco)
    
}
// atualiza o carrinho
atualizarCarrinho();
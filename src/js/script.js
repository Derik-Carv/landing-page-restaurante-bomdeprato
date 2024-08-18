let btnConfirmar = document.querySelector('.fimCar');  // declara a região que vai aparecer as infos rapidas do carrinho
btnConfirmar.addEventListener('click', finalizarCompra); // chama o o modal de revisão de itens e pagamento
function finalizarCompra() { // function de chamar vizualização de itens e ingressar no pagamento
    let modal = document.querySelector('.modal'); // declara a div que vai se comportar o modal de pagamento
    modal.classList.add('active'); // class criada para identificar quando o modal está ativo
    modal.style.display = 'block'; // deixa o modal visivel
    let btnClose = modal.querySelector('.close');
    btnClose.addEventListener('click', () => { // chama o botão e função de fechar o modal
        modal.classList.remove('active'); // remove a classe de status ativo do modal
        modal.style.display = 'none'; // tira a visualização do modal
    });
    let btnConfirmarDados = modal.querySelector('.janela .buttonconfirmardados'); // chama o button responsavel por pegar os dados e forma de pagamento do cliente.
    btnConfirmarDados.addEventListener('click', () => {
        let molPag = modal.querySelectorAll('input[type="checkbox"]'); // pega os checkbox`s de opção de pagamento
        let selectedPag = Array.from(molPag).filter(molPag => molPag.checked); // vasculha o array das opções de pagamento e verificar qual está marcada
        if (selectedPag.length === 0) { // valida se tem opção de pagamento marcada.
            alert("Por favor, selecione uma opção.");
            return;
        }
        let metodoPagamento = selectedPag[0].nextSibling.textContent.trim(); // pega o texto do checkbox de pagamento
        let nomeCompleto = modal.querySelector('.nomecompleto').value; // pega o nome completo do cliente
        let endereco = modal.querySelector('.endereco').value; // pega o enderenço preenchido
        let confirmardadosclient = modal.querySelector('li'); // introduz o texto na li criada na linha 113
        confirmardadosclient.innerHTML =    `CONFIRME SEUS DADOS: <br>
                                            A sua forma de pagamento é <strong>${metodoPagamento}</strong>, 
                                            seu nome completo é <strong>${nomeCompleto}</strong>, 
                                            e seu endereço é: <strong>${endereco}</strong>. <br> 
                                            O valor total do pedido é: <strong>R$${precoTotal.toFixed(2)}</strong> <br>
                                            Pode confirmar seus dados apertando o botão abaixo.`; // introduz o texto na li
        let buttonSubmit = document.createElement('button'); // cria o button de pagamento
        buttonSubmit.type = 'submit'; // cria o type do button
        buttonSubmit.textContent = 'Pagar'; // introduz o texto do button
        buttonSubmit.className = 'button-pagar'; // cria a classe do button
        confirmardadosclient.appendChild(buttonSubmit); // põe o button na li
        buttonSubmit.addEventListener('click', () => {  // ação de pagamento ao clicar no button pagar
            alert("Pagamento efetuado com sucesso!"); // alerta na tela
            modal.classList.remove('active'); // desativa o modal ao finalizar compra
            modal.style.display = 'none'; // fecha a vizualização do modal
            location.reload(); // recarrega a página
        });
    });
}
var quant = 0; // variavel para incrementar quantidade ao adicionar ao carrinho
var quantTotalItens = 0; // variavel que irá armazenar o total de itens
for (let i = 0;i< document.querySelectorAll('.pedir').length; i++) { // pega todos os button da pagina responsaveis por adicionar os itens
    document.querySelectorAll('.pedir')[i].addEventListener('click',() => { // function para o item da div correspondente do button adicionar 
        let info = document.querySelectorAll('.info')[i]; // seleciona a div do item correspondente ao botão clicado
        if (!info) { // caso não seja ddda mesmo div
            console.error('Elemento .info não encontrado.'); // alerta erro de escolha, caso ocorra
            return;
        }
        let nome = info.querySelector('h3').textContent; // pega o nome do item
        let checkboxes = info.querySelectorAll('input[type="checkbox"]'); // pega o checkbox relacionados ao item da div. também relacionado a quantidade e preço selecionado.
        let quantInputs = info.querySelectorAll('input[type="number"]'); // pega todos input de quantidade selecionadas. também relacionado ao preço e ao checkbox selecionado
        let selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked); // verifica se algum checkbox ta marcado
        if (selectedCheckboxes.length === 0) { // se não tiver marcado
            alert("Por favor, selecione uma opção."); // valida marcação
            return;
        }
        checkboxes.forEach((checkbox, c) => { // faz verificcação sobre os inputs de quantidade e os checkboxes
            if (checkbox.checked) { // pega o input de quantidade correspondente
                let quantidade = quantInputs[c].value; // pega o valor da quantidade selecionada
                let preco = info.querySelectorAll('label')[c].textContent; // pegar o valor do preço correspondente
                adicionarAoCarrinho(nome, preco, quantidade) // da inicio a função de criar o carrinho com as informações validadas
                document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) { 
                    checkbox.checked = false; // desmarca todos checbox assim que adiociona item ao carrinho
                });
                document.querySelectorAll('input[type="number"]').forEach(function(quantidade){
                    quantidade.value = '0' // zera o valor do input de quantidade adiciona o item no carrinho
                })
            }
        });
    });
};
change()
function change () { // seleciona apenas uma opção de checkbox por vez
    document.querySelectorAll('.porcao input[type="checkbox"]').forEach(checkbox => { // pega os checkbox`s e faz uma verredura deles na div
    checkbox.addEventListener('change', () => { // desmarca outros checkboxes na mesma div
        const checkboxes = checkbox.closest('.info').querySelectorAll('input[type="checkbox"]'); // verificar o checkbox antecessor para desmarcar
        checkboxes.forEach(cb => {
            if (cb !== checkbox) cb.checked = false; // desmarca o outro checkbox na div
        });
    });
});   
}
var carrinho = []; // array que armazena os itens do carrinho
var precoTotal = 0; // variavel que para armazenar o total do pedido
function adicionarAoCarrinho(nome, preco, quantidade) { // function de adiocionar item ao carrinho
    preco = parseFloat(preco.replace('R$', '').replace(',', '.')); // filtra o texto do preço para pegar só os números
    const itemExistente = carrinho.find(item => item.nome === nome); // busca o carrinho dentro do array do carrinho para ver se ele já existe
    if (itemExistente) {
        itemExistente.quantidade += quantidade; // atualiza a quantidade e o preço total  
        itemExistente.precoTotal = itemExistente.preco * itemExistente.quantidade; // multiplica o preço individual pela quantidade total selecionada para adicionar ao carrinho
    } else {
        carrinho.push({ // adiciona um novo item ao carrinho
            nome: nome,
            preco: preco,
            quantidade: quantidade, // pega a quantidade selecionada do primeiro item
            precoTotal: preco * quantidade // calcula o preco total do primeiro item
        });
    }
    quant = quant + quantidade * preco; // incrementa a quantidade atual com a anterior
    precoTotal = quant; // atualiza o preço total
    quantTotalItens += parseInt(quantidade); // converte a quantidade para número para ser exibido
    const carrinhoIcon = document.querySelector('button i.bi-cart'); // parte que é exibida no cabeçalho com as informações de quantidade e preço total de itens, sem detalhar.
    carrinhoIcon.innerHTML = `<span> <span class='quant'>${quantTotalItens}</span> = R$${precoTotal.toFixed(2)} </span>`; // expressa visualmente o preço total e quantidade total
    verCar(nome, preco, quantidade); // chama a function que exibe os itens do carrinho detalhados
}
let btnAbrirCar = document.querySelector('.janela'); // abrir o carrrinho para ver as compras.
btnAbrirCar.addEventListener('click', verCar()); // ao clicar clicar em `seu carrinho` com as infos rapidas, abre o modal do carrinho detalhado
function verCar (a, b, quantidade) { // a = pega o nome do item, b = pega o preço do item, c pega quantidade.
    let li = document.createElement('li'); // cria li no modal
    btnAbrirCar.appendChild(li)
    let verNome = document.createElement('span');
    let verPreco = document.createElement('span');
    let menos = document.createElement('span');
    let mais = document.createElement('span');
    let qtdCar = document.createElement('span');
    qtdCar.textContent = quantidade
    menos.innerHTML = '-'
    mais.innerHTML = '+'
    verNome.textContent = (a)
    verPreco.textContent = (b)
    li.appendChild(menos)
    li.appendChild(qtdCar)
    li.appendChild(mais)
    li.appendChild(verNome)
    li.appendChild(verPreco)
    qtdCar.classList.add('itemQtd')
    verNome.classList.add('itemCarNome')
    verPreco.classList.add('itemCarPreco')
}
$(document).ready(function(){
    // Recupera o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Elementos onde os itens serão exibidos
    const listElement = $("#lista");
    const totalElement = $("#total");

    // Função para exibir o carrinho
    function exibirCarrinho(){
        listElement.empty(); // Limpa o conteúdo da lista
        let totalPreco = 0; // Inicializa o total

        $.each(carrinho, function(index, item){
            // Cria um container para cada item
            const listItem = $("<div>").addClass("item-carrinho");

            // Adiciona a imagem do produto
            const img = $("<img>")
                .attr("src", item.imagem)
                .attr("alt", item.descricao)
                .addClass("imagem-produto");

            // Cria o texto da descrição e preço
            const descricao = $("<p>").text(`${item.descricao} - Unidade: R$${item.preco}`);

            // Botão de remoção
            const removeButton = $("<button>")
                .addClass("botaoRemov")
                .text("🗑️")
                .css("margin-left", "10px")
                .click(function(){
                    removerItemDoCarrinho(index);
                });

            // Monta a estrutura
            listItem.append(img, descricao, removeButton);
            listElement.append(listItem);

            // Incrementa o valor total
            totalPreco += item.preco;
        });

        // Exibe o total
        totalElement.text(`Total: R$${totalPreco}`);
    }

    // Função para remover item do carrinho
    function removerItemDoCarrinho(index){
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    // Exibe o carrinho na inicialização
    exibirCarrinho();
});

function gerarDocumentoWord(){
    const  listaElement = document.getElementById("lista")
    const  totalElement = document.getElementById("total")

    //clona a lista para evitar a modificação direta na lista original
    const listaClone = listaElement.cloneNode(true)
    //rmeove o botao da lista para ir pro word sem ele
    $(listaClone).find("button").remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML

    const conteudoHtml = `
        <html>
            <head>
                <meta charset="UTF-8" />
            </head>
            <body>
                <h1>Pedido Confirmado</h1>
                ${listaHtml}
                <br><br>
                ${totalHtml}
            </body>
        </html>
    `;

    const blob = new Blob([conteudoHtml], {type: "application/msword"});
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "carrinho.doc";
    link.click();

    document.getElementById("pedido").style.display = "block"
}

function sucessClose(){
    document.getElementById("pedido").style.display = "none"
}
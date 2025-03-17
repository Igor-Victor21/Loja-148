$(document).ready(function(){
    //Recuperar o carrinho do local storage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    //elemento onde a lista sera exibida
    const listElement = $("#lista");
    //elemento para para o total 
    const totalElement = $("#total");

    //funcao para exibir o carrinho
    function exibirCarrinho(){
        //limpar o conteudo atual da lista
        listElement.empty();

        //variavel para acumular o preço total
        let totalPreco = 0;

        //itera sobre os itens do carrinho
        $.each(carrinho, function(index, item){
            //criar um elemento de lista para cada item
            const listItem = $("<li>").text(
                `${item.descricao} - Preço $${item.preco}`
            );

            //Criar um botao de remoção de item
            const removeButton = $("<button>")
            .text("❌")
            .css("margin-left","10px")
            .click(function(){
                removerItemDoCarrinho(index)
            });

            //criar os filhos e os pais
            listItem.append(removeButton)
            listElement.append(listItem)
            //incrementa o valor total
            totalPreco += item.preco
        });
        //imprime o total do valor dos itens
        totalElement.text(`Total: $${totalPreco}`);
    }

    function removerItemDoCarrinho(index){
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();
});

function gerarDocumentoWorld(){
    const listElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")

    //clona a lista para evitar a modificação direta na lista original
    const listaClone = listElement.cloneNode(true)
    //remove o botão da lista para ir para o word sem ele
    $(listaClone).find("button").remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML

    const conteudoHtml = `
        <html>
            <head>
                <meta charset-"UTF-8" />
                </head>
                <body>
                    <h1>Pedido Confirmado</h1>
                    ${listaHtml}
                    <br>
                    <br>
                    ${totalHtml}
                </body>
                </html>
    `;

    const blob = new Blob([conteudoHtml], {type: "application/msword"});
    const link = document.creatElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "carrinho.doc"
    link.click()


    document.getElementById("pedido").style.display = "block"
}

function sucessClose(){
    document.getElementById("pedido").style.display = "none"
}
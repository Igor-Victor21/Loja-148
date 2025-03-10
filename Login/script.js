function login() {
    var nome = $("#nome").val()
    var senha = $("#senha").val()

    //4 validações
    //as 2 primeiras verificações são para ver se tem algum valor dentro
    //depois as outras 2 é para verificar se é admin e a senha 1234
    //se nome e senha for vazio e nome for admin e senha for 1234
    //se tudo isso for verdade ele entra nesse bloco 
    //ps: nome e senha começa vazio depois de enviar que preenche com o input do usuario 
    if (nome && senha && nome === "admin" && senha === "1234") {
        //preenchendo os valores do usuario no json 
        const user = {
            name: nome,
            dataEntrada: new Date(),
            id: Math.floor(Math.random() * 100000),
        }
        localStorage.setItem("usuario", JSON.stringify(user))
        window.location.href = "../Loja"
    //se não entrar no bloco de cima o usuario entra no bloco de comando abaixo 
    } else {
        document.getElementById("error-modal").style.display = "flex"
        document.getElementById("nome").style.border = "2px solid lightpink"
        document.getElementById("senha").style.border = "2px solid lightpink"

    }
}
//fechando a janela de erro
function fecharError() {
    document.getElementById("nome").style.border = "2px solid aliceblue"
    document.getElementById("senha").style.border = "2px solid aliceblue"
    document.getElementById("error-modal").style.display = "none"
}

function showPassword() {
    var inputSenha = document.querySelector("#senha")
    if (inputSenha.getAttribute("type") === "password") {
        inputSenha.setAttribute("type", "text")
    } else {
        inputSenha.setAttribute("type", "password")
    }
}


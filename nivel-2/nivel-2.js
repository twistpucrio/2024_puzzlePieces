window.onload = function() {
    game(4, 4); 
     /*Funcionalidade botão de resetar:*/ 
     document.getElementById("resetBtn").addEventListener("click", function(){
        location.reload(); //função que faz recarregar a página inteira
    }); 
}
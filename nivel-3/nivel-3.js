window.onload = function() {
    game(5, 5); 
     /*Funcionalidade botão de resetar:*/ 
     document.getElementById("resetBtn").addEventListener("click", function(){
        location.reload(); //função que faz recarregar a página inteira
    }); 
}
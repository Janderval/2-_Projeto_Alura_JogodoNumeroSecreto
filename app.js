var listaNumerosGerados = [];

function gerarNumeroAleatorio(intervalo){
    let numeroAleatorio =  parseInt(Math.random()* intervalo + 1);
    let tamanhoDaLista = listaNumerosGerados.length;
    if (tamanhoDaLista == intervalo){
        listaNumerosGerados = [];
    }
    if(listaNumerosGerados.includes(numeroAleatorio) ){
        return gerarNumeroAleatorio(intervalo);
    }else{
        listaNumerosGerados.push(numeroAleatorio);
        console.log(listaNumerosGerados);
        return numeroAleatorio;
    }
}
let intervalo = 100;
let numeroSecreto = gerarNumeroAleatorio(intervalo);


function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
} 
function textoInicial(){
    exibirTexto('h1', 'Jogo do numero secreto');
    exibirTexto('p', 'Chute um numero de 1 a '+ intervalo);
}

textoInicial();

let tentativas = 0;
function verificarChute(){
    tentativas++;
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    if (chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!');
        exibirTexto('p', `Você descobriu o numero secreto na ${tentativas}ª tentativa`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if( chute < numeroSecreto){
        exibirTexto('p', 'O numero secreto é maior que '+ chute);
    }else if(chute > numeroSecreto){
        exibirTexto('p', 'O numero secreto é menor que '+ chute);
    }
    limparCampo();
};

function limparCampo() {
    chute = document.querySelector('input');
    chute.value='';
}

function reiniciarJogo() {
    tentativas = 0;
    limparCampo();
    textoInicial();
    numeroSecreto = gerarNumeroAleatorio(intervalo);
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
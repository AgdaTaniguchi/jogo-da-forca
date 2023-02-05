var palavras = ['CPU', 'ULA', 'Registradores', 'RAM', 'ROM', 'EPROM', 'FLASH', 'Memória de Massa', 'DMA', 'CS', 'Adress Bus', 'Data Bus', 'I5', 'I7', 'Dual Core', 'Quad Core'];

var dicas = [
    'Parte do hardware que realiza todos os processos do computador.',
    'Componente da CPU que realiza as operações lógicas e aritméticas.',
    'Tipo de memória local rápida do microprocessador e serve para armazenar dados e instruções. Eles se localizam dentro da CPU.',
    'Memória volátil do computador, ou seja, ela é responsável pelo armazenamento de informações necessárias para a execução de aplicativos em uso.',
    'Memória não volátil do computador, ou seja, é onde os dados ficam armazenados mesmo quando o computador é desligado.',
    'Memória não volátil que depois de programada, só pode ser apagada por uma exposição à luz ultravioleta',
    'Memória não volátil do tipo EEPROM que mantém as informações armazenadas sem a necessidade de uma fonte de energia elétrica. Ela é muito resistente, porém possui um número finito de modificações.',
    'Memória não volátil que possui como função armazenar grandes quantidades de informações.',
    'Característica que possibilita que determinados periféricos acessem a memória RAM do sistema, sem depender da CPU.',
    'Linha de controle que é usado para selecionar um dos circuitos integrados dentre vários conectados ao mesmo barramento de computador.',
    'Caminhos que fazem referência a um endereço físico na memória. O número de trilhas determina a quantidade de endereços na memória física.',
    'Servem para transferir dados entre componentes de um computador.',
    'A Intel começou a fabricar em setembro de 2009. Possui uma frequência de 2660 MHz a 3467 MHz e a microarquitetura Nahalem e Sandy Bridge',
    'A Intel começou a fabricar em novembro de 2008. Possui quatro núcleos no mínimo, memória cache L3 de 8 MB e controlador de memória integrado.',
    'Modelo de processador que possui dois núcleos no mesmo circuito. Cada core tem sua própria memória cash controlador, o que permite o funcionamento mais efetivo do que um processador single. Um exemplo seria o Intel Pentium D.',
    'Modelo de processador que possui quatro núcleos no mesmo circuito. Um exemplo seria o Intel Core I7-11700K'
];

var numeroQuestao = 0;
var erros = 0;
var timeOut;

function comecarJogo(){
    telaInicio.style.display = "none";
    telaGanhou.style.display = "none";
    telaPerdeu.style.display = "none";
    telaJogo.style.display = "flex";
    jogo.style.display = "flex";
    
    alerta.style.display = "none";

    numeroQuestao = 0;
    erros = 0;

    questaoNumero.innerHTML = "1. ";
    dica.innerHTML = "Parte do hardware que realiza todos os processos do computador.";

    palavra_tentativa.value = "";
    palavra_tentativa.focus();

    imgForca.src = `images/forca_0.png`;
}

function verificar(){
    var tentativa = palavra_tentativa.value;

    if(tentativa == ""){
        alerta.style.display = "block";
        alerta.innerHTML = "Por favor, digite uma resposta na caixa de texto.";

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            alerta.style.display = "none";
        }, 3000);
    }
    else if(tentativa.toLowerCase() == palavras[numeroQuestao].toLowerCase()){
        numeroQuestao++;

        if(numeroQuestao >= palavras.length){
            qtdErros.innerHTML = erros;
            telaJogo.style.display = "none";
            telaGanhou.style.display = "block";
        }

        dica.innerHTML = dicas[numeroQuestao];
        questaoNumero.innerHTML = `${numeroQuestao + 1}. `;

        alerta.style.display = "block";
        alerta.innerHTML = "Resposta correta!";

        // Animação de comemoração fundo
        comemoracao.style.display = "block";

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            alerta.style.display = "none";
            comemoracao.style.display = "none";
        }, 2000);

        palavra_tentativa.value = "";
        palavra_tentativa.focus();
    }
    else{
        erros++;
        
        alerta.style.display = "block";
        alerta.innerHTML = `Resposta incorreta, tente novamente. (${erros}/9)`;

        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            alerta.style.display = "none";
        }, 3000);
        
        imgForca.src = `images/forca_${erros}.png`;
        
        if(erros >= 9){
            telaJogo.style.display = "none";
            telaPerdeu.style.display = "block";
            return;
        }

        palavra_tentativa.value = "";
        palavra_tentativa.focus();
    }
}

function verificarEnter(){
    if(event.keyCode == 13){
        verificar();
    }
}
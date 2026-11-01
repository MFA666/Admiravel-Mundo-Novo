
// Configurando o monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function() {

    // Definição das variáveis que vão receber os atributos HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
   
// Músicas de vitória dos personagens
const musicaVampiro = new Audio('audio/vamp.mp3');
const musicaLobisomem = new Audio('audio/lobo.mp3');

// Música para quando o jogo terminar empatado
const musicaEmpate = new Audio('audio/velha.mp3');

// Repete a música até a próxima partida começar
musicaVampiro.loop = true;
musicaLobisomem.loop = true;
musicaEmpate.loop = true;

let primeiraJogada = true;
    let jogadorAtual = 'Vamp';
    let jogoAtivo = true;

    // Criação e inicialização do array do tabuleiro
    let tabuleiro = ['','','','','', '','', '', ''];

    // Definição das possibilidades de jogadas
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Criaçaõ da função clica nas células para preencher o array
    function clica(event) {
        const celula = event.target;
        const indice = Array.from(celulas).indexOf(celula);

       // Verifica se as células estão vazias e, se tiver, encerra a função
         if (tabuleiro[indice] !== '' || !jogoAtivo) {
        return;
}

// Para as músicas na primeira jogada de uma nova partida
if (primeiraJogada) {
    musicaVampiro.pause();
    musicaVampiro.currentTime = 0;

    musicaLobisomem.pause();
    musicaLobisomem.currentTime = 0;

    musicaEmpate.pause();
    musicaEmpate.currentTime = 0;
    primeiraJogada = false;
}

       // Caso contrário, armazena o jogador em cada célula
       tabuleiro[indice] = jogadorAtual;
       celula.appendChild(carregaImagem(jogadorAtual));

       // Conforme as verificações das jogadas, envia as mensagens específicas
     if (verifica(jogadorAtual)) {
    jogoAtivo = false;
    status.textContent = `O jogador ${jogadorAtual} venceu! (Aumente o som)`;
    
    // Interrompe qualquer música anterior antes de tocar a nova
      musicaVampiro.pause();
       musicaVampiro.currentTime = 0;

musicaLobisomem.pause();
musicaLobisomem.currentTime = 0;
    // Toca a música correspondente ao vencedor
    if (jogadorAtual === 'Vamp') {
    musicaVampiro.currentTime = 0;
    musicaVampiro.play();
   } else {
    musicaLobisomem.currentTime = 0;
    musicaLobisomem.play();
}

    setTimeout(resetJogo, 3000);

} else if (tabuleiro.includes('')) {
    jogadorAtual = jogadorAtual === 'Vamp' ? 'Lobo Pidão' : 'Vamp';
    status.textContent = `É a vez do  ${jogadorAtual}`;

} else {
    jogoAtivo = false;
    status.textContent = 'Deu velha! (Aumente o som)';

    // Toca a música quando a partida termina empatada
    musicaVampiro.pause();
    musicaLobisomem.pause();

    musicaEmpate.currentTime = 0;
    musicaEmpate.play();

    setTimeout(resetJogo, 3000);
}
}

    // Função que testa cada jogada, percorrendo o Array
    // E comparando com o jogador atual
    // Quando encontra a situação, envia a mensagem adequada
    function verifica(jogador) {
        for (const jogadas of possibilidades) {
            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }
        return false;
    }

    // Função para carregar a imagem dos personagens em cada célula
  
function carregaImagem(jogador) {
    const imagem = new Image();

    // Define as imagens dos jogadores
    imagem.src = jogador === 'Vamp'
        ? 'img/vamp.JPEG'
        : 'img/lobo.png';

    imagem.alt = jogador;

    return imagem;
}


   // Função para reiniciar automaticamente o jogo
function resetJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    // Permite parar a música na primeira jogada seguinte
     primeiraJogada = true;
    jogadorAtual = 'Vamp';

    // Limpa todas as células do tabuleiro
    celulas.forEach((celula) => {
        celula.textContent = '';
    });

    // Atualiza a mensagem para a próxima partida
    status.textContent = `É a vez do jogador ${jogadorAtual}`;
}

    // Dispara o evento Click do mouse, chamando a função clica
   celulas.forEach((celula) => celula.addEventListener('click', clica));

    
})
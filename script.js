const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botaoStartPause = document.querySelector('#start-pause');
const botaoPausar = document.querySelector('#start-pause span');
const botaoPausarIcone = document.querySelector('#start-pause img');
const botoes = document.querySelectorAll('.app__card-button');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const audioTempoPlay = new Audio('sons/play.wav');
const audioTempoPause = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    botaoFoco.classList.add('active');
})
botaoDescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    botaoDescansoCurto.classList.add('active');
})
botaoDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    botaoDescansoLongo.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (elemento) {
        elemento.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1;
    mostrarTempo()
}

botaoStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        audioTempoPause.play()
        zerar()
        return
    }
    audioTempoPlay.play();
    botaoPausar.textContent = "Pausar";
    intervaloId = setInterval(contagemRegressiva, 1000);
    botaoPausarIcone.setAttribute('src', `imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    botaoPausar.textContent = "Começar";
    botaoPausarIcone.setAttribute('src', `imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
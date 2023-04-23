
let palavraSorteada = palavrasPossiveis[Math.floor(Math.random() * palavrasPossiveis.length)].toUpperCase()
const dicionario = listaDePalavras.map(palavra => palavra.toUpperCase());
let palpites = [[]]
let contadorPalpite = 0
let espacoVago = 1;

const teclas = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Ç',
    '«',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'ENTER',
]

const criarGrid = (l, c, elementoPai) => {
const grid = document.getElementById('grid');

for (let i = 0; i < l * c; i += 1) {
    const tile = document.createElement('div');
    tile.setAttribute('id', `${i +1}`)
    tile.classList.add('tile')
    tile.classList.add('animate__animated')
    elementoPai.appendChild(tile);
  }
}

const gerarTeclado = () => {
    const botaoTecla = document.querySelector("[data-keyboard]")

    const teclado = document.querySelector('#teclado')
    teclas.forEach(tecla => {
        const botaoTecla = document.createElement('button');
        botaoTecla.textContent = tecla;
        botaoTecla.setAttribute('data-key', tecla);
        botaoTecla.classList.add('animate__animated') 
        botaoTecla.classList.add('animate__fadeIn')
        botaoTecla.style.backgroundColor = 
        teclado.appendChild(botaoTecla);
    });
  
}

const palpiteAtual = () => {
    numeroDePalpites = palpites.length
    return palpites[numeroDePalpites - 1]
}

const atualizarPalpite = (letra) => {
    const arrayDaPalavraAtual = palpiteAtual()
    if (arrayDaPalavraAtual && arrayDaPalavraAtual.length < 5) {
        arrayDaPalavraAtual.push(letra)
        const elementoEspacoVago = document.getElementById(String(espacoVago))
        espacoVago = espacoVago + 1
        elementoEspacoVago.textContent = letra
    }
}

const palavraExiste = (palavra) => {
    const palavraEmMaiusculas = palavra.toUpperCase();
    return dicionario.includes(palavraEmMaiusculas);
}
  
const submit = () => {
    const arrPalavraAtual = palpiteAtual()
    const palavraAtual = arrPalavraAtual.join('')


    if (palavraExiste(palavraAtual) && arrPalavraAtual.length === 5){
        animarFlip(arrPalavraAtual)
        atualizarCoresTeclas(arrPalavraAtual);
        palpites.push([]);
    }
    if (!palavraExiste(palavraAtual) && arrPalavraAtual.length === 5) {
        mostrarMensagem("Não existe na lista de palavras!", 4000)
        animarShake(arrPalavraAtual)
    }
    if (arrPalavraAtual.length !== 5) {
        mostrarMensagem("Palavra precisa ter 5 letras!", 4000)
        animarShake(arrPalavraAtual)
    }
    if (palavraAtual === palavraSorteada) {
        mostrarMensagem("Parabéns! Você venceu.", 5000)
        animarVitoria()
        partidasJogadas()
        winStreak()
        maiorStreak()
        dadosVitoria()
        espacoVago = 0;
        palpites = 0
    }
    if (palpites.length === 7) {
        mostrarMensagem(`Acabaram as chances! A palavra é: ${palavraSorteada}`, 5000)
        animarDerrota()
        partidasJogadas()
        quebrarStreak()
    } 
}

const apagar = () => {
    const arrPalavraAtual = palpiteAtual()
    if (arrPalavraAtual.length >= 1) {
    const letraDeletada = arrPalavraAtual.pop()
    palpites[palpites.length - 1] = arrPalavraAtual
    const elementoUltimaPalavra = document.getElementById(String(espacoVago -1))
    elementoUltimaPalavra.textContent = ''
    espacoVago = espacoVago - 1
    }
}

const animarFlip = (arrPalavraAtual) => {
    const letraContador = contadorPalpite * 5 + 1;
    const intervalo = 200;
  
    arrPalavraAtual.forEach((letra, index) => {
      setTimeout(() => {
        const cor = corDaTile(letra, index);
        const posicaoLetra = letraContador + index;
        const elementoLetra = document.getElementById(posicaoLetra);
        elementoLetra.classList.add('animate__flipInX');
        elementoLetra.style = `background-color:${cor};border-color:${cor}`;
        elementoLetra.style.color = 'white';
      }, intervalo * index);
    });
    contadorPalpite += 1;
}

const corDaTile = (letra, index)  => {
    const letraCorreta = palavraSorteada.includes(letra) 
    const posicaoAtualLetra = palavraSorteada.charAt(index)
    const letraPosicaoCorreta = letra === posicaoAtualLetra

    if (!letraCorreta) {
        return 'rgb(58, 58, 60)'
    }
     if (letraPosicaoCorreta) {
        return 'rgb(83,141,78)'
     }
     return 'rgb(181,159,59)'
}

const clicarTeclas = () => { 
const botaoTecla = document.querySelector("[data-keyboard]")

botaoTecla.addEventListener('click', (event) => {
    const tecla = event.target.getAttribute('data-key');
    
    if (tecla === 'ENTER') {
        submit()
        return;
    }
    if (tecla === '«')  {
        apagar()
        return
    }
    
    atualizarPalpite(tecla);
    });
}

const teclaPressionada = (event) => {
    if (event.key === "Enter") {
      submit();
      return;
    }
    if (event.key === "Backspace" || event.key === "Delete") {
        apagar()
        return
    }
    if (event.key.match(/^[a-z]$/)) {
      atualizarPalpite(event.key.toUpperCase());
      return;
    }
    if (event.key === 'ç' || event.key === 'Ç') {
        atualizarPalpite(event.key.toUpperCase());
        return
    }
}

const pressTeclado = () =>{
document.addEventListener("keydown", teclaPressionada);
}

function mostrarMensagem(message, duration = 1000) {
const alertContainer = document.querySelector("[data-alert-container]")
const alert = document.createElement("div")
alert.textContent = message
alert.classList.add("alert")
alertContainer.prepend(alert)
if (duration == null) return
setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
        alert.remove()
        })
    }, duration)
}

const animarShake = (arrPalavraAtual) => {
const letraContador = contadorPalpite * 5 + 1;
  
    arrPalavraAtual.forEach((letra, index) => {
        const posicaoLetra = letraContador + index;
        const elementoLetra = document.getElementById(posicaoLetra);
        elementoLetra.classList.add('animate__shakeX');
    });
    setTimeout(() => {
        arrPalavraAtual.forEach((letra, index) => {
            const posicaoLetra = letraContador + index;
            const elementoLetra = document.getElementById(posicaoLetra);
            elementoLetra.classList.remove('animate__shakeX');
        });
    }, 400);
}

const animarVitoria =  () => {
    const grid = document.getElementById('grid')
    setTimeout(() => {
    grid.classList.add('animate__tada')
    }, 500)
}
const animarDerrota =  () => {
    const grid = document.getElementById('grid')
    setTimeout(() => {
    grid.classList.add('animate__fadeOut')
    }, 500)
}

const atualizarCoresTeclas = (arrPalavraAtual) => {
const teclas = document.querySelectorAll('[data-key]');
teclas.forEach(function(tecla) {
    const valorTecla = tecla.dataset.key;
    if (arrPalavraAtual.indexOf(valorTecla) !== -1) {
        const cor = corDaTile(valorTecla, arrPalavraAtual.indexOf(valorTecla));
        setTimeout(() => {tecla.style.backgroundColor = cor}, 400)
     }
    })
}

const mostrarInstrucao = () => {
    const modalIcon = document.querySelector('.modal-icon')
    const modalInstrucao = document.querySelector('.modal');
    const modalCont = document.querySelector('#modal-container')
    
    modalIcon.addEventListener('click', () => {
        modalInstrucao.style.display = 'flex';
        modalCont.style.display = 'flex';
    }); 
    modalInstrucao.addEventListener('click', () => {
    modalInstrucao.classList.add('animate__fadeOutDown');
        setTimeout(function() {
        modalInstrucao.classList.remove('animate__fadeOutDown');
        modalCont.style.display = 'none';
        modalInstrucao.style.display = 'none';
        }, 100);
    });
}

const mostrarEstatistica = () => {
const iconEstatistica = document.querySelector('.modal-icon-estatis')
const modalEstatistica = document.querySelector('#modal-estatistica')
const modalCont = document.querySelector('#modal-container')


        
iconEstatistica.addEventListener('click', () => {
    modalEstatistica.style.display = 'flex';
    modalCont.style.display = 'flex';

});
        
modalEstatistica.addEventListener('click', () => {
modalEstatistica.classList.add('animate__fadeOutDown');
    setTimeout(function() {
        modalEstatistica.classList.remove('animate__fadeOutDown');
        modalEstatistica.style.display = 'none';
        modalCont.style.display = 'none';

        }, 100);
    }); 
}

const mostrarOpcoes = () => {
const btnOpcoes = document.querySelector('.modal-icon-opcao') 
const modalCont = document.querySelector('#modal-container')
const modalOpcoes = document.getElementById('menu-opcoes') 
const closeIcon = document.querySelector('.opcao-close-icon') 

btnOpcoes.addEventListener('click', () => {
    modalOpcoes.style.display = 'flex';
    modalCont.style.display = 'flex';

});

closeIcon.addEventListener('click', () => {
    modalOpcoes.classList.add('animate__fadeOutDown');
        setTimeout(function() {
            modalOpcoes.classList.remove('animate__fadeOutDown');
            modalOpcoes.style.display = 'none';
            modalCont.style.display = 'none';
    
         }, 100);
    }); 
 }

const partidasJogadas = () => {
const totalDePartidas = localStorage.getItem('totalDePartidas') || 0
localStorage.setItem('totalDePartidas', Number(totalDePartidas) + 1)
}

const winStreak = () => {
    const winStreak = localStorage.getItem('winStreak') || 0
    localStorage.setItem('winStreak', Number(winStreak) + 1)
}

const quebrarStreak = () => {
    localStorage.setItem('winStreak', 0)
}
const dadosVitoria = () => {
    const vitorias = localStorage.getItem('vitorias') || 0
    localStorage.setItem('vitorias', Number(vitorias) + 1)
}

const maiorStreak = () => {
const winStreak = localStorage.getItem('winStreak')
let maiorStreak = localStorage.getItem('streakCheck') || 0

    if (winStreak > maiorStreak) {
        localStorage.setItem('maiorStreak', winStreak)
    }
}

const estatisticaAtual = () => {
    const total = document.getElementById('n-jogados')
    const streak = document.getElementById('win-streak')
    const maiorStreak = document.getElementById('maior-win-streak')

    let maiorStreakStorage = localStorage.getItem('maiorStreak')
    let totalStorage = localStorage.getItem('totalDePartidas')
    const streakAtual = localStorage.getItem('winStreak')

    total.innerHTML = !totalStorage ? 0 : totalStorage;
    streak.innerHTML = !streakAtual ? 0 : streakAtual
    maiorStreak.innerHTML = !maiorStreakStorage ? 0 : maiorStreakStorage
} 

const escuro = () => {
    const containerJogo = document.getElementById('container-jogo')
    const grid = document.getElementById('grid')
    const modalInstrucao = document.querySelector('.modal')
    const modalEstatistica = document.getElementById('modal-estatistica')
    const modalOpcoes = document.getElementById('menu-opcoes')  
    const ex1 = document.getElementById('ex-1')
    const ex2 = document.getElementById('ex-2')
    const ex3 = document.getElementById('ex-3')
    const exemploP = document.getElementById('exemplo-p')
    const email = document.getElementById('mail')

    
    containerJogo.style.backgroundColor = '#141414'; 
    grid.style.color = 'white'; 
    modalInstrucao.style.backgroundColor = '#141414'
    modalInstrucao.style.color = 'white'
    modalEstatistica.style.backgroundColor = '#141414'
    modalEstatistica.style.color = 'white'
    modalOpcoes.style.backgroundColor = '#141414'
    modalOpcoes.style.color = 'white'
    ex1.src = './imagens/ex1-dark.png'
    ex2.src = './imagens/ex2-dark.png'
    ex3.src = './imagens/ex3-dark.png'
    exemploP.innerHTML = '<strong>Nenhuma</strong> das letras existem na palavra!'
    email.style.color = 'white'

}
    
const claro = () => {
const containerJogo = document.getElementById('container-jogo')
const grid = document.getElementById('grid')
const modalInstrucao = document.querySelector('.modal')
const modalEstatistica = document.getElementById('modal-estatistica')
const ex1 = document.getElementById('ex-1')
const ex2 = document.getElementById('ex-2')
const ex3 = document.getElementById('ex-3')
const exemploP = document.getElementById('exemplo-p')
const modalOpcoes = document.getElementById('menu-opcoes') 
const email = document.getElementById('mail')

  
containerJogo.style.backgroundColor = ''; 
grid.style.color = ''; 
modalInstrucao.style.backgroundColor = ''
modalInstrucao.style.color = ''
modalEstatistica.style.backgroundColor = ''
modalEstatistica.style.color = ''
modalOpcoes.style.backgroundColor = ''
    modalOpcoes.style.color = ''
ex1.src = './imagens/ex1.png'
ex2.src = './imagens/ex2.png'
ex3.src = './imagens/ex3.png'
exemploP.innerHTML = '<strong>G</strong> e<strong> I</strong> não existem em qualquer lugar da palavra!'
email.style.color = 'black'

    
}

const modoEscuro = () => {
const darkModeBtn = document.getElementById('darkmode')

const salvarModo = (ativo, estadoBtn) => {
localStorage.setItem('darkMode', ativo);
}

darkModeBtn.addEventListener('change', () => {
  if (darkModeBtn.checked) {
    escuro()
    salvarModo(true)
    } else {
    claro()
    salvarModo(false)
    }
});
}

const recuperarModo = () => {
const darkModeBtn = document.getElementById('darkmode')
    if (JSON.parse(localStorage.getItem('darkMode')) === true) {
        escuro()
        darkModeBtn.checked = true
    } else {
        claro()
        darkModeBtn.checked = false
    }
}


window.onload = () => {
criarGrid(5, 6, grid)
gerarTeclado()
clicarTeclas()
pressTeclado()
mostrarInstrucao()
mostrarEstatistica()
mostrarOpcoes()
estatisticaAtual() 
modoEscuro()
recuperarModo()
}


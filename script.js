
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
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const criarGrid = () => {
const grid = document.getElementById('grid');
for (let i = 0; i < 5 * 6; i += 1) {
    const tile = document.createElement('div');
    tile.setAttribute('id', `${i +1}`)
    tile.classList.add('tile')
    tile.classList.add('animate__animated')
    grid.appendChild(tile);
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
    }
    if (palpites.length === 7) {
        mostrarMensagem(`Acabaram as chances! A palavra é: ${palavraSorteada}`, 5000)
        animarDerrota()

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

window.onload =() => {
criarGrid()
gerarTeclado()
clicarTeclas()
pressTeclado()
}

const modalIcon = document.querySelector('.modal-icon');
const modal = document.querySelector('.modal');
const closeIcon = document.querySelector('.close-icon')
const modalContent = document.querySelector('.modal-content')

modalIcon.addEventListener('click', () => {
  modal.style.display = 'flex';
});

modal.addEventListener('click', (event) => {
    modalContent.classList.add('animate__fadeOutDown');
    setTimeout(function() {
    modalContent.classList.remove('animate__fadeOutDown');
    modal.style.display = 'none';
    }, 100);
});

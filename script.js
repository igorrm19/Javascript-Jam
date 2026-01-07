
const dadosDrumKit = [
    {
        tecla: 'A',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        nome: 'Crash'
    },
    {
        tecla: 'S',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        nome: 'Hi-Hat'
    },
    {
        tecla: 'D',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        nome: 'Kick'
    },
    {
        tecla: 'F',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        nome: 'Snare'
    },
    {
        tecla: 'G',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        nome: 'Tom 1'
    },
    {
        tecla: 'H',
        som: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        nome: 'Tom 2'
    }
];


const criarElementoAudio = (caminhoSom) => {
    const audio = new Audio(caminhoSom);
    return audio;
};


const reproduzirSom = (dadosDrum, elementoDrumPad) => {
    try {
        const audio = criarElementoAudio(dadosDrum.som);
        audio.currentTime = 0;
        audio.play().catch(erro => {
            console.warn('Erro ao reproduzir áudio:', erro);
        });
        

        elementoDrumPad.classList.add('ativo');
    } catch (erro) {
        console.error('Erro ao criar elemento de áudio:', erro);
    }
};


const removerClasseAtiva = (evento) => {
    if (evento.propertyName === 'transform') {
        evento.target.classList.remove('ativo');
    }
};


const criarDrumPad = (dadosDrum) => {
    const drumPad = document.createElement('div');
    drumPad.className = 'drum-pad';
    drumPad.setAttribute('data-key', dadosDrum.tecla.toLowerCase());
    
    const elementoTecla = document.createElement('span');
    elementoTecla.className = 'drum-tecla';
    elementoTecla.textContent = dadosDrum.tecla;
    
    const elementoNome = document.createElement('span');
    elementoNome.className = 'drum-nome';
    elementoNome.textContent = dadosDrum.nome;
    
    drumPad.appendChild(elementoTecla);
    drumPad.appendChild(elementoNome);
    

    drumPad.addEventListener('click', () => {
        reproduzirSom(dadosDrum, drumPad);
    });
    

    drumPad.addEventListener('transitionend', removerClasseAtiva);
    
    return drumPad;
};


const encontrarDrumPadPorTecla = (tecla) => {
    const teclaMinuscula = tecla.toLowerCase();
    return document.querySelector(`[data-key="${teclaMinuscula}"]`);
};


const encontrarDadosDrumPorTecla = (tecla) => {
    const teclaMaiuscula = tecla.toUpperCase();
    return dadosDrumKit.find(drum => drum.tecla === teclaMaiuscula);
};


const inicializarDrumKit = () => {
    const containerDrumKit = document.getElementById('drum-kit');
    

    dadosDrumKit.forEach(dadosDrum => {
        const drumPad = criarDrumPad(dadosDrum);
        containerDrumKit.appendChild(drumPad);
    });
    

    document.addEventListener('keydown', (evento) => {
        const dadosDrum = encontrarDadosDrumPorTecla(evento.key);
        const elementoDrumPad = encontrarDrumPadPorTecla(evento.key);
        
        if (dadosDrum && elementoDrumPad) {
            reproduzirSom(dadosDrum, elementoDrumPad);
        }

    });
};


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDrumKit);
} else {
    inicializarDrumKit();
}


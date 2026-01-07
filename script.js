// Array de objetos com configuração da bateria
// Nota: Para usar seus próprios sons, substitua as URLs pelos caminhos dos seus arquivos de áudio
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

// Função para criar e retornar um elemento de áudio
const criarElementoAudio = (caminhoSom) => {
    const audio = new Audio(caminhoSom);
    return audio;
};

// Função para reproduzir o som e aplicar feedback visual
const reproduzirSom = (dadosDrum, elementoDrumPad) => {
    try {
        const audio = criarElementoAudio(dadosDrum.som);
        audio.currentTime = 0;
        audio.play().catch(erro => {
            console.warn('Erro ao reproduzir áudio:', erro);
        });
        
        // Adiciona classe de ativação para feedback visual
        elementoDrumPad.classList.add('ativo');
    } catch (erro) {
        console.error('Erro ao criar elemento de áudio:', erro);
    }
};

// Função para remover o destaque visual após a transição
const removerClasseAtiva = (evento) => {
    if (evento.propertyName === 'transform') {
        evento.target.classList.remove('ativo');
    }
};

// Função para criar um botão de bateria
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
    
    // Adiciona evento de clique
    drumPad.addEventListener('click', () => {
        reproduzirSom(dadosDrum, drumPad);
    });
    
    // Adiciona evento transitionend para remover classe ativo
    drumPad.addEventListener('transitionend', removerClasseAtiva);
    
    return drumPad;
};

// Função para encontrar o elemento do drum pad pela tecla
const encontrarDrumPadPorTecla = (tecla) => {
    const teclaMinuscula = tecla.toLowerCase();
    return document.querySelector(`[data-key="${teclaMinuscula}"]`);
};

// Função para encontrar os dados do drum pela tecla
const encontrarDadosDrumPorTecla = (tecla) => {
    const teclaMaiuscula = tecla.toUpperCase();
    return dadosDrumKit.find(drum => drum.tecla === teclaMaiuscula);
};

// Função principal para inicializar a bateria
const inicializarDrumKit = () => {
    const containerDrumKit = document.getElementById('drum-kit');
    
    // Renderiza os botões dinamicamente usando forEach
    dadosDrumKit.forEach(dadosDrum => {
        const drumPad = criarDrumPad(dadosDrum);
        containerDrumKit.appendChild(drumPad);
    });
    
    // Adiciona evento de teclado global
    document.addEventListener('keydown', (evento) => {
        const dadosDrum = encontrarDadosDrumPorTecla(evento.key);
        const elementoDrumPad = encontrarDrumPadPorTecla(evento.key);
        
        if (dadosDrum && elementoDrumPad) {
            reproduzirSom(dadosDrum, elementoDrumPad);
        }
        // Se a tecla não estiver mapeada, não faz nada (tratamento de erro implícito)
    });
};

// Inicializa a bateria quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDrumKit);
} else {
    inicializarDrumKit();
}


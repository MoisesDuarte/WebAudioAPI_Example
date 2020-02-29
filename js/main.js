// Instanciando AudioContext
const audioContext = new AudioContext();
const gainNode = audioContext.createGain(); // Node para controle de volume
const pannerNode = new StereoPannerNode(audioContext, { pan: 0 }); // Node para de música

// Pegando o elemento do audio e passando para o contexto
const audioElement = document.querySelector('audio');
audioElement.src = 'audio/WaterSurface.mp3';
const musicSelect = document.querySelector('#music-selection');
const track = audioContext.createMediaElementSource(audioElement);

// Conectando Nodes (Source -> Modification -> Modification -> Destination)
track.connect(gainNode).connect(pannerNode).connect(audioContext.destination);

// Funcionalidade Play/Pause
const playButton = document.querySelector('button');
playButton.addEventListener('click', function() {
    // Checa se contexto está em suspensão (autoplay policy do browser)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Roda ou pausa de acordo com o estado
    if (this.dataset.tocando === 'false') {
        audioElement.play();
        this.dataset.tocando = 'true';
    } else if (this.dataset.tocando === 'true') {
        audioElement.pause();
        this.dataset.tocando = 'false';
    }

    console.log('Tocando = ' + this.dataset.tocando);
}, false);

// Checa se a música já acabou
audioElement.addEventListener('ended', () => {
    playButton.dataset.tocando = 'false';
}, false);

// Funcionalidade Volume
const volumeControl = document.querySelector('#volume');
volumeControl.addEventListener('input', function(){
    gainNode.gain.value = this.value; // Adicionando value de input ao gainNode
    console.log(gainNode.gain.value)
}, false);

// Funcionalidade Panning
const pannerControl = document.querySelector('#panner');
pannerControl.addEventListener('input', function() {
    pannerNode.pan.value = this.value;
}, false);

// Funcionalidade TrocarMusica
musicSelect.addEventListener('change', function() {
    audioElement.pause();
    audioElement.src = 'audio/' + this.value + '.mp3';
    playButton.dataset.tocando = 'true';
    audioElement.play();
}, false);
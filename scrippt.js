const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

// Controles
let teclaEsquerdaPressionada = false;
let teclaDireitaPressionada = false;

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA') teclaEsquerdaPressionada = true;
  if (e.code === 'KeyD') teclaDireitaPressionada = true;
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyA') teclaEsquerdaPressionada = false;
  if (e.code === 'KeyD') teclaDireitaPressionada = false;
});

class Entidade {
  #x;
  #y;

  constructor(x, y, largura, altura, cor) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = cor;
  }

  desenhar() {
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
  }

  get x() {
    return this.#x;
  }

  set x(valor) {
    this.#x = valor;
  }

  get y() {
    return this.#y;
  }

  set y(valor) {
    this.#y = valor;
  }
}

class Jogador extends Entidade {
  #velocidade_x;

  constructor(x, y, largura, altura, cor) {
    super(x, y, largura, altura, cor);
    this.#velocidade_x = 5;
  }

  moverEsquerda() {
    this.x -= this.#velocidade_x;
    if (this.x < 0) this.x = 0;
  }

  moverDireita() {
    this.x += this.#velocidade_x;
    if (this.x + this.largura > canvas.width) {
      this.x = canvas.width - this.largura;
    }
  }

  atualizar() {
    if (teclaEsquerdaPressionada) this.moverEsquerda();
    if (teclaDireitaPressionada) this.moverDireita();
  }
}

class Jogo {
  constructor() {
    this.jogador = new Jogador(180, canvas.height - 60, 40, 40, 'black');
    this.ets = this.criarETs();
  }

  criarETs() {
    const ets = [];
    for (let i = 0; i < 4; i++) {
      ets.push(new Entidade(20 + i * 90, 20, 60, 40, 'green'));
    }
    return ets;
  }

  desenharETs() {
    ctx.fillStyle = 'white';
    this.ets.forEach(et => {
      et.desenhar();
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText('', et.x + 15, et.y + 25);
    });
  }

  atualizar() {
    this.jogador.atualizar();
  }

  desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.jogador.desenhar();
    this.desenharETs();
  }

  loop() {
    this.atualizar();
    this.desenhar();
    requestAnimationFrame(() => this.loop());
  }

  iniciar() {
    this.loop();
  }
}

// Iniciar o jogo
const jogo = new Jogo();
jogo.iniciar();



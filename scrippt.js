const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');


class Entidade{
    #x;
    #y;
    constructor(x,y,largura,altura,cor){
        this.x = x,
        this.y = y,
        this.largura = largura,
        this.altura = altura,
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
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

class Personagem extends Entidade {
    #velocidade_y;
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor);
        this.#velocidade_y = 0;
        this.pulando = false;
        this.imagem = new Image();
        this.imagem.src = './image.jpg';
    }
    
    atualizar() {
        if (this.pulando) {
            this.y -= this.#velocidade_y;
            this.#velocidade_y -= Jogo.gravidade;
            if (this.y >= canvas.height - 50) {
                this.#velocidade_y = 0;
                this.y = canvas.height - 50;
                this.pulando = false;
            }
        }
    }
}

const objeto_na_tela = new Entidade(50,50,50,50,'black')



function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    objeto_na_tela.desenhar()
    //inserir as funções de desenhar, atualizar, colisão aqui
    requestAnimationFrame(loop)
    if (!Jogo.gameOver) {
        requestAnimationFrame(this.loop);
    }
}
loop()



let alfaces = [];
let pontuacao = 0;
let tempoUltimaAlface = 0;
const INTERVALO_NOVA_ALFACE = 1000; // Alface nova a cada 1 segundo
const MAX_ALFACES_TELA = 15; // Número máximo de alfaces visíveis na tela
const OBJETIVO_ALFACES = 30; // Nosso objetivo de 30 alfaces
let jogoFinalizado = false; // Flag para controlar o estado do jogo

function setup() {
  createCanvas(600, 400);
  // Crie algumas alfaces iniciais para o jogador começar
  for (let i = 0; i < 5; i++) {
    criarAlface();
  }
}

function draw() {
  background(135, 206, 235); // Céu azul claro

  desenharCampo(); // Desenha o campo verde

  // Somente desenha e permite colher se o jogo não estiver finalizado
  if (!jogoFinalizado) {
    // Desenha e verifica as alfaces
    for (let i = alfaces.length - 1; i >= 0; i--) {
      let alface = alfaces[i];
      desenharAlface(alface.x, alface.y);
    }

    // Adiciona uma nova alface periodicamente, se ainda não atingimos o objetivo
    if (millis() - tempoUltimaAlface > INTERVALO_NOVA_ALFACE && alfaces.length < MAX_ALFACES_TELA && pontuacao < OBJETIVO_ALFACES) {
      criarAlface();
      tempoUltimaAlface = millis();
    }

    // Verifica se o objetivo foi atingido
    if (pontuacao >= OBJETIVO_ALFACES) {
      jogoFinalizado = true;
    }
  }

  mostrarPontuacao();

  // Mostra a mensagem de vitória se o jogo estiver finalizado
  if (jogoFinalizado) {
    mostrarMensagemVitoria();
  }
}

function mousePressed() {
  // Somente permite colher se o jogo não estiver finalizado
  if (!jogoFinalizado) {
    // Verifica se o clique foi em uma alface
    for (let i = alfaces.length - 1; i >= 0; i--) {
      let alface = alfaces[i];
      let d = dist(mouseX, mouseY, alface.x, alface.y);
      if (d < 25) { // 25 é o raio da alface (metade do tamanho 50)
        alfaces.splice(i, 1); // Remove a alface colhida
        pontuacao++;
      }
    }
  }
}

function criarAlface() {
  // Garante que a alface apareça dentro do campo verde
  let x = random(50, width - 50);
  let y = random(height / 2 + 20, height - 50); // Ajusta para aparecer no campo
  alfaces.push({ x: x, y: y });
}

function desenharCampo() {
  fill(124, 252, 0); // Verde grama
  noStroke();
  rect(0, height / 2, width, height / 2); // Metade inferior da tela
}

function desenharAlface(x, y) {
  fill(0, 128, 0); // Verde escuro para a alface
  noStroke();
  ellipse(x, y, 50, 40); // Base da alface
  ellipse(x - 10, y - 10, 30, 25); // Folha superior esquerda
  ellipse(x + 10, y - 10, 30, 25); // Folha superior direita
  ellipse(x, y + 15, 40, 20); // Folha inferior
}

function mostrarPontuacao() {
  fill(0); // Cor do texto preta
  textSize(24);
  textAlign(LEFT, TOP);
  text("Alfaces: " + pontuacao, 10, 10);
}

function mostrarMensagemVitoria() {
  fill(255); // Cor do texto branca
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Parabéns! Você colheu 30 alfaces!", width / 2, height / 2);
  textSize(20);
  text("Pressione R para reiniciar", width / 2, height / 2 + 40);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (jogoFinalizado) {
      // Reinicia o jogo
      pontuacao = 0;
      alfaces = [];
      tempoUltimaAlface = 0;
      jogoFinalizado = false;
      for (let i = 0; i < 5; i++) {
        criarAlface();
      }
    }
  }
}
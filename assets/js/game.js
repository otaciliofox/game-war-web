function start() {
  let jogo = {};
  let fimdejogo = false;
  let energiaAtual = 3;
  let pontos = 0;
  let salvos = 0;
  let perdidos = 0;
  let velocidade = 5;
  let posicaoY = parseInt(Math.random() * 334);
  let podeAtirar = true;

  let somDisparo = document.getElementById("somDisparo");
  let somExplosao = document.getElementById("somExplosao");
  let musica = document.getElementById("musica");
  let somGameover = document.getElementById("somGameover");
  let somPerdido = document.getElementById("somPerdido");
  let somResgate = document.getElementById("somResgate");

  let TECLA = {
    W: 87,
    S: 83,
    D: 68,
  };

  function movefundo() {
    left = parseInt($("#background").css("background-position"));
    $("#background").css("background-position", left - 1);
  }

  function movejogador() {
    if (jogo.pressionou[TECLA.W]) {
      let topo = parseInt($("#player").css("top"));

      if (topo > 1) {
        $("#player").css("top", topo - 10);
      }
    }

    if (jogo.pressionou[TECLA.S]) {
      let topo = parseInt($("#player").css("top"));
      const edge = parseInt($("#background").css("height")) - 166;

      if (topo < edge) {
        $("#player").css("top", topo + 10);
      }
    }

    if (jogo.pressionou[TECLA.D]) {
      disparo();
    }
  }

  function moveamigo() {
    posicaoX = parseInt($("#friend").css("left"));
    $("#friend").css("left", posicaoX + 1);

    if (posicaoX > 906) {
      $("#friend").css("left", 0);
    }
  }

  function moveinimigo1() {
    posicaoX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", posicaoX - velocidade);
    $("#enemy1").css("top", posicaoY);

    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", posicaoY);
    }
  }

  function moveinimigo2() {
    posicaoX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", posicaoX - 3);

    if (posicaoX <= 0) {
      $("#enemy2").css("left", 775);
    }
  }

  function disparo() {
    somDisparo.play();
    if (podeAtirar == true) {
      podeAtirar = false;

      topo = parseInt($("#player").css("top"));
      posicaoX = parseInt($("#player").css("left"));
      tiroX = posicaoX + 190;
      topoTiro = topo + 37;
      $("#background").append("<div id='bullet'></div");
      $("#bullet").css("top", topoTiro);
      $("#bullet").css("left", tiroX);

      var tempoDisparo = window.setInterval(executaDisparo, 30);
    }

    function executaDisparo() {
      posicaoX = parseInt($("#bullet").css("left"));
      $("#bullet").css("left", posicaoX + 15);

      if (posicaoX > 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#bullet").remove();
        podeAtirar = true;
      }
    }
  }

  function explosao1(inimigo1X, inimigo1Y) {
    somExplosao.play();
    $("#background").append("<div id='blow1'></div");
    $("#blow1").css("background-image", "url(assets/imgs/explosao.png)");
    let div = $("#blow1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    let tempoExplosao = window.setInterval(removeExplosao, 1000);

    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  }

  function explosao2(inimigo2X, inimigo2Y) {
    somExplosao.play();
    $("#background").append("<div id='blow2'></div");
    $("#blow2").css("background-image", "url(assets/imgs/explosao.png)");
    let div2 = $("#blow2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    let tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  }

  function explosao3(amigoX, amigoY) {
    somPerdido.play();
    $("#background").append("<div id='blow3' class='anima4'></div");
    $("#blow3").css("top", amigoY);
    $("#blow3").css("left", amigoX);
    let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
      $("#blow3").remove();
      window.clearInterval(tempoExplosao3);
      tempoExplosao3 = null;
    }
  }

  function reposicionaInimigo2() {
    let tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      if (fimdejogo == false) {
        $("#background").append("<div id=enemy2></div");
      }
    }
  }

  function reposicionaAmigo() {
    let tempoAmigo = window.setInterval(reposiciona6, 6000);

    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if (fimdejogo == false) {
        $("#background").append("<div id='friend' class='anima3'></div>");
      }
    }
  }

  function colisao() {
    let colisao1 = $("#player").collision($("#enemy1"));
    let colisao2 = $("#player").collision($("#enemy2"));
    let colisao3 = $("#bullet").collision($("#enemy1"));
    let colisao4 = $("#bullet").collision($("#enemy2"));
    let colisao5 = $("#player").collision($("#friend"));
    let colisao6 = $("#enemy2").collision($("#friend"));

    if (colisao1.length > 0) {
      energiaAtual--;
      inimigo1X = parseInt($("#enemy1").css("left"));
      inimigo1Y = parseInt($("#enemy1").css("top"));
      explosao1(inimigo1X, inimigo1Y);

      posicaoY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", posicaoY);
    }

    if (colisao2.length > 0) {
      energiaAtual--;
      inimigo2X = parseInt($("#enemy2").css("left"));
      inimigo2Y = parseInt($("#enemy2").css("top"));
      explosao2(inimigo2X, inimigo2Y);

      $("#enemy2").remove();

      reposicionaInimigo2();
    }

    if (colisao3.length > 0) {
      velocidade = velocidade + 0.3;
      pontos = pontos + 100;
      inimigo1X = parseInt($("#enemy1").css("left"));
      inimigo1Y = parseInt($("#enemy1").css("top"));

      explosao1(inimigo1X, inimigo1Y);
      $("#bullet").css("left", 950);

      posicaoY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", posicaoY);
    }

    if (colisao4.length > 0) {
      velocidade = velocidade + 0.3;
      pontos = pontos + 50;
      inimigo2X = parseInt($("#enemy2").css("left"));
      inimigo2Y = parseInt($("#enemy2").css("top"));
      $("#enemy2").remove();

      explosao2(inimigo2X, inimigo2Y);
      $("#bullet").css("left", 950);

      reposicionaInimigo2();
    }

    if (colisao5.length > 0) {
      somResgate.play();
      salvos++;
      velocidade = velocidade + 0.3;
      reposicionaAmigo();
      $("#friend").remove();
    }

    if (colisao6.length > 0) {
      perdidos++;
      amigoX = parseInt($("#friend").css("left"));
      amigoY = parseInt($("#friend").css("top"));
      explosao3(amigoX, amigoY);
      $("#friend").remove();

      reposicionaAmigo();
    }
  }

  function placar() {
    $("#hud").html(
      `<h2> Pontos: ${pontos} Salvos: ${salvos} Perdidos: ${perdidos}</h2>`
    );
  }

  function energia() {
    if (energiaAtual == 3) {
      $("#energy").css("background-image", "url(assets/imgs/energia3.png)");
    }

    if (energiaAtual == 2) {
      $("#energy").css("background-image", "url(assets/imgs/energia2.png)");
    }

    if (energiaAtual == 1) {
      $("#energy").css("background-image", "url(assets/imgs/energia1.png)");
    }

    if (energiaAtual == 0) {
      gameOver();
      $("#energy").css("background-image", "url(assets/imgs/energia0.png)");
    }
  }

  function gameOver() {
    fimdejogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    $("#player").remove();
    $("#enemy1").remove();
    $("#enemy2").remove();
    $("#friend").remove();

    $("#background").append("<div id='end'></div>");

    $("#end").html(
      `<h1> Game Over </h1><p>Sua pontuação foi: ${pontos}</p><div id='restart' onClick='reiniciaJogo()'><h3>Jogar Novamente</h3></div>`
    );
  }

  function loop() {
    movefundo();
    movejogador();
    moveamigo();
    moveinimigo1();
    moveinimigo2();
    colisao();
    placar();
    energia();
  }

  $("#how-to").hide();

  $("#background").append("<div id='player' class='anima1'></div>");
  $("#background").append("<div id='enemy1' class='anima2'></div>");
  $("#background").append("<div id='enemy2'></div>");
  $("#background").append("<div id='friend' class='anima3'></div>");
  $("#background").append("<div id='hud'></div>");
  $("#background").append("<div id='energy'></div>");

  jogo.pressionou = [];
  musica.addEventListener(
    "ended",
    function () {
      musica.currentTime = 0;
      musica.play();
    },
    false
  );
  musica.play();

  $(document).keydown(function (e) {
    jogo.pressionou[e.which] = true;
  });

  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false;
  });

  jogo.timer = setInterval(loop, 30);
}

function reiniciaJogo() {
  somGameover.pause();
  $("#end").remove();
  start();
}

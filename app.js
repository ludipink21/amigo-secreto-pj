// ======================
// 🎤 ASSISTENTE VIRTUAL
// ======================
function falar(texto) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.log("Seu navegador não suporta síntese de voz.");
  }
}

// ======================
// 👥 GERENCIAMENTO DE NOMES
// ======================
let amigos = [];
let amigosDisponiveis = [];

function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (nome === "") {
    falar("Digite um nome para adicionar.");
    alert("Por favor, digite um nome válido!");
    return;
  }

  if (amigos.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    return;
  }

  amigos.push(nome);
  amigosDisponiveis.push(nome);
  atualizarLista();
  falar(`${nome} foi adicionado à lista.`);
  input.value = "";

  document.getElementById("btnReiniciar").disabled = false;
}

function atualizarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((nome) => {
    const li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
  });
}

// ======================
// 🎲 SORTEIO COM FLIP
// ======================
function sortearAmigo() {
  if (amigosDisponiveis.length === 0) {
    alert("Todos os amigos já foram sorteados. Reinicie o jogo para começar novamente.");
    falar("Todos os amigos já foram sorteados. Reinicie o jogo para começar novamente.");
    return;
  }

  const indice = Math.floor(Math.random() * amigosDisponiveis.length);
  const sorteado = amigosDisponiveis[indice];
  amigosDisponiveis.splice(indice, 1);

  const giftCard = document.getElementById("giftCard");
  const giftImage = document.getElementById("giftImage");
  const nameReveal = document.getElementById("nameReveal");

  giftCard.style.display = "flex";
  giftImage.style.display = "block";
  giftImage.classList.remove("gift-flip");
  nameReveal.style.display = "none";

  falar("Clique no presente para descobrir seu amigo secreto.");

  giftCard.onclick = () => {
    // adiciona animação de flip
    giftImage.classList.add("gift-flip");

    setTimeout(() => {
      // mostra nome no meio da animação
      nameReveal.textContent = sorteado;
      nameReveal.style.display = "block";

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      falar(`O seu amigo secreto é ${sorteado}.`);
    }, 400); // meio da animação

    // remove a classe após a animação para poder repetir
    setTimeout(() => {
      giftImage.classList.remove("gift-flip");
    }, 800);
  };
}

// ======================
// 🔄 REINICIAR JOGO
// ======================
function reiniciarJogo() {
  amigos = [];
  amigosDisponiveis = [];
  atualizarLista();

  const giftCard = document.getElementById("giftCard");
  const giftImage = document.getElementById("giftImage");
  const nameReveal = document.getElementById("nameReveal");

  giftCard.style.display = "none";
  giftImage.classList.remove("gift-flip");
  nameReveal.style.display = "none";

  document.getElementById("btnReiniciar").disabled = true;

  falar("O jogo foi reiniciado.");
}

// =====================
// SCROLL SUAVE
// =====================
let scrollAtual = 0;
let scrollAlvo  = 0;
let animando    = false;
const suavidade = 0.08; // 0.05 = mais lento | 0.15 = mais rápido

function animarScroll() {
  const diferenca = scrollAlvo - scrollAtual;

  // para quando chegar perto o suficiente
  if (Math.abs(diferenca) < 0.5) {
    scrollAtual = scrollAlvo;
    window.scrollTo(0, scrollAtual);
    animando = false;
    return;
  }

  scrollAtual += diferenca * suavidade;
  window.scrollTo(0, scrollAtual);
  requestAnimationFrame(animarScroll);
}

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollAlvo += e.deltaY * 1.2; // multiplica a velocidade do scroll

  // limita o alvo entre 0 e o fim da página
  scrollAlvo = Math.max(0, Math.min(scrollAlvo, document.body.scrollHeight - window.innerHeight));

  if (!animando) {
    animando = true;
    requestAnimationFrame(animarScroll);
  }
}, { passive: false });

// =====================
// EFEITO DE ENTRADA DOS ELEMENTOS AO SCROLLAR
// =====================
const elementosAnimados = document.querySelectorAll(
  '.card, .container-imagem, #servicos, #arquivos, h1, h2, h3, p, nav'
);

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 }); // aparece quando 15% do elemento estiver visível

elementosAnimados.forEach(el => observador.observe(el));


// =====================
// TEXTO DINÂMICO DO H1
// =====================
const titulos = [
  'Develop Full Stack',
  'Front-end Developer',
  'Back-end Developer',
  'UI/UX Designer',
  'IA Enthusiast',
];

const span     = document.getElementById('titulo-dinamico');
let indiceTitulo  = 0;
let indiceLetra   = 0;
let apagando      = false;
const velocidade  = 100;   // ms por letra ao escrever
const velocadelete= 60;   // ms por letra ao apagar
const pausaFinal  = 2000; // ms de pausa antes de apagar

function digitar() {
  const textoAtual = titulos[indiceTitulo];

  if (!apagando) {
    // escreve letra por letra
    span.textContent = textoAtual.slice(0, indiceLetra + 1);
    indiceLetra++;

    if (indiceLetra === textoAtual.length) {
      // terminou de escrever — pausa antes de apagar
      setTimeout(() => { apagando = true; digitar(); }, pausaFinal);
      return;
    }
    setTimeout(digitar, velocidade);

  } else {
    // apaga letra por letra
    span.textContent = textoAtual.slice(0, indiceLetra - 1);
    indiceLetra--;

    if (indiceLetra === 0) {
      // terminou de apagar — passa para o próximo título
      apagando = false;
      indiceTitulo = (indiceTitulo + 1) % titulos.length;
    }
    setTimeout(digitar, velocadelete);
  }
}

digitar();


// =====================
// CARROSSEL (mantido igual)
// =====================
const track   = document.querySelector('.carrossel-track');
const wrapper = document.querySelector('.carrossel-wrapper');
const btnEsq  = document.getElementById('seta-esq');
const btnDir  = document.getElementById('seta-dir');

let posicao = 0;

function larguraCard() {
  const card = track.querySelector('.container-imagem');
  return card.offsetWidth + 20;
}

function atualizar() {
  const total    = track.querySelectorAll('.container-imagem').length;
  const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
  const maxPos   = Math.max(0, total - visiveis);

  track.style.transform = `translateX(-${posicao * larguraCard()}px)`;

  btnEsq.disabled = posicao === 0;
  btnDir.disabled = posicao >= maxPos;
}

btnEsq.addEventListener('click', () => {
  if (posicao > 0) { posicao--; atualizar(); }
});

btnDir.addEventListener('click', () => {
  const total    = track.querySelectorAll('.container-imagem').length;
  const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
  if (posicao < total - visiveis) { posicao++; atualizar(); }
});

track.querySelectorAll('.container-imagem').forEach(() => {
  track.addEventListener('click', () => {
    const total    = track.querySelectorAll('.container-imagem').length;
    const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
    const maxPos   = Math.max(0, total - visiveis);
    if (posicao < maxPos) { posicao++; atualizar(); }
  });
});

window.addEventListener('resize', atualizar);
atualizar();


function larguraCard() {
  const card = track.querySelector('.container-imagem');
  return card.offsetWidth + 20; // largura + gap
}

function atualizar() {
  const total    = track.querySelectorAll('.container-imagem').length;
  const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
  const maxPos   = Math.max(0, total - visiveis);

  track.style.transform = `translateX(-${posicao * larguraCard()}px)`;

  // seta some quando está no limite
  btnEsq.disabled = posicao === 0;
  btnDir.disabled = posicao >= maxPos;
}

btnEsq.addEventListener('click', () => {
  if (posicao > 0) { posicao--; atualizar(); }
});

btnDir.addEventListener('click', () => {
  const total    = track.querySelectorAll('.container-imagem').length;
  const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
  if (posicao < total - visiveis) { posicao++; atualizar(); }
});

// Clique direto na imagem também avança
track.querySelectorAll('.container-imagem').forEach((card, i) => {
  card.addEventListener('click', () => {
    const total    = track.querySelectorAll('.container-imagem').length;
    const visiveis = Math.floor(wrapper.offsetWidth / larguraCard());
    const maxPos   = Math.max(0, total - visiveis);
    if (posicao < maxPos) { posicao++; atualizar(); }
  });
});

window.addEventListener('resize', atualizar);
atualizar();

const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));

dots.forEach(dot => {
  dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
});

// Mapeamento: alt da imagem → arquivo a abrir
const paginasPorImagem = {
  "conversor":     "./Conversor de moedas/dindin.html",
  "gerador-css":   "./Gerador css/gerador.html",
  "pixel-combat":  "./Pixel Combat/pixel-fight.html",
  "construcao":    null  // null = não abre nada (em construção)
};

document.querySelectorAll("#arquivos .container-imagem img").forEach(img => {
  const pagina = paginasPorImagem[img.alt];

  if (pagina) {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      window.open(pagina, "_blank");
      // Para abrir na mesma aba, troque por:
      // window.location.href = pagina;
    });
  }
});

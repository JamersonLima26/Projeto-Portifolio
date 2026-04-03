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
  "conversor":     "./Conversor de moedas/conversor.html",
  "gerador-css":   "./Gerador css/gerador.html",
  "pixel-combat":  "./Projeto Mozart/pixel combat.html",
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

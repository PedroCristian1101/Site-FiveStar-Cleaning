/* ===== CONFIGURAÇÃO ===== */
const WHATSAPP = "5531995563427"; // troque pelo seu número (com 55 + DDD)
const MENSAGEM = "Olá! Gostaria de solicitar um orçamento.";
const GOOGLE_REVIEWS_URL = "https://share.google/hoAwjy2xPVfAmtCyw"; // link das suas avaliações no Google Meu Negócio

/* Avaliações reais do Google (copiadas manualmente). Para adicionar mais, copie uma linha e altere nome e texto. */
const REVIEWS = [
  { name: "Hannah Cook", text: "Pablo acabou de limpar dois tapetes na minha casa, onde meus gatos estavam urinando e marcando território. Ele fez um trabalho maravilhoso, eliminando o cheiro. Minha casa está muito mais limpa. Com certeza, contratarei seus serviços novamente no futuro. Recomendo-o a todos!", stars: 5 },
  { name: "Ketaki Adhikari", text: "Pablo foi muito atencioso e agendar a visita foi fácil. Ele fez um trabalho incrível limpando nossos carpetes, que estavam bem sujos, em dois quartos e no corredor. Com certeza, trabalharemos com ele novamente!", stars: 5 },
  { name: "Sarah Nason", text: "Foi ótimo trabalhar com o Pablo. Ele foi profissional, pontual e fez um trabalho excepcional na limpeza dos meus móveis. Meus sofás parecem e cheiram a novos. Com certeza, contratarei seus serviços novamente!", stars: 5 },
  { name: "Loren Sampson", text: "Pablo fez um ótimo trabalho limpando meus bancos de bar e meu sofá!", stars: 5 },
  { name: "Patricia Fennell-Petty", text: "Pablo veio e limpou dois tapetes e duas cadeiras na casa da minha mãe. Ele fez um trabalho excelente e minha mãe ficou muito satisfeita! Ele foi pontual, gentil, muito dedicado e experiente! Com certeza o contrataremos novamente! Recomendo muito!", stars: 5 },
  { name: "Patty Nagle", text: "Pablo foi um verdadeiro profissional: respondeu rapidamente, cobrou um preço muito razoável, foi pontual e seu trabalho foi meticuloso. Nossos tapetes estão impecáveis, ficaram lindos. Obrigado, Pablo!", stars: 5 },
  { name: "Yava Tay", text: "Quando você sente a limpeza no ambiente e o cheiro agradável, sabe que escolheu a pessoa certa para limpar seu tapete. O que mais me impressionou foi a rapidez e a eficiência do serviço. Recomendo o Pablo e sua equipe para esse tipo de trabalho.", stars: 5 },
  { name: "Pax Romana", text: "Excelente atendimento ao cliente e habilidades de limpeza profissionais e eficientes. Pablo fez o melhor que pôde em um tapete de 20 anos, e estamos muito satisfeitos. Recomendo muito! Cinco estrelas!", stars: 5 },
  { name: "Karen Sweet", text: "O preço da limpeza de um sofá, duas poltronas e um tapete foi razoável, e os resultados foram visivelmente excelentes. Pablo foi muito pontual, simpático, organizado e eficiente. Com certeza voltarei a contratá-lo.", stars: 5 },
  { name: "Glenn Guyer", text: "Pablo se comunicou muito bem conosco por e-mail e mensagem de texto. Ele foi rápido, eficiente e o preço foi razoável. Nosso tapete era antigo e apresentava alguns desafios, e ele fez um ótimo trabalho considerando essas dificuldades.", stars: 5 },
  { name: "Nikita", text: "Eu tinha carpetes muito sujos e manchados, deixados pelos meus inquilinos, e sinceramente achei que não havia mais jeito. O Pablo veio e fez um trabalho absolutamente incrível na limpeza.", stars: 5 },
  { name: "Sidnei Soares", text: "Eu recomendo serviço de qualidade meu sofá ficou novo 👏👏👏", stars: 5 }
];

/* Fotos das limpezas: coloque suas fotos na pasta "fotos" e liste aqui.
   Exemplo: { src: "fotos/sofa-1.jpg", alt: "Sofá cinza após a limpeza" }
   Enquanto src estiver vazio, aparece um espaço reservado. */
const PHOTOS = [
  { src: "", alt: "" }, { src: "", alt: "" }, { src: "", alt: "" },
  { src: "", alt: "" }, { src: "", alt: "" }, { src: "", alt: "" }
];

/* WhatsApp */
const link = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAGEM);
document.querySelectorAll("[data-whats]").forEach(a => { a.href = link; a.target = "_blank"; a.rel = "noopener"; });
document.getElementById("googleLink").href = GOOGLE_REVIEWS_URL;

/* Carrossel infinito: repete os itens e anima a metade */
function marquee(el, items, secondsPerItem) {
  let base = items.slice();
  while (base.length < 8) base = base.concat(items);
  const dup = base.map(h => h.replace(/^<(\w+)/, '<$1 aria-hidden="true"'));
  el.innerHTML = base.join("") + dup.join("");
  el.style.setProperty("--dur", base.length * secondsPerItem + "s");
}
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

marquee(document.getElementById("reviews"), REVIEWS.map(r => `
  <article class="review">
    <div class="stars" aria-label="${r.stars} de 5 estrelas">${"★".repeat(r.stars)}</div>
    <p>${esc(r.text)}</p>
    <footer><span class="avatar">${esc(r.name[0])}</span><div><strong>${esc(r.name)}</strong><small>Avaliação no Google</small></div></footer>
  </article>`), 7);

const ph = '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/></svg>Foto da limpeza</span>';
marquee(document.getElementById("gallery"), PHOTOS.map(p => p.src
  ? `<figure class="shot"><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy"></figure>`
  : `<figure class="shot">${ph}</figure>`), 6);

/* Antes / depois */
const range = document.getElementById("baRange");
const after = document.getElementById("baAfter");
const handle = document.getElementById("baHandle");
range.addEventListener("input", () => {
  after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
  handle.style.left = range.value + "%";
});

/* Menu mobile */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

document.getElementById("year").textContent = new Date().getFullYear();

/* Cabeçalho: logo grande no topo, menor ao rolar */
const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
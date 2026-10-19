/* ==========================================================
   MISTER CHAPÉU · script.js (v2)
   Edite CONFIG e FLAVORS para alterar contato, mensagens e sabores.
   ========================================================== */

const CONFIG = {
  whatsapp: "5541988737581", // link da bio do Instagram
  instagram: "https://www.instagram.com/misterchapeu_molhos/",
  messages: {
    pedido: "Olá, Mister Chapéu! Vim pelo site e quero fazer um pedido.",
    kit5: "Olá, Mister Chapéu! Vim pelo site e quero o Kit 5 Molhos Premium (R$ 119,90) com a caneca personalizada.",
    kit6: "Olá, Mister Chapéu! Vim pelo site e quero o Kit 6 Molhos Premium (R$ 149,90) com o copo personalizado.",
    revenda: "Olá, Mister Chapéu! Tenho um estabelecimento e quero receber o catálogo e as condições para lojistas.",
    sabor: (nome) => `Olá, Mister Chapéu! Vim pelo site e quero pedir o ${nome}.`,
  },
  heroInterval: 5000,
};

/*
  Sabores confirmados nas publicações e no Kit Completo do Instagram.
  - name: nome exibido · full: nome usado na mensagem do WhatsApp
  - tag: categoria curta · pack: embalagem · glow: cor do brilho atrás da foto
*/
const FLAVORS = [
  {
    id: "tradicional", name: "Tradicional", full: "Molho de Pimenta Tradicional",
    tag: "Molho de pimenta", pack: "Garrafa de vidro",
    desc: "O molho de pimenta clássico da casa. Bom começo pra quem ainda não conhece a Mister Chapéu.",
    img: "assets/img/garrafa-tradicional.webp", glow: "#e2892c",
  },
  {
    id: "pimenta-forte", name: "Pimenta Forte", full: "Molho de Pimenta Forte",
    tag: "Molho de pimenta", pack: "Garrafa de vidro",
    desc: "Pra quem gosta de sentir a pimenta. A versão mais intensa da linha.",
    img: "assets/img/garrafa-pimenta-forte.webp", glow: "#e7a24a",
  },
  {
    id: "especial-da-casa", name: "Especial da Casa", full: "Molho Especial da Casa",
    tag: "Da casa", pack: "Garrafa de vidro",
    desc: "O sabor que leva o nome da casa. Pergunte no WhatsApp e descubra por que ele é o especial.",
    img: "assets/img/garrafa-especial-da-casa.webp", glow: "#d75a24",
  },
  {
    id: "chocolate-com-pimenta", name: "Chocolate com Pimenta", full: "Molho de Chocolate com Pimenta",
    tag: "Doce com pimenta", pack: "Garrafa de vidro",
    desc: "Chocolate e pimenta no mesmo frasco. Tem cliente que come de colher.",
    img: "assets/img/garrafa-chocolate-com-pimenta.webp", glow: "#8a3a1c",
  },
  {
    id: "agridoce", name: "Geleia Agridoce", full: "Geleia de Pimenta Agridoce",
    tag: "Geleia de pimenta", pack: "Garrafa de vidro",
    desc: "Geleia de pimenta no ponto agridoce, com a cor mais viva da linha.",
    img: "assets/img/garrafa-agridoce.webp", glow: "#d3262a",
  },
  {
    id: "maionese-verde", name: "Maionese Verde", full: "Maionese Verde",
    tag: "Maionese", pack: "Pote de vidro",
    desc: "A maionese verde da Mister Chapéu, no pote de vidro com tampa dourada.",
    img: "assets/img/pote-maionese-verde.webp", wide: true, glow: "#a9b86c",
  },
];

const HAT = "assets/img/chapeu.png";

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ARROW = '<svg class="tab__arrow" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-arrow"/></svg>';

/* ---------- WhatsApp ---------- */
function wireWhatsApp() {
  $$("[data-wa]").forEach((el) => {
    const msg = CONFIG.messages[el.dataset.wa] || CONFIG.messages.pedido;
    el.href = waLink(typeof msg === "function" ? msg("") : msg);
    el.target = "_blank";
    el.rel = "noopener";
  });
  $$("[data-instagram]").forEach((el) => (el.href = CONFIG.instagram));
}

/* ---------- Faixa ---------- */
function buildMarquee() {
  const track = $("#marquee");
  if (!track) return;
  const one = FLAVORS.map((f) => `<span class="marquee__item">${esc(f.name)}<img src="${HAT}" alt="" width="520" height="379"></span>`).join("");
  track.innerHTML = one + one;
}

/* ---------- Hero: foto com parallax suave ---------- */
function setupHero() {
  const img = $(".hero__media img");
  if (!img || reduceMotion || !window.matchMedia("(min-width: 1000px)").matches) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, window.innerHeight);
      img.style.translate = `0 ${y * 0.18}px`;
      ticking = false;
    });
  }, { passive: true });
}

/* ---------- Chapéu: entra, e se levanta ao passar o mouse ---------- */
function setupHat() {
  const hat = $(".hat");
  const title = $(".hero__title");
  if (!hat || !title) return;
  const tip = (el) => {
    if (reduceMotion || el.classList.contains("tip")) return;
    el.classList.add("tip");
    el.addEventListener("animationend", () => el.classList.remove("tip"), { once: true });
  };
  hat.addEventListener("animationend", (e) => { if (e.animationName === "hat-in") hat.classList.add("is-ready"); });
  title.addEventListener("mouseenter", () => hat.classList.contains("is-ready") && tip(hat));
  title.addEventListener("click", () => hat.classList.contains("is-ready") && tip(hat));

  const fh = $(".final__hat");
  if (fh) {
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { setTimeout(() => tip(fh), 400); o.disconnect(); } }, { threshold: 0.6 }).observe(fh);
    $$(".final .btn").forEach((b) => b.addEventListener("mouseenter", () => tip(fh)));
  }
}

/* ---------- Seletor de sabores ---------- */
function setupPicker() {
  const list = $("#flavor-tabs"), photos = $("#flavor-photos");
  if (!list || !photos) return;
  list.innerHTML = FLAVORS.map((f, i) => `
    <button type="button" class="tab" role="tab" id="tab-${f.id}" aria-controls="flavor-stage" aria-selected="false" tabindex="-1" data-i="${i}">
      <span class="tab__n">${pad(i + 1)}</span><span class="tab__name">${esc(f.name)}</span><span class="tab__tag">${esc(f.tag)}</span>${ARROW}
    </button>`).join("");
  photos.innerHTML = FLAVORS.map((f) =>
    `<img src="${f.img}"${f.wide ? ' class="is-wide"' : ""} alt="${f.wide ? "Pote" : "Garrafa"} de ${esc(f.full)} Mister Chapéu, 250 ml" loading="lazy" decoding="async">`).join("");

  const tabs = $$(".tab", list), imgs = $$("img", photos);
  const info = $(".picker__info"), stage = $("#flavor-stage"), media = $(".picker__media");
  const el = { tag: $("#flavor-tag"), name: $("#flavor-name"), desc: $("#flavor-desc"), pack: $("#flavor-pack"), cta: $("#flavor-cta"), label: $("#flavor-cta-label") };
  let cur = -1, swapT;

  const fill = (f) => {
    el.tag.textContent = f.tag;
    el.name.textContent = f.name;
    el.desc.textContent = f.desc;
    el.pack.textContent = f.pack;
    el.cta.href = waLink(CONFIG.messages.sabor(f.full));
    el.label.textContent = `Pedir ${f.name}`;
  };

  const select = (i, focus = false) => {
    if (i === cur) return;
    const prev = cur;
    cur = i;
    tabs.forEach((t, k) => { const on = k === i; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
    stage.setAttribute("aria-labelledby", tabs[i].id);
    if (focus) tabs[i].focus();
    if (prev > -1 && window.matchMedia("(max-width: 999px)").matches) {
      const t = tabs[i];
      list.scrollTo({ left: t.offsetLeft - (list.clientWidth - t.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
    }

    imgs.forEach((im) => im.classList.remove("was-on"));
    if (prev > -1) { imgs[prev].classList.remove("is-on"); imgs[prev].classList.add("was-on"); }
    imgs[i].classList.add("is-on");
    media.style.setProperty("--glow", FLAVORS[i].glow);
    const ix = $("#flavor-index"); if (ix) ix.textContent = pad(i + 1);

    clearTimeout(swapT);
    if (prev === -1 || reduceMotion) { fill(FLAVORS[i]); return; }
    info.classList.add("is-swapping");
    swapT = setTimeout(() => { fill(FLAVORS[i]); info.classList.remove("is-swapping"); }, 280);
  };

  tabs.forEach((t, i) => t.addEventListener("click", () => select(i)));
  const step = (d) => select((cur + d + tabs.length) % tabs.length);
  $$("[data-flavor]").forEach((b) => b.addEventListener("click", () => step(b.dataset.flavor === "next" ? 1 : -1)));
  const total = $("#flavor-total"), idx = $("#flavor-index");
  if (total) total.textContent = pad(FLAVORS.length);
  // arrastar para os lados no celular
  let x0 = null;
  media.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  media.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
  list.addEventListener("keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) { e.preventDefault(); select((cur + keys[e.key] + tabs.length) % tabs.length, true); }
    if (e.key === "Home") { e.preventDefault(); select(0, true); }
    if (e.key === "End") { e.preventDefault(); select(tabs.length - 1, true); }
  });
  select(0);
}

/* ---------- Conversas: "digitando…" e mensagens em sequência ---------- */
function setupChats() {
  const box = $("#chats");
  if (!box) return;
  const items = $$(".chat__who, .bubble", box);
  if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-shown")); return; }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const run = async () => {
    for (const chat of $$(".chat", box)) {
      const who = $(".chat__who", chat);
      who.classList.add("is-shown");
      for (const b of $$(".bubble", chat)) {
        const t = document.createElement("span");
        t.className = "typing is-shown";
        t.setAttribute("aria-hidden", "true");
        t.innerHTML = "<i></i><i></i><i></i>";
        b.before(t);
        await wait(Math.min(750, 300 + b.textContent.length * 6));
        t.remove();
        b.classList.add("is-shown");
        await wait(180);
      }
      await wait(220);
    }
  };
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { run(); o.disconnect(); } }, { threshold: 0.25 }).observe(box);
}

/* ---------- Menu mobile ---------- */
function setupMenu() {
  const header = $(".header"), toggle = $(".menu-toggle"), nav = $("#menu");
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); } });
  window.matchMedia("(min-width: 1000px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

/* ---------- Header (some ao descer, volta ao subir) + CTA fixo ---------- */
function setupScroll() {
  const header = $(".header"), cta = $(".sticky-cta"), hero = $("#inicio");
  let lastY = window.scrollY, ticking = false, ctaBlocked = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 24);
    if (!header.classList.contains("is-open")) header.classList.toggle("is-hidden", y > 480 && y > lastY + 2);
    if (y < lastY - 2) header.classList.remove("is-hidden");
    lastY = y;
    if (cta) cta.classList.toggle("is-visible", y > hero.offsetHeight * 0.75 && !ctaBlocked);
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });

  // o CTA fixo some quando a chamada final ou o rodapé já estão na tela
  const ends = $$(".final, .footer");
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    ctaBlocked = seen.size > 0;
    update();
  });
  ends.forEach((el) => io.observe(el));
  update();
}

/* ---------- Link ativo ---------- */
function setupActiveNav() {
  const links = $$(".nav__link");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => {
        const on = l.getAttribute("href") === `#${e.target.id}`;
        l.classList.toggle("is-active", on);
        on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.map((l) => $(l.getAttribute("href"))).filter(Boolean).forEach((s) => io.observe(s));
}

/* ---------- Revelação ao rolar ---------- */
function setupReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-in")); return; }
  items.forEach((el) => {
    const sib = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(sib.indexOf(el), 6) * 0.08}s`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  items.forEach((el) => io.observe(el));
}

/* ---------- Início ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireWhatsApp();
  buildMarquee();
  setupHero();
  setupPicker();
  setupChats();
  setupMenu();
  setupScroll();
  setupActiveNav();
  setupReveal();
  setupHat();
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")));
});

// --- GESTÃO DE DADOS (ARRAY DE OBJETOS) ---
const pratos = [
    { id: 1, nome: "Risoto de Cogumelos", preco: "R$ 65", img: "🍄" },
    { id: 2, nome: "Salmão Grelhado", preco: "R$ 82", img: "🐟" },
    { id: 3, nome: "Pasta Artesanal", preco: "R$ 58", img: "🍝" }
];

const faqs = [
    { pergunta: "Aceitam reservas?", resposta: "Sim, pelo site ou telefone." },
    { pergunta: "Possuem opções veganas?", resposta: "Temos um menu exclusivo de plantas." }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function renderContent() {
    const container = document.getElementById('menu-container');
    container.innerHTML = pratos.map(prato => `
        <article class="card">
            <div style="font-size: 3rem">${prato.img}</div>
            <h3>${prato.nome}</h3>
            <p>Preço: ${prato.preco}</p>
            <button class="btn">Pedir Agora</button>
        </article>
    `).join('');

    const accordion = document.getElementById('faq-accordion');
    accordion.innerHTML = faqs.map((f, i) => `
        <div class="accordion-item">
            <button aria-expanded="false" onclick="toggleAccordion(${i})" id="btn-faq-${i}">
                ${f.pergunta}
            </button>
            <div class="content" id="content-faq-${i}" style="display:none">
                <p>${f.resposta}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: FONTE E CONTRASTE ---
let fontSize = 16;
document.getElementById('increase-font').addEventListener('click', () => {
    fontSize += 2;
    document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
});

document.getElementById('decrease-font').addEventListener('click', () => {
    fontSize -= 2;
    document.documentElement.style.setProperty('--font-size-base', fontSize + 'px');
});

document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- CARROSSEL FUNCIONAL ---
let currentSlide = 0;
function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const slides = pratos.length;
    currentSlide = (currentSlide + direction + slides) % slides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- SCROLL REVEAL ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

// --- INICIALIZAÇÃO ---
window.addEventListener("scroll", reveal);
window.onload = () => {
    renderContent();
    reveal();
};

function toggleAccordion(index) {
    const content = document.getElementById(`content-faq-${index}`);
    const btn = document.getElementById(`btn-faq-${index}`);
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';
    btn.setAttribute('aria-expanded', !isVisible);
}

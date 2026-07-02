/* ============================================================
   DENTAL MOON CLINIC & SPA — main.js
   Configuración + funcionalidad completa
   ============================================================ */

/* ── Configuración confirmada ── */
const CLINIC = {
  name:            'Dental Moon Clinic & Spa',
  whatsapp:        '523322436260',
  whatsappDisplay: '+52 33 2243 6260',
  instagram:       'https://www.instagram.com/dentalmoonclinic?igsh=MWVpZGF1cjhmemU5bw==',
  tiktok:          'https://www.tiktok.com/@dental.moon.clini?_r=1&_t=ZS-97T3ey4E09I',
  address:         'Valle de la Uva 5, La Selva, 47750 Atotonilco el Alto, Jal.',
  googleMapsUrl:   '', // Pendiente por confirmar — agrega el link cuando esté disponible
  email:           'dentalmoon18@gmail.com',
};

/* ── Utilidades ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function showToast(msg, duration = 3500) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('is-visible'), duration);
}

function buildWaUrl(message) {
  return `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message.trim())}`;
}

/* ── Header: scroll & sticky ── */
function initHeader() {
  const header = $('.site-header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav toggle */
  const toggle = $('.nav-toggle');
  const nav    = $('#menu-principal');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  /* Close nav on link click */
  $$('a', nav).forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));

  /* Close nav on outside click */
  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

/* ── Active nav link on scroll ── */
function initActiveNav() {
  const links = $$('.main-nav a[href^="#"]');
  const ids   = links.map(a => a.getAttribute('href').slice(1)).filter(Boolean);
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
}

/* ── Reveal on scroll ── */
function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

/* ── Map link: show toast if not configured ── */
function initMapLink() {
  $$('[data-map-link]').forEach(el => {
    if (CLINIC.googleMapsUrl) {
      el.setAttribute('href', CLINIC.googleMapsUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.addEventListener('click', e => {
        e.preventDefault();
        showToast('Google Maps pendiente por confirmar. ¡Vuelve pronto!');
      });
    }
  });
}

/* ── Footer year ── */
function initYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════
   MODAL AVISO DE PRIVACIDAD
   Muestra el modal al primer acceso; guarda aceptación en localStorage
   ══════════════════════════════════════════════ */
function initPrivacyModal() {
  const STORAGE_KEY = 'dentalMoonPrivacyAccepted';
  const modal = document.getElementById('privacyModal');
  if (!modal) return;

  // Ya aceptado: no mostrar
  if (localStorage.getItem(STORAGE_KEY)) return;

  // Mostrar modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Botón Aceptar y continuar
  const acceptBtn = document.getElementById('privacyModalAccept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, '1');
      closeModal();
    });
  }

  // Botón Leer aviso: permite navegar sin cerrar el modal (abre nueva pestaña)
  // Si vuelven, el modal sigue hasta que acepten
}

/* ══════════════════════════════════════════════
   WIZARD — Guía rápida de consulta
   ══════════════════════════════════════════════ */
function initWizard() {
  const form = $('#wizardForm');
  if (!form) return;

  const panels    = $$('.wizard-panel', form);
  const stepDots  = $$('.wizard-step[data-step]');
  let currentStep = 1;

  /* Show a given step panel */
  function showPanel(step) {
    panels.forEach(p => {
      p.classList.toggle('active', Number(p.dataset.panel) === step);
    });
    stepDots.forEach(dot => {
      const n = Number(dot.dataset.step);
      dot.classList.remove('active', 'completed');
      if (n === step) dot.classList.add('active');
      if (n < step)  dot.classList.add('completed');
    });
    currentStep = step;
    // Scroll wizard into view smoothly
    const wizard = $('.wizard-shell');
    if (wizard) {
      const top = wizard.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  /* Next / prev buttons */
  $$('[data-next]', form).forEach(btn => {
    btn.addEventListener('click', () => {
      const next = Number(btn.dataset.next);
      if (next === 4) generateMessage();
      showPanel(next);
    });
  });
  $$('[data-prev]', form).forEach(btn => {
    btn.addEventListener('click', () => showPanel(Number(btn.dataset.prev)));
  });

  /* Step 1 → Step 2: validar checkbox de privacidad */
  const nextStep1Btn = document.getElementById('wizardNextStep1');
  const consentCheck = document.getElementById('w-privacy-consent');
  const consentError = document.getElementById('privacyConsentError');

  if (nextStep1Btn) {
    nextStep1Btn.addEventListener('click', () => {
      if (consentCheck && !consentCheck.checked) {
        consentError.style.display = 'block';
        consentCheck.focus();
        return;
      }
      if (consentError) consentError.style.display = 'none';
      showPanel(2);
    });
  }
  if (consentCheck && consentError) {
    consentCheck.addEventListener('change', () => {
      if (consentCheck.checked) consentError.style.display = 'none';
    });
  }

  /* Build message from form data */
  function getVal(name) {
    const el = form.elements[name];
    if (!el) return '';
    return String(el.value || '').trim();
  }
  function getChecked(name) {
    return $$(`input[name="${name}"]:checked`, form).map(i => i.value);
  }
  function getSelectedChip(name) {
    const checked = $(`input[name="${name}"]:checked`, form);
    return checked ? checked.value : '';
  }

  function buildMessageText() {
    const nombre       = getVal('nombre')        || 'No indicado';
    const telefono     = getVal('telefono')      || 'No indicado';
    const tipo         = getSelectedChip('tipo_consulta') || 'No indicado';
    const zona         = getVal('zona')          || 'No indicada';
    const tiempo       = getVal('tiempo')        || 'No indicado';
    const molestia     = getVal('molestia')      || 'No indicada';
    const sintomas     = getChecked('sintomas');
    const comentarios  = getVal('comentarios')   || 'Sin comentarios adicionales';

    return [
      `Hola Dental Moon Clinic & Spa, quiero agendar una consulta.`,
      ``,
      `Mi nombre es: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Tipo de consulta: ${tipo}`,
      `Zona dental: ${zona}`,
      `Tiempo de evolución: ${tiempo}`,
      `Nivel de molestia: ${molestia}`,
      `Síntomas/motivo: ${sintomas.length ? sintomas.join(', ') : 'No indicados'}`,
      `Comentarios: ${comentarios}`,
      ``,
      `Entiendo que esta guía no sustituye una consulta profesional ni representa un diagnóstico médico.`,
      ``,
      `He leído y acepto el Aviso de Privacidad Integral de Dental Moon Clinic & Spa para el uso de mis datos con fines de orientación y agendamiento.`
    ].join('\n');
  }

  function generateMessage() {
    /* Verificar checkbox de privacidad antes de generar */
    const consentChk = document.getElementById('w-privacy-consent');
    if (consentChk && !consentChk.checked) {
      const err = document.getElementById('privacyConsentError');
      if (err) err.style.display = 'block';
      showPanel(1);
      showToast('⚠️ Por favor acepta el Aviso de Privacidad Integral primero.');
      return;
    }

    const msg = buildMessageText();
    if (!msg) return; // consent check already returned early
    const preview = $('#messagePreview');
    const sendBtn = $('#sendWizard');

    if (preview) preview.textContent = msg;
    if (sendBtn) sendBtn.href = buildWaUrl(msg);
  }

  /* Copy button */
  $('#copyWizard')?.addEventListener('click', async () => {
    const msg = buildMessageText();
    try {
      await navigator.clipboard.writeText(msg);
      showToast('✓ Mensaje copiado al portapapeles.');
    } catch {
      showToast('No se pudo copiar. Selecciona el texto manualmente.');
    }
  });

  /* If user clicks send but hasn't generated yet, build message on the fly */
  $('#sendWizard')?.addEventListener('click', function(e) {
    if (!this.href || this.href === '#' || this.href === window.location.href) {
      e.preventDefault();
      generateMessage();
      // Wait a tick then trigger
      setTimeout(() => {
        const url = buildWaUrl(buildMessageText());
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 100);
    }
  });
}

/* ──────────────────────────────────────────────
   GALLERY: basic lightbox on desktop
   ────────────────────────────────────────────── */
function initGallery() {
  const items = $$('.gallery-item img');
  if (!items.length) return;

  // Only on desktop (no touch)
  if ('ontouchstart' in window) return;

  const overlay = document.createElement('div');
  overlay.className = 'gallery-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Imagen ampliada');
  overlay.innerHTML = `
    <button class="gallery-lightbox__close" aria-label="Cerrar imagen">✕</button>
    <img src="" alt="">
  `;
  document.body.appendChild(overlay);

  const lbImg = $('img', overlay);
  const close = () => { overlay.classList.remove('active'); document.body.style.overflow = ''; };

  items.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  $('.gallery-lightbox__close', overlay).addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Add lightbox styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .gallery-lightbox {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(6,15,34,.9);
      display: grid; place-items: center;
      opacity: 0; pointer-events: none;
      transition: opacity .25s;
      backdrop-filter: blur(8px);
    }
    .gallery-lightbox.active { opacity: 1; pointer-events: auto; }
    .gallery-lightbox img {
      max-width: 90vw; max-height: 85vh;
      border-radius: 24px;
      box-shadow: 0 40px 80px rgba(0,0,0,.5);
      object-fit: contain;
    }
    .gallery-lightbox__close {
      position: absolute; top: 20px; right: 20px;
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,.15);
      color: #fff; font-size: 1.1rem;
      cursor: pointer; border: none;
      display: grid; place-items: center;
      transition: background .2s;
    }
    .gallery-lightbox__close:hover { background: rgba(255,255,255,.28); }
  `;
  document.head.appendChild(style);
}

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  initPrivacyModal();
  initHeader();
  initActiveNav();
  initReveal();
  initMapLink();
  initYear();
  initWizard();
  initGallery();
});

<script setup>
const year = new Date().getFullYear()

const links = [
  { label: 'La Carte',     id: 'carte' },
  { label: 'La Terrasse',  id: 'terrasse' },
  { label: 'Événements',   id: 'evenements' },
  { label: 'Contact',      id: 'contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">

      <!-- Logo & tagline -->
      <div class="footer__brand">
        <p class="footer__name">La Rivière du Moulin</p>
        <p class="footer__tagline">Jazz · Bossa Nova · Art de vivre</p>
        <p class="footer__location">📍 Wissant, Pas-de-Calais</p>
      </div>

      <!-- Navigation -->
      <nav class="footer__nav" aria-label="Navigation pied de page">
        <ul>
          <li v-for="l in links" :key="l.id">
            <a :href="`#${l.id}`" @click.prevent="scrollTo(l.id)">{{ l.label }}</a>
          </li>
        </ul>
      </nav>

      <!-- Réseaux -->
      <div class="footer__socials">
        <a
          href="#"
          class="footer__social-btn"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>
        <a
          href="#"
          class="footer__social-btn"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>

    </div>

    <!-- Barre de bas -->
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>© {{ year }} La Rivière du Moulin — Tous droits réservés</p>
        <p class="footer__bottom-mention">Alcool avec modération. L'abus d'alcool est dangereux pour la santé.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ── Footer ───────────────────────────────────────────── */
.footer {
  background: #1c1410;
  color: rgba(248, 243, 235, 0.65);
}

/* ── Inner ────────────────────────────────────────────── */
.footer__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  flex-wrap: wrap;
}

/* ── Brand ────────────────────────────────────────────── */
.footer__name {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--cream);
  margin-bottom: 0.35rem;
}

.footer__tagline {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sienne-light);
  margin-bottom: 0.75rem;
}

.footer__location {
  font-size: 0.82rem;
  color: rgba(248, 243, 235, 0.45);
}

/* ── Nav ─────────────────────────────────────────────── */
.footer__nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer__nav a {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(248, 243, 235, 0.55);
  transition: color var(--transition);
}

.footer__nav a:hover {
  color: var(--sienne-light);
}

/* ── Réseaux ──────────────────────────────────────────── */
.footer__socials {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.footer__social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  color: rgba(248, 243, 235, 0.55);
  transition: all var(--transition);
}

.footer__social-btn svg {
  width: 18px;
  height: 18px;
}

.footer__social-btn:hover {
  background: var(--sienne);
  border-color: var(--sienne);
  color: var(--white);
}

/* ── Bottom bar ───────────────────────────────────────── */
.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.footer__bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  flex-wrap: wrap;
}

.footer__bottom p {
  font-size: 0.75rem;
  color: rgba(248, 243, 235, 0.3);
}

.footer__bottom-mention {
  font-style: italic;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    gap: 2rem;
  }
  .footer__bottom-inner {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>

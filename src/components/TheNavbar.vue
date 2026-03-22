<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── Scroll behavior ───────────────────────────────────────
const scrolled  = ref(false)
const menuOpen  = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// ── Smooth scroll helper ──────────────────────────────────
function scrollTo(id) {
  menuOpen.value = false
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header :class="['navbar', { 'navbar--scrolled': scrolled }]">
    <div class="navbar__inner container">
      <!-- Logo -->
      <a class="navbar__logo" href="#accueil" @click.prevent="scrollTo('accueil')">
        <span class="navbar__logo-main">La Rivière du Moulin</span>
        <span class="navbar__logo-sub">Jazz &amp; Bossa Nova</span>
      </a>

      <!-- Navigation desktop -->
      <nav class="navbar__nav" aria-label="Navigation principale">
        <ul>
          <li><a href="#carte"      @click.prevent="scrollTo('carte')">La Carte</a></li>
          <li><a href="#terrasse"   @click.prevent="scrollTo('terrasse')">La Terrasse</a></li>
          <li><a href="#evenements" @click.prevent="scrollTo('evenements')">Événements</a></li>
          <li><a href="#contact"    @click.prevent="scrollTo('contact')">Contact</a></li>
        </ul>
      </nav>

      <!-- CTA -->
      <a
        href="#contact"
        class="navbar__cta btn btn-primary"
        @click.prevent="scrollTo('contact')"
      >Réserver</a>

      <!-- Burger mobile -->
      <button
        class="navbar__burger"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="navbar__mobile" :class="{ 'is-open': menuOpen }">
      <ul>
        <li><a href="#carte"      @click.prevent="scrollTo('carte')">La Carte</a></li>
        <li><a href="#terrasse"   @click.prevent="scrollTo('terrasse')">La Terrasse</a></li>
        <li><a href="#evenements" @click.prevent="scrollTo('evenements')">Événements</a></li>
        <li><a href="#contact"    @click.prevent="scrollTo('contact')">Contact</a></li>
        <li>
          <a
            href="#contact"
            class="btn btn-primary navbar__mobile-cta"
            @click.prevent="scrollTo('contact')"
          >Réserver une table</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background 300ms ease, box-shadow 300ms ease, padding 300ms ease;
}

.navbar--scrolled {
  background: var(--white);
  box-shadow: var(--shadow-sm);
  padding: 0.75rem 0;
}

/* ── Inner layout ─────────────────────────────────────── */
.navbar__inner {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Logo ────────────────────────────────────────────── */
.navbar__logo {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  flex-shrink: 0;
}

.navbar__logo-main {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--white);
  transition: color var(--transition);
}

.navbar--scrolled .navbar__logo-main {
  color: var(--text);
}

.navbar__logo-sub {
  font-family: var(--font-body);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  transition: color var(--transition);
}

.navbar--scrolled .navbar__logo-sub {
  color: var(--text-muted);
}

/* ── Nav ─────────────────────────────────────────────── */
.navbar__nav {
  margin-left: auto;
}

.navbar__nav ul {
  display: flex;
  gap: 2.25rem;
}

.navbar__nav a {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  transition: color var(--transition);
  position: relative;
}

.navbar__nav a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width var(--transition);
}

.navbar__nav a:hover {
  color: var(--white);
}
.navbar__nav a:hover::after {
  width: 100%;
}

.navbar--scrolled .navbar__nav a {
  color: var(--text-muted);
}
.navbar--scrolled .navbar__nav a:hover {
  color: var(--sienne);
}

/* ── CTA ─────────────────────────────────────────────── */
.navbar__cta {
  padding: 0.55rem 1.4rem;
  font-size: 0.68rem;
  flex-shrink: 0;
}

/* ── Burger ──────────────────────────────────────────── */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  margin-left: auto;
  padding: 6px;
  cursor: pointer;
}

.navbar__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: transform 250ms ease, opacity 250ms ease;
}

.navbar--scrolled .navbar__burger span {
  background: var(--text);
}

.navbar__burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__burger.is-open span:nth-child(2) { opacity: 0; }
.navbar__burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile menu ─────────────────────────────────────── */
.navbar__mobile {
  display: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 350ms ease;
  background: var(--white);
  border-top: 1px solid var(--beige-dark);
}

.navbar__mobile.is-open {
  max-height: 400px;
}

.navbar__mobile ul {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.25rem;
}

.navbar__mobile a {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--transition);
}

.navbar__mobile a:hover {
  color: var(--sienne);
}

.navbar__mobile-cta {
  display: inline-flex !important;
  margin-top: 0.5rem;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar__nav,
  .navbar__cta { display: none; }
  .navbar__burger,
  .navbar__mobile { display: flex; }
}
</style>

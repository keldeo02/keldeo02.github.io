<script setup>
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="accueil" class="hero">
    <!-- Calque fond dégradé -->
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__bg-overlay" />
      <!-- SVG décoratif : vagues stylisées -->
      <svg class="hero__waves" viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,200 L0,200 Z" fill="rgba(248,243,235,0.06)" />
        <path d="M0,150 C360,90 720,190 1080,140 C1260,115 1380,160 1440,150 L1440,200 L0,200 Z" fill="rgba(248,243,235,0.04)" />
      </svg>
    </div>

    <!-- Contenu principal -->
    <div class="hero__content container">
      <p class="hero__label">
        <span>Jazz</span>
        <span class="hero__dot" aria-hidden="true">·</span>
        <span>Bossa Nova</span>
        <span class="hero__dot" aria-hidden="true">·</span>
        <span>Art de vivre</span>
      </p>

      <h1 class="hero__title">
        La Rivière<br />
        <em>du Moulin</em>
      </h1>

      <p class="hero__text">
        Bar à huitres, planches &amp; cocktails. En terrasse sur la rivière,<br class="hero__br" />
        à deux pas de la mer de Wissant.
      </p>

      <div class="hero__actions">
        <button class="btn btn-primary" @click="scrollTo('carte')">
          Voir la Carte
        </button>
        <button class="btn btn-outline" @click="scrollTo('contact')">
          Réserver une table
        </button>
      </div>

      <!-- Badges / ambiance -->
      <div class="hero__badges">
        <div class="hero__badge">
          <span class="hero__badge-icon">🦪</span>
          <span>Bar à huitres</span>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-icon">🍷</span>
          <span>Vins &amp; Planches</span>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-icon">🎷</span>
          <span>Live Jazz</span>
        </div>
        <div class="hero__badge">
          <span class="hero__badge-icon">🌊</span>
          <span>Terrasse sur la rivière</span>
        </div>
      </div>
    </div>

    <!-- Flèche scroll -->
    <button class="hero__scroll-cue" aria-label="Défiler vers le bas" @click="scrollTo('about')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ── Fond ─────────────────────────────────────────────── */
.hero__bg {
  position: absolute;
  inset: 0;
  /* Gradient : nuit sur la rivière — bleu marine + terres chaudes */
  background:
    linear-gradient(
      155deg,
      #1a1208 0%,
      #2a1a0e 30%,
      #1c2830 70%,
      #111820 100%
    );
}

.hero__bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(181, 98, 43, 0.15) 0%, transparent 70%);
}

.hero__waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
}

/* ── Contenu ──────────────────────────────────────────── */
.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 4rem;
}

/* ── Label d'ambiance ─────────────────────────────────── */
.hero__label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sienne-light);
  margin-bottom: 1.5rem;
}

.hero__dot {
  opacity: 0.5;
}

/* ── Titre ────────────────────────────────────────────── */
.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 400;
  line-height: 1.05;
  color: var(--cream);
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
}

.hero__title em {
  font-style: italic;
  font-weight: 300;
  color: var(--sienne-light);
}

/* ── Description ──────────────────────────────────────── */
.hero__text {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(248, 243, 235, 0.7);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero__br { display: block; }

/* ── Actions ──────────────────────────────────────────── */
.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

/* ── Badges ───────────────────────────────────────────── */
.hero__badges {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero__badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(248, 243, 235, 0.75);
  letter-spacing: 0.03em;
  backdrop-filter: blur(6px);
}

.hero__badge-icon {
  font-size: 1rem;
  line-height: 1;
}

/* ── Flèche scroll ────────────────────────────────────── */
.hero__scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: rgba(248, 243, 235, 0.45);
  animation: bob 2s ease-in-out infinite;
  transition: color var(--transition);
  background: none;
  border: none;
  cursor: pointer;
}

.hero__scroll-cue:hover {
  color: var(--sienne-light);
}

@keyframes bob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 600px) {
  .hero__br { display: none; }
  .hero__badge { font-size: 0.7rem; padding: 0.45rem 0.85rem; }
  .hero__label { gap: 0.5rem; font-size: 0.62rem; }
}
</style>

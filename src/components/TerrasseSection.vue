<script setup>
const levels = [
  {
    label: 'Niveau bas',
    title: 'La Planche de Bois',
    desc: 'Posée au plus près de l\'eau, notre terrasse basse offre le son discret de la rivière pour seul accompagnement. Ici, le temps s\'écoule doucement — comme l\'eau vers la mer.',
    icon: '🪵',
    detail: 'Plancher bois flottant · Vue directe sur la rivière · Ombre naturelle',
  },
  {
    label: 'Niveau haut',
    title: 'Le Pavé Autobloquant',
    desc: 'Un ton au-dessus, la terrasse haute pavée vous offre une vue dégagée sur les alentours. Le soleil couchant sur la rivière y est spectaculaire. Idéale pour les longues soirées d\'été.',
    icon: '🌅',
    detail: 'Pavé naturel · Vue panoramique · Ouvert sur le ciel',
  },
]
</script>

<template>
  <section id="terrasse" class="terrasse">
    <!-- Bandeau décoratif en haut -->
    <div class="terrasse__band" aria-hidden="true">
      <div class="terrasse__band-inner" />
    </div>

    <div class="container">
      <header class="section-header">
        <p class="section-label">Vivre dehors</p>
        <h2 class="section-title">
          La Terrasse<br />
          <em>sur la rivière</em>
        </h2>
        <p class="section-subtitle">
          À quelques pas de Wissant, la rivière descend vers la mer. Nous avons construit notre terrasse là,
          là où l'air sent le large et où les soirées ne finissent pas.
        </p>
        <div class="ornament" aria-hidden="true">〰</div>
      </header>

      <!-- Les deux niveaux -->
      <div class="terrasse__levels">
        <div
          v-for="(level, i) in levels"
          :key="level.label"
          :class="['terrasse__level', i === 1 ? 'terrasse__level--alt' : '']"
        >
          <div class="terrasse__level-visual" aria-hidden="true">
            <div class="terrasse__level-icon">{{ level.icon }}</div>
            <svg
              v-if="i === 0"
              class="terrasse__level-svg"
              viewBox="0 0 400 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Plancher bois -->
              <rect width="400" height="220" fill="#EDE6D4" rx="8"/>
              <line v-for="n in 10" :key="n" :x1="0" :y1="n*20+10" :x2="400" :y2="n*20+10" stroke="#D8CDBA" stroke-width="1"/>
              <!-- Eau -->
              <path d="M0,160 Q100,145 200,160 Q300,175 400,160 L400,220 L0,220 Z" fill="#DDD6CE" opacity="0.7"/>
              <path d="M0,175 Q80,165 200,175 Q320,185 400,170 L400,220 L0,220 Z" fill="#DDD6CE" opacity="0.5"/>
              <!-- Lumières guirlandes -->
              <circle v-for="n in 8" :key="n" :cx="n*48+4" cy="30" r="4" fill="#F8C94D" opacity="0.8"/>
              <path d="M4,30 Q52,18 100,30 Q148,18 196,30 Q244,18 292,30 Q340,18 388,30" fill="none" stroke="#F8C94D" stroke-width="1" opacity="0.5"/>
              <!-- Table et chaises -->
              <rect x="160" y="90" width="80" height="6" rx="2" fill="#9A8A7E"/>
              <rect x="170" y="96" width="8" height="40" rx="2" fill="#9A8A7E"/>
              <rect x="222" y="96" width="8" height="40" rx="2" fill="#9A8A7E"/>
              <rect x="152" y="80" width="30" height="5" rx="2" fill="#B5622B" opacity="0.6"/>
              <rect x="218" y="80" width="30" height="5" rx="2" fill="#B5622B" opacity="0.6"/>
              <!-- Verre sur table -->
              <path d="M195,90 L200,75 L205,90 Z" fill="#DDD6CE" opacity="0.8"/>
            </svg>
            <svg
              v-else
              class="terrasse__level-svg"
              viewBox="0 0 400 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Pavé -->
              <rect width="400" height="220" fill="#F8F3EB" rx="8"/>
              <g stroke="#D8CDBA" stroke-width="0.8" fill="none">
                <rect v-for="r in [0,1,2,3,4,5,6,7,8,9,10]" :key="r" :x="r%2===0?0:40" :y="r*22" width="40" height="22"/>
                <rect v-for="r in [0,1,2,3,4,5,6,7,8,9,10]" :key="'b'+r" :x="40+(r%2===0?0:40)" :y="r*22" width="40" height="22"/>
                <rect v-for="r in [0,1,2,3,4,5,6,7,8,9,10]" :key="'c'+r" :x="160+(r%2===0?0:40)" :y="r*22" width="40" height="22"/>
                <rect v-for="r in [0,1,2,3,4,5,6,7,8,9,10]" :key="'d'+r" :x="240+(r%2===0?0:40)" :y="r*22" width="40" height="22"/>
                <rect v-for="r in [0,1,2,3,4,5,6,7,8,9,10]" :key="'e'+r" :x="320+(r%2===0?0:40)" :y="r*22" width="40" height="22"/>
              </g>
              <!-- Ciel dégradé -->
              <rect x="0" y="0" width="400" height="80" rx="8" fill="url(#skyGrad)" opacity="0.3"/>
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#F8C94D"/>
                  <stop offset="100%" stop-color="#B5622B"/>
                </linearGradient>
              </defs>
              <!-- Rambarde -->
              <line x1="0" y1="115" x2="400" y2="115" stroke="#9A8A7E" stroke-width="3"/>
              <line v-for="n in 20" :key="n" :x1="n*20" y1="95" :x2="n*20" y2="118" stroke="#9A8A7E" stroke-width="1.5"/>
              <!-- Tables -->
              <rect x="60"  y="130" width="70" height="5" rx="2" fill="#9A8A7E"/>
              <rect x="270" y="130" width="70" height="5" rx="2" fill="#9A8A7E"/>
            </svg>
          </div>

          <div class="terrasse__level-body">
            <p class="terrasse__level-label">{{ level.label }}</p>
            <h3 class="terrasse__level-title">{{ level.title }}</h3>
            <p class="terrasse__level-desc">{{ level.desc }}</p>
            <p class="terrasse__level-detail">{{ level.detail }}</p>
          </div>
        </div>
      </div>

      <!-- Encart ambiance -->
      <div class="terrasse__quote">
        <svg class="terrasse__quote-mark" viewBox="0 0 48 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 36V24C0 10.7 8.3 3.3 25 0l3 5C17.3 7 13 11.7 12 18h10v18H0zm26 0V24C26 10.7 34.3 3.3 51 0l3 5C43.3 7 39 11.7 38 18h10v18H26z" fill="currentColor"/>
        </svg>
        <p>
          L'air iodé qui monte depuis Wissant, le murmure de l\'eau sous la terrasse,
          la contrebasse qui commence à jouer en fin d\'après-midi…
          Voilà ce que vous trouverez ici.
        </p>
        <span>— La Rivière du Moulin</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.terrasse {
  padding: var(--section-pad);
  background: var(--beige);
  position: relative;
}

.terrasse__band {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  overflow: hidden;
}

.terrasse__band-inner {
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    var(--sienne) 0px,
    var(--sienne) 20px,
    var(--taupe) 20px,
    var(--taupe) 24px
  );
  opacity: 0.5;
}

.terrasse .section-title em {
  font-style: italic;
  color: var(--sienne);
}

/* ── Niveaux ──────────────────────────────────────────── */
.terrasse__levels {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.terrasse__level {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.terrasse__level--alt {
  direction: rtl;
}
.terrasse__level--alt > * {
  direction: ltr;
}

/* ── Visuel ───────────────────────────────────────────── */
.terrasse__level-visual {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.terrasse__level-svg {
  width: 100%;
  display: block;
  border-radius: var(--radius-lg);
}

.terrasse__level-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  z-index: 1;
}

/* ── Corps texte ──────────────────────────────────────── */
.terrasse__level-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sienne);
  margin-bottom: 0.5rem;
}

.terrasse__level-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 500;
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 1rem;
}

.terrasse__level-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.terrasse__level-detail {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--taupe-dark);
  padding: 0.6rem 1rem;
  background: var(--white);
  border-left: 3px solid var(--sienne);
  border-radius: 0 var(--radius) var(--radius) 0;
}

/* ── Citation ─────────────────────────────────────────── */
.terrasse__quote {
  text-align: center;
  max-width: 640px;
  margin-inline: auto;
  padding: 3rem;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.terrasse__quote-mark {
  width: 32px;
  height: auto;
  color: var(--sienne);
  opacity: 0.3;
  margin: 0 auto 1.25rem;
}

.terrasse__quote p {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 400;
  color: var(--text);
  line-height: 1.65;
  margin-bottom: 1.25rem;
}

.terrasse__quote span {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--taupe);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .terrasse__level,
  .terrasse__level--alt {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

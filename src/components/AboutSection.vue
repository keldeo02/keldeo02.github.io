<template>
  <section id="about" class="about">
    <div class="container about__grid">

      <!-- Colonne gauche : texte -->
      <div class="about__text">
        <p class="section-label">Notre histoire</p>
        <h2 class="section-title">
          Un bar comme<br />
          <em>un art de vivre</em>
        </h2>
        <div class="ornament" aria-hidden="true">♪</div>

        <div class="about__paragraphs">
          <p>
            Nichée au bord de l'eau, <strong>La Rivière du Moulin</strong> est un bar pas comme les autres.
            Sa terrasse sur deux niveaux surplombe la rivière qui descend paresseusement vers la mer
            de Wissant — l'air légèrement iodé, la lumière changeante selon les heures.
          </p>
          <p>
            Nous croyons que les plus beaux moments se partagent. Autour d'une planche généreuse,
            d'une douzaine d'huitres fraîches ouvertes devant vous, d'un verre de Sancerre bien frais
            ou d'un cocktail façonné avec soin, nous créons un espace où les soirées s'étendent
            naturellement.
          </p>
          <p>
            En fond sonore, le Jazz et la Bossa Nova accompagnent chaque instant — doux, vivants,
            jamais intrusifs.
          </p>
        </div>

        <div class="about__values">
          <div class="about__value" v-for="v in values" :key="v.label">
            <span class="about__value-icon" aria-hidden="true">{{ v.icon }}</span>
            <div>
              <strong>{{ v.label }}</strong>
              <p>{{ v.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite : visuels -->
      <div class="about__visuals" aria-hidden="true">
        <div class="about__card about__card--main">
          <div class="about__card-inner">
            <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" class="about__illustration">
              <!-- Silhouette de rivière / barque stylisée -->
              <defs>
                <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#DCE8EF"/>
                  <stop offset="100%" stop-color="#9A8A7E" stop-opacity="0.3"/>
                </linearGradient>
              </defs>
              <!-- Ciel / fond -->
              <rect width="300" height="380" fill="#1c2830" rx="8"/>
              <!-- Reflets eau -->
              <ellipse cx="150" cy="320" rx="160" ry="60" fill="url(#riverGrad)" opacity="0.18"/>
              <path d="M0,260 Q75,240 150,260 Q225,280 300,260 L300,380 L0,380 Z" fill="#DCE8EF" opacity="0.08"/>
              <path d="M0,280 Q50,265 150,280 Q250,295 300,275 L300,380 L0,380 Z" fill="#DCE8EF" opacity="0.06"/>
              <!-- Reflets lunaires -->
              <circle cx="230" cy="60" r="28" fill="#F8F3EB" opacity="0.08"/>
              <circle cx="230" cy="60" r="18" fill="#F8F3EB" opacity="0.1"/>
              <!-- Silhouette arbres -->
              <rect x="20"  y="140" width="8"  height="120" fill="#B5622B" opacity="0.35"/>
              <ellipse cx="24"  cy="135" rx="22" ry="28" fill="#5C4E46" opacity="0.4"/>
              <rect x="260" y="160" width="6"  height="100" fill="#B5622B" opacity="0.35"/>
              <ellipse cx="263" cy="155" rx="18" ry="22" fill="#5C4E46" opacity="0.4"/>
              <!-- Barque -->
              <path d="M100,300 Q150,290 200,300 L195,315 Q150,318 105,315 Z" fill="#9A8A7E" opacity="0.7"/>
              <line x1="150" y1="295" x2="150" y2="265" stroke="#B5622B" stroke-width="1.5" opacity="0.6"/>
              <path d="M150,265 L170,275 L150,285 L130,275 Z" fill="#CE8557" opacity="0.5"/>
              <!-- Lumières de la terrasse -->
              <circle cx="80"  cy="200" r="3" fill="#F8C94D" opacity="0.85"/>
              <circle cx="120" cy="190" r="3" fill="#F8C94D" opacity="0.85"/>
              <circle cx="160" cy="195" r="3" fill="#F8C94D" opacity="0.85"/>
              <circle cx="200" cy="188" r="3" fill="#F8C94D" opacity="0.85"/>
              <circle cx="240" cy="196" r="3" fill="#F8C94D" opacity="0.85"/>
              <!-- Lignes de guirlandes -->
              <path d="M80,200 Q100,185 120,190 Q140,178 160,195 Q180,182 200,188 Q220,175 240,196" fill="none" stroke="#F8C94D" stroke-width="0.8" opacity="0.4"/>
              <!-- Notes de musique -->
              <text x="55"  y="110" font-size="16" fill="#CE8557" opacity="0.35" font-family="serif">♪</text>
              <text x="238" y="130" font-size="12" fill="#CE8557" opacity="0.30" font-family="serif">♫</text>
              <text x="140" y="85"  font-size="10" fill="#CE8557" opacity="0.25" font-family="serif">♩</text>
            </svg>
          </div>
          <p class="about__card-caption">Terrasse sur la rivière, Wissant</p>
        </div>

        <div class="about__stat-grid">
          <div class="about__stat" v-for="s in stats" :key="s.value">
            <span class="about__stat-value">{{ s.value }}</span>
            <span class="about__stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const values = [
  { icon: '🦪', label: 'Fraîcheur du jour',   desc: 'Huitres et produits de la mer sélectionnés chaque matin.' },
  { icon: '🎷', label: 'Musique vivante',      desc: 'Jazz & Bossa Nova en live tous les vendredis et samedis.' },
  { icon: '🍃', label: 'Cadre naturel',        desc: 'Terrasse en bois et pavé au ras de l\'eau, sans chichis.' },
]

const stats = [
  { value: '2 niveaux',  label: 'de terrasse' },
  { value: 'Live',       label: 'chaque week-end' },
  { value: '100%',       label: 'fait maison' },
  { value: 'Direct',     label: 'sur la rivière' },
]
</script>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.about {
  padding: var(--section-pad);
  background: var(--white);
}

/* ── Grid ─────────────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

/* ── Texte ────────────────────────────────────────────── */
.about__text .section-title em {
  font-style: italic;
  color: var(--sienne);
}

.about__paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.95rem;
}

.about__paragraphs strong {
  color: var(--taupe-dark);
  font-weight: 600;
}

/* ── Valeurs ──────────────────────────────────────────── */
.about__values {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-top: 1px solid var(--beige-dark);
  padding-top: 1.75rem;
}

.about__value {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.about__value-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.about__value strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.2rem;
  letter-spacing: 0.02em;
}

.about__value p {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ── Visuels ──────────────────────────────────────────── */
.about__visuals {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.about__card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.about__card-inner {
  background: #1c2830;
  aspect-ratio: 4 / 5;
  display: flex;
  align-items: stretch;
}

.about__illustration {
  width: 100%;
  height: 100%;
}

.about__card-caption {
  padding: 0.75rem 1rem;
  background: var(--beige);
  font-size: 0.75rem;
  font-style: italic;
  color: var(--text-muted);
  text-align: center;
  border-top: 1px solid var(--beige-dark);
}

/* ── Stats ────────────────────────────────────────────── */
.about__stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.about__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: var(--beige);
  border-radius: var(--radius);
  padding: 1.25rem 1rem;
  text-align: center;
}

.about__stat-value {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--sienne);
}

.about__stat-label {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .about__visuals {
    order: -1;
  }
  .about__card-inner {
    aspect-ratio: 16 / 9;
  }
}
</style>

<script setup>
// ── Événements récurrents ─────────────────────────────────
const recurringEvents = [
  {
    day: 'Vendredi',
    title: 'Jazz Sessions',
    subtitle: 'Chaque vendredi · 19h – 22h',
    desc: 'Des musiciens du Nord vous offrent un concert intimiste. Jazz classique, bop, swing — chaque semaine une surprise.',
    icon: '🎷',
    color: 'sienne',
  },
  {
    day: 'Samedi',
    title: 'Bossa Nova & Tapas',
    subtitle: 'Chaque samedi · 18h – 22h',
    desc: 'La Bossa Nova comme à Rio — légère, sensuelle, mélancolique. Accordez-vous une planche et laissez-vous emporter.',
    icon: '🎸',
    color: 'taupe',
  },
  {
    day: 'Dimanche',
    title: 'Open Mic du Moulin',
    subtitle: 'Chaque dernier dimanche · 16h – 19h',
    desc: 'Notre scène ouverte à tous les musiciens de passage. Jazz, acoustique, ambiance familiale. Venez écouter, ou jouer.',
    icon: '🎙️',
    color: 'blue',
  },
]

// ── Événements à venir ────────────────────────────────────
const upcomingEvents = [
  {
    date: { day: '28', month: 'Mar' },
    title: 'Quartet Gilles Decoster',
    desc: 'Jazz manouche inspiré de Django Reinhardt. Un voyage dans le Paris des années 40.',
    hour: '20h00',
    price: 'Entrée libre',
    tag: 'Jazz Manouche',
  },
  {
    date: { day: '05', month: 'Avr' },
    title: 'Soirée Huitres & Champagne',
    subtitle: 'Dégustation guidée',
    desc: 'Un accord mets & vins exceptionnel : huitres Spéciales n°2, Champagne Grand Cru. Places limitées — 20 personnes maximum.',
    hour: '19h30',
    price: '45 € / personne',
    tag: 'Gastronomie',
  },
  {
    date: { day: '12', month: 'Avr' },
    title: 'Duo Brasilero',
    desc: 'Bossa Nova pure, voix et guitare. Un duo qui a fait ses armes à São Paulo. Absolument envoûtant.',
    hour: '20h30',
    price: 'Entrée libre',
    tag: 'Bossa Nova',
  },
  {
    date: { day: '19', month: 'Avr' },
    title: 'Nuit de Printemps',
    subtitle: 'Soirée spéciale',
    desc: 'Grande soirée de printemps. Jazz live, cocktails signature, buffet de planches. La terrasse dans toute sa splendeur.',
    hour: '18h00 – 01h00',
    price: '15 € · Réservation conseillée',
    tag: '⭐ Événement exceptionnel',
  },
]
</script>

<template>
  <section id="evenements" class="events">
    <div class="container">
      <header class="section-header">
        <p class="section-label">Agenda</p>
        <h2 class="section-title">
          La musique<br />
          <em>est toujours là</em>
        </h2>
        <p class="section-subtitle">
          Chaque semaine, des musiciens s'installent sur notre terrasse.
          Pas de grande scène, pas de clip — juste la musique et la rivière.
        </p>
        <div class="ornament" aria-hidden="true">♫</div>
      </header>

      <!-- Récurrents -->
      <div class="events__recurring">
        <article
          v-for="ev in recurringEvents"
          :key="ev.day"
          :class="['events__rec-card', `events__rec-card--${ev.color}`]"
        >
          <span class="events__rec-icon" aria-hidden="true">{{ ev.icon }}</span>
          <p class="events__rec-day">{{ ev.day }}</p>
          <h3 class="events__rec-title">{{ ev.title }}</h3>
          <p class="events__rec-sub">{{ ev.subtitle }}</p>
          <p class="events__rec-desc">{{ ev.desc }}</p>
        </article>
      </div>

      <!-- Séparateur -->
      <div class="events__divider">
        <span>Événements à venir</span>
      </div>

      <!-- À venir -->
      <div class="events__upcoming">
        <article
          v-for="ev in upcomingEvents"
          :key="ev.title"
          class="events__card"
        >
          <div class="events__card-date">
            <span class="events__card-day">{{ ev.date.day }}</span>
            <span class="events__card-month">{{ ev.date.month }}</span>
          </div>
          <div class="events__card-body">
            <div class="events__card-top">
              <div>
                <span v-if="ev.tag" class="events__card-tag">{{ ev.tag }}</span>
                <h3 class="events__card-title">{{ ev.title }}</h3>
                <p v-if="ev.subtitle" class="events__card-subtitle">{{ ev.subtitle }}</p>
              </div>
              <div class="events__card-meta">
                <span class="events__card-hour">🕗 {{ ev.hour }}</span>
                <span class="events__card-price">{{ ev.price }}</span>
              </div>
            </div>
            <p class="events__card-desc">{{ ev.desc }}</p>
          </div>
        </article>
      </div>

      <!-- Note -->
      <p class="events__note">
        Programme susceptible de changer. Suivez-nous sur Instagram pour les dernières annonces.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.events {
  padding: var(--section-pad);
  background: var(--white);
}

.events .section-title em {
  font-style: italic;
  color: var(--sienne);
}

/* ── Récurrents ───────────────────────────────────────── */
.events__recurring {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.events__rec-card {
  padding: 2rem 1.5rem;
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}

.events__rec-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.events__rec-card--sienne {
  background: linear-gradient(135deg, #2a1a0e 0%, #3a2212 100%);
  color: var(--cream);
}

.events__rec-card--taupe {
  background: linear-gradient(135deg, var(--taupe-dark) 0%, #4a3830 100%);
  color: var(--cream);
}

.events__rec-card--blue {
  background: linear-gradient(135deg, #1c2830 0%, #263540 100%);
  color: var(--cream);
}

.events__rec-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.events__rec-day {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sienne-light);
  margin-bottom: 0.4rem;
}

.events__rec-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.35rem;
}

.events__rec-sub {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  opacity: 0.65;
  margin-bottom: 1rem;
}

.events__rec-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  opacity: 0.78;
}

/* ── Séparateur ───────────────────────────────────────── */
.events__divider {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.events__divider::before,
.events__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--beige-dark);
}

.events__divider span {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--taupe);
  white-space: nowrap;
}

/* ── À venir ──────────────────────────────────────────── */
.events__upcoming {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.events__card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--cream);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-lg);
  transition: box-shadow var(--transition), transform var(--transition);
}

.events__card:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(3px);
}

/* Date badge */
.events__card-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--sienne);
  color: var(--white);
  border-radius: var(--radius);
  min-width: 56px;
  padding: 0.75rem 0.5rem;
  flex-shrink: 0;
  text-align: center;
}

.events__card-day {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1;
}

.events__card-month {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.85;
  margin-top: 0.25rem;
}

/* Corps */
.events__card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.events__card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.events__card-tag {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sienne);
  background: rgba(140, 114, 96, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  margin-bottom: 0.35rem;
}

.events__card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.2;
}

.events__card-subtitle {
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

.events__card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  flex-shrink: 0;
}

.events__card-hour {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
}

.events__card-price {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--taupe-dark);
  background: var(--beige);
  padding: 0.2rem 0.7rem;
  border-radius: 50px;
  border: 1px solid var(--beige-dark);
}

.events__card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ── Note ─────────────────────────────────────────────── */
.events__note {
  text-align: center;
  font-size: 0.78rem;
  font-style: italic;
  color: var(--taupe);
  border-top: 1px solid var(--beige-dark);
  padding-top: 1.5rem;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 860px) {
  .events__recurring {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .events__card {
    flex-direction: column;
    gap: 1rem;
  }
  .events__card-date {
    flex-direction: row;
    gap: 0.5rem;
    min-width: unset;
    padding: 0.5rem 1rem;
    width: fit-content;
  }
  .events__card-day {
    font-size: 1.3rem;
  }
  .events__card-meta {
    align-items: flex-start;
  }
}
</style>

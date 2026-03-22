<script setup>
import { ref, reactive } from 'vue'

// ── Horaires ──────────────────────────────────────────────
const hours = [
  { day: 'Lundi',          time: 'Fermé',        closed: true },
  { day: 'Mardi',          time: '17h – 23h',    closed: false },
  { day: 'Mercredi',       time: '17h – 23h',    closed: false },
  { day: 'Jeudi',          time: '17h – 23h',    closed: false },
  { day: 'Vendredi',       time: '12h – 01h',    closed: false },
  { day: 'Samedi',         time: '12h – 01h',    closed: false },
  { day: 'Dimanche',       time: '12h – 22h',    closed: false },
]

// Mettre en évidence le jour courant
const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

// ── Formulaire de réservation ─────────────────────────────
const form = reactive({ name: '', email: '', date: '', guests: '', message: '' })
const submitted = ref(false)

function submitForm() {
  // Simulation d'envoi — à remplacer par un vrai backend
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 5000)
  Object.keys(form).forEach(k => (form[k] = ''))
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <header class="section-header">
        <p class="section-label">Venir nous voir</p>
        <h2 class="section-title">
          Réservez<br />
          <em>votre table</em>
        </h2>
        <p class="section-subtitle">
          Une terrasse, une rivière et une bonne musique. Il ne manque plus que vous.
        </p>
        <div class="ornament" aria-hidden="true">♪</div>
      </header>

      <div class="contact__grid">

        <!-- ── Colonne gauche : infos ── -->
        <div class="contact__info">

          <!-- Adresse -->
          <div class="contact__block">
            <h3 class="contact__block-title">
              <span aria-hidden="true">📍</span> Où nous trouver
            </h3>
            <p class="contact__address">
              Bord de rivière<br />
              62179 Wissant<br />
              Pas-de-Calais, France
            </p>
            <a
              href="https://www.openstreetmap.org/search?query=Wissant"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__map-link"
            >
              Voir sur la carte →
            </a>
          </div>

          <!-- Horaires -->
          <div class="contact__block">
            <h3 class="contact__block-title">
              <span aria-hidden="true">🕐</span> Horaires d'ouverture
            </h3>
            <ul class="contact__hours">
              <li
                v-for="(h, i) in hours"
                :key="h.day"
                :class="['contact__hours-row', { 'is-today': i === todayIndex, 'is-closed': h.closed }]"
              >
                <span class="contact__hours-day">{{ h.day }}</span>
                <span class="contact__hours-time">{{ h.time }}</span>
              </li>
            </ul>
          </div>

          <!-- Contact direct -->
          <div class="contact__block">
            <h3 class="contact__block-title">
              <span aria-hidden="true">📞</span> Contact direct
            </h3>
            <div class="contact__links">
              <a href="tel:+33321000000" class="contact__link">
                <span aria-hidden="true">📞</span>
                +33 (0)3 21 00 00 00
              </a>
              <a href="mailto:contact@lariviere-du-moulin.fr" class="contact__link">
                <span aria-hidden="true">✉️</span>
                contact@lariviere-du-moulin.fr
              </a>
            </div>
          </div>

          <!-- Réseaux sociaux -->
          <div class="contact__block">
            <h3 class="contact__block-title">
              <span aria-hidden="true">📸</span> Suivez-nous
            </h3>
            <div class="contact__socials">
              <a
                href="#"
                class="contact__social"
                aria-label="Instagram de La Rivière du Moulin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                Instagram
              </a>
              <a
                href="#"
                class="contact__social"
                aria-label="Facebook de La Rivière du Moulin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <!-- ── Colonne droite : formulaire ── -->
        <div class="contact__form-wrap">
          <Transition name="fade-msg" mode="out-in">
            <div v-if="submitted" class="contact__success" key="success">
              <span class="contact__success-icon" aria-hidden="true">🎷</span>
              <h3>Demande reçue !</h3>
              <p>Nous vous répondrons dans les plus brefs délais pour confirmer votre réservation.</p>
            </div>

            <form v-else key="form" class="contact__form" @submit.prevent="submitForm" novalidate>
              <h3 class="contact__form-title">Demande de réservation</h3>

              <div class="contact__form-row">
                <div class="contact__field">
                  <label for="res-name">Nom complet *</label>
                  <input
                    id="res-name"
                    v-model="form.name"
                    type="text"
                    placeholder="Marie Dupont"
                    required
                  />
                </div>
                <div class="contact__field">
                  <label for="res-email">E-mail *</label>
                  <input
                    id="res-email"
                    v-model="form.email"
                    type="email"
                    placeholder="marie@exemple.fr"
                    required
                  />
                </div>
              </div>

              <div class="contact__form-row">
                <div class="contact__field">
                  <label for="res-date">Date souhaitée *</label>
                  <input
                    id="res-date"
                    v-model="form.date"
                    type="date"
                    required
                  />
                </div>
                <div class="contact__field">
                  <label for="res-guests">Nombre de personnes *</label>
                  <select id="res-guests" v-model="form.guests" required>
                    <option value="" disabled selected>Choisir</option>
                    <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ n === 1 ? 'personne' : 'personnes' }}</option>
                    <option value="11+">Plus de 10 personnes</option>
                  </select>
                </div>
              </div>

              <div class="contact__field">
                <label for="res-message">Message (facultatif)</label>
                <textarea
                  id="res-message"
                  v-model="form.message"
                  placeholder="Occasion spéciale, régimes alimentaires, préférences terrasse…"
                  rows="4"
                />
              </div>

              <button type="submit" class="btn btn-primary contact__submit">
                Envoyer la demande →
              </button>

              <p class="contact__form-note">
                * Champs obligatoires. Réponse sous 24h.
              </p>
            </form>
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.contact {
  padding: var(--section-pad);
  background: var(--cream);
}

.contact .section-title em {
  font-style: italic;
  color: var(--sienne);
}

/* ── Grid ─────────────────────────────────────────────── */
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4rem;
  align-items: flex-start;
}

/* ── Blocs d'info ─────────────────────────────────────── */
.contact__info {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.contact__block-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--taupe-dark);
  margin-bottom: 0.85rem;
}

.contact__address {
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--text-muted);
}

.contact__map-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--sienne);
  letter-spacing: 0.04em;
  transition: color var(--transition);
}

.contact__map-link:hover {
  color: var(--taupe-dark);
}

/* ── Horaires ─────────────────────────────────────────── */
.contact__hours {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius);
  overflow: hidden;
}

.contact__hours-row {
  display: flex;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  background: var(--white);
  border-bottom: 1px solid var(--beige-dark);
  transition: background var(--transition);
}

.contact__hours-row:last-child {
  border-bottom: none;
}

.contact__hours-row.is-today {
  background: rgba(181, 98, 43, 0.07);
  font-weight: 600;
  color: var(--sienne);
}

.contact__hours-row.is-closed .contact__hours-time {
  color: var(--taupe);
  font-style: italic;
}

.contact__hours-day {
  color: var(--text-muted);
}

.contact__hours-row.is-today .contact__hours-day {
  color: var(--sienne);
}

.contact__hours-time {
  font-weight: 500;
  color: var(--text);
}

/* ── Liens contact ───────────────────────────────────── */
.contact__links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.contact__link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color var(--transition);
}

.contact__link:hover {
  color: var(--sienne);
}

/* ── Réseaux sociaux ──────────────────────────────────── */
.contact__socials {
  display: flex;
  gap: 0.75rem;
}

.contact__social {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--beige-dark);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--white);
  transition: all var(--transition);
}

.contact__social svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.contact__social:hover {
  background: var(--sienne);
  border-color: var(--sienne);
  color: var(--white);
}

/* ── Formulaire ───────────────────────────────────────── */
.contact__form-wrap {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--beige-dark);
}

.contact__form-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 1.75rem;
}

.contact__form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.contact__field label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact__field input,
.contact__field select,
.contact__field textarea {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text);
  background: var(--cream);
  border: 1.5px solid var(--beige-dark);
  border-radius: var(--radius);
  padding: 0.7rem 1rem;
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
  width: 100%;
}

.contact__field input:focus,
.contact__field select:focus,
.contact__field textarea:focus {
  border-color: var(--sienne);
  box-shadow: 0 0 0 3px rgba(181, 98, 43, 0.1);
}

.contact__field textarea {
  resize: vertical;
  min-height: 100px;
}

.contact__submit {
  width: 100%;
  justify-content: center;
  padding: 0.9rem 2rem;
  font-size: 0.78rem;
  margin-top: 0.5rem;
}

.contact__form-note {
  font-size: 0.72rem;
  color: var(--taupe);
  text-align: center;
  margin-top: 0.85rem;
  font-style: italic;
}

/* ── Succès ───────────────────────────────────────────── */
.contact__success {
  text-align: center;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contact__success-icon {
  font-size: 3rem;
}

.contact__success h3 {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--text);
}

.contact__success p {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 360px;
  line-height: 1.7;
}

/* ── Transitions ──────────────────────────────────────── */
.fade-msg-enter-active,
.fade-msg-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}
.fade-msg-enter-from { opacity: 0; transform: translateY(8px); }
.fade-msg-leave-to   { opacity: 0; transform: translateY(-4px); }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 560px) {
  .contact__form-row {
    grid-template-columns: 1fr;
  }
  .contact__form-wrap {
    padding: 1.5rem;
  }
}
</style>

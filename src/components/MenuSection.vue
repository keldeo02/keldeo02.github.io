<script setup>
import { ref, computed } from 'vue'
import { useMenu } from '../composables/useMenu.js'

// ── Données (localStorage → défaut dans src/data/menuData.js) ─
const { categories } = useMenu()

// ── Onglet actif ──────────────────────────────────────────
const activeTab = ref(categories.value[0]?.id ?? '')
const current   = computed(() => categories.value.find(c => c.id === activeTab.value))
</script>

<template>
  <section id="carte" class="menu">
    <div class="container">
      <header class="section-header">
        <p class="section-label">La Carte</p>
        <h2 class="section-title">Ce qui se passe<br /><em>dans notre bar</em></h2>
        <p class="section-subtitle">
          Tout est pensé pour se partager, prendre son temps, et revenir.
        </p>
        <div class="ornament" aria-hidden="true">♩</div>
      </header>

      <!-- Onglets -->
      <nav class="menu__tabs" role="tablist" aria-label="Catégories de la carte">
        <button
          v-for="cat in categories"
          :key="cat.id"
          role="tab"
          :aria-selected="activeTab === cat.id"
          :class="['menu__tab', { 'is-active': activeTab === cat.id }]"
          @click="activeTab = cat.id"
        >
          <span class="menu__tab-icon" aria-hidden="true">{{ cat.icon }}</span>
          <span>{{ cat.label }}</span>
        </button>
      </nav>

      <!-- Grille de plats -->
      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="menu__grid" role="tabpanel">
          <article
            v-for="item in current.items"
            :key="item.name"
            class="menu__item"
          >
            <div class="menu__item-top">
              <h3 class="menu__item-name">{{ item.name }}</h3>
              <span class="menu__item-price">{{ item.price }}</span>
            </div>
            <p class="menu__item-desc">{{ item.desc }}</p>
            <span v-if="item.tag" class="menu__item-tag">{{ item.tag }}</span>
          </article>
        </div>
      </Transition>

      <!-- Notes de bas de carte -->
      <p class="menu__note">
        ✦&ensp;Tous nos produits sont sélectionnés auprès de producteurs locaux.&ensp;
        Carte susceptible d'évoluer selon les arrivages.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.menu {
  padding: var(--section-pad);
  background: var(--cream);
}

.menu .section-title em {
  font-style: italic;
  color: var(--sienne);
}

/* ── Onglets ──────────────────────────────────────────── */
.menu__tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.menu__tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--white);
  border: 2px solid var(--beige-dark);
  border-radius: 50px;
  cursor: pointer;
  transition: all var(--transition);
}

.menu__tab:hover {
  border-color: var(--taupe);
  color: var(--text);
}

.menu__tab.is-active {
  background: var(--sienne);
  color: var(--white);
  border-color: var(--sienne);
}

.menu__tab-icon {
  font-size: 1rem;
}

/* ── Grille ───────────────────────────────────────────── */
.menu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* ── Item ─────────────────────────────────────────────── */
.menu__item {
  background: var(--white);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: box-shadow var(--transition), transform var(--transition);
}

.menu__item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.menu__item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.menu__item-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.2;
}

.menu__item-price {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--sienne);
  white-space: nowrap;
  flex-shrink: 0;
  padding: 0.25rem 0.75rem;
  background: rgba(140, 114, 96, 0.08);
  border-radius: 50px;
}

.menu__item-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.menu__item-tag {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--taupe-dark);
  background: var(--beige);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  align-self: flex-start;
  border: 1px solid var(--beige-dark);
}

/* ── Note bas de carte ────────────────────────────────── */
.menu__note {
  text-align: center;
  font-size: 0.78rem;
  font-style: italic;
  color: var(--taupe);
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--beige-dark);
}

/* ── Transition ─────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 600px) {
  .menu__grid {
    grid-template-columns: 1fr;
  }
  .menu__tab {
    padding: 0.55rem 1rem;
    font-size: 0.68rem;
  }
}
</style>

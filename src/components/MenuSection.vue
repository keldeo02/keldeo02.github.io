<script setup>
import { ref, computed } from 'vue'

// ── Données de la carte ────────────────────────────────────
const categories = [
  {
    id: 'planches',
    label: 'Planches',
    icon: '🪵',
    items: [
      {
        name: 'Planche Charcuterie',
        desc: 'Saucisson sec artisanal, jambon sec 18 mois, rillettes maison, cornichons, moutarde à l\'ancienne',
        price: '18 €',
        tag: 'À partager',
      },
      {
        name: 'Planche Fromages',
        desc: 'Sélection de fromages affinés du Nord, confitures maison, noix, pain de campagne grillé',
        price: '16 €',
        tag: null,
      },
      {
        name: 'Planche Mixte',
        desc: 'Le meilleur des deux mondes — pour les gourmands indécis. Charcuterie & fromages, confitures, pain',
        price: '22 €',
        tag: '⭐ Notre préférée',
      },
      {
        name: 'Planche Océan',
        desc: 'Crevettes grises de la Côte d\'Opale, crevettes roses, bulots, aïoli maison, citron',
        price: '24 €',
        tag: 'Du jour',
      },
    ],
  },
  {
    id: 'huitres',
    label: 'Bar à Huitres',
    icon: '🦪',
    items: [
      {
        name: 'Fines de Claire n°3',
        desc: 'Huitres creuses fines de claire, élevées en Bretagne. Fraîches, iodées, légèrement sucrées.',
        price: '14 € / 6 pièces',
        tag: 'Coup de cœur',
      },
      {
        name: 'Spéciales n°2',
        desc: 'Huitres charnues aux arômes profonds, affinées quatre mois minimum. Un plaisir intense.',
        price: '18 € / 6 pièces',
        tag: 'Prestige',
      },
      {
        name: 'Plateau Découverte',
        desc: '6 Fines de Claire + 6 Spéciales + mignonette de vinaigre, citron, pain de seigle & beurre demi-sel',
        price: '28 €',
        tag: '⭐ À partager',
      },
      {
        name: 'Plateau Grand Large',
        desc: '12 Fines de Claire + 6 Spéciales + 6 Huitres gratinées au beurre persillé',
        price: '42 €',
        tag: 'Pour 2 personnes',
      },
    ],
  },
  {
    id: 'vins',
    label: 'Vins',
    icon: '🍷',
    items: [
      {
        name: 'Muscadet Sèvre et Maine',
        desc: 'Loire · Sec, minéral, légèrement vif. L\'accord parfait avec les huitres.',
        price: '7 € / verre — 28 € / bouteille',
        tag: 'Blanc',
      },
      {
        name: 'Sancerre Blanc',
        desc: 'Loire · Sauvignon Blanc. Fruits blancs, herbes fraîches, belle vivacité.',
        price: '9 € / verre — 36 € / bouteille',
        tag: 'Blanc',
      },
      {
        name: 'Chablis 1er Cru',
        desc: 'Bourgogne · Chardonnay. Élégant, minéral, légèrement beurré. Un classique.',
        price: '11 € / verre — 44 € / bouteille',
        tag: 'Blanc · Prestige',
      },
      {
        name: 'Côtes du Rhône Rouge',
        desc: 'Rhône · Grenache / Syrah. Fruits rouges, épices douces, belle rondeur.',
        price: '7 € / verre — 26 € / bouteille',
        tag: 'Rouge',
      },
      {
        name: 'Saint-Émilion',
        desc: 'Bordeaux · Merlot dominant. Puissant, charnu, notes de prune et chocolat noir.',
        price: '9 € / verre — 38 € / bouteille',
        tag: 'Rouge',
      },
      {
        name: 'Rosé de Provence',
        desc: 'AOP Côtes de Provence · Pale, sec, frais. Fruits rouges délicats, minéralité côtière.',
        price: '7 € / verre — 28 € / bouteille',
        tag: 'Rosé',
      },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    icon: '🍹',
    items: [
      {
        name: 'La Rivière',
        desc: 'Gin, concombre frais, liqueur de sureau, citron vert, eau pétillante, menthe',
        price: '12 €',
        tag: '⭐ Signature',
      },
      {
        name: 'Wissant Sunset',
        desc: 'Rhum ambré, purée de mangue, gingembre frais, citron vert, sirop de canne, bitters',
        price: '11 €',
        tag: null,
      },
      {
        name: 'Jazz Night',
        desc: 'Bourbon, miel de thym, citron frais, thym frais, orange bitters, fumée de bois',
        price: '13 €',
        tag: 'Vip',
      },
      {
        name: 'Bossa Nova Fizz',
        desc: 'Vodka, coulis de framboise, citron, basilic frais, sirop de canne, eau pétillante',
        price: '11 €',
        tag: null,
      },
      {
        name: 'Le Moulin Spritz',
        desc: 'Aperol, Prosecco bio, orange sanguine pressée, romarin, zeste de citron',
        price: '10 €',
        tag: 'Incontournable',
      },
      {
        name: 'Sans alcool — La Source',
        desc: 'Eau de rose, limonade artisanale, citron vert, miel, fleurs de sureau, glaçons',
        price: '7 €',
        tag: '0% alcool',
      },
    ],
  },
]

// ── Onglet actif ──────────────────────────────────────────
const activeTab = ref('planches')
const current   = computed(() => categories.find(c => c.id === activeTab.value))
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

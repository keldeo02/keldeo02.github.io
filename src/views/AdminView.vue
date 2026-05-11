<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useMenu } from '../composables/useMenu.js'

const router = useRouter()
const { logout } = useAuth()
const {
  categories,
  addCategory,
  removeCategory,
  addItem,
  removeItem,
  updateItem,
  resetToDefault,
} = useMenu()

// ── État onglets ───────────────────────────────────────────
const activeTab   = ref(categories.value[0]?.id ?? '')
const currentCat  = computed(() => categories.value.find(c => c.id === activeTab.value))

function selectTab(id) {
  activeTab.value    = id
  editingItem.value  = null
  showAddItem.value  = false
}

// ── Édition d'un plat ─────────────────────────────────────
const editingItem = ref(null)  // { categoryId, index }
const itemForm    = ref({ name: '', desc: '', price: '', tag: '' })

function startEdit(categoryId, index, item) {
  editingItem.value = { categoryId, index }
  itemForm.value    = { ...item, tag: item.tag ?? '' }
  showAddItem.value = false
}

function cancelEdit() {
  editingItem.value = null
}

function saveEdit() {
  const { categoryId, index } = editingItem.value
  updateItem(categoryId, index, {
    ...itemForm.value,
    tag: itemForm.value.tag.trim() || null,
  })
  editingItem.value = null
}

function isEditing(categoryId, index) {
  return (
    editingItem.value?.categoryId === categoryId &&
    editingItem.value?.index === index
  )
}

// ── Ajout d'un plat ───────────────────────────────────────
const showAddItem = ref(false)
const newItem     = ref({ name: '', desc: '', price: '', tag: '' })

function handleAddItem() {
  if (!newItem.value.name.trim() || !newItem.value.price.trim()) return
  addItem(activeTab.value, {
    name:  newItem.value.name.trim(),
    desc:  newItem.value.desc.trim(),
    price: newItem.value.price.trim(),
    tag:   newItem.value.tag.trim() || null,
  })
  newItem.value     = { name: '', desc: '', price: '', tag: '' }
  showAddItem.value = false
}

// ── Ajout d'une catégorie ─────────────────────────────────
const showAddCat = ref(false)
const newCat     = ref({ label: '', icon: '' })

function handleAddCategory() {
  const label = newCat.value.label.trim()
  if (!label) return
  const id = label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  addCategory({
    id,
    label,
    icon:  newCat.value.icon.trim() || '🍽️',
    items: [],
  })
  activeTab.value  = id
  newCat.value     = { label: '', icon: '' }
  showAddCat.value = false
}

// ── Suppressions ──────────────────────────────────────────
function confirmRemoveItem(categoryId, index) {
  if (!confirm('Supprimer ce plat ?')) return
  if (isEditing(categoryId, index)) editingItem.value = null
  removeItem(categoryId, index)
}

function confirmRemoveCategory(id, label) {
  if (!confirm(`Supprimer la catégorie "${label}" et tous ses plats ?`)) return
  removeCategory(id)
  activeTab.value = categories.value[0]?.id ?? ''
}

function handleReset() {
  if (!confirm('Réinitialiser le menu complet aux valeurs par défaut ?\nCette action est irréversible.')) return
  resetToDefault()
  activeTab.value   = categories.value[0]?.id ?? ''
  editingItem.value = null
  showAddItem.value = false
}

// ── Déconnexion ───────────────────────────────────────────
function handleLogout() {
  logout()
  router.push('/admin')
}
</script>

<template>
  <div class="admin">
    <!-- En-tête ──────────────────────────────────────────── -->
    <header class="admin-header">
      <div class="admin-header__brand">
        <span class="admin-header__ornament">⚙</span>
        <h1 class="admin-header__title">Administration — La Rivière</h1>
      </div>
      <button class="abtn abtn--ghost" @click="handleLogout">Se déconnecter</button>
    </header>

    <div class="admin-body">
      <!-- Sidebar ──────────────────────────────────────────── -->
      <aside class="admin-sidebar">
        <nav class="admin-sidebar__nav">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="['admin-sidebar__item', { 'is-active': activeTab === cat.id }]"
            @click="selectTab(cat.id)"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.label }}</span>
          </button>
        </nav>

        <div class="admin-sidebar__footer">
          <button class="abtn abtn--outline abtn--sm abtn--full" @click="showAddCat = !showAddCat">
            + Nouvelle catégorie
          </button>

          <form v-if="showAddCat" class="admin-mini-form" @submit.prevent="handleAddCategory">
            <input v-model="newCat.label" placeholder="Nom (ex : Desserts)" required />
            <input v-model="newCat.icon"  placeholder="Icône emoji (ex : 🍰)" />
            <div class="admin-mini-form__actions">
              <button type="submit" class="abtn abtn--primary abtn--sm">Créer</button>
              <button type="button" class="abtn abtn--ghost abtn--sm" @click="showAddCat = false">Annuler</button>
            </div>
          </form>
        </div>
      </aside>

      <!-- Contenu principal ────────────────────────────────── -->
      <main class="admin-main" v-if="currentCat">
        <div class="admin-main__header">
          <h2 class="admin-main__title">{{ currentCat.icon }} {{ currentCat.label }}</h2>
          <button
            class="abtn abtn--danger abtn--sm"
            @click="confirmRemoveCategory(currentCat.id, currentCat.label)"
          >
            Supprimer la catégorie
          </button>
        </div>

        <!-- Liste des plats -->
        <ul class="admin-items">
          <li
            v-for="(item, i) in currentCat.items"
            :key="i"
            class="admin-item"
          >
            <!-- Mode lecture -->
            <template v-if="!isEditing(currentCat.id, i)">
              <div class="admin-item__info">
                <div class="admin-item__top">
                  <span class="admin-item__name">{{ item.name }}</span>
                  <span class="admin-item__price">{{ item.price }}</span>
                </div>
                <p class="admin-item__desc">{{ item.desc }}</p>
                <span v-if="item.tag" class="admin-item__tag">{{ item.tag }}</span>
              </div>
              <div class="admin-item__actions">
                <button class="abtn abtn--outline abtn--sm" @click="startEdit(currentCat.id, i, item)">
                  Modifier
                </button>
                <button class="abtn abtn--danger abtn--sm" @click="confirmRemoveItem(currentCat.id, i)">
                  Supprimer
                </button>
              </div>
            </template>

            <!-- Mode édition inline -->
            <form v-else class="admin-edit-form" @submit.prevent="saveEdit">
              <div class="admin-edit-form__row">
                <div class="admin-field">
                  <label class="admin-field__label">Nom *</label>
                  <input class="admin-field__input" v-model="itemForm.name" required />
                </div>
                <div class="admin-field">
                  <label class="admin-field__label">Prix *</label>
                  <input class="admin-field__input" v-model="itemForm.price" required />
                </div>
                <div class="admin-field">
                  <label class="admin-field__label">Badge</label>
                  <input class="admin-field__input" v-model="itemForm.tag" placeholder="ex : ⭐ Coup de cœur" />
                </div>
              </div>
              <div class="admin-field">
                <label class="admin-field__label">Description</label>
                <textarea class="admin-field__input admin-field__textarea" v-model="itemForm.desc" rows="2" />
              </div>
              <div class="admin-edit-form__actions">
                <button type="submit" class="abtn abtn--primary abtn--sm">Enregistrer</button>
                <button type="button" class="abtn abtn--ghost abtn--sm" @click="cancelEdit">Annuler</button>
              </div>
            </form>
          </li>
        </ul>

        <!-- Ajout d'un plat -->
        <div class="admin-add-item">
          <button
            v-if="!showAddItem"
            class="abtn abtn--outline"
            @click="showAddItem = true; editingItem = null"
          >
            + Ajouter un plat
          </button>

          <form v-else class="admin-edit-form admin-edit-form--add" @submit.prevent="handleAddItem">
            <h3 class="admin-edit-form__title">Nouveau plat</h3>
            <div class="admin-edit-form__row">
              <div class="admin-field">
                <label class="admin-field__label">Nom *</label>
                <input class="admin-field__input" v-model="newItem.name" placeholder="ex : Planche du chef" required />
              </div>
              <div class="admin-field">
                <label class="admin-field__label">Prix *</label>
                <input class="admin-field__input" v-model="newItem.price" placeholder="ex : 18 €" required />
              </div>
              <div class="admin-field">
                <label class="admin-field__label">Badge</label>
                <input class="admin-field__input" v-model="newItem.tag" placeholder="ex : Nouveau" />
              </div>
            </div>
            <div class="admin-field">
              <label class="admin-field__label">Description</label>
              <textarea
                class="admin-field__input admin-field__textarea"
                v-model="newItem.desc"
                rows="2"
                placeholder="Ingrédients, description…"
              />
            </div>
            <div class="admin-edit-form__actions">
              <button type="submit" class="abtn abtn--primary">Ajouter</button>
              <button type="button" class="abtn abtn--ghost" @click="showAddItem = false">Annuler</button>
            </div>
          </form>
        </div>
      </main>

      <main class="admin-main admin-main--empty" v-else>
        <p>Aucune catégorie. Commence par en créer une.</p>
      </main>
    </div>

    <!-- Pied de page ─────────────────────────────────────── -->
    <footer class="admin-footer">
      <p class="admin-footer__note">
        ⚠ Les modifications sont sauvegardées dans le navigateur (localStorage).
        Elles seront visibles pour tous les visiteurs de <strong>cet appareil</strong> uniquement,
        jusqu'à la migration vers un hébergeur avec base de données.
      </p>
      <button class="abtn abtn--danger" @click="handleReset">
        Réinitialiser le menu par défaut
      </button>
    </footer>
  </div>
</template>

<style scoped>
/* ── Layout global ─────────────────────────────────────── */
.admin {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  background: #f4f2f0;
  color: var(--text);
}

/* ── En-tête ───────────────────────────────────────────── */
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--white);
  border-bottom: 1px solid var(--beige-dark);
  position: sticky;
  top: 0;
  z-index: 10;
}

.admin-header__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-header__ornament {
  font-size: 1.1rem;
  color: var(--sienne);
}

.admin-header__title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
}

/* ── Corps (sidebar + main) ────────────────────────────── */
.admin-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* ── Sidebar ───────────────────────────────────────────── */
.admin-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--white);
  border-right: 1px solid var(--beige-dark);
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
  gap: 0.5rem;
}

.admin-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.admin-sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  border: none;
  border-radius: var(--radius);
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-muted);
  cursor: pointer;
  text-align: left;
  transition: background var(--transition), color var(--transition);
}

.admin-sidebar__item:hover {
  background: var(--cream);
  color: var(--text);
}

.admin-sidebar__item.is-active {
  background: var(--sienne);
  color: var(--white);
}

.admin-sidebar__footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--beige-dark);
  padding-top: 0.75rem;
}

/* ── Main ──────────────────────────────────────────────── */
.admin-main {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-main--empty {
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.admin-main__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-main__title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 500;
}

/* ── Liste des plats ───────────────────────────────────── */
.admin-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-item {
  background: var(--white);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.admin-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.admin-item__top {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.admin-item__name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.admin-item__price {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--sienne);
  background: rgba(140, 114, 96, 0.08);
  padding: 0.15rem 0.6rem;
  border-radius: 50px;
}

.admin-item__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.admin-item__tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--taupe-dark);
  background: var(--beige);
  padding: 0.15rem 0.6rem;
  border-radius: 50px;
  align-self: flex-start;
}

.admin-item__actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── Formulaire d'édition inline ───────────────────────── */
.admin-edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  background: var(--white);
  border: 1px solid var(--sienne);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.admin-edit-form--add {
  background: var(--cream);
  border-color: var(--beige-dark);
}

.admin-edit-form__title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 500;
}

.admin-edit-form__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.admin-edit-form__actions {
  display: flex;
  gap: 0.5rem;
}

/* ── Champs ────────────────────────────────────────────── */
.admin-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.admin-field__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.admin-field__input {
  padding: 0.55rem 0.75rem;
  border: 1.5px solid var(--beige-dark);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text);
  background: var(--white);
  outline: none;
  transition: border-color var(--transition);
}

.admin-field__input:focus {
  border-color: var(--sienne);
}

.admin-field__textarea {
  resize: vertical;
}

/* ── Ajout d'un plat ───────────────────────────────────── */
.admin-add-item {
  margin-top: 0.5rem;
}

/* ── Mini formulaire (catégorie) ───────────────────────── */
.admin-mini-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-mini-form input {
  padding: 0.45rem 0.65rem;
  border: 1.5px solid var(--beige-dark);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text);
  background: var(--cream);
  outline: none;
}

.admin-mini-form input:focus {
  border-color: var(--sienne);
}

.admin-mini-form__actions {
  display: flex;
  gap: 0.4rem;
}

/* ── Pied de page ──────────────────────────────────────── */
.admin-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--beige-dark);
  background: var(--white);
}

.admin-footer__note {
  font-size: 0.78rem;
  color: var(--text-muted);
  max-width: 600px;
  line-height: 1.5;
}

/* ── Boutons génériques (préfixe "abtn") ───────────────── */
.abtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition);
  white-space: nowrap;
}

.abtn--sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.7rem;
}

.abtn--full {
  width: 100%;
}

.abtn--primary {
  background: var(--sienne);
  color: var(--white);
  border-color: var(--sienne);
}
.abtn--primary:hover {
  background: var(--taupe-dark);
  border-color: var(--taupe-dark);
}

.abtn--outline {
  background: transparent;
  color: var(--sienne);
  border-color: var(--sienne);
}
.abtn--outline:hover {
  background: var(--sienne);
  color: var(--white);
}

.abtn--ghost {
  background: transparent;
  color: var(--text-muted);
  border-color: var(--beige-dark);
}
.abtn--ghost:hover {
  background: var(--cream);
  color: var(--text);
}

.abtn--danger {
  background: transparent;
  color: #c0392b;
  border-color: #c0392b;
}
.abtn--danger:hover {
  background: #c0392b;
  color: #fff;
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 640px) {
  .admin-body {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--beige-dark);
  }

  .admin-sidebar__nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .admin-sidebar__item {
    flex: 1;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;
  }

  .admin-header__title {
    font-size: 1rem;
  }
}
</style>

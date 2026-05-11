import { ref } from 'vue'
import { defaultCategories } from '../data/menuData.js'

const STORAGE_KEY = 'riviere_menu'

function loadCategories() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return structuredClone(defaultCategories)
    }
  }
  return structuredClone(defaultCategories)
}

// Singleton : la même instance est partagée entre MenuSection et AdminView
const categories = ref(loadCategories())

export function useMenu() {
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories.value))
  }

  function addCategory(category) {
    categories.value.push(category)
    save()
  }

  function removeCategory(id) {
    categories.value = categories.value.filter(c => c.id !== id)
    save()
  }

  function addItem(categoryId, item) {
    const cat = categories.value.find(c => c.id === categoryId)
    if (cat) {
      cat.items.push(item)
      save()
    }
  }

  function removeItem(categoryId, itemIndex) {
    const cat = categories.value.find(c => c.id === categoryId)
    if (cat) {
      cat.items.splice(itemIndex, 1)
      save()
    }
  }

  function updateItem(categoryId, itemIndex, updatedItem) {
    const cat = categories.value.find(c => c.id === categoryId)
    if (cat) {
      cat.items[itemIndex] = { ...updatedItem }
      save()
    }
  }

  function resetToDefault() {
    categories.value = structuredClone(defaultCategories)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    categories,
    addCategory,
    removeCategory,
    addItem,
    removeItem,
    updateItem,
    resetToDefault,
  }
}

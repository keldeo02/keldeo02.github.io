<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()

const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function handleLogin() {
  if (!password.value) return
  loading.value = true
  error.value   = ''
  const ok = await login(password.value)
  loading.value = false
  if (ok) {
    router.push('/admin/dashboard')
  } else {
    error.value   = 'Mot de passe incorrect.'
    password.value = ''
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <span class="login-brand__ornament">♩</span>
        <h1 class="login-brand__name">La Rivière du Moulin</h1>
        <p class="login-brand__sub">Espace administration</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="login-field">
          <label for="password" class="login-label">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="login-input"
            placeholder="••••••••"
            autocomplete="current-password"
            autofocus
            required
          />
        </div>

        <p v-if="error" class="login-error" role="alert">{{ error }}</p>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">Vérification…</span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="login-back">
        <RouterLink to="/" class="login-back__link">← Retour au site</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  padding: 1.5rem;
}

.login-card {
  background: var(--white);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-md);
}

.login-brand {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-brand__ornament {
  display: block;
  font-size: 2rem;
  color: var(--sienne);
  margin-bottom: 0.75rem;
}

.login-brand__name {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--text);
}

.login-brand__sub {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 0.4rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.login-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.login-input {
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--beige-dark);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text);
  background: var(--cream);
  transition: border-color var(--transition);
  outline: none;
}

.login-input:focus {
  border-color: var(--sienne);
}

.login-error {
  font-size: 0.85rem;
  color: #c0392b;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: var(--radius);
  padding: 0.6rem 0.9rem;
}

.login-btn {
  padding: 0.85rem;
  background: var(--sienne);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--transition), opacity var(--transition);
}

.login-btn:hover:not(:disabled) {
  background: var(--taupe-dark);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-back {
  margin-top: 1.5rem;
  text-align: center;
}

.login-back__link {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition);
}

.login-back__link:hover {
  color: var(--sienne);
}
</style>

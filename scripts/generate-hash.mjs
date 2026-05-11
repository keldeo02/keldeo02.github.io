/**
 * Génère le hash SHA-256 d'un mot de passe pour l'admin.
 *
 * Usage :
 *   node scripts/generate-hash.mjs TON_MOT_DE_PASSE
 *
 * Colle ensuite le résultat dans .env.local :
 *   VITE_ADMIN_PASSWORD_HASH=<hash>
 *
 * Et configure le secret GitHub pour le CI/CD :
 *   Settings → Secrets → VITE_ADMIN_PASSWORD_HASH
 */

import { createHash } from 'node:crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage : node scripts/generate-hash.mjs TON_MOT_DE_PASSE')
  process.exit(1)
}

const hash = createHash('sha256').update(password).digest('hex')
console.log('\nHash SHA-256 :')
console.log(hash)
console.log('\nColle ceci dans .env.local :')
console.log(`VITE_ADMIN_PASSWORD_HASH=${hash}`)

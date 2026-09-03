import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // No eslint-plugin-react-hooks v7, `configs['recommended-latest']` ainda e
      // eslintrc (plugins como array de strings) e o eslint 9 recusa. O flat
      // config vive sob `configs.flat`.
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // Regra do agente front-end: nada de `any` em dados de dominio.
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
])

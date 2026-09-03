import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Respeita a porta atribuida pelo ambiente quando houver; senao, a padrao
    // do Vite. Sem isto, duas copias do projeto brigam pela 5173.
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    // O corpo dos 200 posts do blog e um chunk de ~500 kB por decisao: ele so
    // e baixado por quem abre um post. O limite fica logo acima disso para o
    // aviso continuar servindo de alarme se algum outro chunk crescer.
    chunkSizeWarningLimit: 520,
  },
})

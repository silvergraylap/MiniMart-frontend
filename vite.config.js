import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default {
   server: {
      proxy: {
         '/auth': 'http://localhost:8000',
      },
   },
}

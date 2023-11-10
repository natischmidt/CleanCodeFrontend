import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs";

// https://vitejs.dev/config/
const httpsOptions = {
  key: fs.readFileSync('./CleanCode.key'),
  cert: fs.readFileSync('./CleanCode.crt')
};
export default defineConfig({

  plugins: [react()],
  server: {
    https: httpsOptions,
    open: true
  },
})

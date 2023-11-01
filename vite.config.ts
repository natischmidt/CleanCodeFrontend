import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs";

// https://vitejs.dev/config/
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'test'
};
export default defineConfig({

  plugins: [react()],
  server: {
    https: httpsOptions,
    open: true
  },
})

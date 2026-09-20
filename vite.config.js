import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import net from 'node:net'
import url from 'node:url'

function devPortCheckerPlugin() {
  return {
    name: 'dev-port-checker-api',
    configureServer(server) {
      server.middlewares.use('/api/check-port', (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const host = parsedUrl.query.host;
        const port = parseInt(parsedUrl.query.port, 10);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        if (!host || isNaN(port) || port < 1 || port > 65535) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Invalid host or port parameters' }));
        }

        const start = Date.now();
        const socket = new net.Socket();
        socket.setTimeout(4000);

        let finished = false;
        const finish = (result) => {
          if (finished) return;
          finished = true;
          socket.destroy();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        };

        socket.connect(port, host, () => {
          finish({
            status: 'open',
            host,
            port,
            latency: Date.now() - start,
            message: `Port ${port} is OPEN on ${host}`
          });
        });

        socket.on('timeout', () => {
          finish({
            status: 'timeout',
            host,
            port,
            latency: Date.now() - start,
            message: `Port ${port} TIMED OUT on ${host} (Filtered or Firewalled)`
          });
        });

        socket.on('error', (err) => {
          const msg = (err && err.message) || '';
          if (msg.includes('ECONNREFUSED')) {
            finish({
              status: 'closed',
              host,
              port,
              latency: Date.now() - start,
              message: `Port ${port} is CLOSED on ${host} (Connection Refused)`
            });
          } else if (msg.includes('ENOTFOUND')) {
            finish({
              status: 'unknown-host',
              host,
              port,
              message: `DNS could not resolve host "${host}"`
            });
          } else {
            finish({
              status: 'closed',
              host,
              port,
              error: msg,
              message: `Connection failed: ${msg}`
            });
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devPortCheckerPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'ui-vendor';
          }
        }
      }
    }
  }
})



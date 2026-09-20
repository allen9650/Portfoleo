import net from 'node:net';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const host = req.query.host;
  const port = parseInt(req.query.port, 10);

  if (!host || isNaN(port) || port < 1 || port > 65535) {
    return res.status(400).json({ error: 'Invalid host or port parameters' });
  }

  const start = Date.now();
  const socket = new net.Socket();
  socket.setTimeout(4000);

  let finished = false;
  const finish = (statusCode, data) => {
    if (finished) return;
    finished = true;
    socket.destroy();
    res.status(statusCode).json(data);
  };

  socket.connect(port, host, () => {
    finish(200, {
      status: 'open',
      host,
      port,
      latency: Date.now() - start,
      message: `Port ${port} is OPEN on ${host}`
    });
  });

  socket.on('timeout', () => {
    finish(200, {
      status: 'timeout',
      host,
      port,
      latency: Date.now() - start,
      message: `Port ${port} TIMED OUT on ${host} (Filtered / Firewalled)`
    });
  });

  socket.on('error', (err) => {
    const msg = (err && err.message) || '';
    if (msg.includes('ECONNREFUSED')) {
      finish(200, {
        status: 'closed',
        host,
        port,
        latency: Date.now() - start,
        message: `Port ${port} is CLOSED on ${host} (Connection Refused)`
      });
    } else if (msg.includes('ENOTFOUND')) {
      finish(200, {
        status: 'unknown-host',
        host,
        port,
        message: `DNS could not resolve host "${host}"`
      });
    } else {
      finish(200, {
        status: 'closed',
        host,
        port,
        error: msg,
        message: `Connection failed: ${msg}`
      });
    }
  });
}

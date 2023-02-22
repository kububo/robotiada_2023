import { Router } from 'express';
import fetch from 'node-fetch';
import type { Headers } from 'node-fetch';

type ProxyEntry = {
  headers: Headers;
  body: Buffer;
};

const REDIRECT_HEADERS = [
  'access-control-allow-origin',
  'content-type',
  'content-length',
];

const db = new Map<string, ProxyEntry>();
const router = Router();

router.post('/', async (req, res) => {
  const { id, url } = req.body;

  const response = await fetch(url);
  const buff = await response.buffer();

  db.set(id, {
    headers: response.headers,
    body: buff,
  });

  res.json({ ok: true });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id || '';

  if (!db.has(id)) return res.status(404).send();

  const { headers, body } = db.get(id);

  headers.forEach((value, name) => {
    if (REDIRECT_HEADERS.includes(name)) res.setHeader(name, value);
  });

  res.setHeader('Cache-Control', 'no-cache');
  res.send(body);
});

export default router;

import express from 'express';

import printServerRouter from './routers/print-server';
import imageProxyRouter from './routers/image-proxy';

const app = express();

// fix cors issues
app.use((req, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-headers', '*');

  next();
});

app.use(express.json());
app.use('/print', printServerRouter);
app.use('/proxy', imageProxyRouter);

app.listen(8080, () => console.log('listening on 8080'));

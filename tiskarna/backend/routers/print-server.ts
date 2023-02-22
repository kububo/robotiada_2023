import { Router } from 'express';
import { Paper } from '../modules/Paper';
import { TargetPaper } from '../modules/TargetPaper';

type Point = {
  x: number;
  y: number;
};

type PrintEntry = {
  added: Date;
  width: number;
  height: number;
  instructions: Point[][][]; // Layer, object, points
};

const router = Router();
const printQueue: PrintEntry[] = [];

// TODO: Change size of the paper!!!!!
const targetPaper = new TargetPaper(150, 210); // A5 size

router.get('/', (req, res) => {
  const [last] = printQueue.slice(-1);

  if (!last) {
    return res.json({
      exists: false,
    });
  }

  const added = last.added;
  const id = printQueue.length - 1;
  const numberOfLayers = last.instructions.length;
  const numberOfObjects = last.instructions.reduce((sum, layer) => {
    return sum + layer.length;
  }, 0);

  res.json({ id, added, numberOfLayers, numberOfObjects });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!printQueue[id]) return res.status(400).send();

  res.json({
    instructions: printQueue[id].instructions,
  });
});

router.get('/:id/:layer/:object', (req, res) => {
  const id = Number(req.params.id);
  const layer = Number(req.params.layer);
  const object = Number(req.params.object);

  if (!printQueue[id]) return res.status(400).send();

  res.json({
    instructions: printQueue[id].instructions?.[layer]?.[object],
    next: !!printQueue[id].instructions?.[layer]?.[object + 1],
  });
});

// allow only requests from localhost
router.use((req, res, next) => {
  if (req.ip === '::ffff:127.0.0.1') return next();

  res.status(403).send('403 - unauthorized');
});

router.post('/', (req, res) => {
  if (
    !req.body.width ||
    !req.body.height ||
    !Array.isArray(req.body.instructions)
  ) {
    return res.json({ ok: false });
  }

  const originalPaper = new Paper(req.body.width, req.body.height);

  const instructions = (
    req.body.instructions as PrintEntry['instructions']
  ).map((layer) => {
    return layer.map((object) => {
      return object.map((point) => {
        targetPaper.createFit(originalPaper);

        const x = targetPaper.fit('x', point.x);
        const y = targetPaper.fit('y', point.y);

        return { x, y };
      });
    });
  });

  printQueue.push({
    added: new Date(),
    width: req.body.width,
    height: req.body.height,
    instructions,
  });

  if (printQueue.length > 10) printQueue.splice(0, 1);

  console.log('Print added successfully!'); // TODO: Remove this in the future...

  res.json({ ok: true, l: printQueue.length });
});

export default router;

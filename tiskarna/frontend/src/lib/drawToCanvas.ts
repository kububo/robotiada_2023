import type { TraceData } from './imageTracer';
import type { PointsContainer } from './toPoints';

type DrawToCanvasProps = {
  pointsContainer: PointsContainer;
  traceData: TraceData;
};

const initCanvas = (traceData: TraceData) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = traceData.width;
  canvas.height = traceData.height;

  return { canvas, ctx };
};

export const drawToCanvas = ({
  pointsContainer,
  traceData,
}: DrawToCanvasProps): HTMLCanvasElement => {
  const { canvas, ctx } = initCanvas(traceData);

  if (!ctx) return canvas;

  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';

  pointsContainer.forEach((layer) => {
    layer.forEach((shape) => {
      ctx.beginPath();

      shape.forEach((point, i) => {
        if (i === 0) return ctx.moveTo(point.x, point.y);

        ctx.lineTo(point.x, point.y);
      });

      ctx.closePath();
      ctx.stroke();
    });
  });

  return canvas;
};

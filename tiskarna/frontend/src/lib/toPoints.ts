// @ts-ignore
import simplify from 'https://esm.sh/simplify-js';
import type { TraceData } from './imageTracer';

type ToPointsProps = {
  traceData: TraceData;
  simplification: number;
};

export type Point = {
  x: number;
  y: number;
};

export type PointsContainer = Point[][][];
// 0: layers
// 1: objects
// 2: points

export const toPoints = ({ traceData, simplification }: ToPointsProps) => {
  let pointsContainer: PointsContainer = [];

  for (let i = 0; i < traceData.layers.length; i++) {
    pointsContainer[i] = [];

    for (let j = 0; j < traceData.layers[i].length; j++) {
      pointsContainer[i][j] = [];
      pointsContainer[i][j].push({
        x: traceData.layers[i][j].segments[0].x1,
        y: traceData.layers[i][j].segments[0].y1,
      });

      for (var k = 0; k < traceData.layers[i][j].segments.length; k++) {
        pointsContainer[i][j].push({
          x: traceData.layers[i][j].segments[k].x2,
          y: traceData.layers[i][j].segments[k].y2,
        });

        if (traceData.layers[i][j].segments[k].hasOwnProperty('x3')) {
          pointsContainer[i][j].push({
            x: traceData.layers[i][j].segments[k].x3 || 0,
            y: traceData.layers[i][j].segments[k].y3 || 0,
          });
        }
      }

      pointsContainer[i][j] = simplify(
        pointsContainer[i][j],
        simplification,
        false
      );
    }
  }

  return pointsContainer;
};

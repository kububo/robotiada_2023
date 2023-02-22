import type { Point } from '@/lib/toPoints';

type ShapeReduceValues = {
  previousPoint: Point | undefined;
  length: number;
};

const getDistance = (startPoint: Point, endPoint: Point) => {
  const xDifference = Math.abs(startPoint.x - endPoint.x);
  const yDifference = Math.abs(startPoint.y - endPoint.y);

  return Math.sqrt(xDifference ** 2 + yDifference ** 2);
};

export const getShapeLength = (shape: Point[]): number => {
  return shape.reduce(
    (values: ShapeReduceValues, point) => {
      if (!values.previousPoint) values.previousPoint = point; // Set starting point

      values.length += getDistance(values.previousPoint, point); // Add distance between two points to total length

      return values;
    },
    {
      previousPoint: undefined,
      length: 0,
    } satisfies ShapeReduceValues
  ).length; // Return only length
};

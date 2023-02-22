// @ts-ignore
import ImageTracer from 'https://esm.sh/imagetracerjs';

type TracePreset =
  | 'default'
  | 'posterized1'
  | 'posterized2'
  | 'posterized3'
  | 'curvy'
  | 'sharp'
  | 'detailed'
  | 'smoothed'
  | 'grayscale'
  | 'fixedpalette'
  | 'randomsampling1'
  | 'randomsampling2'
  | 'artistic1'
  | 'artistic2'
  | 'artistic3'
  | 'artistic4';

// TODO: Add option to use custom pallette
// https://github.com/jankovicsandras/imagetracerjs/blob/master/options.md
type CustomTraceOptions = {
  ltres?: number;
  qtres?: number;
  pathomit?: number;
  rightangleenhance?: boolean;
  numberofcolors?: number;
  layering?: number;
  blurradius?: number;
  blurdelta?: number;
};

export type TraceOptions = CustomTraceOptions | TracePreset;

type ToTraceDataProps = {
  url: string;
  traceOptions: TraceOptions;
};

export type TraceData = {
  width: number;
  height: number;
  palette: {
    r: number;
    g: number;
    b: number;
    a: number;
  }[];
  layers: {
    boundingbox: number[];
    holechildren: number[];
    isholepath: boolean;
    segments: {
      type: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x3?: number;
      y3?: number;
    }[];
  }[][];
};

type ToSVGProps = {
  traceData: TraceData;
  traceOptions: TraceOptions;
};

export const toTraceData = ({
  url,
  traceOptions,
}: ToTraceDataProps): Promise<TraceData> => {
  return new Promise((resolve: Function) => {
    if (typeof traceOptions === 'object') {
      ImageTracer.imageToTracedata(url, resolve, { ...traceOptions, corsenabled: true });
      return;
    }

    ImageTracer.imageToTracedata(url, resolve, traceOptions);
  });
};

export const toSVG = ({ traceData, traceOptions }: ToSVGProps): string => {
  const svg = ImageTracer.getsvgstring(traceData, traceOptions);

  return svg;
};

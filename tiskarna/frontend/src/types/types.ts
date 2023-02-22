export type TraceOptions = {
  ltres?: number;
  qtres?: number;
  pathomit?: number;
  rightangleenhance?: boolean;
  numberofcolors?: number;
  layering?: number;
  blurradius?: number;
  blurdelta?: number;
};

export type ProcessingOptions = {
  simplification: number;
};

export type EditorOutput = {
  url: string;
  traceOptions: TraceOptions;
  processingOptions: ProcessingOptions;
};

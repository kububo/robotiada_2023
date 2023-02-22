<script lang="ts">
  import axios from 'axios';

  import { toTraceData, toSVG } from '@/lib/imageTracer';
  import { toPoints } from '@/lib/toPoints';
  import { drawToCanvas } from '@/lib/drawToCanvas';
  import { getShapeLength } from '@/lib/getShapeLength';

  import type { TraceData } from '@/lib/imageTracer';
  import type { EditorOutput } from '@/types/types';

  import Editor from '@/components/Editor.svelte';
  import ResultPreview from '@/lib/ResultPreview.svelte';

  const PRINT_SERVER_URL = 'http://192.168.0.176:8080/print/';

  let traceData: TraceData;
  let svgPreview: HTMLImageElement;
  let linesPreview: HTMLElement;

  const updateOptions = async ({ detail }: { detail: EditorOutput }) => {
    const { url, traceOptions, processingOptions } = detail;

    traceData = await toTraceData({ url, traceOptions });
    const svg = toSVG({ traceData, traceOptions });

    svgPreview = document.createElement('img');
    svgPreview.draggable = false;
    svgPreview.src = 'data:image/svg+xml,' + svg;

    const pointsContainer = toPoints({
      traceData,
      simplification: processingOptions.simplification,
    }).map((layer) => {
      return layer.filter((shape) => getShapeLength(shape) > 20); // Preserve only shapes with length greater than 20
    });

    axios.post(PRINT_SERVER_URL, {
      width: traceData.width,
      height: traceData.height,
      instructions: pointsContainer,
    });

    linesPreview = drawToCanvas({ pointsContainer, traceData });
  };
</script>

{#if navigator.userAgent.toLocaleLowerCase().includes('firefox')}
  <main>
    <Editor on:update={updateOptions} />
    <ResultPreview bind:contentElement={svgPreview} />
    <ResultPreview bind:contentElement={linesPreview} />
  </main>
{:else}
  <h1 class="error">Unsupported browser!</h1>
{/if}

<style>
  main {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 450px 1fr 1fr;
  }

  :global(main > * + *) {
    border-left: 0.2rem solid black;
  }

  .error {
    text-align: center;
  }
</style>

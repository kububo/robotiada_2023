<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Slider from '@/lib/Slider.svelte';

  import type { TraceOptions, ProcessingOptions } from '@/types/types';

  const dispatch = createEventDispatcher<{
    updateTrace: TraceOptions;
    updateProcessing: ProcessingOptions;
  }>();

  $: dispatch('updateTrace', {
    ltres,
    qtres,
    pathomit,
    rightangleenhance,
    numberofcolors,
    layering,
    blurradius,
    blurdelta,
  });

  $: dispatch('updateProcessing', {
    simplification,
  });

  onMount(() => {
    dispatch('updateTrace', {
      ltres,
      qtres,
      pathomit,
      rightangleenhance,
      numberofcolors,
      layering,
      blurradius,
      blurdelta,
    });
    dispatch('updateProcessing', {
      simplification,
    });
  });

  const resetOptions = () => {
    ltres = 1;
    qtres = 1;
    pathomit = 8;
    rightangleenhance = true;
    numberofcolors = 16;
    layering = 0;
    blurradius = 0;
    blurdelta = 20;
    simplification = 15;
  };

  let ltres: number = 1;
  let qtres: number = 1;
  let pathomit: number = 8;
  let rightangleenhance: boolean = true;
  let numberofcolors: number = 16;
  let layering: number = 0;
  let blurradius: number = 0;
  let blurdelta: number = 20;

  let simplification: number = 15;
</script>

<div>
  <button class="reset" on:click={resetOptions}>reset options</button>

  <Slider label="lines error" bind:value={ltres} min={0} max={50} step={0.1} />
  <Slider label="splines error" bind:value={qtres} min={0} max={50} step={0.1} />
  <Slider label="maximum path" bind:value={pathomit} min={0} max={100} />
  <!-- TODO: Add toggle switch for "rightangleenhance" -->
  <Slider label="number of colors" bind:value={numberofcolors} min={1} max={64} />
  <Slider label="layering" bind:value={layering} min={0} max={1} />
  <Slider label="blur radius" bind:value={blurradius} min={0} max={100} />
  <Slider label="blur delta" bind:value={blurdelta} min={0} max={100} />

  <Slider label="simplification" bind:value={simplification} min={0} max={100} />
</div>

<style>
  .reset {
    margin: 1rem 0;
    width: 100%;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Loading from '@/lib/Loading.svelte';
  import ImageOptions from '@/lib/ImageOptions.svelte';
  import ImageLoader from '@/lib/ImageLoader.svelte';

  import type {
    TraceOptions,
    ProcessingOptions,
    EditorOutput,
  } from '@/types/types';

  let debouncing = false;
  let debounceTimeout: NodeJS.Timeout;

  let url: string;
  let traceOptions: TraceOptions;
  let processingOptions: ProcessingOptions;

  const updateUrl = ({ detail }) => {
    url = null;
    url = detail;
  };
  const updateTraceOptions = ({ detail }) => (traceOptions = detail);
  const updateProcessingOptions = ({ detail }) => (processingOptions = detail);

  const dispatch = createEventDispatcher<{ update: EditorOutput }>();

  $: {
    debouncing = true;
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      dispatch('update', { url, traceOptions, processingOptions });
      debouncing = false;
    }, 500);
  }
</script>

<section>
  <Loading small={true} hidden={!debouncing} />
  <ImageLoader on:update={updateUrl} />

  <div class="fill" />

  <ImageOptions
    on:updateTrace={updateTraceOptions}
    on:updateProcessing={updateProcessingOptions}
  />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
  }

  .fill {
    flex: 1;
  }
</style>

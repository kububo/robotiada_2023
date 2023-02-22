<script lang="ts">
  import { onMount } from 'svelte';

  export let contentElement: HTMLElement;

  let scale: number = 1;
  let xOffset: number = 0;
  let yOffset: number = 0;
  let previewElement: HTMLElement;

  $: {
    if (previewElement && contentElement) {
      contentElement.style.maxWidth = '100%';
      contentElement.style.maxHeight = '100%';
      contentElement.style.margin = 'auto';
      contentElement.style.transition = '0.1s scale linear';
      contentElement.style.border = '0.1rem dashed purple';

      previewElement.innerHTML = '';
      previewElement.append(contentElement);
    }
  }

  $: {
    if (contentElement) {
      contentElement.style.scale = `${scale}`;
      contentElement.style.translate = `${xOffset}px ${yOffset}px`;
    }
  }

  onMount(() => {
    let held = false;
    let startPoint: { x: number; y: number } = { x: 0, y: 0 };

    previewElement.addEventListener('wheel', (e) => {
      scale *= e.deltaY < 0 ? 0.9 : 1.1;
    });

    previewElement.addEventListener('mousedown', (e) => {
      previewElement.style.cursor = 'grabbing';
      startPoint = {
        x: e.offsetX,
        y: e.offsetY,
      };
      held = true;
    });

    previewElement.addEventListener('mouseup', (e) => {
      previewElement.style.cursor = 'grab';
      held = false;
    });

    previewElement.addEventListener('mousemove', (e) => {
      if (!held) return;
      xOffset += e.offsetX - startPoint.x;
      yOffset += e.offsetY - startPoint.y;
    });

    previewElement.addEventListener('dblclick', () => {
      scale = 1;
      xOffset = 0;
      yOffset = 0;
    });
  });
</script>

<section class="preview" bind:this={previewElement} />

<style>
  .preview {
    display: flex;
    overflow: hidden;
    cursor: grab;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Loading from '@/lib/Loading.svelte';

  import DownloadIcon from '@/assets/download-cloud.svg';
  import ErrorIcon from '@/assets/error.svg';

  const dispatchEvent = createEventDispatcher<{ update: string }>();

  let previewContainerElement: HTMLDivElement;
  let loadingImage = false;
  let currentUrl = '';

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      previewContainerElement.innerHTML = ''; // Reset container

      const img = document.createElement('img');
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', () => reject(img));

      img.style.cursor = 'zoom-in';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';

      img.onclick = () => window.open(url);
      img.src = url;
    });

  const fetchImage = () => {
    loadingImage = true;

    loadImage(currentUrl)
      .then((img) => {
        previewContainerElement.append(img);
        dispatchEvent('update', img.src); // Send a valid url
      })
      .catch((img: HTMLImageElement) => {
        img.src = ErrorIcon; // Show an error icon
        previewContainerElement.append(img);
      })
      .finally(() => {
        loadingImage = false;
      });
  };
</script>

<div class="section">
  <div class="output">
    {#if loadingImage}<Loading />{/if}
    <div class="preview_container" bind:this={previewContainerElement} />
  </div>

  <form on:submit|preventDefault={fetchImage}>
    <input type="url" bind:value={currentUrl} placeholder="image URL address" />

    <button type="submit">
      <img src={DownloadIcon} class="icon" alt="Download" />
    </button>
  </form>
</div>

<style>
  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preview_container {
    height: 100px;
  }

  form {
    padding: 0.25rem;
    display: flex;
    gap: 0.3rem;
  }

  form input {
    flex: 1;
    padding: 0.5rem;
  }

  .output {
    display: flex;
    justify-content: center;
  }
</style>

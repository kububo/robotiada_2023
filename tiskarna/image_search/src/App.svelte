<script lang="ts">
  import { API } from './lib/api';

  import Info from './lib/Info.svelte';
  import CategoryInput from './lib/CategoryInput.svelte';
  import Image from './lib/Image.svelte';
  import BottomBar from './lib/BottomBar.svelte';

  const instance = new API('http://localhost:8080/proxy/');

  const requestImage = async () => {
    loading = true;

    const url = instance.construct_url(categories);
    await instance.requestNewImage(url);
    imageDataUrl = await instance.getImage();

    loading = false;
  };

  const showInfo = () => (info = true);

  let imageDataUrl: string;
  let categories: string[] = [];
  let loading: boolean = false;
  let info: boolean = false;
</script>

{#if info}
  <Info bind:shown={info} url={instance.url} id={instance.id} />
{/if}

<main>
  <CategoryInput bind:categories />
  <Image {loading} src={imageDataUrl} />
  <BottomBar
    gotImageUrl={!!imageDataUrl}
    on:requestImage={requestImage}
    on:showInfo={showInfo}
  />
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  :global(*) {
    box-sizing: border-box;
  }

  :global(:root) {
    --foreground-color: #f7ece1bc;
    --background-color: #201a23;
    --input-fg-color: #fbfbfb8b;
    --material-color: #2e253253;
    --main-color: #631d76;
    --secondary-color: #40367398;
    --danger-color: #f7173541;
  }

  :global(body) {
    background-color: var(--background-color);
    font-family: 'Roboto', sans-serif;
    color: var(--foreground-color);
  }

  main {
    display: grid;
    grid-template-rows: min-content auto min-content;
    gap: 1rem;

    position: absolute;
    inset: 0;
    padding: 0.5rem;
  }
</style>

<script lang="ts">
  export let shown: boolean;
  export let url: string;
  export let id: string;

  const hide = () => (shown = false);
  const copyUrl = () => navigator.clipboard.writeText(url + id);
</script>

<div class="popup">
  <div>URL API bodu: {url}</div>
  <div>ID aplikace: {id}</div>

  <hr />

  <div>
    <span>URL konkrétního bodu: </span>
    <a href="{url}{id}" target="_blank" rel="noreferrer">{url}{id}</a>
  </div>

  <hr />

  <i>Zdroj obrázků: Unsplash</i>

  <hr />

  <div class="actions">
    <button on:click={hide}>Skrýt informace</button>
    <button on:click={copyUrl}>Zkopírovat adresu bodu</button>
  </div>
</div>

<style>
  .popup {
    position: absolute;
    inset: 0;
    z-index: 1000;

    font-family: 'Courier New', Courier, monospace;
    background-color: white;
    color: black;

    padding: 1rem;
  }

  hr {
    margin: 2rem 0;
    color: white;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
</style>

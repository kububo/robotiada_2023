<script lang="ts">
  export let src: string;
  export let loading: boolean;

  const openImage = () => window.open(src);
</script>

{#if !loading}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img {src} on:click={openImage} alt="" />
{:else}
  <div class="loading" />
{/if}

<style>
  img {
    height: 100%;
    object-fit: contain;
    margin: 0 auto;
    cursor: zoom-in;
  }

  .loading {
    width: 6rem;
    height: 6rem;
    margin: auto;

    border: 1rem solid rgba(128, 128, 128, 0.186);
    border-bottom-color: var(--main-color);
    border-radius: 50%;

    animation: rotate 1s infinite ease-in-out;
  }

  @keyframes rotate {
    to {
      rotate: 360deg;
    }
  }
</style>

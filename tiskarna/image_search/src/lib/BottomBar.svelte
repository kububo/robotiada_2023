<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let gotImageUrl: boolean;
  let mainButtonLabel: string;

  $: mainButtonLabel = `Získat ${gotImageUrl ? 'jiný' : ''} obrázek`;

  const dispatch = createEventDispatcher<{
    requestImage: void;
    showInfo: void;
  }>();

  const requestImage = () => dispatch('requestImage');
  const showInfo = () => dispatch('showInfo');
</script>

<nav>
  <button class="main" on:click={requestImage}>{mainButtonLabel}</button>
  <button class="secondary" on:click={showInfo}>Zobrazit informace</button>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    gap: 3rem;

    margin: 0 auto;
    padding: 1rem;
    width: clamp(30ch, 100%, 70ch);

    border-radius: 0.25rem;
    background-color: var(--material-color);
  }

  button {
    padding: 1rem;
    font-weight: bolder;

    border-radius: 0.25rem;
    border: none;
  }

  button.main {
    background-color: var(--main-color);
    color: var(--foreground-color);
  }

  button.secondary {
    background-color: var(--secondary-color);
    color: var(--foreground-color);
  }

  button:hover {
    filter: brightness(0.9);
  }

  button:active {
    filter: brightness(1.1);
  }

  button:focus {
    text-decoration: underline;
  }
</style>

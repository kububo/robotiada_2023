<script lang="ts">
  import trashIcon from '../assets/trash.svg';

  export let value: string = '';
  export let removeAction: (e: MouseEvent) => any = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="category" on:click={removeAction}>
  <div>{value}</div>
  <img src={trashIcon} alt="x" />
</div>

<style>
  .category {
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 0.25rem 0.5rem;
    border-radius: 0.1rem;
    background-color: var(--secondary-color);

    cursor: default;
  }

  .category:hover {
    filter: brightness(0.9);
  }

  .category img {
    height: 1rem;
  }
</style>

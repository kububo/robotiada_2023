<script lang="ts">
  import resetIcon from '../assets/reset.svg';
  import Category from './Category.svelte';

  export let categories: string[] = [];
  let currentCategory: string = '';

  const addCategory = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    categories = [...categories, currentCategory];
    currentCategory = '';
  };

  const removeCategory = (category: string) => () => {
    categories = categories.filter((entry) => entry !== category);
  };

  const resetCategories = () => {
    categories = [];
    currentCategory = '';
  };
</script>

<header>
  <div class="panel">
    <div class="categories">
      {#each categories as category}
        <Category value={category} removeAction={removeCategory(category)} />
      {/each}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="reset" on:click={resetCategories}>
      <img src={resetIcon} alt="reload" />
    </div>
  </div>

  <input
    type="text"
    bind:value={currentCategory}
    on:keypress={addCategory}
    placeholder="Zadejte název kategorie a stiskněte 'Enter'"
  />
</header>

<style>
  header {
    margin: 0 auto;
    padding: 1rem;
    width: clamp(30ch, 100%, 70ch);

    border-radius: 0.25rem;
    background-color: var(--material-color);
  }

  input {
    width: 100%;
    padding: 0.25rem 0.5rem;
    font-size: 1.2rem;

    background-color: transparent;
    color: var(--input-fg-color);

    border: none;
    border-bottom: 0.25rem solid var(--background-color);
    transition: border-bottom-color 100ms ease-in-out;
  }

  input:focus {
    outline: none;
    border-bottom-color: var(--main-color);
  }

  .panel {
    display: flex;
    gap: 1rem;
    padding: 0.25rem 1rem;
    margin-bottom: 1rem;
  }

  .categories {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
  }

  .categories:empty::before {
    content: '\00a0';
    padding: 0.25rem;
  }

  .reset {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--danger-color);
    border-radius: 0.25rem;
    padding: 0.5rem;
  }

  .reset:hover {
    filter: brightness(0.9);
  }

  .reset:active {
    filter: brightness(1.1);
  }
</style>

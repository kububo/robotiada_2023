<script lang="ts">
  export let label: string = '';
  export let value: number = 0;
  export let step: number = 1;
  export let min: number = 0;
  export let max: number = 100;

  const uuid = crypto.randomUUID();

  let editing = false;
  let editValue = value;
  const enableEdit = () => {
    editValue = value;
    editing = true;
  };
  const disableEdit = () => {
    value = editValue - (editValue % step); // Fit to desired step
    value = value > max ? max : value; // Check bounds
    value = value < min ? min : value;
    editing = false;
  };
  // Invoke callback function only when Enter is pressed
  const onEnterPress = (callback: Function) => (e: KeyboardEvent) =>
    e.key === 'Enter' && callback();
</script>

<div class="slider">
  <label for="input-range-{uuid}">{label}</label>
  <input type="range" id="input-range-{uuid}" {step} {min} {max} bind:value />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="value" on:click={enableEdit}>
    {#if editing}
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="number"
        {step}
        {min}
        {max}
        bind:value={editValue}
        on:keypress={onEnterPress(disableEdit)}
        on:blur={disableEdit}
        autofocus
      />
    {:else}
      {value}
    {/if}
  </div>
</div>

<style>
  .slider {
    display: flex;
    gap: 1rem;
    padding: 0.2rem 0;
  }

  .slider label {
    flex: 1;
  }

  .value {
    padding: 0 0.5rem;
    min-width: 5ch;
  }

  .value:hover {
    cursor: default;
    color: darkorange;
  }

  input[type='number'] {
    width: 7ch;
  }
</style>

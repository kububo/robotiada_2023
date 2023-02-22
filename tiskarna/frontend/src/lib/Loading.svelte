<script lang="ts">
  export let small = false;
  export let hidden = false;
</script>

<div class="loader" class:small class:hidden />

<style>
  .loader {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem auto;

    border: 0.5rem solid blue;
    border-left-color: transparent;
    border-radius: 50%;
    animation: rotate 1.5s infinite ease-in-out;
  }

  .small {
    width: 1rem;
    height: 1rem;
    border-width: 0.25rem;
  }

  .hidden {
    visibility: hidden;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>

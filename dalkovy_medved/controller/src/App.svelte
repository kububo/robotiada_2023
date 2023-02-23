<script lang="ts">
  import './lib/control';
  import { values } from './lib/values';

  let speedPercentage: number;
  $: speedPercentage = Math.floor($values.speed * 100);
</script>

<main>
  <section class="badges">
    {#if $values.turnInPlace}
      <div class="badge">Turning in place 🔃</div>
    {/if}
  </section>

  <section class="speed">{speedPercentage}</section>

  <section class="turn">
    <svg height="220" width="220">
      <circle cx="110" cy="110" r="95" fill="#b5b5b568" />
      <circle
        cx={80 * $values.turn + 110}
        cy={-80 * $values.speed + 110}
        r="20"
        fill="#2d5d6d"
      />
    </svg>
  </section>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap');

  main {
    position: absolute;
    inset: 0;

    display: grid;
    grid-template-rows: 8rem 12rem auto;

    font-size: 1.5rem;
    font-family: 'Signika Negative', sans-serif;
  }

  .speed {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 5rem;
    font-weight: bolder;
    font-family: 'Tilt Warp', cursive;
  }

  .badges {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badge {
    padding: 1rem;
    background-color: #722e7284;
    border-radius: 0.5rem;
  }

  .turn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

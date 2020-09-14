<template>
  <div>
    <novelty-rate/>
    <calculation-nir/>
  </div>
</template>

<script>
import CalculationNir from '../childCreateNir/CalculationNir.vue';
import NoveltyRate from '../childCreateNir/NoveltyRate.vue';

export default {
  name: 'CreateNirPage',
  components: {
    CalculationNir,
    NoveltyRate,
  },
};
</script>

<style scoped>

</style>

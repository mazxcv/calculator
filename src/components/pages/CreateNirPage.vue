<template>
  <div>
    <calculation-nir :listLabor="LIST_LABOR"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CalculationNir from '../childCreateNir/CalculationNir.vue';

export default {
  name: 'CreateNirPage',
  components: {
    CalculationNir,
  },
  mounted() {
    this.GET_LIST_LABOR();
  },
  computed: mapGetters(['LIST_LABOR']),
  methods: mapActions(['GET_LIST_LABOR']),
};
</script>

<style scoped>

</style>

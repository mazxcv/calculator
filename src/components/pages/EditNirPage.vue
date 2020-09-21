<template>
  <div>
    <calculation-nir :listLabor="LIST_LABOR"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CalculationNir from '../childCreateNir/CalculationNir.vue';

export default {
  name: 'EditNirPage',
  components: {
    CalculationNir,
  },
  mounted() {
    this.GET_LIST_LABOR();
    this.GET_STAGE_LIST();
    this.GET_CURRENT_STAGES(Number(this.$router.history.current.params.id));
  },
  computed: mapGetters(['LIST_LABOR', 'STAGE_LIST']),
  methods: mapActions(['GET_LIST_LABOR', 'GET_STAGE_LIST', 'GET_NIR_CURRENT', 'GET_CURRENT_STAGES']),
};
</script>

<style scoped>

</style>

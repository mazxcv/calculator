<template>
  <div>
    <calculation-nir
      :listLabor="LIST_LABOR"
      :listGroup="NIR_GROUP_LIST"
    />
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
    this.GET_NIR_STAGE_LIST();
    this.GET_NIR_GROUP_LIST();
    this.GET_CURRENT_STAGES(Number(this.$router.history.current.params.id));
  },
  computed: mapGetters([
    'LIST_LABOR',
    'NIR_STAGE_LIST',
    'NIR_GROUP_LIST',
  ]),
  methods: {
    ...mapActions([
      'GET_LIST_LABOR',
      'GET_NIR_STAGE_LIST',
      'GET_NIR_CURRENT',
      'GET_CURRENT_STAGES',
      'GET_NIR_GROUP_LIST',
      'REG_NIR_STAGE',
    ]),
  },
};
</script>

<style scoped>

</style>

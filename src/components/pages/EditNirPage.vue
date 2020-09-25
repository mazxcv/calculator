<template>
  <div>
    <calculation-nir
      :listLabor="LIST_LABOR"
      :listGroup="NIR_GROUP_LIST"
      :data="{
        nirId,
        nir: CURRENT_NIR,
        nirStages: NIR_STAGE_LIST,
        currentNirStages: CURRENT_STAGES,
        listNirInnovationRate: LIST_NIR_INNOVATION_RATE,
      }"
      :actions="{
        addStage: REG_NIR_STAGE,
      }"
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
    this.GET_LIST_NIR_INNOVATION_RATE();
    this.GET_NIR_CURRENT(this.nirId);
    this.GET_CURRENT_STAGES(this.nirId);
  },
  data() {
    return {
      nirId: Number(this.$router.history.current.params.id),
    };
  },
  computed: mapGetters([
    'LIST_LABOR',
    'NIR_STAGE_LIST',
    'NIR_GROUP_LIST',
    'CURRENT_STAGES',
    'CURRENT_NIR',
    'LIST_NIR_INNOVATION_RATE',
  ]),
  methods: {
    ...mapActions([
      'GET_LIST_LABOR',
      'GET_NIR_STAGE_LIST',
      'GET_NIR_CURRENT',
      'GET_CURRENT_STAGES',
      'GET_NIR_GROUP_LIST',
      'REG_NIR_STAGE',
      'GET_LIST_NIR_INNOVATION_RATE',
    ]),
  },
};
</script>

<style scoped>

</style>

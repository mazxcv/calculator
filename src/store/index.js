import Vue from 'vue';
import Vuex from 'vuex';
import nirModule from './nir';
import laborsModule from './labors';
import nirInnovationRateModule from './nirInnovationRate';
import stageModule from './stages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    nirModule,
    laborsModule,
    nirInnovationRateModule,
    stageModule,
  },
});

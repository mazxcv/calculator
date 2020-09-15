import Vue from 'vue';
import Vuex from 'vuex';
import nirModule from './nir';
import laborsModule from './labors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    nirModule,
    laborsModule,
  },
});

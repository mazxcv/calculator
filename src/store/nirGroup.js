import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    nirGroupList: [],
    nirGroupLaborList: [],
  },
  getters: {
    NIR_GROUP_LIST: (state) => state.nirGroupList,
    NIR_GROUP_LABOR_LIST: (state) => state.nirGroupLaborList,
  },
  mutations: {
    SET_NIR_GROUP_LIST: (state, list) => {
      state.nirGroupList = list;
    },
    SET_NIR_GROUP_LABOR_LIST: (state, list) => {
      state.nirGroupLaborList = list;
    },
  },
  actions: {
    GET_NIR_GROUP_LIST: async (context) => {
      await axios.get(`${HOST}/NirSoftwareDevLaborGroup`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_GROUP_LABOR_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevLabor/`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LABOR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

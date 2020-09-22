import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    stageList: [],
    currentStages: [],
  },
  getters: {
    STAGE_LIST: (state) => state.stageList.reverse(),
    CURRENT_STAGES: (state) => state.currentStages,
  },
  mutations: {
    SET_STAGE_LIST: (state, list) => {
      state.stageList = list;
    },
    SET_CURRENT_STAGES: (state, list) => {
      state.currentStages = list;
    },
  },
  actions: {
    GET_CURRENT_STAGES: async (context, id) => {
      await axios.get(`${HOST}/Nir/${id}/Stages`)
        .then((res) => {
          context.commit('SET_CURRENT_STAGES', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_STAGE_LIST: async (context) => {
      await axios.get(`${HOST}/NirStage`)
        .then((res) => {
          context.commit('SET_STAGE_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

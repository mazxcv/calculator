import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    stageList: [],
    currentStages: [],
  },
  getters: {
    NIR_STAGE_LIST: (state) => state.stageList,
    CURRENT_STAGES: (state) => state.currentStages,
  },
  mutations: {
    SET_STAGE_LIST: (state, list) => {
      state.stageList = list;
    },
    SET_CURRENT_STAGES: (state, list) => {
      state.currentStages = list.map((stage) => ({
        ...stage,
        list: [],
        groups: [],
      }));
    },
  },
  actions: {
    ADD_NIR_STAGE: async (context, payload) => {
      await axios.post(`${HOST}/NirStage`, payload)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SAVE_NIR_STAGE: async (context, payload) => {
      await axios.put(`${HOST}/NirStage?id=${payload.id}`, payload)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_CURRENT_STAGES: async (context, id) => {
      await axios.get(`${HOST}/Nir/${id}/Stages`)
        .then((res) => {
          context.commit('SET_CURRENT_STAGES', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_STAGE_LIST: async (context) => {
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

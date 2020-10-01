import axios from 'axios';
import moment from 'moment';

const HOST = process.env.VUE_APP_API || '';
moment.locale('ru');

export default {
  state: {
    nirList: [],
    currentNir: {},
    createdNirId: '',
  },
  getters: {
    CURRENT_NIR: (state) => state.currentNir,
    NIR_LIST: (state) => state.nirList,
    CREATED_NIR_ID: (state) => state.createdNirId,
  },
  mutations: {
    SET_NIR_LIST: (state, list) => {
      state.nirList = list.map((el) => ({
        ...el,
        createTime: moment(el.createTime).format('DD MMM YYYY, HH:mm'),
        dateFrom: moment(el.dateFrom).format('DD MMM YYYY'),
        dateTo: moment(el.dateTo).format('DD MMM YYYY'),
      }));
    },
    SET_NIR_CURRENT: (state, nir) => {
      const modStages = nir.stages ? nir.stages.map((stage) => ({
        ...stage,
        laborVolumes: stage.laborVolumes.map((el) => ({
          ...el,
          labor: {
            ...el.labor,
            step: (el.labor.maxVolume - el.labor.minVolume) / 10,
            overMax: el.labor.maxVolume + (((el.labor.maxVolume - el.labor.minVolume) / 10) * 3),
          },
        })),
      })) : [];
      console.log('modStages', modStages);
      if (nir.stages[0]) {
        state.currentNir = { ...nir, stages: modStages };
      } else {
        const stages = [{
          laborVolumes: [],
          nirInnovationRateID: null,
          nirInnovationRateValue: 0,
          volume: 0,
        }];
        state.currentNir = { ...nir, stages };
      }
    },
    ADD_NEW_NIR: (state, nir) => {
      state.createdNirId = nir.id;
      state.nirList = [...state.nirList,
        {
          ...nir,
          createTime: moment(nir.createTime).format('MMM DD YYYY, HH:mm'),
          updateTime: moment(nir.createTime).format('MMM DD YYYY, HH:mm'),
        },
      ];
    },
    SET_DELETE_TASK: (state, id) => {
      state.nirList = state.nirList.filter((el) => el.id !== id);
    },
  },
  actions: {
    GET_NIR_CURRENT: async (context, id) => {
      await axios.get(`${HOST}/Nir/${id}`)
        .then((res) => {
          context.commit('SET_NIR_CURRENT', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_LIST: async (context) => {
      await axios.get(`${HOST}/Nir`)
        .then((res) => {
          context.commit('SET_NIR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    CREATE_NIR: async (context, payload) => {
      await axios.post(`${HOST}/Nir`, payload)
        .then((res) => {
          context.commit('ADD_NEW_NIR', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    DELETE_NIR: async (context, id) => {
      console.log(id);
      await axios.delete(`${HOST}/Nir/${id}`)
        .then(() => {
          context.commit('SET_DELETE_TASK', id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

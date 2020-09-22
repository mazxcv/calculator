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
    NIR_LIST: (state) => state.nirList,
    CREATED_NIR_ID: (state) => state.createdNirId,
  },
  mutations: {
    SET_NIR_LIST: (state, list) => {
      state.nirList = list.map((el) => ({
        ...el,
        createTime: moment(el.createTime).format('MMM DD YYYY, HH:mm'),
        updateTime: moment(el.createTime).format('MMM DD YYYY, HH:mm'),
      }));
    },
    SET_NIR_CURRENT: (state, nir) => {
      state.currentNir = nir;
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

import axios from 'axios';
import moment from 'moment';

const HOST = process.env.VUE_APP_API || '';
moment.locale('ru');

export default {
  state: {
    nirList: [],
  },
  getters: {
    NIR_LIST: (state) => state.nirList,
  },
  mutations: {
    SET_NIR_LIST: (state, list) => {
      state.nirList = list.map((el) => ({
        ...el,
        createTime: moment(el.createTime).format('MMM DD YYYY, HH:mm'),
        updateTime: moment(el.createTime).format('MMM DD YYYY, HH:mm'),
      }));
    },
    ADD_NEW_NIR: (state, nir) => {
      state.nirList = [nir, ...state.nirList];
    },
  },
  actions: {
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
      console.log(payload);
      await axios.post(`${HOST}/Nir`, payload)
        .then((res) => {
          console.log(res.data);
          context.commit('ADD_NEW_NIR', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

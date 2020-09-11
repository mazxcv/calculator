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
  },
  actions: {
    GET_NIR_LIST: async (context) => {
      await axios.get(`${HOST}/Nir`)
        .then((res) => {
          console.log(res.data);
          context.commit('SET_NIR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

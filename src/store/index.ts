import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';

const store = createStore({
  modules: {
    config,
    employee,
  },
});

export default store;
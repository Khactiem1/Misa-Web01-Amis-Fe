import { createStore } from 'vuex';
import employee from './module/employee';
import config from './module/config';

const store = createStore({
  modules: {
    config,
    employee,
  },
});

export default store;
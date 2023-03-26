import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';
import branch from './module/branch';
import depot from './module/depot';

const store = createStore({
  modules: {
    config,
    employee,
    branch,
    depot,
  },
});

export default store;
import { createStore } from 'vuex';
import employee from './module/employee';

const store = createStore({
  modules: {
    employee,
  },
});

export default store;
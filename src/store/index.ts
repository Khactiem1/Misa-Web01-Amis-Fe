import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';
import branch from './module/branch';
import depot from './module/depot';
import unitCalculation from './module/unitCalculation';
import commodityGroup from './module/commodityGroup';

const store = createStore({
  modules: {
    config,
    employee,
    branch,
    depot,
    unitCalculation,
    commodityGroup,
  },
});

export default store;
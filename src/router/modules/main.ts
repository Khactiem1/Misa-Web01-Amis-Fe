import home from './main/home';
import cash from './main/cash';
import inventory from './main/inventory';

const router: any = [
  {
    /** 
     * Module trang chủ 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/',
    children: [...home],
  },
  {
    /** 
     * Module trang tiền mặt 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/cash',
    children: [...cash],
  },
  {
    /** 
     * Module trang kho 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory',
    children: [...inventory],
  },
  {
    /** 
     * Trang không tồn tại 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/not-found',
    component: () => import('../../views/main/not-found/NotFound.vue'),
    meta: { title: 'page.not_found' }
  },
  {
    /** 
     * Trang không tồn tại 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/feature-built',
    component: () => import('../../views/main/Construction/ConstructionPage.vue'),
    meta: { title: 'page.construction_page' }
  },
]

export default router;
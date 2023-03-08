const router: any = [
  {
    /** 
     * Trang chủ 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/',
    component: () => import('../../../views/main/home/HomePage.vue'),
    meta: { title: 'page.home' }
  },
]

export default router;
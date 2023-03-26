const router: any = [
  {
    /** 
     * Trang tiền mặt 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/cash',
    component: () => import('../../../views/main/cash/cash-main/CashMain.vue'),
    meta: { title: 'page.cash_main' }
  },
  {
    /** 
     * Trang nhân viên
     * Khắc Tiềm - 08.03.2023
     *  */
    path: '/cash/employee',
    component: () => import('../../../views/main/cash/employee/EmployeePage.vue'),
    meta: { title: 'page.employee' }
  },
  {
    /** 
     * Trang đơn vị
     * Khắc Tiềm - 08.03.2023
     *  */
    path: '/cash/branch',
    component: () => import('../../../views/main/cash/branch/BranchPage.vue'),
    meta: { title: 'page.branch' }
  },
]

export default router;
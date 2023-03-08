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
]

export default router;
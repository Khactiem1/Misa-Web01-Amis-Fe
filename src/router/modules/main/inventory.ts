const router: any = [
  {
    /** 
     * Trang kho 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory',
    component: () => import('../../../views/main/inventory/inventoryMain/InventoryMain.vue'),
    meta: { title: 'page.inventory_main' }
  },
  {
    /** 
     * Trang vật tư hàng hoá 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory/inventoryItem',
    component: () => import('../../../views/main/inventory/inventoryItem/InventoryItemPage.vue'),
    meta: { title: 'page.inventory_item' }
  },
  {
    /** 
     * Trang kho
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory/depot',
    component: () => import('../../../views/main/inventory/depot/DepotPage.vue'),
    meta: { title: 'page.depot' }
  },
  {
    /** 
     * Trang đơn vị tính
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory/unitCalculation',
    component: () => import('../../../views/main/inventory/unitCalculation/UnitCalculationPage.vue'),
    meta: { title: 'page.unitCalculation' }
  },
  {
    /** 
     * Trang đơn vị tính
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory/commodityGroup',
    component: () => import('../../../views/main/inventory/commodityGroup/CommodityGroupPage.vue'),
    meta: { title: 'page.commodityGroup' }
  },
]

export default router;
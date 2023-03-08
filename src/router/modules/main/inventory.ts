const router: any = [
  {
    /** 
     * Trang kho 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory',
    component: () => import('../../../views/main/inventory/inventory-main/InventoryMain.vue'),
    meta: { title: 'page.inventory_main' }
  },
  {
    /** 
     * Trang vật tư hàng hoá 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory/inventory-item',
    component: () => import('../../../views/main/inventory/inventory-item/InventoryItemPage.vue'),
    meta: { title: 'page.inventory_item' }
  },
]

export default router;
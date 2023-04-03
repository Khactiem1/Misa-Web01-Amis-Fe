import { ActionTable, InfoTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import { inventoryItem } from './column-module/index'

/**
 * Các mutation
 * Khắc Tiềm - 08.03.2023
 */
let mutations: any = {
  
};

/**
 * Các action
 * Khắc Tiềm - 08.03.2023
 */
let actions: any = {
	
};

/**
 * Các action thao tác với table
 * Khắc Tiềm - 08.03.2023
 */
const actionTable: InfoTable = {
  actionDefault: ActionTable.Edit,
	actionList: [ActionTable.Replication, ActionTable.Delete, ActionTable.StopUsing],
	fieldId: "inventoryItemID",
	fieldCode: "inventoryItemCode",
	fieldActive: "isActive",
};

/**
 * Hàm custom tham số filter nhận được từ api
 * Khắc Tiềm - 08.03.2023
 */
const setRecordList = (state: any, payload: any, columns: any) => {
  const index = columns.findIndex((item: any) => item.Field === "quantityTock");
  if(payload.dataMore){
    state.columns[index].Data = payload.dataMore.quantityInStock;
    return;
  }
  state.columns[index].Data = '';
}

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * Khắc Tiềm - 08.03.2023
 */
const inventoryItems: BaseStore = new BaseStore(ModuleName.InventoryItem, inventoryItem, mutations, actions, actionTable, setRecordList);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default inventoryItems.store;

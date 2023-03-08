import { ActionTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import columns from './column-module/employee'

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
let actionTable: any = {
  actionDefault: ActionTable.Edit,
	actionList: [ActionTable.Replication, ActionTable.Delete, ActionTable.StopUsing],
	fieldId: "employeeID",
	fieldCode: "employeeCode",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * Khắc Tiềm - 08.03.2023
 */
const employees: BaseStore = new BaseStore(ModuleName.Employee, columns, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
    mutations = null;
    actions = null;
    actionTable = null;
}, 0);

export default employees.store;

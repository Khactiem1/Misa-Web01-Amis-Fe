import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "depotCode",
    "depot.DepotCode",
    'module.inventory.depotCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotCode" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inventory.depotCode'}
  ),
  new Header(
    "depotName",
    "depot.DepotName",
    'module.inventory.depotName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotName" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inventory.depotName'},
  ),
  new Header(
    "depotDelivery",
    "depot.DepotDelivery",
    'common.delivery',
    "545",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotDelivery" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'common.delivery',},
  ),
  new Header(
    "isActive",
    "depot.IsActive",
    'common.status',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "depot.IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.Depot, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Depot);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
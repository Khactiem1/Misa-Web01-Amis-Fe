import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "commodityCode",
    "commoditygroup.CommodityCode",
    'module.inventory.commodityCode',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "CommodityCode" , typeFilter: TypeFilter.Text, module: ModuleName.CommodityGroup, headerSearch: 'module.inventory.commodityCode'}
  ),
  new Header(
    "commodityName",
    "commoditygroup.CommodityName",
    'module.inventory.commodityName',
    "843",
    { typeSearch: TypeSearch.Text, columnSearch: "CommodityName" , typeFilter: TypeFilter.Text, module: ModuleName.CommodityGroup, headerSearch: 'module.inventory.commodityName'},
  ),
  new Header(
    "isActive",
    "commoditygroup.IsActive",
    'common.status',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.CommodityGroup, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.CommodityGroup);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
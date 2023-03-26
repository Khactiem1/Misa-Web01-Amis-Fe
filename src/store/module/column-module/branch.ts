import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "branchCode",
    "branch.BranchCode",
    'module.cash.branchCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchCode" , typeFilter: TypeFilter.Text, module: ModuleName.Branch, headerSearch: 'module.cash.branchCode'}
  ),
  new Header(
    "branchName",
    "branch.BranchName",
    'module.cash.branchName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchName" , typeFilter: TypeFilter.Text, module: ModuleName.Branch, headerSearch: 'module.cash.branchName'},
  ),
  new Header(
    "description",
    "branch.Description",
    'common.description',
    "552",
    { typeSearch: TypeSearch.Text, columnSearch: "Description" , typeFilter: TypeFilter.Text, module: ModuleName.Branch, headerSearch: 'common.description',},
  ),
  new Header(
    "isActive",
    "branch.IsActive",
    'common.status',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.Branch, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Branch);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
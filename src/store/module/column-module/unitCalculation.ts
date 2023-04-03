import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "unitCalculationName",
    "unitcalculation.UnitCalculationName",
    'module.inventory.unitCalculationName',
    "500",
    { typeSearch: TypeSearch.Text, columnSearch: "unitcalculation.UnitCalculationName" , typeFilter: TypeFilter.Text, module: ModuleName.UnitCalculation, headerSearch: 'module.inventory.unitCalculationName'},
  ),
  new Header(
    "unitCalculationDetail",
    "unitcalculation.UnitCalculationDetail",
    'module.inventory.unitCalculationDetail',
    "743",
    { typeSearch: TypeSearch.Text, columnSearch: "unitcalculation.UnitCalculationDetail" , typeFilter: TypeFilter.Text, module: ModuleName.UnitCalculation, headerSearch: 'module.inventory.unitCalculationDetail',},
  ),
  new Header(
    "isActive",
    "unitcalculation.IsActive",
    'common.status',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "unitcalculation.IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.UnitCalculation, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.UnitCalculation);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
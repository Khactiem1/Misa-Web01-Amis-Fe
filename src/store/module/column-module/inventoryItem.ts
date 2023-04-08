import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable, Nature, DepreciatedTax } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "avatar",
    "inventoryitem.Avatar",
    'module.inventory.avatar',
    "120",
  ),
  new Header(
    "inventoryItemCode",
    "inventoryitem.InventoryItemCode",
    'module.inventory.inventoryItemCode',
    "180",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.InventoryItemCode" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.inventoryItemCode'}
  ),
  new Header(
    "inventoryItemName",
    "inventoryitem.InventoryItemName",
    'module.inventory.inventoryItemName',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.InventoryItemName" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.inventoryItemName'},
  ),
  new Header(
    "nature",
    "inventoryitem.Nature",
    'module.inventory.nature',
    "180",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.Nature" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: Nature.Goods, header: 'module.inventory.goods' },
      { value: Nature.Service, header: 'module.inventory.service' },
      { value: Nature.Materials, header: 'module.inventory.materials' },
      { value: Nature.FinishedProduct, header: 'module.inventory.finished_product' },
      { value: Nature.ToolTools, header: 'module.inventory.tool_tools' },
    ], module: ModuleName.InventoryItem, headerSearch: 'module.inventory.nature', comparisonType: ComparisonType.Equal},
  ),
  new Header(
    "unitCalculationName",
    "unitcalculation.UnitCalculationName",
    'module.inventory.unitCalculationName',
    "180",
    { typeSearch: TypeSearch.Text, columnSearch: "unitcalculation.UnitCalculationName" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.unitCalculationName'},
  ),
  new Header(
    "quantityTock",
    "inventoryitem.QuantityTock",
    'module.inventory.quantityTock',
    "150",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.QuantityTock" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.quantityTock'},
  ),
  new Header(
    "minimumStock",
    "inventoryitem.MinimumStock",
    'module.inventory.minimumStock',
    "220",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.MinimumStock" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.minimumStock'},
  ),
  new Header(
    "depreciatedTax",
    "inventoryitem.DepreciatedTax",
    'module.inventory.depreciatedTax',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.DepreciatedTax" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: DepreciatedTax.undefined, header: 'module.inventory.undefined' },
      { value: DepreciatedTax.no_tax_reduction, header: 'module.inventory.no_tax_reduction' },
      { value: DepreciatedTax.tax_reduction, header: 'module.inventory.tax_reduction' },
    ], module: ModuleName.InventoryItem, headerSearch: 'module.inventory.depreciatedTax', comparisonType: ComparisonType.Equal},
  ),
  new Header(
    "warrantyPeriod",
    "inventoryitem.WarrantyPeriod",
    'module.inventory.warrantyPeriod',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.WarrantyPeriod" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.warrantyPeriod'},
  ),
  new Header(
    "origin",
    "inventoryitem.Origin",
    'module.inventory.origin',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.Origin" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.origin'},
  ),
  new Header(
    "description",
    "inventoryitem.Description",
    'module.inventory.description',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.Description" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.description'},
  ),
  new Header(
    "explanationBuy",
    "inventoryitem.ExplanationBuy",
    'module.inventory.explanationBuy',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.ExplanationBuy" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.explanationBuy'},
  ),
  new Header(
    "explanationSell",
    "inventoryitem.ExplanationSell",
    'module.inventory.explanationSell',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.ExplanationSell" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.explanationSell'},
  ),
  new Header(
    "vatGroupExciceTax",
    "inventoryitem.VATGroupExciceTax",
    'module.inventory.vatGroupExciceTax',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.VATGroupExciceTax" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.vatGroupExciceTax'},
  ),
  new Header(
    "depotCode",
    "depot.DepotCode",
    'module.inventory.depotCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotCode" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.depotCode'}
  ),
  new Header(
    "depotName",
    "depot.DepotName",
    'module.inventory.depotName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotName" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.depotName'},
  ),
  new Header(
    "accountDepot",
    "inventoryitem.AccountDepot",
    'module.inventory.accountDepot',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountDepot" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountDepot'},
  ),
  new Header(
    "accountRevenue",
    "inventoryitem.AccountRevenue",
    'module.inventory.accountRevenue',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountRevenue" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountRevenue'},
  ),
  new Header(
    "accountDiscount",
    "inventoryitem.AccountDiscount",
    'module.inventory.accountDiscount',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountDiscount" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountDiscount'},
  ),
  new Header(
    "accountSale",
    "inventoryitem.AccountSale",
    'module.inventory.accountSale',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountSale" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountSale'},
  ),
  new Header(
    "accountReturn",
    "inventoryitem.AccountReturn",
    'module.inventory.accountReturn',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountReturn" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountReturn'},
  ),
  new Header(
    "accountCost",
    "inventoryitem.AccountCost",
    'module.inventory.accountCost',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inventoryitem.AccountCost" , typeFilter: TypeFilter.Text, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.accountCost'},
  ),
  new Header(
    "ratioDiscount",
    "inventoryitem.RatioDiscount",
    'module.inventory.ratioDiscount',
    "250",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.RatioDiscount" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.ratioDiscount'},
  ),
  new Header(
    "vatTax",
    "inventoryitem.VATTax",
    'module.inventory.vatTax',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.VATTax" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.vatTax'},
  ),
  new Header(
    "vatImport",
    "inventoryitem.VATImport",
    'module.inventory.vatImport',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.VATImport" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.vatImport'},
  ),
  new Header(
    "vatExport",
    "inventoryitem.VATExport",
    'module.inventory.vatExport',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.VATExport" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.vatExport'},
  ),
  new Header(
    "orderFix",
    "inventoryitem.OrderFix",
    'module.inventory.orderFix',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.OrderFix" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.orderFix'},
  ),
  new Header(
    "orderNearest",
    "inventoryitem.OrderNearest",
    'module.inventory.orderNearest',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.OrderNearest" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.orderNearest'},
  ),
  new Header(
    "orderSell",
    "inventoryitem.OrderSell",
    'module.inventory.orderSell',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.OrderSell" , typeFilter: TypeFilter.Number, module: ModuleName.InventoryItem, headerSearch: 'module.inventory.orderSell'},
  ),
  new Header(
    "isActive",
    "inventoryitem.IsActive",
    'common.status',
    "150",
    { typeSearch: TypeSearch.Number, columnSearch: "inventoryitem.IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.InventoryItem, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
  else if(item.Field === 'avatar'){
    columns[index].TypeFormat.IsImage = true;
  }
  else if(item.Field === 'nature'){
    columns[index].TypeFormat.IsNature = true;
  }
  else if(item.Field === 'depreciatedTax'){
    columns[index].TypeFormat.DepreciatedTax = true;
  }
  else if(item.Field === 'minimumStock' || item.Field === 'quantityTock' || item.Field === 'ratioDiscount' || item.Field === 'vatTax' || item.Field === 'vatImport' || item.Field === 'vatExport' || item.Field === 'orderFix' || item.Field === 'orderNearest' || item.Field === 'orderSell'){
    columns[index].TypeFormat.FractionSize = true;
    columns[index].TypeFormat.TextAlign = 'right';
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.InventoryItem);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
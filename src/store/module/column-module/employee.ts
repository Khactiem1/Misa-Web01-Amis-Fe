import { ModuleName, TypeFilter, TypeSearch, Header, Gender, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "employeeCode",
    "employee.EmployeeCode",
    'module.cash.employeeCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeCode" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.employeeCode'}
  ),
  new Header(
    "employeeName",
    "employee.EmployeeName",
    'module.cash.employeeName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.employeeName'},
  ),
  new Header(
    "gender",
    "employee.Gender",
    'common.gender',
    "120",
    { typeSearch: TypeSearch.Number, columnSearch: "Gender" , typeFilter: TypeFilter.Combobox, module: ModuleName.Employee, headerSearch: 'common.gender', data: [
      { value: '', header: 'common.gender' },
      { value: Gender.Male, header: 'gender.male' },
      { value: Gender.Female, header: 'gender.female' },
      { value: Gender.Other, header: 'gender.other' },
    ], comparisonType: ComparisonType.Equal },
  ),
  new Header(
    "dateOfBirth",
    "employee.DateOfBirth",
    'common.dateOfBirth',
    "150",
    { typeSearch: TypeSearch.Date, columnSearch: "DateOfBirth" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: 'common.dateOfBirth'},
  ),
  new Header(
    "branchName",
    "branch.BranchName",
    'module.cash.branchName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.branchName', 
      join: { TableJoin: "branch" },
    },
  ),
  new Header(
    "branchCode",
    "branch.BranchCode",
    'module.cash.branchCode',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchCode" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.branchCode', 
      join: { TableJoin: "branch" },
    },
  ),
  new Header(
    "branchBank",
    "employee.BranchBank",
    'module.cash.branchBank',
    "230",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.branchBank'},
  ),
  new Header(
    "identityCard",
    "employee.IdentityCard",
    'module.cash.identityCard',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "IdentityCard" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.identityCard'},
  ),
  new Header(
    "employeeTitle",
    "employee.EmployeeTitle",
    'module.cash.employeeTitle',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeTitle" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.employeeTitle'},
  ),
  new Header(
    "bankAccount",
    "employee.BankAccount",
    'module.cash.bankAccount',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "BankAccount" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.bankAccount'},
  ),
  new Header(
    "nameBank",
    "employee.NameBank",
    'module.cash.nameBank',
    "180",
    { typeSearch: TypeSearch.Text, columnSearch: "NameBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.nameBank'},
  ),
  new Header(
    "dayForIdentity",
    "employee.DayForIdentity",
    'module.cash.dayForIdentity',
    "220",
    { typeSearch: TypeSearch.Date, columnSearch: "DayForIdentity" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: 'module.cash.dayForIdentity'},
  ),
  new Header(
    "grantAddressIdentity",
    "employee.GrantAddressIdentity",
    'module.cash.grantAddressIdentity',
    "230",
    { typeSearch: TypeSearch.Text, columnSearch: "GrantAddressIdentity" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.grantAddressIdentity'},
  ),
  new Header(
    "phoneNumber",
    "employee.PhoneNumber",
    'common.phoneNumber',
    "230",
    { typeSearch: TypeSearch.Text, columnSearch: "PhoneNumber" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'common.phoneNumber'},
  ),
  new Header(
    "landlinePhone",
    "employee.LandlinePhone",
    'module.cash.landlinePhone',
    "230",
    { typeSearch: TypeSearch.Text, columnSearch: "LandlinePhone" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.landlinePhone'},
  ),
  new Header(
    "employeeEmail",
    "employee.EmployeeEmail",
    'module.cash.employeeEmail',
    "230",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeEmail" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'module.cash.employeeEmail'},
  ),
  new Header(
    "employeeAddress",
    "employee.EmployeeAddress",
    'common.address',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeAddress" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: 'common.address'},
  ),
  new Header(
    "isCustomer",
    "employee.IsCustomer",
    'module.cash.isCustomer',
    "170",
    { typeSearch: TypeSearch.Number, columnSearch: "IsCustomer" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: 'common.yes' },
      { value: 'false', header: 'common.no' },
    ], module: ModuleName.Employee, headerSearch: 'module.cash.isCustomer', comparisonType: ComparisonType.Equal },
  ),
  new Header(
    "isVendor",
    "employee.IsVendor",
    'module.cash.isVendor',
    "170",
    { typeSearch: TypeSearch.Number, columnSearch: "IsVendor" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: 'common.yes' },
      { value: 'false', header: 'common.no' },
    ], module: ModuleName.Employee, headerSearch: 'module.cash.isVendor', comparisonType: ComparisonType.Equal },
  ),
  new Header(
    "isActive",
    "employee.IsActive",
    'common.status',
    "150",
    { typeSearch: TypeSearch.Number, columnSearch: "IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: 'true', header: 'common.using' },
      { value: 'false', header: 'common.stopUsing' },
    ], module: ModuleName.Employee, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'gender'){
    columns[index].TypeFormat.IsGender = true;
  }
  else if(item.Field === 'dateOfBirth'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
  else if(item.Field === 'dayForIdentity'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
  else if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
  }
  else if(item.Field === 'isVendor'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.CheckBox = true;
    columns[index].TypeFormat.LockCheckBox = true;
  }
  else if(item.Field === 'isCustomer'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.CheckBox = true;
    columns[index].TypeFormat.LockCheckBox = true;
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Employee);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;
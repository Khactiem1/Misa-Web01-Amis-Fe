import { ModuleName, TypeFilter, TypeSearch, Header, Gender, ComparisonType } from "@/core/public_api";
import i18n from '@/locales/i18n';

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
const columns: Header [] = [
  new Header(
    "employeeCode",
    i18n.global.t('module.cash.employeeCode'),
    "150px",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeCode" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeCode')}
  ),
  new Header(
    "employeeName",
    i18n.global.t('module.cash.employeeName'),
    "200px",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeName')},
  ),
  new Header(
    "gender",
    i18n.global.t('common.gender'),
    "120px",
    { typeSearch: TypeSearch.Number, columnSearch: "Gender" , typeFilter: TypeFilter.Combobox, module: ModuleName.Employee, headerSearch: i18n.global.t('common.gender'), data: [
      { value: '', header: i18n.global.t('common.gender') },
      { value: Gender.Male, header: i18n.global.t('gender.male') },
      { value: Gender.Female, header: i18n.global.t('gender.female') },
      { value: Gender.Other, header: i18n.global.t('gender.other') },
    ], comparisonType: ComparisonType.equal },
  ),
  new Header(
    "dateOfBirth",
    i18n.global.t('common.dateOfBirth'),
    "130px",
    { typeSearch: TypeSearch.Date, columnSearch: "DateOfBirth" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: i18n.global.t('common.dateOfBirth')},
  ),
  new Header(
    "branchBank",
    i18n.global.t('module.cash.branchBank'),
    "230px",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.branchBank')},
  ),
  new Header(
    "identityCard",
    i18n.global.t('module.cash.identityCard'),
    "200px",
    { typeSearch: TypeSearch.Text, columnSearch: "IdentityCard" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.identityCard')},
  ),
  new Header(
    "employeeTitle",
    i18n.global.t('module.cash.employeeTitle'),
    "150px",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeTitle" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeTitle')},
  ),
  new Header(
    "branchName",
    i18n.global.t('module.cash.branchName'),
    "200px",
    { typeSearch: TypeSearch.Text, columnSearch: "BranchName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.branchName')},
  ),
  new Header(
    "bankAccount",
    i18n.global.t('module.cash.bankAccount'),
    "150px",
    { typeSearch: TypeSearch.Text, columnSearch: "BankAccount" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.bankAccount')},
  ),
  new Header(
    "nameBank",
    i18n.global.t('module.cash.nameBank'),
    "180px",
    { typeSearch: TypeSearch.Text, columnSearch: "NameBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.nameBank')},
  ),
  new Header(
    "dayForIdentity",
    i18n.global.t('module.cash.dayForIdentity'),
    "220px",
    { typeSearch: TypeSearch.Date, columnSearch: "DayForIdentity" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.dayForIdentity')},
  ),
  new Header(
    "grantAddressIdentity",
    i18n.global.t('module.cash.grantAddressIdentity'),
    "230px",
    { typeSearch: TypeSearch.Text, columnSearch: "GrantAddressIdentity" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.grantAddressIdentity')},
  ),
  new Header(
    "phoneNumber",
    i18n.global.t('common.phoneNumber'),
    "230px",
    { typeSearch: TypeSearch.Text, columnSearch: "PhoneNumber" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('common.phoneNumber')},
  ),
  new Header(
    "landlinePhone",
    i18n.global.t('module.cash.landlinePhone'),
    "230px",
    { typeSearch: TypeSearch.Text, columnSearch: "LandlinePhone" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.landlinePhone')},
  ),
  new Header(
    "employeeEmail",
    i18n.global.t('module.cash.employeeEmail'),
    "230px",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeEmail" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeEmail')},
  ),
  new Header(
    "employeeAddress",
    i18n.global.t('common.address'),
    "200px",
    { typeSearch: TypeSearch.Text, columnSearch: "EmployeeAddress" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('common.address')},
  ),
  new Header(
    "isCustomer",
    i18n.global.t('module.cash.isCustomer'),
    "150px",
    { typeSearch: TypeSearch.Number, columnSearch: "IsCustomer" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: i18n.global.t('common.yes') },
      { value: 'false', header: i18n.global.t('common.no') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.isCustomer'), comparisonType: ComparisonType.equal },
  ),
  new Header(
    "isVendor",
    i18n.global.t('module.cash.isVendor'),
    "150px",
    { typeSearch: TypeSearch.Number, columnSearch: "IsVendor" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: i18n.global.t('common.yes') },
      { value: 'false', header: i18n.global.t('common.no') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.isVendor'), comparisonType: ComparisonType.equal },
  ),
  new Header(
    "isActive",
    i18n.global.t('common.status'),
    "150px",
    { typeSearch: TypeSearch.Number, columnSearch: "IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: i18n.global.t('common.all') },
      { value: 'true', header: i18n.global.t('common.using') },
      { value: 'false', header: i18n.global.t('common.stopUsing') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('common.status'), comparisonType: ComparisonType.equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'gender'){
    columns[index].TypeFormat.IsGender = true;
  }
  if(item.Field === 'dateOfBirth'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
  if(item.Field === 'dayForIdentity'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
  }
  if(item.Field === 'isVendor'){
    columns[index].TypeFormat.CheckBox = true;
    columns[index].TypeFormat.LockCheckBox = true;
  }
  if(item.Field === 'isCustomer'){
    columns[index].TypeFormat.CheckBox = true;
    columns[index].TypeFormat.LockCheckBox = true;
  }
})

export default columns;
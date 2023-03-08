import { ModuleName, TypeFilter, TypeSearch, Header, Gender, ComparisonType } from "@/core/public_api";
import i18n from '@/locales/i18n';

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
const columns: Header [] = [
  {
    field: "employeeCode",
    isShow: true,
    header: i18n.global.t('module.cash.employeeCode'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "EmployeeCode" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeCode')},
    width: "150px",
  },
  {
    field: "employeeName",
    isShow: true,
    header: i18n.global.t('module.cash.employeeName'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "EmployeeName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeName')},
    width: "200px",
  },
  {
    field: "gender",
    isShow: true,
    header: i18n.global.t('common.gender'),
    filter: { typeSearch: TypeSearch.Number, columnSearch: "Gender" , typeFilter: TypeFilter.Combobox, module: ModuleName.Employee, headerSearch: i18n.global.t('common.gender'), data: [
      { value: '', header: i18n.global.t('common.gender') },
      { value: Gender.Male, header: i18n.global.t('gender.male') },
      { value: Gender.Female, header: i18n.global.t('gender.female') },
      { value: Gender.Other, header: i18n.global.t('gender.other') },
    ], comparisonType: ComparisonType.equal },
    width: "120px",
    isGender: true,
  },
  {
    field: "dateOfBirth",
    isShow: true,
    header: i18n.global.t('common.dateOfBirth'),
    filter: { typeSearch: TypeSearch.Date, columnSearch: "DateOfBirth" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: i18n.global.t('common.dateOfBirth')},
    textAlign: "center",
    formatDate: true,
    width: "130px",
  }, //(Khắc Tiềm - 15.09.2022)formatDate Định dạng hiển thị ngày/tháng/năm
  {
    field: "branchBank",
    isShow: true,
    header: i18n.global.t('module.cash.branchBank'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "BranchBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.branchBank')},
    width: "230px",
  },
  {
    field: "identityCard",
    isShow: true,
    header: i18n.global.t('module.cash.identityCard'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "IdentityCard" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.identityCard')},
    width: "200px",
  },
  {
    field: "employeeTitle",
    isShow: true,
    header: i18n.global.t('module.cash.employeeTitle'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "EmployeeTitle" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeTitle')},
    width: "150px",
  },
  {
    field: "branchName",
    isShow: true,
    header: i18n.global.t('module.cash.branchName'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "BranchName" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.branchName')},
    width: "200px",
  },
  {
    field: "bankAccount",
    isShow: true,
    header: i18n.global.t('module.cash.bankAccount'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "BankAccount" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.bankAccount')},
    width: "150px",
  }, //(Khắc Tiềm - 15.09.2022)fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
  {
    field: "nameBank",
    isShow: true,
    header: i18n.global.t('module.cash.nameBank'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "NameBank" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.nameBank')},
    width: "180px",
  },
  {
    field: "dayForIdentity",
    isShow: true,
    header: i18n.global.t('module.cash.dayForIdentity'),
    filter: { typeSearch: TypeSearch.Date, columnSearch: "DayForIdentity" , typeFilter: TypeFilter.Date, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.dayForIdentity')},
    textAlign: "center",
    width: "220px",
    formatDate: true,
  },
  {
    field: "grantAddressIdentity",
    isShow: true,
    header: i18n.global.t('module.cash.grantAddressIdentity'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "GrantAddressIdentity" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.grantAddressIdentity')},
    width: "230px",
  },
  {
    field: "phoneNumber",
    isShow: true,
    header: i18n.global.t('common.phoneNumber'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "PhoneNumber" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('common.phoneNumber')},
    width: "230px",
  },
  {
    field: "landlinePhone",
    isShow: true,
    header: i18n.global.t('module.cash.landlinePhone'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "LandlinePhone" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.landlinePhone')},
    width: "230px",
  },
  {
    field: "employeeEmail",
    isShow: true,
    header: i18n.global.t('module.cash.employeeEmail'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "EmployeeEmail" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.employeeEmail')},
    width: "230px",
  },
  {
    field: "employeeAddress",
    isShow: true,
    header: i18n.global.t('common.address'),
    filter: { typeSearch: TypeSearch.Text, columnSearch: "EmployeeAddress" , typeFilter: TypeFilter.Text, module: ModuleName.Employee, headerSearch: i18n.global.t('common.address')},
    width: "200px",
  },
  {
    field: "isCustomer",
    isShow: true,
    header: i18n.global.t('module.cash.isCustomer'),
    filter: { typeSearch: TypeSearch.Number, columnSearch: "IsCustomer" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: i18n.global.t('common.have') },
      { value: 'false', header: i18n.global.t('common.no') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.isCustomer'), comparisonType: ComparisonType.equal },
    width: "150px",
  },
  {
    field: "isVendor",
    isShow: true,
    header: i18n.global.t('module.cash.isVendor'),
    filter: { typeSearch: TypeSearch.Number, columnSearch: "IsVendor" , typeFilter: TypeFilter.Radio, data: [
      { value: 'true', header: i18n.global.t('common.have') },
      { value: 'false', header: i18n.global.t('common.no') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('module.cash.isVendor'), comparisonType: ComparisonType.equal },
    width: "150px",
  },
  {
    field: "isActive",
    isShow: true,
    header: i18n.global.t('common.status'),
    filter: { typeSearch: TypeSearch.Number, columnSearch: "IsActive" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: i18n.global.t('common.all') },
      { value: 'true', header: i18n.global.t('common.using') },
      { value: 'false', header: i18n.global.t('common.stopUsing') },
    ], module: ModuleName.Employee, headerSearch: i18n.global.t('common.status'), comparisonType: ComparisonType.equal },
    isActive: true,
    width: "150px",
  },
];

export default columns;
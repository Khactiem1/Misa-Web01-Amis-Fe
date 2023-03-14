import { Gender } from "@/core/public_api";
import { BaseEntity } from "../base_entities";

/**
 * Nhân viên
 */
export class Employee extends BaseEntity{
  /** ID nhân viên */
  public employeeID: string;

  /** Mã nhân viên */
  public employeeCode: string;
  
  /** Tên nhân viên */
  public employeeName: string;

  /** ID đơn vị */
  public branchID: string;

  /** Mã đơn vị */
  public branchCode: string;

  /** Tên đơn vị */
  public branchName: string;

  /** Giới tính */
  public gender: Gender = Gender.Male;

  /** Ngày sinh */
  public dateOfBirth: Date;

  /** Chi nhánh ngân hàng */
  public branchBank: string;

  /** Số cmnd */
  public identityCard: string;
  
  /** Chức danh */
  public employeeTitle: string;

  /** Số tài khoản */
  public bankAccount: string;

  /** Tên ngân hàng */
  public nameBank: string;

  /** Ngày cấp CM */
  public dayForIdentity: Date;

  /** Nơi cấp cm */
  public grantAddressIdentity: string;

  /** Số điện thoại */
  public phoneNumber: string;

  /** Số điện thoại cố định */
  public landlinePhone: string;

  /** Địa chỉ */
  public employeeAddress: string;

  /** Địa chỉ mail */
  public employeeEmail: string;

  /** Trạng thái */
  public isActive: boolean = true;

  /** Là khách hàng */
  public isCustomer: boolean = false;

  /** Là nhà cung cấp */
  public isVendor: boolean = false;
}

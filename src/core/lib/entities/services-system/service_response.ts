/**
 * Kiểu dữ liệu backend trả về 
 * Khắc Tiềm 09.03.2023
 */
export class ServiceResponse {
  /** Thành công hay thất bại */
  public success: boolean

  /** Mã lỗi */
  public errorCode?: number

  /** Dữ liệu trả về */
  public data: any;
}
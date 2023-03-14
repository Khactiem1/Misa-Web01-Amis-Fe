export class BaseEntity {
  /** Người thêm */
  public createdBy: string;

  /** Ngày thêm */
  public createdDate: Date;

  /** Người sửa */
  public modifiedBy: string;
  
  /** Ngày sửa */
  public modifiedDate: Date;
}
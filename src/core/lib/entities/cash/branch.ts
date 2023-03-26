import { BaseEntity } from "../base_entities";

/**
 * đơn vị
 */
export class Branch extends BaseEntity{

  /** ID đơn vị */
  public branchID: string;

  /** Mã đơn vị */
  public branchCode: string = '';

  /** Tên đơn vị */
  public branchName: string = '';

  /** Mô tả */
  public description: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}

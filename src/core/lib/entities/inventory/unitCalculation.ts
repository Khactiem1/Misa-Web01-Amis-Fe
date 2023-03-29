import { BaseEntity } from "../base_entities";

/**
 * đơn vị tính
 */
export class UnitCalculation extends BaseEntity{

  /** ID đơn vị tính */
  public unitCalculationID: string;

  /** Tên đơn vị tính */
  public unitCalculationName: string = '';

  /** Mô tả chi tiết */
  public unitCalculationDetail: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}

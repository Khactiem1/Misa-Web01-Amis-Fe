import { BaseEntity } from "../base_entities";

/**
 * Kho
 */
export class Depot extends BaseEntity{

  /** ID kho */
  public depotID: string;

  /** Mã kho */
  public depotCode: string = '';

  /** Tên kho */
  public depotName: string = '';

  /** địa chỉ */
  public depotDelivery: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}

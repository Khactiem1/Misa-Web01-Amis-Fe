import { BaseEntity } from "../base_entities";

/**
 * Kho
 */
export class CommodityGroup extends BaseEntity{

  /** ID nhóm vật tư hàng hoá */
  public commodityGroupID: string;

  /** Mã nhóm vật tư hàng hoá */
  public commodityCode: string = '';

  /** Tên nhóm vật tư hàng hoá */
  public commodityName: string = '';

  /** Nhóm vật tư hàng hoá cha */
  public parentID: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}

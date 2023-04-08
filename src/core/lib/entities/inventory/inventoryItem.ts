import type { DepreciatedTax, Nature } from "@/core/public_api";
import { BaseEntity } from "../base_entities";

export class InventoryItem extends BaseEntity{
  /**  id hàng hoá */
  public inventoryItemID: string ;

  /**  id đơn vị tính */
  public unitCalculationID?: string = undefined ;

  /**  mã hàng hoá vật tư */
  public inventoryItemCode: string = '' ;

  /**  tên hàng hoá vật tư */
  public inventoryItemName: string = '' ;
  
  /**  ID nhóm vật tư hàng hoá */
  public commodityGroupID: string [] = [];
  
  /**  Mã nhóm vật tư hàng hoá */
  public commodityCode: string = ''  ;

  /**  Hình ảnh */
  public avatar: string = ''  ;

  /**  tính chất */
  public nature?: Nature = undefined;

  /**  Tên đơn vị tính */
  public unitCalculationName: string = '' ;
  
  /**  Giảm thuế */
  public depreciatedTax?: DepreciatedTax;
  
  /**  Thời hạn bảo hành */
  public warrantyPeriod: string = ''  ;

  /**  Số lượng tồn tối thiểu */
  public minimumStock?:number = undefined;

  /**  Số lượng tồn */
  public quantityTock?:number = undefined ;

  /**  Nguồn gốc */
  public origin: string = ''  ;

  /**  Mô tả */
  public description: string = ''  ;

  /**  Diễn giải khi mua */
  public explanationBuy: string = ''  ;

  /**  Diễn giải khi bán */
  public explanationSell: string = '' ; 
  
  /**  ID kho */
  public depotID?: string = undefined ;

  /**  Mã nhà kho */
  public depotCode: string = ''  ;

  /**  Tên nhà kho */
  public depotName: string = ''  ;

  /**  Tài khoản kho */
  public accountDepot: string = ''  ;

  /**  Tài khoản doanh thu */
  public accountRevenue: string = ''  ;
  
  /**  Tài khoản chiết khấu */
  public accountDiscount: string = ''  ;

  /**  Tài khoản giảm giá */
  public accountSale: string = ''  ;

  /**  Tài khoản trả lại */
  public accountReturn: string = ''  ;

  /**  Tài khoản chi phí */
  public accountCost: string = ''  ;

  /**  Tỉ lệ chiết khấu khuyến mại */
  public ratioDiscount?:number = undefined ;

  /**  Thuế giá trị gia tăng */
  public vatTax?:number = undefined ;

  /**  Thuế nhập khẩu */
  public vatImport?:number = undefined ;

  /**  Thuế xuất khẩu */
  public vatExport?:number = undefined ;

  /**  Nhóm hàng hoá dịch vụ chịu thuế tiêu thụ đặc biệt */
  public vatGroupExciceTax: string = ''  ;

  /**  Đơn mua cố định */
  public orderFix?:number = undefined ;

  /**  Đơn mua gần nhất */
  public orderNearest?:number = undefined ;

  /**  Đơn giá bán */
  public orderSell?:number = undefined ;

  /**  Hoạt động hay không hoạt động */
  public isActive: boolean = true ;
}
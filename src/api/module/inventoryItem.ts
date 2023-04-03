import { ModuleName } from "@/core/public_api";
import axiosAPI from "..";
import BaseApi from "../base_api";

export default class InventoryItemApi extends BaseApi {
  constructor(){
    super(ModuleName.InventoryItem + 's');
  }

  /**
   * API lấy ra tổng số lượng hàng sắp hết và hết hàng
   * Khắc Tiềm - 08.03.2023
   */
  public GetInventoryStatus = () => {
    return axiosAPI.get(`/InventoryItems/GetInventoryStatus`);
  }
}
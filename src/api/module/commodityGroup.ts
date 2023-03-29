import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class CommodityGroupApi extends BaseApi {
  constructor(){
    super(ModuleName.CommodityGroup + 's');
  }
}
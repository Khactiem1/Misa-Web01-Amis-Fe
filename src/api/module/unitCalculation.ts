import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class UnitCalculationApi extends BaseApi {
  constructor(){
    super(ModuleName.UnitCalculation + 's');
  }
}
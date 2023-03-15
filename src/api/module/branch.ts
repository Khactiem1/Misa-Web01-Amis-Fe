import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class BranchApi extends BaseApi {
  constructor(){
    super(ModuleName.Branch + 's');
  }
}
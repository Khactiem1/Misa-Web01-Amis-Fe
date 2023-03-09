import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class EmployeeApi extends BaseApi {
  constructor(){
    super(ModuleName.Employee);
  }
}
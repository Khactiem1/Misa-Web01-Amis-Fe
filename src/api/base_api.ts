import type { Filter } from "@/core/public_api";
import axiosAPI from ".";

export default class BaseApi{
  public Module: string;

  constructor(module: string){
    this.Module = module;
  }
  
  /**
   * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
   * @returns Danh sách bản ghi và tổng số lượng
   * Khắc Tiềm - 08.03.2023
   */
  public getRecordList(filter: Filter){
    return axiosAPI.post(`/${this.Module}/fitter`, filter);
  };

  /**
   * API thêm bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public createRecordApi(record: any){
    return axiosAPI.post(`/${this.Module}`, record)
  };

  /**
   * API lấy chi tiết bản ghi theo id
   * @returns Chi tiết bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public getRecordApi(id: string){
    return axiosAPI.get(`/${this.Module}/${id}`);
  };

  /**
   * API Sửa bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public editRecordApi(record: any){
    return axiosAPI.put(`/${this.Module}/${record[`${this.Module}ID`]}`, record);
  };

  /**
   * API xoá bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public deleteRecordApi(id: string){
    return axiosAPI.delete(`/${this.Module}/${id}`)
  };

  /**
   * API lấy mã bản ghi mới
   * @returns Mã bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public nextValue(){
    return axiosAPI.get(`/${this.Module}/next_value`);
  };

  /**
   * API xoá nhiều bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public deleteMultipleApi(listID: string []){
    return axiosAPI.post(`/${this.Module}/bulk_delete`, listID);
  };

  /**
   * API export data 
   * @returns file bản ghi excel
   * Khắc Tiềm - 08.03.2023
   */
  public exportDataApi(){
    return axiosAPI.get(`/${this.Module}/export_data`);
  };

  /**
   * API Active toggle sử dụng
   * Khắc Tiềm - 08.03.2023
   */
  public toggleActiveApi(id: string){
    return axiosAPI.get(`/${this.Module}/ToggleActive/${id}`);
  };
}
import type { Filter } from "@/core/public_api";
import axiosAPI from ".";

export default class BaseApi{
  public Module: string;

  constructor(module: string){
    this.Module = module;
  }
  /**
   * API lấy tất cả danh sách bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public getAll = () => {
    return axiosAPI.get(`/${this.Module}`);
  }

  /**
   * API lấy tất cả danh sách bản ghi đổ vào dropdown list
   * Khắc Tiềm - 08.03.2023
   */
  public getDropdown = () => {
    return axiosAPI.get(`/${this.Module}/dropdown`);
  }

  /**
   * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
   * @returns Danh sách bản ghi và tổng số lượng
   * Khắc Tiềm - 08.03.2023
   */
  public getRecordList = (filter: Filter) => {
    return axiosAPI.post(`/${this.Module}/fitter`, filter);
  }

  /**
   * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
   * @returns Danh sách bản ghi và tổng số lượng
   * Khắc Tiềm - 08.03.2023
   */
  public getExportExcel = (filter: Filter) => {
    return axiosAPI.post(`/${this.Module}/export_data`, filter);
  }

  /**
   * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
   * @returns Danh sách bản ghi và tổng số lượng
   * Khắc Tiềm - 08.03.2023
   */
  public uploadExcel = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosAPI.post(`/${this.Module}/import-xlsx`, formData,{
        headers: {
          'Content-Type': "multipart/form-data",
        }
    });
  }

  /**
   * API thêm bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public createRecordApi = (record: any) => {
    return axiosAPI.post(`/${this.Module}`, record)
  }

  /**
   * API lấy chi tiết bản ghi theo id
   * @returns Chi tiết bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public getRecordApi = (formGet: any) => {
    return axiosAPI.get(`/${this.Module}/${formGet.recordId}?stateForm=${formGet.stateForm}`);
  }

  /**
   * API Sửa bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public editRecordApi = (record: any) => {
    return axiosAPI.put(`/${this.Module}/${record[`${this.Module.substring(0, this.Module.length - 1)}ID`]}`, record);
  }

  /**
   * API xoá bản ghi
   * @returns Guid bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public deleteRecordApi = (id: string) => {
    return axiosAPI.delete(`/${this.Module}/${id}`)
  }

  /**
   * API lấy mã bản ghi mới
   * @returns Mã bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public nextValue = () => {
    return axiosAPI.get(`/${this.Module}/next_value`);
  }

  /**
   * API xoá nhiều bản ghi
   * Khắc Tiềm - 08.03.2023
   */
  public deleteMultipleApi = (listID: string []) => {
    return axiosAPI.post(`/${this.Module}/bulk_delete`, listID);
  }

  /**
   * API Active toggle sử dụng
   * Khắc Tiềm - 08.03.2023
   */
  public toggleActiveApi = (id: string) => {
    return axiosAPI.get(`/${this.Module}/ToggleActive/${id}`);
  }
}
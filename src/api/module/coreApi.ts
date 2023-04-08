import axiosAPI from "..";
export default class CoreApi{
  /**
   * API lưu hình ảnh
   * @returns đường dẫn file
   * Khắc Tiềm - 08.03.2023
   */
  public static uploadImage = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosAPI.post(`/CoreApis/PostImage`, formData,{
      headers: {
        'Content-Type': "multipart/form-data",
      }
    });
  }
}
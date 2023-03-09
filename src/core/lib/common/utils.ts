import { EntitySystem, KeyCode, StorageService, SystemConstants } from "@/core/public_api";
import { useStore } from "vuex";

/**
 * Chứa các hàm base đã xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Utils{
  /** Module đang hoạt động kế thừa lớp */
  public Module: string;

  /** Store vuex */
  public store = useStore();

  /** Số lượng bản ghi trên 1 trang */
  public PageSize: number;
  /**
  * Chứa hàm setTimeOut sẽ thực hiện một hành động debounce
  * Khắc Tiềm - 08.03.2023
  */
  public EventDebounce: any [] = [];

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * NK Tiềm 08.03.2023
  */
  public EventCtrlAltA: any [] = [];

  /**
  * lưu lại giá trị các phím bấm tắt không ngắt quãng
  * NK Tiềm 08.03.2023
  */
  public EventCtrlShiftS: any [] = [];

  /**
   * Hàm khởi tạo lấy ra page size
   */
  constructor(module: string = ''){
    this.Module = module;

    /** Kiểm tra xem PageSize được lưu trong local strore hay chưa, nếu chưa lưu thì tiến hành lưu lại với giá trị mặc định */
    try {
      if(!StorageService.getItemWithSystemConstants(EntitySystem.PageSize)){
        StorageService.setItemWithSystemConstants(EntitySystem.PageSize, SystemConstants.get(EntitySystem.CurrentPage))
      }
      this.PageSize = Number(StorageService.getItemWithSystemConstants(EntitySystem.PageSize));
    } catch (e) {
      console.log(e);
      StorageService.setItemWithSystemConstants(EntitySystem.PageSize, SystemConstants.get(EntitySystem.CurrentPage))
      this.PageSize = Number(StorageService.getItemWithSystemConstants(EntitySystem.PageSize));
    }
  }
  /**
  * Hàm xử lý debounce
  * @param {event để lấy giá trị nhập} event 
  * Khắc Tiềm - 08.03.2023
  */
  public handleDebounce(timeOut: number, handle: Function, data: any) {
    this.EventDebounce.forEach((item) => {
      clearTimeout(item);
    });
    this.EventDebounce.length = 0;
    this.EventDebounce.push(
      setTimeout(() => {
        handle(data);
      }, timeOut)
    );
  }

  /**
  * Hàm xử lý các event nút bấm tắt Ctrl Alt A
  * NK Tiềm 08.03.2023
  */
  public handleEventCtrlAltA(event: any, handle: Function, dataHandle: any) {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Alt || event.keyCode === KeyCode.A ) {
      if (!this.EventCtrlAltA.includes(event.keyCode)) {
        this.EventCtrlAltA.push(event.keyCode);
        if (this.EventCtrlAltA.length === 3) {
          // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
          this.EventCtrlAltA.length = 0;
          handle(dataHandle);
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Alt A
  * NK Tiềm 08.03.2023
  */
  public handleEventInterruptCtrlAltA(event: any) {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Alt || event.keyCode === KeyCode.A ) {
      if (this.EventCtrlAltA.includes(event.keyCode)) {
        this.EventCtrlAltA.length = 0;
      }
    }
  }

  /**
  * Hàm xử lý các event nút bấm tắt Ctrl Shift S
  * NK Tiềm 08.03.2023
  */
  public handleEventFormCtrlShiftS(event: any, handleEsc: Function, dataEsc: any, handleCtrlShiftS: Function, dataCtrlShiftS: any, handleCtrlS: Function, dataCtrlS: any) {
    if (event.keyCode === KeyCode.Esc) {
      handleEsc(dataEsc);
    } 
    else if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.S ) {
      if (!this.EventCtrlShiftS.includes(event.keyCode)) {
        this.EventCtrlShiftS.push(event.keyCode);
        if (this.EventCtrlShiftS.length === 3) {
          // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
          this.EventCtrlShiftS.length = 0;
          handleCtrlShiftS(dataCtrlShiftS);
        } else if (this.EventCtrlShiftS.length === 2) {
          // Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
          if (!this.EventCtrlShiftS.includes(KeyCode.Shift)) {
            //Không cho trình duyệt mở save as khi bấm ctrl + s
            event.preventDefault(); 
            this.EventCtrlShiftS.length = 0;
            handleCtrlS(dataCtrlS);
          }
        }
      }
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Shift S
  * NK Tiềm 08.03.2023
  */
  public handleEventInterruptFormCtrlShiftS(event: any) {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.S ) {
      if (this.EventCtrlShiftS.includes(event.keyCode)) {
        this.EventCtrlShiftS.length = 0;
      }
    }
  }

  /**
  * hàm lưu số lượng bản ghi muốn hiển thị vào local
  * @param {Số lượng bản ghi} record 
  * Khắc Tiềm - 08.03.2023
  */
  public setPageSize(record: number){
    StorageService.setItem(SystemConstants.get(EntitySystem.PageSize), record)
  }

  /**
  * Hàm định dạng ngày theo kiểu dd/MM/YYYY
  * @param {Ngày cần định dạng} date 
  * @returns Dữ liệu đã định dạng
  * Khắc Tiềm - 15.09.2022
  */
  public formatDateDDMMYYYY(date: any) {
    if (!date) {
      return '';
    } 
    else {
      const d = new Date(date);
      let getMonth = d.getMonth() + 1 + '';
      if (getMonth.length === 1) {
        getMonth = `0${getMonth}`;
      }
      let getDate = d.getDate() + '';
      if (getDate.length === 1) {
        getDate = `0${getDate}`;
      }
      return [getDate, getMonth, d.getFullYear()].join('/');
    }
  }

  /**
   * Hàm định dạng ngày theo kiểu YYYY/MM/dd
   * @param {Ngày cần định dạng} date 
   * @returns Dữ liệu đã định dạng
   * Khắc Tiềm - 15.09.2022
   */
  public formatDateYYYYMMDD(date: any){
    if (!date) {
      return '';
    } else {
      const d = new Date(date);
      let getMonth = d.getMonth() + 1 + "";
      if (getMonth.length === 1) {
        getMonth = `0${getMonth}`;
      }
      let getDate = d.getDate() + "";
      if (getDate.length === 1) {
        getDate = `0${getDate}`;
      }
      return [d.getFullYear(), getMonth, getDate].join("-");
    }
  }

  /**
   * Hàm định dạng đơn vị tiền tệ
   * Khắc Tiềm - 15.09.2022
   */
  public Comma(number: any){
    if(number || number === 0){
      let intPart = Math.trunc(number) + ''; 
      const floatPart = Number((number - Number(intPart)).toFixed(10));
      intPart = "" + intPart;
      if (intPart.length > 3) {
        const mod = intPart.length % 3;
        let output = mod > 0 ? intPart.substring(0, mod) : "";
        for (let i = 0; i < Math.floor(intPart.length / 3); i++) {
          if (mod == 0 && i == 0)
            output += intPart.substring(mod + 3 * i, mod + 3 * i + 3);
          else output += "." + intPart.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return floatPart !== 0 ? output + ',' + (floatPart + '').slice( 2 ) : output;
      } else return floatPart !== 0 ? intPart + ',' + (floatPart + '').slice( 2 ) : intPart;
    }
    else return '';
  }

  /**
   * Hàm đệ quy một danh mục cha con
   * Khắc Tiềm - 15.09.2022
   */
  public listToTree(array: any [], idRecord: string){
    array = array.sort(function() {
      return -1;
    });
    const data: any [] = [];
    function recursiveData(id: string ,text = ''){
      for (let i = array.length - 1; i >= 0; i--){
        if(array[i].parentID == id){
          array[i].bindHTMLChild = text ;
          data.push(array[i]);
          recursiveData(array[i][idRecord], text + '&ensp;');
        }
      }
    }
    recursiveData('0');
    array.forEach(item => {
      let check = false;
      data.forEach(i => {
        if(item[idRecord] === i[idRecord]){
          check = true;
        }
      })
      if(check === false){
        data.push(item);
      }
    });
    return data;
  }

  /**
   * Hàm xử lý kiểm tra định dạng email
   * @param {Email cần validate} email 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 15.09.2022
   */
  public validateEmail(email: any){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    return regex.test(email);
  }

  /**
   * Hàm xử lý kiểm tra định dạng sdt
   * @param {sdt cần validate} sdt 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 15.09.2022
   */
  public validatePhone(sdt: any){
    const regex = /(03|02|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/; //eslint-disable-line
    return regex.test(sdt);
  }
}
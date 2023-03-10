import { UtilsComponents } from './utils_components';
import { EntitySystem, KeyCode, StorageService, SystemConstants } from "@/core/public_api";
import { useStore } from "vuex";

/**
 * Chứa các hàm base đã xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Utils extends UtilsComponents{
  /** Module đang hoạt động kế thừa lớp */
  public Module: string;

  /** Store vuex */
  public store = useStore();

  /** Số lượng bản ghi trên 1 trang */
  public PageSize: number;

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
    super();
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
}
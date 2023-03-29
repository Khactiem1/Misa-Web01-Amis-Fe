import { UtilsComponents } from './utils_components';
import { EntitySystem, KeyCode, StorageService, SystemConstants } from "@/core/public_api";
import { useStore } from "vuex";
import { ref } from "vue";

/**
 * Chứa các hàm base đã xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Utils extends UtilsComponents{
  /** Store vuex */
  public store = useStore();

  /** Bản ghi được sửa hoặc nhân bản */
  public RecordEdit: any;

  /** Mã sinh tự động */
  public RecordCode: any;

  /** Module đang hoạt động kế thừa lớp */
  public Module: string;

  /** Số lượng bản ghi trên 1 trang */
  public PageSize: number;

  /** Có setup check column */
  public OptionCheck: any = ref(true);

  /** Biến chứa trạng thái ẩn hiện setting table */
  public isShowSettingTable:any = ref(false);

  /** Biến trạng thái ẩn hiện modal thêm sửa */
  public isShowModal:any = ref(false);

  /** trạng thái form */
  public StateForm: any = ref('');

  /** biến theo dõi số bản ghi muốn lấy chuyển trang mặc định lấy từ bản ghi số 0 */
  public recordSelectPaging:any = ref(0);

  /** Biến chứa trạng thái ẩn hiện loader table */
  public isShowLoaderTable:any = ref(false);

  /** Biến lưu trạng thái show dialog */
  public isShowDialog: any = ref(false);

  /** File excel */
  public fileExcel: any = ref(null);

  /** Name file excel */
  public fileNameExcel: any = ref<string>('');

  /**Chia cây */
  public tree: any = undefined;

  /**Chia cây */
  public showTotalColumn: boolean = false;

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
  public handleEventCtrlAltA = (event: any, handle: Function, dataHandle: any) => {
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

  /** Hàm xử lý bấm phím F1 */
  public handleEventF1 = (event: any, handle: Function, dataHandle: any = undefined) => {
    if ( event.keyCode === KeyCode.F1){
      handle(dataHandle);
    }
  }

  /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện Ctrl Alt A
  * NK Tiềm 08.03.2023
  */
  public handleEventInterruptCtrlAltA = (event: any) => {
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
  public handleEventFormCtrlShiftS = (event: any, handleEsc: Function, dataEsc: any, handleCtrlShiftS: Function, dataCtrlShiftS: any, handleCtrlS: Function, dataCtrlS: any) => {
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
  public handleEventInterruptFormCtrlShiftS = (event: any) => {
    if ( event.keyCode === KeyCode.Ctrl || event.keyCode === KeyCode.Shift || event.keyCode === KeyCode.S ) {
      if (this.EventCtrlShiftS.includes(event.keyCode)) {
        this.EventCtrlShiftS.length = 0;
      }
    }
  }

  /**
   * Hàm xử lý mở notification wanning
   * NK Tiềm 08.03.2023
   */
  public showNotificationWanning = (action: any, message: any = '', data: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationWanningAction", 
    { 
      action: action, 
      message: message,
      id: data,
      callBack: callBack,
    });
  }

  /**
   * Hàm xử lý mở notification hỏi
   * NK Tiềm 08.03.2023
   */
  public showNotificationAction = (action: any, refuseAction: any, message: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationQuestionAction", { action: action, refuseAction: refuseAction, message: message, callBack: callBack});
  }

  /**
   * Hàm xử lý mở notification lỗi
   * NK Tiềm 08.03.2023
   */
  public showNotificationError = (message: any = '', callBack: any = () => {}) => {
    this.store.dispatch("config/setToggleShowNotificationErrorAction", {display: message, callBack: callBack});
  }

  /**
   * Hàm xử lý thêm top message
   * 
   */
  public addNotification = (type: any, message: any) => {
    this.store.dispatch('config/addNotification', { type: type, message: message }); 
  }

  /**
   * Hàm xử lý focus vào ô đầu tiên nếu ô đó có lỗi
   * NK Tiềm 08.03.2023
   */
  public focusInputError = () => {
    setTimeout(() => {
      const elm: any = document.querySelector('.form-group .is-valid .input');
      if(elm){
        elm.focus();
      }
    }, 100);
  }

  /** 
   * Hàm mở dialog
   * NK Tiềm 08.03.2023
   */
  public showDialog = () => {
    this.isShowDialog.value = true;
  }

  /** 
   * Hàm đóng dialog
   * NK Tiềm 08.03.2023
   */
  public closeDialog = () => {
    this.isShowDialog.value = false;
  }

  /**
   * Hàm mở download file từ url
   * Khắc Tiềm - 08.03.2023
   */
  public downloadFromUrl = (url: any) => {
    window.open(url,);
  }
}
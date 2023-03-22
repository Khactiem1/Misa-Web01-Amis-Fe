import { Utils } from './utils';
import { computed } from "vue";
import { environment } from '@/environments/environment.prod';
import { ENotificationType, ApiService, InfoTable, StorageService, EntitySystem, IdbDataTable, ActionTable, Header } from '@/core/public_api';
import i18n from '@/locales/i18n';
import type BaseApi from '@/api/base_api';

/** 
 * Chứa toàn bộ các base thêm sửa xoá được xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Grid extends Utils{
  /** Api được truyền vào từ lớp khởi tạo */
  public api: BaseApi;

  /** Key word tìm kiếm mặc định */
  public keyword:string = '';

  constructor(module: string, api: BaseApi){
    super(module);
    this.api = api;
  }
  
  /** Hàm gọi api */
  public apiService = new ApiService();

  /** Lấy danh sách các chức năng */
  public actionTable: InfoTable = this.store.state[`${this.Module}`].actionTable;

  /** Danh sách Data bản ghi */
  public recordList:any = computed(() => this.store.state[`${this.Module}`].recordList);

  /** Danh sách các column */
  public columns:any = computed<Header []>(() => this.store.state[`${this.Module}`].columns.filter(function (value: any) { return value.IsShow; }));

  /** Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt */
  public checkShowActionSeries: any = computed(() => this.store.state[`${this.Module}`].recordCheck);

  /** Lấy ra tổng số lượng bản ghi */
  public totalCount:any = computed(() => this.store.state[`${this.Module}`].totalCount);

  /** Lấy danh sách columns hiển thị cài đặt */
  public columnSetting:any = computed(() => this.store.state[`${this.Module}`].columns);

  /**
   * Các Method
   */

  /** Hàm load dữ liệu lên table 
   * Khắc Tiềm - 08.03.2023*/
  public loadData = async (filter: any = undefined) => {
    try{
      if(filter && filter.resetPage){
        this.recordSelectPaging.value = 0;
        filter.v_Offset = this.recordSelectPaging.value;
      }
      if (filter) {
        if(filter !== true){
          await this.store.dispatch(`${this.Module}/setFilterAction`, filter);
        }
      }
      this.isShowLoaderTable.value = true;
      const columnSelect = this.columns.value.reduce((acc: any, cur: any) => {
        if(cur.IsShow){
          return [...acc, cur.FieldSelect];
        }
      },[])
      await this.apiService.callApi(this.api.getRecordList, { v_Select: columnSelect, ...this.store.state[`${this.Module}`].filter }, (response: any) => { 
        this.store.dispatch(`${this.Module}/getRecordListAction`, response); 
      });
      this.isShowLoaderTable.value = false;
    }
    catch(e){
      console.log(e);
    }
  }

  /** Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
   * Khắc Tiềm - 08.03.2023 */
  public handleClickCheckbox = (value: any, listID: any) => {
    try {
      if (value === true) {
        this.store.dispatch(`${this.Module}/setAllCheckboxRecordAction`, listID);
      } else {
        this.store.dispatch(`${this.Module}/setCheckboxRecordAction`, value);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
  * hàm lưu số lượng bản ghi muốn hiển thị vào local
  * Khắc Tiềm - 08.03.2023
  */
  public setPageSize = async (record: number) => {
    StorageService.setItemWithSystemConstants(EntitySystem.PageSize, record)
    this.PageSize = record;
    this.recordSelectPaging.value = 0;
    this.loadData({ v_Offset: 0, v_Limit: record, v_Where: this.keyword});
  }

  /** Hàm xử lý search tự động và debounce 600ms 
   * Khắc Tiềm - 08.03.2023*/
  public handleSearchData = async (event: any) =>{
    this.handleDebounce(600, async (event: any) => {
      this.keyword = event.target.value;
      this.recordSelectPaging.value = 0;
      this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword, });
    }, event);
  }

  /** Hàm xử lý chuyển trang 
   * Khắc Tiềm - 08.03.2023*/
  public selectPaging = async (value: any) => {
    this.recordSelectPaging.value = value;
    this.loadData({ v_Offset: value, v_Limit: this.PageSize, v_Where: this.keyword, });
  }

  /**
   * Hàm xử lý đóng mở setting table
   * Khắc Tiềm - 08.03.2023
   */
  public handleShowSettingTable = async (columnCustom: any = undefined) => {
    if(columnCustom){
      const dataTable: IdbDataTable = new IdbDataTable(this.Module);
      dataTable.set(JSON.parse(JSON.stringify(columnCustom)));
      await this.store.dispatch(`${this.Module}/setColumnAction`, columnCustom);
      this.loadData();
    }
    this.isShowSettingTable.value = !this.isShowSettingTable.value;
  }

  /**
   * Hàm xử lý xoá 1 bản ghi đã chọn
   * Khắc Tiềm - 08.03.2023
   */
  public deleteRecord = (id: any) => {
    this.apiService.callApi(this.api.deleteRecordApi, id, async () => { 
      await this.addNotification(ENotificationType.Success, i18n.global.t('message.crud.delete_success'));
      await this.store.dispatch(`${this.Module}/setCheckboxUnCheckRecordAction`, id);
      if(this.recordList.value.length === 0){
        this.recordSelectPaging.value = 0;
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }
    }, false);
  }
  
  /**
   * Hàm xử lý xoá toàn bộ danh sách đã chọn
   * Khắc Tiềm - 08.03.2023
   */
  public deleteAll = () => {
    this.apiService.callApi(this.api.deleteMultipleApi, this.checkShowActionSeries.value, async (res: any) => { 
      await this.store.dispatch(`${this.Module}/setEmptyCheckBoxRecordAction`);
      await this.addNotification(ENotificationType.Success, i18n.global.t('message.crud.delete_success'));
      if(this.recordList.value.length === 0){
        this.recordSelectPaging.value = 0; 
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }
    }, false );
  }

  /**
   * Hàm thực hiện call api toggle active record
   * Khắc Tiềm - 08.03.2023
   */
  public toggleRecordActiveApi = (recordId: any) => {
    this.apiService.callApi(this.api.toggleActiveApi, recordId, () => { 
      this.store.dispatch(`${this.Module}/setToggleActiveAction`, recordId);
    });
  }

  /** 
   * Hàm mở form thêm, sửa 
   * Khắc Tiềm - 08.03.2023
   * */
  public openModal = async (stateForm: any, recordId: any = undefined) => {
    this.setStateForm(stateForm);
    if(recordId){
      await this.apiService.callApi(this.api.getRecordApi, recordId, (response: any) => { 
        if(stateForm === ActionTable.Edit){
          this.RecordCode = null;
        }
        this.RecordEdit = response;
        this.isShowModal.value = true;
      },false );
    }
    else if(stateForm === ActionTable.Add){
      this.RecordEdit = null;
      this.isShowModal.value = true;
    }
  }

  /**
   * Hàm đóng form thêm, sửa 
   * Khắc Tiềm - 08.03.2023
   */
  public closeModal = () => {
    this.isShowModal.value = false;
  }

  /**
   * Hàm set trạng thái form (Sửa, thêm, nhân bản, ...)
   * Khắc Tiềm - 08.03.2023
   */
  public setStateForm = (state: string) => {
    this.StateForm.value = state;
  }

  /** 
   * Hàm export excel theo điều kiện 
   * Khắc Tiềm - 08.03.2023
   * */
  public exportToExcel = () => {
    try{
      const columnSelect = this.columns.value.reduce((acc: any, cur: any) => {
        if(cur.IsShow){
          return [...acc, cur.FieldSelect];
        }
      },[])
      this.apiService.callApi(this.api.getExportExcel, { v_Select: columnSelect, ...this.store.state[`${this.Module}`].filter }, (response: any) => { 
        this.downloadFromUrl(environment.IMAGE_API + response);
      });
    }
    catch(e){
      console.log(e);
    }
  }

  /** 
   * Hàm nhập excel
   * NK Tiềm 08.03.2023
   */
  public choseExcel = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      this.fileExcel.value = event.target.files[0];
      this.fileNameExcel.value = this.fileExcel.value.name;
    }
  }

  /**
   * Hàm xử lý uploadExcel
   * NK Tiềm 08.03.2023
   */
  public uploadExcel = () => {
    if (this.fileExcel.value) {
      this.apiService.callApi(this.api.uploadExcel, this.fileExcel.value, () => { 
        this.fileExcel.value = null;
        this.fileNameExcel.value = null;
        const elm:any = document.getElementById("fileExcel");
        elm.value = null;
        this.closeDialog();
        this.addNotification(ENotificationType.Success, i18n.global.t('message.api.import_success'));
        this.recordSelectPaging.value = 0; 
        this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword });
      }, false);
    } 
    else {
      this.addNotification(ENotificationType.Wanning, i18n.global.t('common.chose_file'));
    }
  }
}
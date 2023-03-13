import { Utils } from './utils';
import { computed } from "vue";
import { ENotificationType, ApiService, InfoTable, StorageService, EntitySystem, IdbDataTable } from '@/core/public_api';
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
  public columns:any = computed(() => this.store.state[`${this.Module}`].columns.filter(function (value: any) { return value.IsShow; }));

  /** Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt */
  public checkShowActionSeries: any = computed(() => this.store.state[`${this.Module}`].recordCheck);

  /** Lấy ra tổng số lượng bản ghi */
  public totalCount:any = computed(() => this.store.state[`${this.Module}`].totalCount);

  /** Biến chứa trạng thái ẩn hiện loader table */
  public isShowLoaderTable:any = computed(() => this.store.state[`${this.Module}`].isShowLoaderTable);

  /** biến theo dõi số bản ghi muốn lấy chuyển trang mặc định lấy từ bản ghi số 0 */
  public recordSelectPaging:any = computed(() => this.store.state[`${this.Module}`].recordSelectPaging);

  /** Biến chứa trạng thái ẩn hiện setting table */
  public isShowSettingTable = computed(() => this.store.state[`${this.Module}`].isShowSettingTable);




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
        await this.store.dispatch(`${this.Module}/setRecordSelectPagingAction`, 0); 
        filter.v_Offset = this.recordSelectPaging.value;
      }
      if (filter) {
        if(filter !== true){
          await this.store.dispatch(`${this.Module}/setFilterAction`, filter);
        }
      }
      await this.store.dispatch(`${this.Module}/setIsShowLoaderTableAction`, true); 
      await this.apiService.callApi(this.api.getRecordList, this.store.state[`${this.Module}`].filter, (response: any) => { 
        this.store.dispatch(`${this.Module}/getRecordListAction`, response); 
      });
      await this.store.dispatch(`${this.Module}/setIsShowLoaderTableAction`, false); 
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
    await this.store.dispatch(`${this.Module}/setRecordSelectPagingAction`, 0); 
    this.loadData({ v_Offset: 0, v_Limit: record, v_Where: this.keyword});
  }

  /** Hàm xử lý search tự động và debounce 600ms 
   * Khắc Tiềm - 08.03.2023*/
  public handleSearchData = async (event: any) =>{
    this.handleDebounce(600, async (event: any) => {
      this.keyword = event.target.value;
      await this.store.dispatch(`${this.Module}/setRecordSelectPagingAction`, 0); 
      this.loadData({ v_Offset: 0, v_Limit: this.PageSize, v_Where: this.keyword, });
    }, event);
  }

  /** Hàm xử lý chuyển trang 
   * Khắc Tiềm - 08.03.2023*/
  public selectPaging = async (value: any) => {
    await this.store.dispatch(`${this.Module}/setRecordSelectPagingAction`, value); 
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
    this.store.dispatch(`${this.Module}/setShowSettingTableAction`);
  }
}
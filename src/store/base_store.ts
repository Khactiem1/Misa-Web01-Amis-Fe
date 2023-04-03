import { Filter, Header } from "@/core/public_api";

/**
 * Base Store với action, mutation được xây dựng sẵn
 * Khắc Tiềm - 08.03.2023
 */
export default class BaseStore {
  /** Thông tin module */
  public Module: any = '';

  /** Thông tin các column hiển thị lên table */
  public Columns: any = [];

  /** Các mutation của riêng module*/
  public Mutations: any = {};

  /** Các action của riêng module */
  public Actions: any = {};

  /** Các hành động của table */
  public ActionTable: any = {};

  /**
   * Hàm custom tham số filter nhận được từ api
   * Khắc Tiềm - 08.03.2023
   */
  public SetRecordList?: Function = undefined;

  constructor(module: string = '', columns: Header [] = [], mutations: object = {}, actions: object = {}, actionTable: object = {}, setRecordList: any = undefined){
    this.Module = module;
    this.Columns = columns;
    this.Mutations = mutations;
    this.Actions = actions;
    this.ActionTable = actionTable;
    this.SetRecordList = setRecordList;

    /** Sau khi gán khởi tạo xong thì giải phóng bộ nhớ */
    setTimeout(() => {
      delete this.Module;
      delete this.Columns;
      delete this.Mutations;
      delete this.Actions;
      delete this.ActionTable;
    }, 0);
  }

  /** Store base */
  public store: any = {
      namespaced: true,
      state: () => {
        return {
          /**
           * Các hành động của table
           * Khắc Tiềm - 08.03.2023
           */
          actionTable: this.ActionTable,
    
          /**
           * Các column của table
           * Khắc Tiềm - 08.03.2023
           */
          columns: this.Columns,
    
          /**
           * Các Danh sách
           * Khắc Tiềm - 08.03.2023
           */
          recordList: [],
    
          /**
           * Danh sách các record được check
           * Khắc Tiềm - 08.03.2023
           */
          recordCheck: [],
    
          /**
           * Tổng số lượng bản ghi
           * Khắc Tiềm - 08.03.2023
           */
          totalCount: 0,
    
          /**
           * Mặc định tìm kiếm và phân trang với key hiện tại
           * Khắc Tiềm - 08.03.2023
           */
          filter: new Filter(),
        };
      },
      mutations: {
        /**
         * Set Column
         * Khắc Tiềm - 08.03.2023
         */
        setColumnMutation(state: any, payload: any){
          state.columns = payload;
        },

        /**
         * Set danh sách bản ghi
         * @param {danh sách} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setRecordListMutation: (state: any, payload: any) => {
          state.recordList = [...payload.recordList];
          state.totalCount = payload.totalCount;
          if(this.SetRecordList) {
            this.SetRecordList(state, payload, state.columns);
          }
        },

        /**
         * Xét toggle checkbox phần tử được check
         * @param {index các nhân viên được toggle} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setCheckboxRecordMutation(state: any, payload: any) {
          if(state.recordCheck.includes(payload)){
            state.recordCheck = state.recordCheck.filter((item: any) => item !== payload);
          }
          else{
            state.recordCheck.push(payload);
          }
        },

        /**
         * Xét toggle tất cả checkbox được check
         * Khắc Tiềm - 08.03.2023
         */
        setAllCheckboxRecordMutation(state: any, payload: any) {
          let countCheck = 0;
            payload.forEach((item: any) => {
              if(state.recordCheck.includes(item)){
                countCheck++;
              }
            })
            if(countCheck == state.filter.v_Limit || countCheck == state.recordList.length){
              payload.forEach((item: any) => {
                if(state.recordCheck.includes(item)){
                  state.recordCheck.splice(state.recordCheck.indexOf(item), 1);
                }
              })
            }
            else{
              payload.forEach((item: any) => {
                if(!state.recordCheck.includes(item)){
                  state.recordCheck.push(item);
                }
              })
            }
        },

        /**
         * Xét xoá tất cả checkbox được check
         * Khắc Tiềm - 08.03.2023
         */
        setEmptyCheckBoxRecordMutation(state: any){
          state.recordList = state.recordList.filter((item: any) => !state.recordCheck.includes(item[state.actionTable.fieldId]));
          state.totalCount = state.totalCount - state.recordCheck.length;
          state.recordCheck.length = 0;
        },

        /**
         * Set các giá trị tìm kiếm và phân trang khi call apie
         * @param {giá trị set} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setFilterMutation(state: any, payload: any) {
          state.filter.v_Offset = payload.v_Offset === 0 || payload.v_Offset ? payload.v_Offset : state.filter.v_Offset;
          state.filter.v_Limit = payload.v_Limit ? payload.v_Limit : state.filter.v_Limit;
          state.filter.v_Where = payload.v_Where === "" || payload.v_Where ? payload.v_Where : state.filter.v_Where;
          if(payload.resetPage){
            for(const key in payload){
              if(key != 'v_Offset' && key != 'resetPage'){
                const findIndex = state.filter.CustomSearch.findIndex((item: any) => item.ColumnSearch === payload[key].ColumnSearch);
                if(findIndex != -1){
                  state.filter.CustomSearch.splice(findIndex, 1);
                }
                state.filter.CustomSearch.push(payload[key]);
              }
            }
          }
        },

        /**
           * Set các giá trị tìm kiếm rỗng
           */
        setFilterCustomSearchEmptyMutation(state: any){
          state.filter.CustomSearch.length = 0;
        },

        /**
         * Set xoá giá trị tìm kiếm
         */
        setFilterCustomSearchDropMutation(state: any, payload: any){
          const findIndex = state.filter.CustomSearch.findIndex((item: any) => item.ColumnSearch === payload);
          if(findIndex != -1){
            state.filter.CustomSearch.splice(findIndex, 1);
          }
        },

        /**
         * Xét xoá checkbox phần tử được check
         * @param {index các nhân viên được toggle} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setCheckboxUnCheckRecordMutation(state: any, payload: any) {
          if(state.recordCheck.includes(payload)){
            state.recordCheck = state.recordCheck.filter((item: any) => item !== payload);
          }
          state.recordList = state.recordList.filter((item: any) => item[state.actionTable.fieldId] !== payload);
          state.totalCount--;
        },
        
        /**
         * Thêm record
         * Khắc Tiềm - 08.03.2023
         */
        addRecordMutation(state: any, payload: any) {
          state.recordList = [payload, ...state.recordList];
          state.totalCount++;
        },

        /**
         * Sửa record
         * Khắc Tiềm - 08.03.2023
         */
        editRecordMutation(state: any, payload: any) {
          state.recordList = [payload, ...state.recordList.filter((item: any) => item[state.actionTable.fieldId] !== payload[state.actionTable.fieldId])]
        },

        /**
           * Hàm xử lý toggle active record
           * Khắc Tiềm - 08.03.2023
           */
        setToggleActiveMutation(state: any, payload: any){
          state.recordList.find((item: any, index: any) => {
            if(item[state.actionTable.fieldId] === payload){
              state.recordList[index].isActive = !state.recordList[index].isActive;
            }
          })
        },
        setFilterCustomSearchSortMutation(state: any, payload: any){
          if(state.filter.v_Sort === ''){
            state.filter.v_Sort = `${payload} DESC`;
          }
          else if(state.filter.v_Sort.slice(-4) === 'DESC'){
            state.filter.v_Sort = `${payload} ASC`;
          }
          else{
            state.filter.v_Sort = ``;
          }
        },
        ...this.Mutations,
      },
      actions: {
        /**
         * Set Column
         * Khắc Tiềm - 08.03.2023
         */
        setColumnAction(context: any, payload: any){
          context.commit("setColumnMutation", payload);
        },

        /**
         * Hàm xử lý sắp xếp theo trường
         */
        async setFilterCustomSearchSortAction(context: any, payload: any){
          await context.commit("setFilterCustomSearchSortMutation", payload);
          return context.state.filter.v_Sort;
        },
        /**
         * Hàm xử lý xoá trường tìm kiếm
         */
        setFilterCustomSearchDropAction(context: any, payload: any){
          context.commit("setFilterCustomSearchDropMutation", payload);
        }, 

        /**
         * Hàm xử lý xoá tất cả các trường tìm kiếm
         */
        setFilterCustomSearchEmptyAction(context: any){
          context.commit("setFilterCustomSearchEmptyMutation");
        },
        /**
         * Hàm xử lý toggle active record
         * Khắc Tiềm - 08.03.2023
         */
        setToggleActiveAction(context: any, payload: any){
          context.commit("setToggleActiveMutation", payload);
        },
        /**
         * Thêm record
         * Khắc Tiềm - 08.03.2023
         */
        addRecordAction(context: any, payload: any){
          context.commit("addRecordMutation", payload);
        },

        /**
         * Sửa record
         * Khắc Tiềm - 08.03.2023
         */
        editRecordAction(context: any, payload: any){
          context.commit("editRecordMutation", payload);
        },

        /**
         * Lấy ra dánh sách nhân viên
         * @param {Giá trị set filter} payload 
         * Khắc Tiềm - 08.03.2023
         */
        async getRecordListAction(context: any, payload: any) {
          context.commit("setRecordListMutation", payload);
        },

        /**
         * Set các giá trị tìm kiếm và phân trang
         * Khắc Tiềm - 08.03.2023
         */
        setFilterAction(context: any, payload: any){
          context.commit("setFilterMutation", payload);
        },

        /**
         * Xét toggle checkbox phần tử được check
         * @param {index các nhân viên được toggle} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setCheckboxRecordAction(context: any, payload: any) {
          context.commit("setCheckboxRecordMutation", payload);
        },

        /**
         * Xét xoá checkbox phần tử được check
         * @param {index các nhân viên được toggle} payload 
         * Khắc Tiềm - 08.03.2023
         */
        setCheckboxUnCheckRecordAction(context: any, payload: any) {
          context.commit("setCheckboxUnCheckRecordMutation", payload);
        },

        /**
         * Xét toggle tất cả checkbox được check
         * Khắc Tiềm - 08.03.2023
         */
        setAllCheckboxRecordAction(context: any, payload: any) {
          context.commit("setAllCheckboxRecordMutation", payload);
        },
        
        /**
         * Xét xoá tất cả checkbox được check
         * Khắc Tiềm - 08.03.2023
         */
        setEmptyCheckBoxRecordAction(context: any){
          context.commit("setEmptyCheckBoxRecordMutation");
        },
        ...this.Actions,
      },
  };
}
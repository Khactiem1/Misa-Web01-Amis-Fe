import { Utils } from './utils';
import { computed } from "vue";
import { useStore } from "vuex";
import i18n from '@/locales/i18n';
/** 
 * Chứa toàn bộ các base thêm sửa xoá được xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Grid extends Utils{
  /** Module đang hoạt động kế thừa lớp */
  public Module: string;

  /** Store vuex */
  public store = useStore();
  constructor(module: string = ''){
    super();
    this.Module = module;
  }

  /** Danh sách Data bản ghi */
  public recordList:any = computed(() => this.store.state[`${this.Module}`].recordList);

  /** Danh sách các column */
  public columns:any = computed(() => this.store.state[`${this.Module}`].columns);

}
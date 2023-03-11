import { Utils } from './utils';
import { computed } from "vue";
import i18n from '@/locales/i18n';

/** 
 * Chứa toàn bộ các base thêm sửa xoá được xây dựng
 * Khắc Tiềm - 08.03.2023
 */
export class Grid extends Utils{
  constructor(module: string = ''){
    super(module);
  }
  
  /** Danh sách Data bản ghi */
  public recordList:any = computed(() => this.store.state[`${this.Module}`].recordList);

  /** Danh sách các column */
  public columns:any = computed(() => this.store.state[`${this.Module}`].columns);

}
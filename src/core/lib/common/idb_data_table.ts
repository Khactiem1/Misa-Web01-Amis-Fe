import { openDB } from 'idb';
import type { Header } from '../entities/services-system/action_table';
import { EntitySystem } from './entity_system';
import { SystemConstants } from './system.constants';

/**
 * Quản lý database indexedDB ở client
 * Khắc Tiềm - 08.03.2023
 */
export class IdbDataTable {
  /** 
   * Tên database 
   * Khắc Tiềm - 08.03.2023
   * */
  public DatabaseName: string = SystemConstants.get(EntitySystem.IdbData);

  /** 
   * Tên Store 
   * Khắc Tiềm - 08.03.2023
   * */
  public StoreName: string = SystemConstants.get(EntitySystem.DataTable);

  /** 
   * Tên bảng 
   * Khắc Tiềm - 08.03.2023
   * */
  public TableName: string;

  constructor(table: string){
    this.TableName = table;
  }

  /** 
   * Khai váo db 
   * Khắc Tiềm - 08.03.2023
   * */
  public dbPromise: any = openDB(this.DatabaseName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains(this.StoreName)) {
        db.createObjectStore(this.StoreName);
      }
    },
  });

  /** 
   * Lấy ra table
   * Khắc Tiềm - 08.03.2023
   * */
  public async get() {
    return (await this.dbPromise).get(this.StoreName, this.TableName);
  }

  /**
   * Set table 
   * Khắc Tiềm - 08.03.2023
   * */
  public async set(data: any){
    return (await this.dbPromise).put(this.StoreName, data, this.TableName);
  }

  /** 
   * Xoá table 
   * Khắc Tiềm - 08.03.2023
   * */
  public async delete(){
    return (await this.dbPromise).delete(this.StoreName, this.TableName);
  }

  /** 
   * Clear table 
   * Khắc Tiềm - 08.03.2023
   * */
  public async clear(){
    return (await this.dbPromise).clear(this.StoreName);
  }

  /** 
   * Lấy ra tên table
   * Khắc Tiềm - 08.03.2023
   * */
  public async keys(){
    return (await this.dbPromise).getAllKeys(this.StoreName);
  }

  /** 
   * Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa 
   * Khắc Tiềm - 08.03.2023
   * */
  public checkAndSetColumns = async (columns: Header []): Promise<Header []> => {
    await this.get().then((data: Header []) => {
      if(data){
        /** Nếu lưu rồi nhưng có sự thay đổi giữa client và server thì tiến hành lưu lại */
        if(data.length !== columns.length){
          this.set(columns);
        }
        /** Nếu ko có sự thay đổi thì các columns sẽ được lấy từ indexedDB */
        else{
          columns = data;
        }
      }
      /** Nếu chưa lưu thì tiến hành lưu */
      else{
        this.set(columns);
      }
    }).catch((e: any) => {
      console.log(e);
    })
    return columns;
  }
}
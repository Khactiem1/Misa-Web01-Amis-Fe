import { openDB } from 'idb';
import type { Header } from '../entities/services-system/action_table';
import { EntitySystem } from './entity_system';
import { SystemConstants } from './system.constants';

/**
 * Quản lý database indexedDB ở client
 * Khắc Tiềm - 08.03.2023
 */
export class IdbDataTable {
  /** Tên database */
  public DatabaseName: string = SystemConstants.get(EntitySystem.IdbData);

  /** Tên Store */
  public StoreName: string = SystemConstants.get(EntitySystem.DataTable);

  /** Tên bảng */
  public TableName: string;

  constructor(table: string){
    this.TableName = table;
  }

  /** Khai váo db */
  public dbPromise: any = openDB(this.DatabaseName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains(this.StoreName)) {
        db.createObjectStore(this.StoreName);
      }
    },
  });

  /** Lấy ra table */
  public async get() {
    return (await this.dbPromise).get(this.StoreName, this.TableName);
  }

  /** Set table */
  public async set(data: any){
    return (await this.dbPromise).put(this.StoreName, data, this.TableName);
  }

  /** Xoá table */
  public async delete(){
    return (await this.dbPromise).delete(this.StoreName, this.TableName);
  }

  /** Clear table */
  public async clear(){
    return (await this.dbPromise).clear(this.StoreName);
  }

  /** Lấy ra tên table */
  public async keys(){
    return (await this.dbPromise).getAllKeys(this.StoreName);
  }

  /** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
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
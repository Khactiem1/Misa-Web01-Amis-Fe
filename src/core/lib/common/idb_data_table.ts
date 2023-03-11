import { openDB } from 'idb';
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
}
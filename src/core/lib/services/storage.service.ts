import { SystemConstants } from "../common/system.constants";

/**
 * Chứa các hàm thao tác với localstorage
 * Khắc Tiềm - 08.03.2023
 */
export class StorageService {
	/** Giá trị item */
	public static setItem(key: string, data: any) {
		localStorage.setItem(key, data);
	}

	/** Get giá trị item */
	public static getItem(key: string) {
		return localStorage.getItem(key);
	}

	/** Xoá giá trị item */
	public static removeItem(key: string) {
		localStorage.removeItem(key);
	}

	public static setItemWithSystemConstants(key: string, data: any){
		this.setItem(SystemConstants.get(key), data);
	}

	public static getItemWithSystemConstants(key: string): any{
		return this.getItem(SystemConstants.get(key));
	}

	public static removeItemWithSystemConstants(key: string){
		this.removeItem(SystemConstants.get(key));
	}
}

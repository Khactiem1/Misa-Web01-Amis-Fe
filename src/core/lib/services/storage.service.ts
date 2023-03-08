/**
 * Chứa các hàm thao tác với localstorage
 * Khắc Tiềm - 08.03.2023
 */
export class StorageService {

    public static setItem(key: string, data: any) {
        localStorage.setItem(key, data);
    }

    public static getItem(key: string) {
        return localStorage.getItem(key);
    }

    public static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}

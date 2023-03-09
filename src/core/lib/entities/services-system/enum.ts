/**
 * Giới tính
 * Khắc Tiềm - 08.03.2023
 */
export enum Gender{
  /** Nam */
  Male = 0,

  /** Nữ */
  Female = 1,
  
  /** Khác */
  Other = 2,
}

/**
 * Lưu các trạng thái thông báo 
 * Khắc Tiềm - 08.03.2023
 */
export enum ENotificationType {
  /** Thành công */
  Success = 1,

  /** Thất bại */
  Error = 2,

  /** Cảnh báo */
  Wanning = 3,
}

/**
 * Mã phím
 * Khắc Tiềm - 08.03.2023
 */
export enum KeyCode {
  /** Phím ESC */
  Esc = 27,

  /** Phím CTRL */
  Ctrl = 17,

  /** Phím ALT */
  Alt = 18,

  /** Phím A */
  A = 65,

  /** Phím SHIFT */
  Shift = 16,

  /** Phím S */
  S = 83,

  /** Phím UP */
  Up = 38,

  /** Phím DOWN */
  Down = 40,

  /** Phím BACK */
  Back = 8,

  /** Phím ENTER */
  Enter = 13,

  /** Phím TAB */
  Tab = 9,
}
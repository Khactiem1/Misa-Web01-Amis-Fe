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
  Success = 'success',

  /** Thất bại */
  Error = 'error',

  /** Cảnh báo */
  Wanning = 'wanning',
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

  /** Phím F1 */
  F1 = 112,

  /** Phím Delete */
  Delete = 46,

  /** Phím 1 */
  Num1 = 49,

  /** Phím 1 */
  NumLock1 = 97,
}

/**
 * Các loại kiểu vật tư hàng hoá
 * Khắc Tiềm - 08.03.2023
 */
export enum Nature {
  /** Hàng hoá */
  Goods = 1,

  /** Dịch vụ */
  Service = 2,

  /** Nguyên vật liệu */
  Materials = 3,

  /** Thành phẩm */
  FinishedProduct = 4,

  /** Dụng cụ công cụ */
  ToolTools = 5,
}

/**
 * Giảm thuế
 * Khắc Tiềm - 08.03.2023
 */
export enum DepreciatedTax {
  /** Không xác định */
  undefined = 1,

  /** Không giảm thuế */
  no_tax_reduction = 2,

  /** Giảm thuế */
  tax_reduction = 3
}
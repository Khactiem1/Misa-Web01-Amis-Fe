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
}

export enum Nature {
  /// <summary>
  /// Hàng hoá
  /// Created by : Khắc Tiềm 21.09.2022
  /// </summary>
  Goods = 1,

  /// <summary>
  /// Dịch vụ
  /// Created by : Khắc Tiềm 21.09.2022
  /// </summary>

  Service = 2,

  /// <summary>
  /// Nguyên vật liệu
  /// Created by : Khắc Tiềm 21.09.2022
  /// </summary>
  Materials = 3,

  /// <summary>
  /// Thành phẩm
  /// Created by : Khắc Tiềm 21.09.2022
  /// </summary>
  FinishedProduct = 4,

  /// <summary>
  /// Dụng cụ công cụ
  /// Created by : Khắc Tiềm 21.09.2022
  /// </summary>
  ToolTools = 5,
}
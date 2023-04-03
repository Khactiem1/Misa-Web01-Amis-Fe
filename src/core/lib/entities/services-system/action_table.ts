import type { ModuleName } from "./module_name";

/** 
 * Lưu thông tin các action table
 * Khắc Tiềm - 08.03.2023
 */
export class ActionTable {
  /** Thêm */
  public static Add: string = 'add';

  /** Sửa */
  public static Edit: string = 'edit';

  /** Nhân bản */
  public static Replication: string = 'replication';

  /** Xoá */
  public static Delete: string = 'delete';

  /** Ngừng sử dụng */
  public static StopUsing: string = 'stopUsing';

  /** Sử dụng */
  public static use: string = 'use';
}

/** 
 * Thông tin cơ bản table 
 * Khắc Tiềm - 08.03.2023
*/
export class InfoTable {
  /** Hành động mặc định */
  public actionDefault: any;

  /** Danh sách hành động */
  public actionList: any [];

  /** Cột id */
  public fieldId: any;

  /** Cột mã */
  public fieldCode: any;

  /** Cột hoạt động */
  public fieldActive: any;
}

/**
 * Tìm kiếm và lọc phân trang
 * Khắc Tiềm - 08.03.2023
 */
export class Filter {
  /** Thứ tự bản ghi muốn lấy */
  public v_Offset: number = 0;

  /** Số lượng bản ghi muốn lấy */
  public v_Limit: number = 0;

  /** Tìm kiếm */
  public v_Where: string = '';

  /** Sắp xếp */
  public v_Sort: string = '';

  /** Custom search theo header table */
  public CustomSearch: ComparisonTypeSearch [] = [];
}

/**
 * Kiểu lọc
 * Khắc Tiềm - 08.03.2023
 */
export class ComparisonTypeSearch {
  /** Kiểu tìm kiếm (text, number, ...)*/
  public TypeSearch?: TypeSearch = '';

  /** Giá trị cần tìm kiếm */
  public ValueSearch?: any;

  /** Giá trị hiển thị khi search */
  public HeaderSearch?: any;

  /** Tên cột tìm kiếm */
  public ColumnSearch: string = '';

  /** Kiểu tìm kiếm (=, =!, <=, >=, ...) */
  public ComparisonType?: ComparisonType = '';

  /** Hiển thị ui: Bằng, Nhỏ hơn, Lớn hơn, ... */
  public LabelSearch?: string = '';

  /** Trường hiển thị người dùng tự setup */
  public HeaderCustom?: string = '';

  /** Lọc kết hợp join bảng */
  public Join?: Join;
}

/**
 * Lọc theo định dạng backend trong db
 * Khắc Tiềm - 08.03.2023
 */
export class TypeSearch{
  /** Kiểu text */
  public static Text = 'text';

  /** Kiểu number */
  public static Number = 'number';

  /** Kiểu Date */
  public static Date = 'date';
}

/**
 * Lọc theo hình thức ui 
 * Khắc Tiềm - 08.03.2023
 */
export class TypeFilter{
  /** Kiểu number */
  public static Number = 'number';

  /** Kiểu text */
  public static Text = 'text';

  /** Kiểu combobox */
  public static Combobox = 'combobox';

  /** Kiểu select 1 giá trị */
  public static Radio = 'radio';

  /** Kiểu date */
  public static Date = 'date';
}

/**
 * Lọc theo hình thức so sánh
 * Khắc Tiềm - 08.03.2023
 */
export class ComparisonType {
  /** Bằng */
  public static Equal = '=';

  /** Lớn hơn */
  public static Bigger = '>';

  /** Lớn hơn hoặc bằng */
  public static GreaterOrEqual  = '>=';

  /** Nhỏ hơn */
  public static Less = '<';

  /** Nhỏ hơn hoặc bằng */
  public static LessOrEqual = '<=';

  /** Bằng rỗng */
  public static Empty = '=Null';

  /** Khác rỗng */
  public static NotEmpty = '!=Null';

  /** Chứa */
  public static Contain = '%%';

  /** Khác */
  public static Other = '!=';

  /** Không chứa */
  public static NotContain = '!%%';

  /** Bắt đầu bởi */
  public static StartedBy = '_%';

  /** Kết thúc bởi */
  public static EndBy = '%_';
}

/**
 * Thông tin khai báo các cột header column
 * Khắc Tiềm - 08.03.2023
 */
export class Header {
  constructor(field: string = '',fieldSelect: string= '' , header: string = '', width: string = '100', filter: FilterHeaderIn = new FilterHeaderIn(), typeFormat: TypeFormat = new TypeFormat(), isShow: boolean = true){
    this.Field = field;
    this.FieldSelect = fieldSelect;
    this.Header = header;
    this.Width = width;
    this.Filter = filter;
    this.IsShow = isShow;
    this.TypeFormat = typeFormat;
  }

  /** Tên field */
  public Field;

  /** Tên cột select trong db */
  public FieldSelect;

  /** Có hiển thị hay không */
  public IsShow;

  /** Tên hiển thị lên header table */
  public Header;

  /** Config dữ liệu lọc theo header đầu vào */
  public Filter: FilterHeaderIn;

  /** Chiều rộng */
  public Width;

  /** kiểu dữ liệu so format lên table */
  public TypeFormat: TypeFormat;

  /** Hiển thị dữ liệu fix dưới column */
  public Data?: any;

  /** Trường hiển thị người dùng tự setup */
  public HeaderCustom?: string = '';
}

export class TypeFormat {
  /** Có là trường hoạt động, không hoạt động */
  public IsActive?: boolean = false;

  /** Căn chữ */
  public TextAlign?: string = '';

  /** Format ngày tháng năm */
  public FormatDate?: boolean = false;

  /** Format kiểu số */
  public FractionSize?: boolean = false;

  /** Kiểu dịch vụ */
  public IsNature?: boolean = false;

  /** Là giới tính ? */
  public IsGender?: boolean = false;

  /** Là check box */
  public CheckBox?: boolean = false;

  /** Lock Checkbox */
  public LockCheckBox?: boolean = false;

  /** Hình ảnh */
  public IsImage?: boolean = false;

  /** Kiểu dữ liệu trả về từ backend cần format hiển thị */
  public FormatServiceResponseI18n?: boolean = false;

  /** Cố định cột đầu tiên không */
  public FixFirstColumn?: boolean = false;
}

/**
 * Dữ liệu đầu vào khi lọc
 * Khắc Tiềm - 08.03.2023
 */
export class FilterHeaderIn {
  /** Kiểu tìm kiếm định dạng backend trong db */
  public typeSearch: TypeSearch;

  /** Cột tìm kiếm */
  public columnSearch: string = ''

  /** Kiểu tìm kiếm ui */
  public typeFilter: TypeFilter;

  /** Module tìm kiếm */
  public module: ModuleName;

  /** Hiển thị cột tìm kiếm  */
  public headerSearch: string;

  /** Dữ liệu tìm kiếm đầu vào */
  public data?: any;

  /** Kiểu so sánh */
  public comparisonType?: ComparisonType;

  /** Trường hiển thị người dùng tự setup */
  public headerCustom?: string = '';

  /** Lọc kết hợp join bảng */
  public join?: Join;
}

/**
 * Option join
 * Khắc Tiềm - 08.03.2023
 */
export class Join {
  /** Kiểu join bảng */
  public TypeJoin?: TypeJoin;

  /** Key join trong bảng */
  public KeyJoin?: string;

  /** Key join trong bảng */
  public TableJoin?: string;
}

/** 
 * Kiểu join bảng 
 * Khắc Tiềm - 08.03.2023
*/
export class TypeJoin {
  /** Kiểu inner join */
  public static InnerJoin = 1;

  /** KiểU Left Join */
  public static LeftJoin = 2;
}
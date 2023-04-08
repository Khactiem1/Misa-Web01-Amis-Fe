export class UtilsComponents{
  /**
  * Chứa hàm setTimeOut sẽ thực hiện một hành động debounce
  * Khắc Tiềm - 08.03.2023
  */
  public EventDebounce: any [] = [];

  /**
  * Hàm xử lý debounce
  * @param {event để lấy giá trị nhập} event 
  * Khắc Tiềm - 08.03.2023
  */
  public handleDebounce = (timeOut: number, handle: Function, data: any) => {
    this.EventDebounce.forEach((item) => {
      clearTimeout(item);
    });
    this.EventDebounce.length = 0;
    this.EventDebounce.push(
      setTimeout(() => {
        handle(data);
      }, timeOut)
    );
  }

  /**
  * Hàm định dạng ngày theo kiểu dd/MM/YYYY
  * @param {Ngày cần định dạng} date 
  * @returns Dữ liệu đã định dạng
  * Khắc Tiềm - 05.03.2023
  */
  public formatDateDDMMYYYY = (date: any) => {
    if (!date) {
      return '';
    } 
    else {
      const d = new Date(date);
      let getMonth = d.getMonth() + 1 + '';
      if (getMonth.length === 1) {
        getMonth = `0${getMonth}`;
      }
      let getDate = d.getDate() + '';
      if (getDate.length === 1) {
        getDate = `0${getDate}`;
      }
      if(getDate === 'NaN' || getMonth === 'NaN'){
        return date;
      }
      return [getDate, getMonth, d.getFullYear()].join('/');
    }
  }

  /**
   * Hàm định dạng ngày theo kiểu YYYY/MM/dd
   * @param {Ngày cần định dạng} date 
   * @returns Dữ liệu đã định dạng
   * Khắc Tiềm - 05.03.2023
   */
  public formatDateYYYYMMDD = (date: any) => {
    if (!date) {
      return '';
    } else {
      const d = new Date(date);
      let getMonth = d.getMonth() + 1 + "";
      if (getMonth.length === 1) {
        getMonth = `0${getMonth}`;
      }
      let getDate = d.getDate() + "";
      if (getDate.length === 1) {
        getDate = `0${getDate}`;
      }
      return [d.getFullYear(), getMonth, getDate].join("-");
    }
  }

  /**
   * Hàm định dạng đơn vị tiền tệ
   * Khắc Tiềm - 05.03.2023
   */
  public Comma = (number: any) => {
    if(!this.isNumber(number + '')) return number;
    if((number || number === 0)){
      let intPart = Math.trunc(number) + ''; 
      const floatPart = Number((number - Number(intPart)).toFixed(10));
      intPart = "" + intPart;
      if (intPart.length > 3) {
        const mod = intPart.length % 3;
        let output = mod > 0 ? intPart.substring(0, mod) : "";
        for (let i = 0; i < Math.floor(intPart.length / 3); i++) {
          if (mod == 0 && i == 0)
            output += intPart.substring(mod + 3 * i, mod + 3 * i + 3);
          else output += "." + intPart.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return floatPart !== 0 ? output + ',' + (floatPart + '').slice( 2 ) : output;
      } else return floatPart !== 0 ? intPart + ',' + (floatPart + '').slice( 2 ) : intPart;
    }
    else return '';
  }

  /**
   * Hàm kiểm tra chuỗi có phải số
   * Khắc Tiềm - 05.03.2023
   */
  public isNumber = (str: string): boolean => {
    return !isNaN(Number(str));
  }

  /**
   * Hàm đệ quy một danh mục cha con
   * Khắc Tiềm - 05.03.2023
   */
  public listToTree = (array: any [], idRecord: string) => {
    array = array.sort(function() {
      return -1;
    });
    const data: any [] = [];
    function recursiveData(id: string ,text = ''){
      for (let i = array.length - 1; i >= 0; i--){
        if(array[i].parentID == id){
          array[i].bindHTMLChild = text ;
          data.push(array[i]);
          recursiveData(array[i][idRecord], text + '&ensp;');
        }
      }
    }
    recursiveData('0');
    array.forEach(item => {
      let check = false;
      data.forEach(i => {
        if(item[idRecord] === i[idRecord]){
          check = true;
        }
      })
      if(check === false){
        data.push(item);
      }
    });
    return data;
  }

  /**
   * Hàm xử lý kiểm tra định dạng email
   * @param {Email cần validate} email 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 05.03.2023
   */
  public validateEmail = (email: any) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    return regex.test(email);
  }

  /**
   * Hàm xử lý kiểm tra định dạng sdt
   * @param {sdt cần validate} sdt 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 05.03.2023
   */
  public validatePhone = (sdt: any) => {
    const regex = /(03|02|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/; //eslint-disable-line
    return regex.test(sdt);
  }
}
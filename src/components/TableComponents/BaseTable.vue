<template>
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th v-if="checkShowActionSeries">
          <!-- :checkbox="checkAllRecord" -->
          <input-checkbox
            :checked="isShowCheckAllRecord"
            @custom-handle-click-checkbox="handleClickCheckbox(true, listID)"
          ></input-checkbox>
        </th>
        <th
          v-for="(item, index) in columns"
          :style="{
            'text-align': item.textAlign,
            'min-width': item.width,
            width: item.width,
          }"
          :key="index"
        >
          <span :style="{
            'text-align': item.textAlign,
          }" @click="handleSetSortColumn(item.field)">
            {{ item.header }} 
            <div v-if="item.field.charAt(0).toUpperCase() + item.field.slice(1) === sortBy.split(' ')[0]" class="sort" :class="{ 'sortASC': sortBy.split(' ')[1] === 'ASC' }"></div>
          </span>
          <div v-if="item.filter" @click="handleShowFilter($event, item.filter)" class="mi-header-option"></div>
        </th>
        <th style="width: 120px; min-width: 120px" class="text-center">
          Chức năng
        </th>
      </tr>
    </thead>
    <table-loader
      v-if="isShowLoaderTable"
      :columns="columns"
      :lengthList="tableList.length"
    ></table-loader>
    <table-empty
      v-if="!isShowLoaderTable && tableList.length === 0"
    ></table-empty>
    <tbody v-if="!isShowLoaderTable">
      <!-- Vòng lặp các user -->
      <tr
        v-for="(row, index) in tableList"
        :class="{ active: checkShowActionSeries ? checkShowActionSeries.includes(row[actionTable.fieldId]) : false, parent: row.bindHTMLChild === '' && listTree}"
        :key="index"
      >
        <td v-if="checkShowActionSeries" class="column-sticky">
          <!-- :checkbox="row.Check" -->
          <input-checkbox
            :checked="checkShowActionSeries ? checkShowActionSeries.includes(row[actionTable.fieldId]) : false"
            @custom-handle-click-checkbox="handleClickCheckbox(row[actionTable.fieldId])"
          ></input-checkbox>
        </td>
        <!-- Vòng lặp các columns sao cho đúng với các vị trí của header -->
        <td
          v-for="(col, index) in columns"
          :style="{ 'text-align': col.textAlign }"
          :key="index"
          @dblclick="
            handleClickActionColumTable(
              actionTable.actionDefault,
              row[actionTable.fieldId]
            )
          "
        >
          <!-- khi render các trường kiểm tra xem có yêu cầu cần thêm dấu phẩy thì sẽ thêm  -->
          <span v-if="row[actionTable.fieldCode] === row[col.field] && row.bindHTMLChild" v-html="row.bindHTMLChild + row.bindHTMLChild"></span>
          {{
            col.fractionSize === true
              ? Comma(row[col.field])
              : col.formatDate === true
              ? formatDateDDMMYYYY(row[col.field])
              : col.isGender === true
              ? formatGender(row[col.field])
              : col.isActive === true
              ? formatIsActive(row[col.field])
              : col.isNature === true
              ? formatNature(row[col.field])
              : col.isImage === true
              ? ""
              :row[col.field]
          }}
          <div v-if="col.isImage === true" class="image-table">
            <img v-bind:src="row[col.field] ? row[col.field].includes('/Assets/Images/') ? baseUrl.baseUrlImage + row[col.field] : '' + row[col.field] : ''" alt="">
          </div>
        </td>
        <td class="text-center">
          <div class="action-colum_table">
            <!-- Phần render action mặc định -->
            <button
              @click="
                handleCloseAction();
                handleClickActionColumTable(
                  actionTable.actionDefault,
                  row[actionTable.fieldId]
                );
              "
              class="action-table action-table_left"
            >
              <div class="action-default">
                {{ actionTable.actionDefault }}
              </div>
            </button>
            <button
              @click="handleShowAction($event, row)"
              class="action-table action-table_right"
            >
              <div class="border-icon_table">
                <div class="action-icon"></div>
              </div>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
    <thead v-if="showTotalColumn && tableList.length !== 0" class="thead-light table-footer">
      <tr>
        <th style="text-transform: none;" v-if="checkShowActionSeries">
          Tổng
        </th>
        <th
          v-for="(item, index) in columns"
          :style="{
            'text-align': item.textAlign,
            'min-width': item.width,
            width: item.width,
          }"
          :key="index"
        >
          {{ item.data ?  Comma(item.data) : "" }}
        </th>
        <th style="width: 120px; min-width: 120px" class="text-center">
        </th>
      </tr>
    </thead>
    <teleport to="#app">
      <table-list-action
        :actionTable="actionTable"
        :positionAction="positionAction"
        :row="rowColumn"
        :handleCloseAction="handleCloseAction"
        :handleClickActionColumTable="handleClickActionColumTable"
      ></table-list-action>
      <base-table-filter :oldSearch="oldSearch" :handleShowFilter="handleShowFilter" :dataFilter="dataFilter" @handle-filter-data="handleFilterData" :setPositionFilter="setPositionFilter" v-if="isShowFilter">
      </base-table-filter>
    </teleport>
  </table>
</template>

<script>
import InputCheckbox from "../InputComponents/BaseCheckbox.vue";
import TableLoader from "../TableComponents/BaseTableLoader.vue";
import TableEmpty from "../TableComponents/BaseTableEmpty.vue";
import BaseTableFilter from '../../components/TableComponents/BaseTableFilter.vue';
import TableListAction from "../TableComponents/BaseTableListAction.vue";
import eNum from "../../utils/eNum";
import baseUrl from '../../configs/index';
import utilEnum from "../../utils/index";
import { ref, toRefs, computed, Teleport } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    InputCheckbox,
    TableLoader,
    TableEmpty,
    TableListAction,
    BaseTableFilter,
    Teleport
},
  props: {
    /**
     * Danh sách hiển thị
     */
    tableList: {
      type: Array,
    },
    /**
     * header của table
     */
    columns: {
      type: Array,
    },
    /**
     * Hành động table
     */
    actionTable: {
      type: Object,
    },
    /**
     * sự kiện click vào các ô check box
     */
    handleClickCheckbox: {
      type: Function,
    },
    /**
     * sự kiện click các action table
     */
    handleClickActionColumTable: {
      type: Function,
    },
    /**
     * Biến show trạng thái load của table
     */
    isShowLoaderTable: {
      type: Boolean,
    },
    /**
     * Biến show hạnh động thực hiện hàng loạt của table
     */
    checkShowActionSeries: {
      type: Array,
    },
    showTotalColumn: {},
    loadData: {Function},
    module: {String},
    listTree: {},
  },
  setup(props) {
    const store = useStore();
    /**
     * Trạng thái hiển thị ô lọc
     */
    const isShowFilter = ref(false);
    /**
     * Set vị trị của form filter
     */
    const setPositionFilter = ref({ top: 0, left: 0});
    /**
     * Dữ liệu tìm kiếm sẽ được gửi đi
     */
    const dataFilter = ref(null);

  /**
   * Dữ liệu tìm kiếm trước đó khi click vo column table filter
   */
    const oldSearch = ref(null);
    /**
     * 
     * Hàm đóng mở form tìm kiếm
     */
    async function handleShowFilter(event, data){
      // try {
        if(event){
          dataFilter.value = data;
          const rect = event.srcElement.getBoundingClientRect()
          setPositionFilter.value.top = rect.top + 25;
          setPositionFilter.value.left = rect.left - (346 - rect.width);
        }
        if(!isShowFilter.value){
          const valueSearch = await store.state[module.value].filter.customSearch.find(item => item.columnSearch === data.columnSearch);
            if(valueSearch){
              oldSearch.value = valueSearch;
            }
            else{
              oldSearch.value = null;
            }
        }
        isShowFilter.value = !isShowFilter.value;
      // } catch (e) {
      //   console.log(e);
      // }
    }

    /**
     * Hàm xử lý tìm kiếm
     * @param {data tìm kiếm} filter 
     */
    function handleFilterData(filter){
      try {
        loadData.value(filter);
      } catch (e) {
        console.log(e);
      }
    }
    
    /**
     * Sắp xếp theo trường gì
     */
    const sortBy = ref('');
    /**
     * Hàm xử lý sắp xếp
     */
    async function handleSetSortColumn (field){
      try {
        await store.dispatch(`${module.value}/setFilterCustomSearchSortAction`, field.charAt(0).toUpperCase() + field.slice(1)).then((res)=> {
          if(res){
            sortBy.value = res;
          }
          else sortBy.value = '';
        });
        loadData.value(true);
      } catch (e) {
        console.log(e);
      }
    }
    /**
     * Bóc tách props ra từ props chuyển vào
     * Khắc Tiềm - 15.09.2022
     */
    const { tableList, checkShowActionSeries, actionTable, loadData, module} = toRefs(props);

    /**
     * Danh sách chứa các id
     * Khắc Tiềm - 15.09.2022
     */
    const listID = computed(()=> {
      return tableList.value.reduce((acc, cur)=> {
        return [...acc, cur[actionTable.value.fieldId]];
      },[]); 
    });
    /**
     * Ẩn hiện check tất cả
     * Khắc Tiềm - 15.09.2022
     */
    const isShowCheckAllRecord = computed(()=> {
      if(checkShowActionSeries.value){
        let count = 0;
        checkShowActionSeries.value.forEach((item) => {
          if(listID.value.includes(item)){
            count++;
          }
        })
        return count === tableList.value.length && count > 0;
      }
      else{
        return false;
      }
    }); 

    /**
     * Lưu đối tượng được click các hành động như xoá , nhân bản, ...
     * Khắc Tiềm - 15.09.2022
     */
    const rowColumn = ref(null);

    /**
     * Biến chứa vị trí set ẩn hiện action
     * Khắc Tiềm - 15.09.2022
     */
    const positionAction = ref({ top: 0, right: 0 });

    /**
     * Lấy ra hàm format date dd/MM/YYYY
     * Khắc Tiềm - 15.09.2022
     */
    const { formatDateDDMMYYYY, Comma } = utilEnum;

    /**
     * hàm xử lý hiển thị giới tính dựa trên enum
     * @param {Giới tính} gender 
     * Khắc Tiềm - 15.09.2022
     */
    function formatGender(gender) {
      if (eNum.MALE == gender) {
        return "Nam";
      } else if (eNum.FEMALE == gender) {
        return "Nữ";
      } else if (eNum.OTHER == gender) {
        return "Khác";
      }
    }

    function formatNature(nature){
      if (nature == 1) {
        return "Hàng hoá";
      } else if (nature == 2) {
        return "Dịch vụ";
      } else if (nature == 3) {
        return "Nguyên vật liệu";
      }else if (nature == 4) {
        return "Thành phẩm";
      }else if (nature == 5) {
        return "Dụng cụ công cụ";
      }
    }

    function formatIsActive(isActive){
      if(isActive === true){
        return "Đang sử dụng";
      }
      else{
        return "Ngừng sử dụng";
      }
    }

    /**
     * Hàm xử lý ẩn hiện các action
     * @param {Thông tin đỐi tượng được click} row 
     * Khắc Tiềm - 15.09.2022
     */
    function handleShowAction(event, row) {
      try {
        if (JSON.stringify(rowColumn.value) === JSON.stringify(row)) {
          rowColumn.value = null;
        } else {
          if (JSON.stringify(rowColumn.value) !== JSON.stringify(row)) {
            setTimeout(() => {
              setPositionActionTable(event);
              rowColumn.value = row;
            }, 0);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Hàm xử lý ẩn action
     * Khắc Tiềm - 15.09.2022
     */
    function handleCloseAction() {
      rowColumn.value = null;
    }
    
    /**
     * Hàm xử lý vị trí ẩn hiện các action
     * Khắc Tiềm - 15.09.2022
     */
    function setPositionActionTable(event) {
      // console.log(event);
      // event.srcElement.offsetParent.forEach((item) => {
      //   try {
      //     if (item.className.includes("action-colum_table")) {
            
      //     }
      //   } catch {
      //     return;
      //   }
      // });
      try {
        const rect = event.srcElement.offsetParent.getBoundingClientRect();
        positionAction.value.top = rect.top + window.scrollY + 32;
        positionAction.value.right = rect.right + window.scrollX - rect.left + window.scrollX - 45;
        if(window.innerHeight - rect.bottom < ((actionTable.value.actionList.length * 28) + 12)){
          positionAction.value.top = rect.top + window.scrollY + 32 - ((actionTable.value.actionList.length * 28) + 40);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return {
      rowColumn,
      formatDateDDMMYYYY,
      formatGender,
      positionAction,
      isShowCheckAllRecord,
      listID,
      isShowFilter,
      baseUrl,
      oldSearch,
      dataFilter,
      sortBy,
      handleFilterData,
      Comma,
      setPositionFilter,
      formatIsActive,
      handleSetSortColumn,
      formatNature,
      handleShowFilter,
      handleShowAction,
      handleCloseAction,
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  background-color: var(--while__color);
}
.table .thead-light th {
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: 34px;
  padding: 0 10px 0 10px;
  font-size: 12px;
  font-family: 'notosans-semibold';
  height: 34px;
  position: sticky;
  top: 66px;
  background-color: #e5e8ec;
  text-transform: uppercase;
  vertical-align: middle;
}
.table .thead-light th span{
  cursor: pointer;
  display: flex;
  align-items: center;
}
.table .thead-light th:not(:first-child){
  padding: 0 25px 0 10px;
}
.mi-header-option{
  height: fit-content;
    position: absolute;
    display: none;
    right: 3px;
    background: var(--url__icon) no-repeat;
    cursor: pointer;
    top: calc(50% - 8px);
    min-width: 16px;
    min-height: 16px;
    background-position: -1687px -564px;
}
.table .thead-light th:hover .mi-header-option{
  display: block;
}
.table .thead-light th:last-child {
  border-right: none;
}
tbody tr:hover,
.table tbody tr:hover th:last-child,
.table tbody tr:hover th:first-child,
.table tbody tr:hover td:last-child,
.table tbody tr:hover td:first-child {
  background-color: #f2f9ff;
}
tbody tr.active,
.table tbody tr.active th:last-child,
.table tbody tr.active th:first-child,
.table tbody tr.active td:last-child,
.table tbody tr.active td:first-child {
  background-color: #e5f3ff;
}
.table tbody th,
.table tbody td {
  padding: 0 10px;
  min-height: 44px;
  height: 44px;
  border-right: 1px dotted #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
}
.table .thead-light th:last-child,
.table .thead-light th:first-child {
  background-color: #e5e8ec;
  z-index: 1;
}
.table .thead-light th:last-child,
.table tbody th:last-child,
.table tbody td:last-child {
  right: 15px !important;
}
.table .thead-light th:last-child::before,
.table tbody th:last-child::before,
.table tbody td:last-child::before {
  content: "";
  right: -16px;
  top: 0;
  width: 16px;
  height: 110%;
  position: absolute;
  background-color: var(--while__color);
}
.table .thead-light th:first-child,
.table tbody th:first-child,
.table tbody td:first-child {
  left: 16px;
}
.table .thead-light th:first-child::before,
.table tbody th:first-child::before,
.table tbody td:first-child::before {
  content: "";
  left: -16px;
  top: 0;
  width: 16px;
  height: 110%;
  position: absolute;
  background-color: var(--while__color);
}
.table .thead-light th:last-child,
.table .thead-light th:first-child,
.table tbody th:last-child,
.table tbody th:first-child,
.table tbody td:last-child,
.table tbody td:first-child {
  position: -webkit-sticky;
  position: sticky;
}
.table tbody th:last-child,
.table tbody td:last-child{
  background-color: aliceblue;
}
.column-sticky{
  background-color: aliceblue;
}
.table tbody td:last-child {
  border-right: none;
}
.table .thead-light th:first-child,
.table tbody th:first-child {
  min-width: 40px;
  max-width: 40px;
}
/* Nút bấm action */
.action-colum_table {
  display: flex;
  height: 36px;
  position: relative;
}
.action-table_left {
  padding: 6px 1px 6px 16px;
}
.action-table_right {
  padding: 8px 10px;
  width: 46px;
}
.action-table {
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
  z-index: 0;
}
.action-default {
  color: #0075c0;
  font-family: "notosans-bold";
  border: solid 1px transparent;
  line-height: 14px;
  position: relative;
  padding-left: 1px;
}
.action-default::before {
  content: "";
  height: 120%;
  position: absolute;
  width: 1px;
  background-color: var(--while__color);
  top: -1px;
  right: -3px;
  /* background-color: #000; */
}
.border-icon_table {
  border: solid 1px transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.action-icon {
  background: var(--url__icon) no-repeat -900px -365px;
  width: 8px;
  height: 5px;
  margin: 0 auto;
}
.action-table:active .border-icon_table,
.action-table:active .action-default {
  border: solid 1px #0075c0;
}
.image-table{
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
} 
.image-table img{
  height: 100%;
}
.sort{
  width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    background: var(--url__icon) no-repeat;
    background-position: -1752px -312px;
} 
.sortASC{
  transform: rotate(180deg);
}
.table-footer{
  position: relative;
}
.table-footer th{
  bottom: 56px !important;
  padding-right: 10px !important;
  border-color: #E5E8EC !important;
}
</style>

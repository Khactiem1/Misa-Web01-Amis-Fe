<template>
  <div class="table-scroll">
    <div class="table-container">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th v-if="BaseComponent.checkShowActionSeries">
              <base-checkbox :checked="isShowCheckAllRecord" @custom-handle-click-checkbox="BaseComponent.handleClickCheckbox(true, listID)"></base-checkbox>
            </th>
            <th v-for="(item) in BaseComponent.columns" class="item.TypeFormat.TextAlign" 
              :style="{ 'min-width': `${item.Width}px`, width: `${item.Width}px`, }"
              :key="item.Field"
            >
              <span  :class="item.TypeFormat.TextAlign" @click="handleSetSortColumn(item.Field)">
                {{ $t(`${item.Header}`) }} 
                <div v-if="item.Field.charAt(0).toUpperCase() + item.Field.slice(1) === sortBy.split(' ')[0]" class="sort" :class="{ 'sortASC': sortBy.split(' ')[1] === 'ASC' }"></div>
              </span>
              <div v-if="item.Filter" @click="handleShowFilter($event, item.Filter)" class="mi-header-option"></div>
            </th>
            <th style="width: 120px; min-width: 120px" class="text-center">
              {{ $t('common.function') }}
            </th>
          </tr>
        </thead>
        <base-table-loader v-if="BaseComponent.isShowLoaderTable" :columns="BaseComponent.columns" :lengthList="BaseComponent.recordList.length" ></base-table-loader>
        <base-table-empty v-if="!BaseComponent.isShowLoaderTable && BaseComponent.recordList.length === 0" ></base-table-empty>
        <tbody v-if="!BaseComponent.isShowLoaderTable">
          <tr v-for="(row) in BaseComponent.recordList"
            :class="{ active: BaseComponent.checkShowActionSeries ? BaseComponent.checkShowActionSeries.includes(row[BaseComponent.actionTable.fieldId]) : false, parent: row.bindHTMLChild === '' && listTree}"
            :key="row[BaseComponent.actionTable.fieldId]"
          >
            <td v-if="BaseComponent.checkShowActionSeries" class="column-sticky">
              <base-checkbox :checked="BaseComponent.checkShowActionSeries ? BaseComponent.checkShowActionSeries.includes(row[BaseComponent.actionTable.fieldId]) : false"
                @custom-handle-click-checkbox="BaseComponent.handleClickCheckbox(row[BaseComponent.actionTable.fieldId])"
              ></base-checkbox>
            </td>
            <td v-for="(col, index) in BaseComponent.columns" :title="col.TypeFormat.FractionSize === true
                  ? Base.Comma(row[col.Field])
                  : col.TypeFormat.FormatDate === true
                  ? Base.formatDateDDMMYYYY(row[col.Field])
                  : col.TypeFormat.IsGender === true
                  ? formatGender(row[col.Field])
                  : col.TypeFormat.IsActive === true
                  ? formatIsActive(row[col.Field])
                  : col.TypeFormat.IsNature === true
                  ? formatNature(row[col.Field])
                  : col.TypeFormat.IsImage === true
                  ? '' :row[col.Field]"
              :class="col.TypeFormat.TextAlign" :key="index" @dblclick=" handleClickActionColumTable(BaseComponent.actionTable.actionDefault, row[BaseComponent.actionTable.fieldId])">
              <span v-if="row[BaseComponent.actionTable.fieldCode] === row[col.Field] && row.bindHTMLChild" v-html="row.bindHTMLChild + row.bindHTMLChild"></span>
                {{
                col.TypeFormat.FractionSize === true
                  ? Base.Comma(row[col.Field])
                  : col.TypeFormat.FormatDate === true
                  ? Base.formatDateDDMMYYYY(row[col.Field])
                  : col.TypeFormat.IsGender === true
                  ? formatGender(row[col.Field])
                  : col.TypeFormat.IsActive === true
                  ? formatIsActive(row[col.Field])
                  : col.TypeFormat.IsNature === true
                  ? formatNature(row[col.Field])
                  : col.TypeFormat.IsImage === true
                  ? "" :row[col.Field]
                }}
              <div v-if="col.TypeFormat.IsImage === true" class="image-table">
                <img v-bind:src="row[col.Field] ? row[col.Field].includes('/Assets/Images/') ? environment.IMAGE_API + row[col.Field] : '' + row[col.Field] : ''" alt="">
              </div>
            </td>
            <td class="text-center">
              <div class="action-colum_table">
                <button @click=" handleCloseAction(); handleClickActionColumTable(BaseComponent.actionTable.actionDefault, row[BaseComponent.actionTable.fieldId]);"
                  class="action-table action-table_left" >
                  <div class="action-default">
                    {{ $t(`common.${BaseComponent.actionTable.actionDefault}`) }}
                  </div>
                </button>
                <button @click="handleShowAction($event, row)" class="action-table action-table_right" >
                  <div class="border-icon_table">
                    <div class="action-icon"></div>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <thead v-if="showTotalColumn && BaseComponent.recordList.length !== 0" class="thead-light table-footer">
          <tr>
            <th style="text-transform: none;" v-if="BaseComponent.checkShowActionSeries">
              {{ $t('common.sum') }}
            </th>
            <th v-for="(item) in BaseComponent.columns" :class="item.TypeFormat.TextAlign"
              :style="{ 'min-width': `${item.Width}px`, width: `${item.Width}px`, }"
              :key="item.Field"
            >
              {{ item.Data ?  Base.Comma(item.Data) : "" }}
            </th>
            <th style="width: 120px; min-width: 120px" class="text-center">
            </th>
          </tr>
        </thead>
        <teleport to="#app">
          <base-table-list-action
            :actionTable="BaseComponent.actionTable"
            :positionAction="positionAction"
            :row="rowColumn"
            :handleCloseAction="handleCloseAction"
            :handleClickActionColumTable="handleClickActionColumTable"
          ></base-table-list-action>
          <base-table-filter :oldSearch="oldSearch" :handleShowFilter="handleShowFilter" :dataFilter="dataFilter" @handle-filter-data="handleFilterData" :setPositionFilter="setPositionFilter" v-if="isShowFilter">
          </base-table-filter>
        </teleport>
      </table>
    </div>
  </div>
  <div v-if="BaseComponent.recordList.length !== 0" class="paging-container sticky">
    <div class="total-record">
      {{ $t('common.total') }}: <strong>{{ BaseComponent.totalCount }}</strong> {{ $t('common.record') }}
    </div>
    <div class="paging">
      <base-combobox
        :options="[
          { value: 10, header: $t('common.paging', { record: '10'}) },
          { value: 20, header: $t('common.paging', { record: '20'}) },
          { value: 30, header: $t('common.paging', { record: '30'}) },
          { value: 50, header: $t('common.paging', { record: '50'}) },
          { value: 100, header: $t('common.paging', { record: '100'}) },
        ]"
        :disabled="true"
        :value="'value'"
        :header="'header'"
        :noAnimation="true"
        :autoPosition="true"
        v-model="paseSize"
      ></base-combobox>
      <base-paging
        :totalCount="BaseComponent.totalCount"
        :countRecordPageRecord="BaseComponent.PageSize"
      ></base-paging>
        <!-- v-model="recordSelectPaging"
        :key="countRecordPageRecord || keyword" -->
    </div>
  </div>
</template>

<script lang="ts">
import { BaseCheckbox, BaseTableEmpty, BaseTableLoader, BaseTableFilter, BaseTableListAction, BaseCombobox, BasePaging } from "@/core/public_component";
import { UtilsComponents, Gender, InfoTable, Header } from "@/core/public_api";
import { environment } from '@/environments/environment.prod';
import { watch, ref, toRefs, computed, defineComponent, type PropType } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: {
    BaseCheckbox,
    BaseTableEmpty,
    BaseTableLoader,
    BaseTableListAction,
    BaseTableFilter,
    BaseCombobox,
    BasePaging
  },
  props: {
    /** Số lượng bản ghi trên 1 trang */
    BaseComponent: {
      type: Object as PropType<any>,
      default: (): any  => {}
    },
    /**
     * sự kiện click các action table
     */
    handleClickActionColumTable: {
      type: Function,
      default: ()=> {}
    },
    showTotalColumn: {},
    listTree: {},
  },
  setup(props) {
    const Base: UtilsComponents = new UtilsComponents();
    const { t } = useI18n();
    /**
     * Bóc tách props ra từ props chuyển vào
     * Khắc Tiềm - 15.09.2022
     */
    const { BaseComponent }: any = toRefs(props);

    const paseSize = ref(BaseComponent.value.PageSize);

    watch(paseSize, (newValue) => {
      BaseComponent.value.setPageSize(newValue);
    });

    const store: any = useStore();
    /**
     * Trạng thái hiển thị ô lọc
     */
    const isShowFilter: any = ref(false);
    /**
     * Set vị trị của form filter
     */
    const setPositionFilter: any = ref({ top: 0, left: 0});
    /**
     * Dữ liệu tìm kiếm sẽ được gửi đi
     */
    const dataFilter: any = ref(null);

  /**
   * Dữ liệu tìm kiếm trước đó khi click vo column table filter
   */
    const oldSearch: any = ref(null);
    
    /**
     * 
     * Hàm đóng mở form tìm kiếm
     */
    async function handleShowFilter(event: any, data: any){
      try {
        if(event){
          dataFilter.value = data;
          const rect = event.srcElement.getBoundingClientRect()
          setPositionFilter.value.top = rect.top + 25;
          setPositionFilter.value.left = rect.left - (346 - rect.width);
        }
        if(!isShowFilter.value){
          const valueSearch = await store.state[BaseComponent.value.Module].filter.customSearch.find((item: any) => item.columnSearch === data.columnSearch);
            if(valueSearch){
              oldSearch.value = valueSearch;
            }
            else{
              oldSearch.value = null;
            }
        }
        isShowFilter.value = !isShowFilter.value;
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Hàm xử lý tìm kiếm
     * @param {data tìm kiếm} filter 
     */
    function handleFilterData(filter: any){
      try {
        BaseComponent.value.loadData(filter);
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
    async function handleSetSortColumn (field: any){
      try {
        await store.dispatch(`${BaseComponent.value.Module}/setFilterCustomSearchSortAction`, field.charAt(0).toUpperCase() + field.slice(1)).then((res: any)=> {
          if(res){
            sortBy.value = res;
          }
          else sortBy.value = '';
        });
        BaseComponent.value.loadData(true);
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Danh sách chứa các id
     * Khắc Tiềm - 15.09.2022
     */
    const listID = computed(()=> {
      return BaseComponent.value.recordList.reduce((acc: any, cur: any)=> {
        return [...acc, cur[BaseComponent.value.actionTable.fieldId]];
      },[]); 
    });
    /**
     * Ẩn hiện check tất cả
     * Khắc Tiềm - 15.09.2022
     */
    const isShowCheckAllRecord = computed(()=> {
      if(BaseComponent.value.checkShowActionSeries){
        let count = 0;
        BaseComponent.value.checkShowActionSeries.forEach((item: any) => {
          if(listID.value.includes(item)){
            count++;
          }
        })
        return count === BaseComponent.value.recordList.length && count > 0;
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
     * hàm xử lý hiển thị giới tính dựa trên enum
     * @param {Giới tính} gender 
     * Khắc Tiềm - 15.09.2022
     */
    function formatGender(gender: any) {
      if (Gender.Male == gender) {
        return t('gender.male');
      } else if (Gender.Female == gender) {
        return t('gender.female');
      } else if (Gender.Other == gender) {
        return t('gender.other');
      }
    }

    function formatNature(nature: any){
      if (nature == 1) {
        return t('module.inventory.goods');
      } else if (nature == 2) {
        return t('module.inventory.service');
      } else if (nature == 3) {
        return t('module.inventory.materials');
      }else if (nature == 4) {
        return t('module.inventory.finished_product');
      }else if (nature == 5) {
        return t('module.inventory.tool_tools');
      }
    }

    function formatIsActive(isActive: any){
      if(isActive === true){
        return t('common.using');
      }
      else{
        return t('common.stopUsing');
      }
    }

    /**
     * Hàm xử lý ẩn hiện các action
     * @param {Thông tin đỐi tượng được click} row 
     * Khắc Tiềm - 15.09.2022
     */
    function handleShowAction(event: any, row: any) {
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
    function setPositionActionTable(event: any) {
      try {
        let rect = event.srcElement.offsetParent.getBoundingClientRect();
        if(!event.srcElement.className.includes("action-table_right")){
          if(!event.srcElement.offsetParent.className.includes("action-table_right")){
            rect = event.srcElement.offsetParent.offsetParent.offsetParent.getBoundingClientRect();
          }
          else{
            rect = event.srcElement.offsetParent.offsetParent.getBoundingClientRect();
          }
        }
        positionAction.value.top = rect.top + window.scrollY + 32;
        positionAction.value.right = rect.right + window.scrollX - rect.left + window.scrollX - 35;
        if(window.innerHeight - rect.bottom < ((BaseComponent.value.actionTable.actionList.length * 28) + 12)){
          positionAction.value.top = rect.top + window.scrollY + 32 - ((BaseComponent.value.actionTable.actionList.length * 28) + 40);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return {
      rowColumn,
      formatGender,
      positionAction,
      isShowCheckAllRecord,
      listID,
      isShowFilter,
      environment,
      oldSearch,
      dataFilter,
      sortBy,
      handleFilterData,
      setPositionFilter,
      formatIsActive,
      handleSetSortColumn,
      formatNature,
      handleShowFilter,
      handleShowAction,
      handleCloseAction,
      Base,
      paseSize,
    };
  },
});
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
tbody tr td:first-child {
  z-index: 1;
}
thead tr th {
  z-index: 2;
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
  z-index: 3;
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
.center{
  text-align: center !important;
}
.right{
  text-align: right !important;
}
.left{
  text-align: left !important;
}




.table-scroll {
  padding: 0 16px;
  background-color: var(--while__color);
  display: table;
  table-layout: fixed;
  width: 100%;
}
.table-container {
  display: table-cell;
  width: 100%;
  background-color: var(--while__color);
}
.paging-container {
  padding: 12px 51px 12px 16px;
  background-color: var(--while__color);
  display: flex;
  align-items: flex-end;
	z-index: 1;
  justify-content: space-between;
  margin-right: -1px;
}
.paging {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

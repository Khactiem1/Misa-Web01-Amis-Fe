<template>
  <div class="table-content">
    <div class="table-scroll">
      <div class="table-container">
        <table class="table">
          <thead class="thead-light">
            <!-- Phần head table -->
            <tr>
              <!-- ô check box -->
              <th class="fix" style="width: 40px;" v-if="BaseComponent.checkShowActionSeries && BaseComponent.OptionCheck">
                <base-checkbox :checked="isShowCheckAllRecord" @custom-handle-click-checkbox="BaseComponent.handleClickCheckbox(true, listID)"></base-checkbox>
              </th>
              <draggable
                :list="columnCustom"
                :disabled="!true"
                item-key="Field"
                :tag="'div'"
                class="drag"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
              >
              <!-- Phần render các cột head -->
              <template #item="{ element, index }">
                <th :class="`${index === columnCustom.length - 1 ? 'header-content-end' : ''} ${element.TypeFormat.FixFirstColumn === true || (!BaseComponent.OptionCheck && index === 0) ? 'fix' : ''} ${BaseComponent.columnFix[index] ? `z3`: ``}`" 
                :style="{ 'min-width': `${element.Width}px`, width: `${element.Width}px`, 'max-width': `${element.Width}px`, 'left': `${BaseComponent.columnFix[index] ? `${BaseComponent.columnFix[index].Width}px` : ''}`}">
                  <span style="display: flex;" :class="`${element.TypeFormat.TextAlign}`" @click="handleSetSortColumn(element.FieldSelect)">
                    <span style="flex: 1; display: inline-block;">{{ element.HeaderCustom && element.HeaderCustom.trim() !== '' ? element.HeaderCustom : $t(`${element.Header}`) }}</span>
                    <div v-if="element.FieldSelect === sortBy.split(' ')[0] && BaseComponent.hideFilter !== true" class="sort" :class="{ 'sortASC': sortBy.split(' ')[1] === 'ASC' }"></div>
                  </span>
                  <div v-if="element.Filter && element.Filter.columnSearch && element.Filter.columnSearch !== '' && BaseComponent.hideFilter !== true" @click="handleShowFilter($event, {...element.Filter, FixColumn: element.FixColumn})" class="mi-header-option"></div>
                </th>
              </template>
              </draggable>
              <!-- Phần render các chức năng tác vụ -->
              <th v-if="BaseComponent.hideAction !== true" style="width: 120px; min-width: 120px" class="text-center fix column-end">
                {{ $t('common.function') }}
              </th>
            </tr>
          </thead>
          <!-- Phần render loader table khi tải dữ liệu -->
          <base-table-loader v-if="BaseComponent.isShowLoaderTable" :columns="BaseComponent.columns" :lengthList="BaseComponent.recordList.length" ></base-table-loader>
          <!-- Phần render báo table trống khi danh sách trống -->
          <base-table-empty v-if="!BaseComponent.isShowLoaderTable && BaseComponent.recordList.length === 0" ></base-table-empty>
          <tbody v-if="!BaseComponent.isShowLoaderTable">
            <!-- Phần body table -->
            <tr v-for="(row) in BaseComponent.recordList"
              :class="{ active: BaseComponent.checkShowActionSeries ? BaseComponent.checkShowActionSeries.includes(row[BaseComponent.actionTable.fieldId]) : false, parent: row.bindHTMLChild === '' && BaseComponent.tree}"
              :key="row[BaseComponent.actionTable.fieldId]"
            >
              <!-- ô check box -->
              <td v-if="BaseComponent.checkShowActionSeries && BaseComponent.OptionCheck" class="column-sticky">
                <base-checkbox :checked="BaseComponent.checkShowActionSeries ? BaseComponent.checkShowActionSeries.includes(row[BaseComponent.actionTable.fieldId]) : false"
                  @custom-handle-click-checkbox="BaseComponent.handleClickCheckbox(row[BaseComponent.actionTable.fieldId])"
                ></base-checkbox>
              </td>
              <!-- Phần render các cột nội dung của table -->
              <td v-for="(col, index) in columnCustom" :title="formatData(col.TypeFormat, row[col.Field])" 
              :style="{ 'left': `${BaseComponent.columnFix[index] ? `${BaseComponent.columnFix[index].Width}px` : ''}`, 'position': `${BaseComponent.columnFix[index] ? `sticky` : 'unset'}`}" 
              :class="`${BaseComponent.columnFix[index] ? `z3`: ``} ${index === columnCustom.length - 1 ? 'header-content-end':''} ${col.TypeFormat.TextAlign} ${row[col.Field] === 'common.valid' ? 'common-valid' : row[col.Field] === 'common.illegal' ? 'common-illegal' : ''} ${col.TypeFormat.FixFirstColumn === true ? 'column-sticky': ''}`"
                :key="index" @dblclick=" handleClickActionColumTable(BaseComponent.actionTable.actionDefault, row[BaseComponent.actionTable.fieldId])">
                <span class="data-table-bind" :class="`${BaseComponent.lineClamp}`">
                  <span v-if="row[BaseComponent.actionTable.fieldCode] === row[col.Field] && row.bindHTMLChild" v-html="row.bindHTMLChild + row.bindHTMLChild"></span>
                  {{ formatData(col.TypeFormat, row[col.Field]) }}
                </span>
                <div v-if="col.TypeFormat.IsImage === true" class="image-table">
                  <img v-bind:src="row[col.Field] ? row[col.Field].includes('/Images/') ? environment.IMAGE_API + row[col.Field] : '' + row[col.Field] : ''" alt="">
                </div>
                <div v-if="col.TypeFormat.CheckBox === true" class="checkBox">
                  <base-checkbox :checked="row[col.Field]" :lockCheckBox="col.TypeFormat.LockCheckBox"> </base-checkbox>
                </div>
              </td>
              <!-- Phần render các chức năng tác vụ -->
              <td v-if="BaseComponent.hideAction !== true" class="text-center fix column-end">
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
          <!-- Render phần tính tổng -->
          <thead v-if="BaseComponent.showTotalColumn && BaseComponent.recordList.length !== 0" class="thead-light table-footer">
            <tr>
              <th class="fix" style="text-transform: none; border-right: none;" v-if="BaseComponent.checkShowActionSeries">
                {{ $t('common.sum') }}
              </th>
              <th v-for="(item, index) in BaseComponent.columns" style="text-align: right; border-right: none;"
                :class="`${BaseComponent.columnFix[index] ? `z3`: ``}`"
                :style="{ 'min-width': `${item.Width}px`, width: `${item.Width}px`, 'left': `${BaseComponent.columnFix[index] ? `${BaseComponent.columnFix[index].Width}px` : ''}`}"
                :key="item.Field"
              >
                {{ item.Data ?  Base.Comma(item.Data) : "" }}
              </th>
              <th style="width: 120px; min-width: 120px; border-right: none;" class="text-center fix z3">
              </th>
            </tr>
          </thead>
          <!-- Phần render các chức năng tác vụ (khi click vào ô show tác vụ thì sẽ hiển thị)-->
          <teleport to="#app">
            <base-table-list-action
              :actionTable="BaseComponent.actionTable"
              :positionAction="positionAction"
              :row="rowColumn"
              :handleCloseAction="handleCloseAction"
              :handleClickActionColumTable="handleClickActionColumTable"
            ></base-table-list-action>
            <base-table-filter :handleFixColumn="BaseComponent.handleFixColumn" :oldSearch="oldSearch" :handleShowFilter="handleShowFilter" :dataFilter="dataFilter" @handle-filter-data="handleFilterData" :setPositionFilter="setPositionFilter" v-if="isShowFilter">
            </base-table-filter>
          </teleport>
        </table>
      </div>
    </div>
    <!-- Phần phân trang -->
    <div v-if="BaseComponent.recordList.length !== 0 && BaseComponent.totalCount" class="paging-container sticky">
      <div class="total-record">
        {{ $t('common.total') }}: <strong>{{ BaseComponent.totalCount }}</strong> {{ $t('common.record') }}
      </div>
      <div class="paging">
        <base-combobox
          :options="[
            { value: 10, header: 'common.paging' },
            { value: 20, header: 'common.paging' },
            { value: 30, header: 'common.paging' },
            { value: 50, header: 'common.paging' },
            { value: 100, header: 'common.paging' },
          ]"
          :i18n="true"
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
          :value="BaseComponent.recordSelectPaging"
          @custom-handle-select-paging="BaseComponent.selectPaging"
          :key="BaseComponent.PageSize || BaseComponent.keyword"
        ></base-paging>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseTableEmpty, BaseTableLoader, BaseTableFilter, BaseTableListAction, BasePaging } from "@/core/public_component";
import { UtilsComponents, Gender, TypeFormat, Nature, DepreciatedTax } from "@/core/public_api";
import { environment } from '@/environments/environment.prod';
import { watch, ref, toRefs, computed, defineComponent, type PropType } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n'
import draggable from "vuedraggable";
export default defineComponent({
  components: {
    BaseTableEmpty,
    BaseTableLoader,
    BaseTableListAction,
    BaseTableFilter,
    BasePaging,
    draggable
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
  },
  setup(props) {
    const Base: UtilsComponents = new UtilsComponents();
    const { t } = useI18n();
    const dragging = ref(false);
    const store: any = useStore();
    /**
     * Bóc tách props ra từ props chuyển vào
     * Khắc Tiềm - 15.09.2022
     */
    const { BaseComponent }: any = toRefs(props);

    /** Column lấy từ Base */
    const columnCustom: any = ref(JSON.parse(JSON.stringify(BaseComponent.value.columns)));

    /** Kiểm tra sắp xếp lại cột khi kéo thả */
    watch(dragging,(newVal)=> {
      if(newVal === false && BaseComponent.value.setupColumns){
        BaseComponent.value.setupColumns();
      }
    })

    /** Kiểm tra sự thay đổi từ Base, nếu thay đổi thì tiến hành update */
    const refColumn: any = computed(() => BaseComponent.value.columns);
    watch(refColumn, () => {
      columnCustom.value = BaseComponent.value.columns;
    })

    /** Số bản ghi trên 1 trang */
    const paseSize = ref(BaseComponent.value.PageSize);
    watch(paseSize, (newValue) => {
      BaseComponent.value.setPageSize(newValue);
    });
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

    function formatData(typeFormat: TypeFormat, data: any){
      return typeFormat.FractionSize === true
      ? Base.Comma(data)
      : typeFormat.FormatDate === true
      ? Base.formatDateDDMMYYYY(data)
      : typeFormat.IsGender === true
      ? formatGender(data)
      : typeFormat.IsActive === true
      ? formatIsActive(data)
      : typeFormat.IsNature === true
      ? formatNature(data)
      : typeFormat.DepreciatedTax === true
      ? formatDepreciatedTax(data)
      : typeFormat.CheckBox === true
      ? ''
      : typeFormat.IsImage === true
      ? '' 
      :typeFormat.FormatServiceResponseI18n === true
      ? BaseComponent.value.formatServiceResponse(data, BaseComponent.value.ModuleI18n)
      :data
    }
    
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
          const valueSearch = await store.state[BaseComponent.value.Module].filter.CustomSearch.find((item: any) => item.ColumnSearch === data.columnSearch);
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
        BaseComponent.value.loadData({resetPage:true, ...filter});
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
        if(BaseComponent.value.hideFilter !== true){
          await store.dispatch(`${BaseComponent.value.Module}/setFilterCustomSearchSortAction`, field).then((res: any)=> {
            if(res){
              sortBy.value = res;
            }
            else sortBy.value = '';
          });
          BaseComponent.value.loadData(true);
        }
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
      return gender;
    }

    /**
     * hàm xử lý hiển thị giới tính dựa trên enum
     * Khắc Tiềm - 15.09.2022
     */
    function formatNature(nature: any){
      if (nature == Nature.Goods) {
        return t('module.inventory.goods');
      } else if (nature == Nature.Service) {
        return t('module.inventory.service');
      } else if (nature == Nature.Materials) {
        return t('module.inventory.materials');
      }else if (nature == Nature.FinishedProduct) {
        return t('module.inventory.finished_product');
      }else if (nature == Nature.ToolTools) {
        return t('module.inventory.tool_tools');
      }
      return nature;
    }

    /**
     * hàm xử lý hiển thị giới tính dựa trên enum
     * Khắc Tiềm - 15.09.2022
     */
    function formatDepreciatedTax(Depreciated: any){
      if (Depreciated == DepreciatedTax.undefined) {
        return t('module.inventory.undefined');
      } else if (Depreciated == DepreciatedTax.no_tax_reduction) {
        return t('module.inventory.no_tax_reduction');
      } else if (Depreciated == DepreciatedTax.tax_reduction) {
        return t('module.inventory.tax_reduction');
      }
      return Depreciated;
    }

    /**
     * hàm xử lý hiển thị giới tính dựa trên enum
     * Khắc Tiềm - 15.09.2022
     */
    function formatIsActive(isActive: any){
      if(isActive == true || isActive == 'true'){
        return t('common.using');
      }
      else if (isActive == false || isActive == 'false'){
        return t('common.stopUsing');
      }
      return isActive;
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
      Base,
      columnCustom,
      dragging,
      paseSize,
      rowColumn,
      positionAction,
      isShowCheckAllRecord,
      listID,
      isShowFilter,
      environment,
      oldSearch,
      dataFilter,
      sortBy,
      setPositionFilter,
      formatGender,
      formatData,
      handleFilterData,
      formatIsActive,
      handleSetSortColumn,
      formatNature,
      handleShowFilter,
      handleShowAction,
      handleCloseAction,
    };
  },
});
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b0b0b0;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 0;
  background: #808080;
}
::-webkit-scrollbar {
  height: 10px; /* height of horizontal scrollbar ← You're missing this */
  width: 8px;
	background-color: var(--while__color);
}
::-webkit-scrollbar-track {
  border-radius: 0;
  margin-bottom: 55px;
  margin-top: 34px;
  direction: rtl;
  margin-left: 16px;
  margin-right: 15px;
}
.table-content {
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--while__color);
}
table {
  border-spacing: 0;
  width: 100%;
  background-color: var(--while__color);
}
.drag{
  display: contents;
}
.table .thead-light th {
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: 33px;
  padding: 0 10px 0 10px;
  font-size: 12px;
  font-family: 'notosans-semibold';
  height: 34px;
  position: sticky;
  top: 0;
  background-color: #e5e8ec;
  text-transform: uppercase;
  vertical-align: middle;
}
.table .thead-light th span span{
  color: var(--text__color) !important;
}
.table .thead-light th span{
  cursor: pointer;
  display: flex;
  align-items: center;
}
.table .thead-light th:not(:first-child), .drag th:first-child{
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
.table .thead-light th.fix:last-child {
  border-right: none;
}
tbody tr:hover,
tbody tr:hover .z3,
.table tbody tr:hover th:last-child,
.table tbody tr:hover th:first-child,
.table tbody tr:hover td:last-child,
.table tbody tr:hover td:first-child {
  background-color: #f2f9ff;
}
tbody tr.active,
tbody tr.active .z3,
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
.table tbody td
.table tbody td .data-table-bind{
  white-space: pre-wrap; 
}
.table tbody td .data-table-bind.hidden-space_1{
  overflow: hidden; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
}
.table tbody td .data-table-bind.hidden-space_2{
  overflow: hidden; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}
.table tbody td .data-table-bind.hidden-space_3{
  overflow: hidden; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
}
.table .thead-light th.fix:last-child,
.table .thead-light th.fix:first-child {
  z-index: 3;
  background-color: #e5e8ec;
}
.table .thead-light th.fix:last-child,
.table tbody th.fix:last-child,
.table tbody td.fix:last-child {
  right: 15px !important;
}
.table .thead-light th.fix:last-child::before,
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
.table .thead-light th.fix:first-child,
.table tbody th:first-child,
.table tbody td:first-child {
  left: 16px;
}
.table .thead-light th.fix:first-child::before,
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
.table .thead-light th.fix:last-child,
.table .thead-light th.fix:first-child,
.table tbody th.fix:last-child,
.table tbody th:first-child,
.table tbody td.fix:last-child,
.table tbody td:first-child {
  position: -webkit-sticky;
  position: sticky;
}
.table tbody th.fix:last-child,
.table tbody td.fix:last-child{
  background-color: aliceblue;
  /* background-color: var(--while__color); */
}
.column-sticky{
  background-color: aliceblue;
  /* background-color: var(--while__color); */
}
.table tbody td:last-child {
  border-right: none;
}
.table .thead-light th.fix:first-child,
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

.checkBox{
  width: 18px;
  margin: 0 auto;
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
	z-index: 4;
  justify-content: space-between;
  margin-right: -1px;
}
.paging {
  display: flex;
  align-items: center;
  justify-content: center;
}
.common-illegal{
  color: red;
}
.common-valid{
  color: var(--primary__color);
}
.column-end{
  border-left: 1px dotted #c7c7c7;
  z-index: 4 !important;
}
thead .column-end{
  z-index: 5 !important;
  border-left: 1px solid #c7c7c7;
}
.header-content-end{
  border-right: unset !important;
}
thead .z3{
  z-index: 5 !important;
}
tbody .z3{
  background-color: var(--while__color);
  z-index: 3 !important;
}
</style>

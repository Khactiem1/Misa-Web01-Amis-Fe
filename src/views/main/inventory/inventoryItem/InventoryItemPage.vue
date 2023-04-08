<template>
	<div class="container-table">
		<div class="container-table_header">
      <div class="name-table">
        <h1>{{ $t('page.inventory_item') }}</h1>
				<router-link to="/inventory" class="prev_page">
					<div class="prev_page-icon"></div>
					<div class="prev_page-text">{{ $t('common.back') }}</div>
				</router-link>
      </div>
      <div class="action-table">
        <div class="btn-add">
					<button @click="customHandleOpenModal(ActionTable.Add)" title="Ctrl + 1" class="add">{{ $t('common.add') }}</button>
					<button class="import toggle-list">
            <i class="icon"></i>
            <div class="table-list_action">
              <div @click="Base.downloadFromUrl(`${environment.IMAGE_API}/Excel/Template/inventoryItem.xlsx`)" class="list_action-item"><i class="i excel"></i> {{ $t('common.export_sample') }}</div>
              <div @click="Base.showDialog()" :title="$t('common.import')" class="list_action-item"><i class="i excel"></i> {{ $t('common.import') }}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
		<form-over-view :Base="Base" v-if="isShowOverview"></form-over-view>
    <div class="table-function sticky">
      <div class="collapse-overview" @click="handleToggleShowOverView()" :class="{ 'mi-chevron-down--primary' : !isShowOverview }"></div>
      <div class="form-fix">
        <div class="mi-arrow-check-all"></div>
        <button class="table-function_series toggle-list">
          <span>{{ $t('common.batch_execution') }}</span>
          <div class="table-function_series-icon"></div>
          <div v-show="Base.checkShowActionSeries.length > 0" class="table-list_action">
            <div class="list_action-item" @click="handleQuestionDeleteAll()">{{ $t('common.delete') }}</div>
          </div>
        </button>
        <div class="table-function_series not-css">
          <form-inventory-item-search :Base="Base"></form-inventory-item-search>
        </div>
        <base-form-key-search :loadData="Base.loadData" :moduleFilter="ModuleName.InventoryItem"></base-form-key-search>
      </div>
      <div style="min-width: 350px;" class="table-function_search">
        <div class="search-table">
          <input @input="Base.handleSearchData" class="input input-table_search" type="text" :placeholder="$t('module.inventory.search_inventory_code_name')"/>
          <div class="icon-search"></div>
        </div>
        <div @click="Base.loadData()" class="action-render_table reload-table" :content="$t('common.load_data')"></div>
        <div @click="Base.exportToExcel()" class="action-render_table export-data" :content="$t('common.export_excel')"></div>
        <div @click="Base.handleShowSettingTable()" class="action-render_table setting-table" :content="$t('common.customize_interface')"></div>
      </div>
    </div>
		<base-table :BaseComponent="Base" :handleClickActionColumTable="handleClickActionColumTable">
    </base-table>
		<teleport to="#app">
      <base-modal-form v-if="Base.isShowModal">
        <form-inventory-item 
        :handleChangeNature="handleChangeNature"
        :typeNature="typeNature" 
        :Base="Base" 
        :optionUnitIn="{
          optionUnit,
          addItem: (item: any)=> {
            optionUnit = [item, ...optionUnit]
          }
        }" 
        :optionDepotIn="{
          optionDepot,
          addItem: (item: any)=> {
            optionDepot = [item, ...optionDepot]
          }
        }" 
        :optionCommodityIn="{
          optionCommodity,
          addItem: (item: any)=> {
            optionCommodity = [item, ...optionCommodity]
          }
        }"
        ></form-inventory-item>
      </base-modal-form>
      <base-modal-form v-if="Base.isShowDialog">
        <base-import-excel :Base="Base"> </base-import-excel>
      </base-modal-form>
      <base-modal-form v-if="Base.isShowResultExcel">
        <base-form-excel-result :ModuleI18n="'module.inventory'" :Base="Base"></base-form-excel-result>
      </base-modal-form>
      <base-setting v-if="Base.isShowSettingTable" :columns="Base.columnSetting" :handleShowSettingTable="Base.handleShowSettingTable"
      ></base-setting>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Grid, ModuleName, ActionTable, StorageService, EntitySystem } from '@/core/public_api';
import { reactive , ref, onBeforeMount, onUnmounted, onMounted, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { environment } from '@/environments/environment.prod';
import inventoryItemApi from '@/api/module/inventoryItem';
import DepotApi from '@/api/module/depot';
import UnitCalculationApi from '@/api/module/unitCalculation';
import CommodityGroupApi from '@/api/module/commodityGroup';
const FormInventoryItem = defineAsyncComponent(() => import('./FormInventoryItem.vue'));
const FormOverView = defineAsyncComponent(() => import('./FormOverView.vue'));
const FormInventoryItemSearch = defineAsyncComponent(() => import('./FormInventoryItemSearch.vue'));

const { t } = useI18n();
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
const api:inventoryItemApi = new inventoryItemApi();

/** Sử dụng base thư viện Grid đã viết */
const Base:Grid = reactive(new Grid(ModuleName.InventoryItem, api));

/** Dữ liệu dropdown đơn vị tính */
const optionUnit: any = ref([]);

/** Dữ liệu dropdown kho */
const optionDepot: any = ref([]);

/** Dữ liệu dropdown nhóm vật tư hàng hoá */
const optionCommodity: any = ref([]);

/** Lưu trạng thái vật tư hàng hoá */
const typeNature = ref(null);
function handleChangeNature(nature:any){
  typeNature.value = nature;
}

/**
 * Hàm load dữ liệu đổ vào dropdowns combobox
 * NK Tiềm 08.03.2023
 */
 function loadDropDown(){
  Base.apiService.callApi(new UnitCalculationApi().getDropdown, null, async (response: any) => { optionUnit.value = response;});
  Base.apiService.callApi(new DepotApi().getDropdown, null, async (response: any) => { optionDepot.value = response;});
  Base.apiService.callApi(new CommodityGroupApi().getDropdown, null, async (response: any) => { optionCommodity.value = Base.listToTree(response, 'commodityGroupID');});
}

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
	Base.loadData({ v_Offset: Base.recordSelectPaging, v_Limit: Base.PageSize, v_Where: Base.keyword });
	Base.showTotalColumn = true;
  loadDropDown();
});

/** Biến lưu trạng thái show overview */
const isShowOverview = ref(JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.IsShowOverview)) === false ? false : true);

/**
 * Hàm xử lý toggle show overview
 * NK Tiềm 08.03.2023
 */
 function handleToggleShowOverView(){
	isShowOverview.value = !isShowOverview.value;
	StorageService.setItemWithSystemConstants(EntitySystem.IsShowOverview, isShowOverview.value);
}

/**
 * Hàm mở modal và lấy mã tự sinh
 * Khắc Tiềm - 08.03.2023
 */
async function customHandleOpenModal(action: any, recordId: any = undefined){
  try {
    await Base.apiService.callApi(api.nextValue, null, (response: any) => { 
      Base.RecordCode = response;
    }, false );
    Base.openModal(action, recordId);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
 * Khắc Tiềm - 08.03.2023
 */
function handleClickActionColumTable(action: any, recordId: any, recordCode: any) {
	try {
		if (action == ActionTable.Edit || action ==  ActionTable.Replication) {
			Base.openModal(action, recordId);
		} else if (action == ActionTable.Delete) {
			questionDeleteRecordApi(recordId, recordCode);
		} else if(action === ActionTable.StopUsing){
			Base.toggleRecordActiveApi(recordId);
		}
	} catch (e) {
		console.log(e);
	}
}

/**
 *  Hàm thực hiện hỏi xoá một bản ghi 
 * Khắc Tiềm - 08.03.2023
*/
function questionDeleteRecordApi(recordId: any, recordCode:any ){
  Base.showNotificationWanning(Base.deleteRecord, t('message.crud.question_wanning_delete', { module: t(`module.inventory.${Base.Module}`), code: recordCode ? recordCode : t('message.crud.statue_of_liberty') }), recordId);
}

/** 
 * Hàm hỏi xác nhận xoá nhiều 
 * Khắc Tiềm - 08.03.2023
*/
function handleQuestionDeleteAll() {
	try {
    if(Base.checkShowActionSeries.length > 0){
      Base.showNotificationWanning(Base.deleteAll, t('message.crud.wanning_delete_all'));
    }
	} catch (e) {
		console.log(e);
	}
}

/**
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
	Base.handleEventCtrlNum1(event, customHandleOpenModal, ActionTable.Add)
	Base.handleEventShiftDelete(event, handleQuestionDeleteAll)
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onMounted(() => {
	window.addEventListener("keydown", handleKey);
	window.addEventListener("keyup", Base.handleEventInterruptCtrlNum1);
	window.addEventListener("keyup", Base.handleEventInterruptShiftDelete);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("keyup", Base.handleEventInterruptCtrlNum1);
	window.removeEventListener("keyup", Base.handleEventInterruptShiftDelete);
	window.removeEventListener("keydown", handleKey);
  Base.setEmptyData();
})
</script>

<style scoped>
@import "../../../../assets/css/crud.css";
.mi-arrow-check-all{
	background: var(--url__icon) no-repeat;
	cursor: pointer;
	background-position: -256px -143px;
	width: 24px;
	height: 24px;
	min-width: 24px;
	margin-top: 12px;
	margin-left: 7px;
	margin-right: 12px;
	min-height: 24px;
}
.collapse-overview{
  border: 2px solid #e2e9f2;
	background: #f2f5f8;
	width: 26px;
	height: 16px;
	position: absolute;
	cursor: pointer;
	z-index: 9;
	top: 0px;
	right: 15px;
	background: var(--url__icon) no-repeat;
	background-position: -125px -362px;
  border-top: none;
}
.mi-chevron-down--primary{
  background-position: -173px -362px;
}
.table-function_series-icon {
  background: var(--url__icon);
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.not-css{
  border: none !important;
  padding: unset !important;
  border-radius: unset !important;
  margin-left: 0px !important;
  cursor: context-menu !important;
}
.table-function_series.not-css:hover {
  background-color: unset !important;
}
.table-function_series.not-css:active {
    background-color: unset;
    box-shadow: unset;
}
</style>
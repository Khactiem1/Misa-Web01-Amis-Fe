<template>
	<div class="container-table">
		<div class="container-table_header">
      <div class="name-table">
        <h1>{{ $t('page.unitCalculation') }}</h1>
				<router-link to="/inventory" class="prev_page">
					<div class="prev_page-icon"></div>
					<div class="prev_page-text">{{ $t('common.back') }}</div>
				</router-link>
      </div>
      <div class="action-table">
        <div class="btn-add">
					<button @click="Base.openModal(ActionTable.Add)" title="Ctrl + 1" class="add">{{ $t('common.add') }}</button>
					<button class="import toggle-list">
            <i class="icon"></i>
            <div class="table-list_action">
              <div @click="Base.downloadFromUrl(`${environment.IMAGE_API}/Excel/Template/unitCalculation.xlsx`)" class="list_action-item"><i class="i excel"></i> {{ $t('common.export_sample') }}</div>
              <div @click="Base.showDialog()" :title="$t('common.import')" class="list_action-item"><i class="i excel"></i> {{ $t('common.import') }}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="table-function sticky">
      <div class="form-fix">
        <div class="search-table">
          <input @input="Base.handleSearchData" class="input input-table_search" type="text" :placeholder="$t('module.inventory.search_unitCalculation_name')"/>
          <div class="icon-search"></div>
        </div>
        <base-form-key-search :loadData="Base.loadData" :moduleFilter="ModuleName.UnitCalculation"></base-form-key-search>
      </div>
      <div style="min-width: 350px;" class="table-function_search">
        <div @click="Base.loadData()" class="action-render_table reload-table" :content="$t('common.load_data')"></div>
        <div @click="Base.exportToExcel()" class="action-render_table export-data" :content="$t('common.export_excel')"></div>
        <div @click="Base.handleShowSettingTable()" class="action-render_table setting-table" :content="$t('common.customize_interface')"></div>
      </div>
    </div>
		<base-table :BaseComponent="Base" :handleClickActionColumTable="handleClickActionColumTable">
    </base-table>
		<teleport to="#app">
      <base-modal-form v-if="Base.isShowModal">
        <form-unit-calculation :Base="Base">
        </form-unit-calculation>
      </base-modal-form>
      <base-modal-form v-if="Base.isShowDialog">
        <base-import-excel :Base="Base">
        </base-import-excel>
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
import { Grid, ModuleName, ActionTable } from '@/core/public_api';
import { reactive, onBeforeMount, onUnmounted, onMounted, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { environment } from '@/environments/environment.prod';
import UnitCalculationApi from '@/api/module/unitCalculation';
const FormUnitCalculation = defineAsyncComponent(() => import('./FormUnitCalculation.vue'))

const { t } = useI18n();
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
const api:UnitCalculationApi = new UnitCalculationApi();

/** Sử dụng base thư viện Grid đã viết */
const Base:Grid = reactive(new Grid(ModuleName.UnitCalculation, api));

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
	Base.loadData({ v_Offset: Base.recordSelectPaging, v_Limit: Base.PageSize, v_Where: Base.keyword });
  Base.OptionCheck = false;
});

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
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
	Base.handleEventCtrlNum1(event, Base.openModal, ActionTable.Add)
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onMounted(() => {
	window.addEventListener("keydown", handleKey);
	window.addEventListener("keyup", Base.handleEventInterruptCtrlNum1);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("keyup", Base.handleEventInterruptCtrlNum1);
	window.removeEventListener("keydown", handleKey);
  Base.setEmptyData();
})
</script>

<style scoped>
  @import "../../../../assets/css/crud.css";
</style>
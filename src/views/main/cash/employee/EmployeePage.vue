<template>
	<div class="container-table">
		<div class="container-table_header">
      <div class="name-table">
        <h1>{{ $t('page.employee') }}</h1>
				<router-link to="/cash" class="prev_page">
					<div class="prev_page-icon"></div>
					<div class="prev_page-text">{{ $t('common.back') }}</div>
				</router-link>
      </div>
      <div class="action-table">
        <div class="btn-add">
					<button @click="customHandleOpenModal(ActionTable.Add)" title="Ctrl + Alt + A" class="add">{{ $t('common.add') }}</button>
					<button :title="$t('common.import')" class="import"><i class="icon"></i></button>
        </div>
      </div>
    </div>
		<div class="table-content">
			<div class="table-function sticky">
				<div class="form-fix">
          <div ref="templateActionAll" @click="handleToggleActionAll" class="table-function_series">
            <span>{{ $t('common.batch_execution') }}</span>
            <div class="table-function_series-icon"></div>
            <div v-show="Base.showActionAll && Base.checkShowActionSeries.length > 0" class="table-list_action">
              <div class="list_action-item" @click="handleQuestionDeleteAll()">{{ $t('common.delete') }}</div>
            </div>
          </div>
          <base-form-key-search :loadData="Base.loadData" :moduleFilter="ModuleName.Employee"></base-form-key-search>
        </div>
				<div style="min-width: 350px;" class="table-function_search">
          <div class="search-table">
            <input @input="Base.handleSearchData" class="input input-table_search" type="text" :placeholder="$t('module.cash.search_employee_code_name')"/>
            <div class="icon-search"></div>
          </div>
          <div @click="Base.loadData()" class="action-render_table reload-table" :content="$t('common.load_data')"></div>
          <div @click="Base.exportToExcel()" class="action-render_table export-data" :content="$t('common.export_excel')"></div>
          <div @click="Base.handleShowSettingTable()" class="action-render_table setting-table" :content="$t('common.customize_interface')"></div>
        </div>
			</div>
			<!-- Table -->
			<base-table
				:BaseComponent="Base"
				:handleClickActionColumTable="handleClickActionColumTable"
			>
			</base-table>
			<!-- End Table -->
		</div>
		<teleport to="#app">
      <base-modal-form v-if="Base.isShowModal">
        <form-employee 
          :Base="Base" 
          :optionBranch="optionBranch">
        </form-employee>
      </base-modal-form>
      <base-setting
        v-if="Base.isShowSettingTable"
        :columns="Base.columnSetting"
        :handleShowSettingTable="Base.handleShowSettingTable"
      ></base-setting>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Grid, ModuleName, ActionTable } from '@/core/public_api';
import { BaseTable, BaseSetting, BaseFormKeySearch, BaseModalForm } from '@/core/public_component';
import FormEmployee from './FormEmployee.vue';
import { reactive , ref, onBeforeMount, onUnmounted, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import EmployeeApi from '@/api/module/employee';
import BranchApi from '@/api/module/branch';

const { t } = useI18n();
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
const api:EmployeeApi = new EmployeeApi();
const apiDropdown:BranchApi = new BranchApi();

/** Sử dụng base thư viện Grid đã viết */
const Base: Grid = reactive(new Grid(ModuleName.Employee, api));

/** Dữ liệu dropdown đơn vị */
const optionBranch: any = ref([]);

/**
 * Biến chứa template thực hiện hành động hàng loạt
 * Khắc Tiềm - 3-03-2023
 */
const templateActionAll: any = ref(null);

function loadDropDown(){
  Base.apiService.callApi(apiDropdown.getAll, null, async (response: any) => { optionBranch.value = response;});
}

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
	Base.loadData({ v_Offset: Base.recordSelectPaging, v_Limit: Base.PageSize, v_Where: Base.keyword });
  loadDropDown();
});

async function customHandleOpenModal(action: any, recordId: any = undefined){
  try {
    await Base.apiService.callApi(api.nextValue, null, (response: any) => { 
      Base.RecordCode = response;
    }, () => {}, false);
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
		if (action == ActionTable.Edit) {
			Base.openModal(action, recordId);
		} else if (action == ActionTable.Replication) {
      customHandleOpenModal(action, recordId);
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
  Base.showNotificationWanning(Base.deleteRecord, t('message.crud.question_wanning_delete', { module: t(`module.cash.${Base.Module}`), code: recordCode }), recordId);
}

/** 
 * Hàm hỏi xác nhận xoá nhiều 
 * Khắc Tiềm - 08.03.2023
*/
function handleQuestionDeleteAll() {
	try {
    Base.showNotificationWanning(Base.deleteAll, t('message.crud.wanning_delete_all'));
	} catch (e) {
		console.log(e);
	}
}

/**
 * Hàm xử lý sự kiện click không trúng templateActionAll thì sẽ ẩn hành động hàng loạt
 * Khắc Tiềm - 08.03.2023
 */
const handleClickActionAll = (event: any) => {
	const isClick = templateActionAll.value.contains(event.target);
	if (!isClick) {
		handleToggleActionAll();
	}
};

/**
 * Hàm xử lý ẩn hành động thực hiện hàng loạt
 * Khắc Tiềm - 08.03.2023
 */
function handleToggleActionAll() {
	try {
		if (!Base.showActionAll && Base.checkShowActionSeries.length > 0) {
			Base.showActionAll = true;
			window.addEventListener("click", handleClickActionAll);
		} else {
			window.removeEventListener("click", handleClickActionAll);
			Base.showActionAll = false;
		}
	}catch (e) {
		console.log(e);
	}
}

function handleKey(event: any){
	Base.handleEventCtrlAltA(event, customHandleOpenModal, ActionTable.Add)
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onMounted(() => {
	window.addEventListener("keydown", handleKey);
	window.addEventListener("keyup", Base.handleEventInterruptCtrlAltA);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("click", handleClickActionAll);
	window.removeEventListener("keyup", Base.handleEventInterruptCtrlAltA);
	window.removeEventListener("keydown", handleKey);
})

</script>

<style scoped>
/* Phần header table */
::-webkit-scrollbar-track {
  border-radius: 0;
  margin-top: 100px;
  margin-bottom: 55px;
  direction: rtl;
}

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
  border-radius: 5px;
}
.container-table {
  padding: 0 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.container-table_header {
  display: flex;
  justify-content: space-between;
  padding: 14px 0 10px 0px;
}
/* Phần table */
.table-content {
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.table-function {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  z-index: 5;
  height: 66px;
  background-color: var(--while__color);
}
/* Phần thực hiện nhiều chức năng */
.table-function_series {
  border: 2px solid #3b3c3f;
  padding: 0 16px;
  border-radius: 30px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition: all 0.2s ease;
  position: relative;
}
.table-function_series:hover {
  background-color: #d2d3d6;
}
.table-function_series:active {
  background-color: #bbbcbc;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.table-function_series span {
  font-family: "notosans-semibold";
  padding-right: 4px;
}
.table-function_series-icon {
  background: var(--url__icon);
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.table-list_action {
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 3px 0;
  min-width: 100px;
  top: calc(100% + 2px);
  right: 5px;
  position: absolute;
  z-index: 5;
  transition: all ease 0.15s;
}
.list_action-item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  transition: all ease 0.15s;
  color: inherit;
}
.list_action-item:hover {
  background-color: #f5f5f5;
  color: var(--primary__color);
}
/* Phần search */
.search-table {
  position: relative;
}
.icon-search {
  background: var(--url__icon) no-repeat;
  background-position: -992px -360px;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.action-render_table {
  background: var(--url__icon) no-repeat;
  cursor: pointer;
  margin-left: 12px;
  position: relative;
  width: 24px;
  height: 24px;
}
.action-render_table::before {
  display: none;
  position: absolute;
  background-color: var(--menu__color);
  color: var(--text__while-color);
  text-align: center;
  padding: 6px 6px;
  border-radius: 3px;
  top: 120%;
  font-size: 12px;
}
.action-render_table:hover:before {
  display: block;
}
.reload-table:hover {
  background-position: -1097px -88px;
}
.reload-table {
  background-position: -423px -201px;
}
.setting-table:hover {
  background-position: -88px -256px;
}
.setting-table {
  background-position: -88px -200px;
}
.export-data:hover {
  background-position: -704px -256px;
}
.export-data {
  background-position: -704px -200px;
}
.setting-table::before {
  content: attr(content);
  width: 130px;
  left: -96px;
}
.reload-table::before {
  content: attr(content);
  width: 100px;
  left: -40px;
}
.export-data::before {
  content: attr(content);
  width: 110px;
  left: -50px;
}
.table-function_search {
  display: flex;
  align-items: center;
}
.input.input-table_search {
  padding-left: 10px;
  padding-right: 2.75rem;
}
/* Phần phân trang */
.form-fix{
	min-width: 316px;
	display: flex;
	align-items: center;
}
.btn-add{
	display: flex;
	align-items: center;
	padding: 0;
}
.import,.add{
	transition: all 0.15s ease-in-out;
	font-family: "notosans-bold";  
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--primary__color);
	height: 100%;
	height: 32px;
	color: var(--text__while-color);
}
.import:hover,.add:hover{
	background-color: var(--primary__color-hover);
}
.import:active,.add:active{
	background-color: var(--primary__color);
}
.import:focus{
  box-shadow: 0 0 0 2px #e0e0e0;
}
.add:focus{
  box-shadow: 0 0 0 2px #e0e0e0;
}
.add{
	flex: 1;
	border-radius: 30px 0 0 30px;
	padding: 0 19px;
	position: relative;
}
.add::before{
	content: '';
	position: absolute;
	width: 1px;
	height: 22px;
	background-color: var(--while__color);
	top: 5px;
	right: 0;
}
.import{
	border-radius: 0 30px 30px 0;
	width: 47px;
	padding: 0 12px;
}
.import .icon{
	display: block;
	background: var(--url__icon) no-repeat;
	background-position: -705px -203px;
	width: 23px;
  height: 18px;
	background-color: var(--while__color);
	border-radius: 3px;
}
.prev_page{
  display: flex;
  align-items: center;
  color: #0075c0;
  margin-top: 4px;
}
.prev_page-icon{
  background: var(--url__icon) no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -224px -360px;
}
</style>
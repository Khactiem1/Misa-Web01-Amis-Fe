<template>
	<div class="modal-body" :class="{ active : isShowFullModal }">
		<div v-show="isShowFormMain" class="form form_inventoryitem_in">
			<div class="form-header">
				<div class="modal-title">
					<h2>{{ Base.StateForm === ActionTable.Add ? $t('common.add_record', {module: $t(`module.inventory.${ModuleName.InventoryItem}_small`) }) 
          : Base.StateForm === ActionTable.Replication ? $t('common.replication_record', {module: $t(`module.inventory.${ModuleName.InventoryItem}_small`) }) 
          : $t('common.edit_record', {module: $t(`module.inventory.${ModuleName.InventoryItem}_small`) }) }}</h2>
					<div class="form-title">
						<div v-if="typeNature === Nature.Goods" class="nature">
							<div class="form-title_image form-goods">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.goods') }}
							</div>
						</div>
						<div v-if="typeNature === Nature.Service" class="nature">
							<div class="form-title_image form-service">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.service') }}
							</div>
						</div>
						<div v-if="typeNature === Nature.Materials" class="nature">
							<div class="form-title_image form-materials">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.materials') }}
							</div>
						</div>
						<div v-if="typeNature === Nature.FinishedProduct" class="nature">
							<div class="form-title_image form-finished-product">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.finished_product') }}
							</div>
						</div>
						<div v-if="typeNature === Nature.ToolTools" class="nature">
							<div class="form-title_image form-tool-tools">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.tool_tools') }}
							</div>
						</div>
						<div @click="handleSelectNature(false)" class="form-title_link">
								{{ $t('module.inventory.change_nature') }}
						</div>
					</div>
				</div>
				<div class="modal-close">
					<a href="/feature-built" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"></div>
				</div>
			</div>
			<div class="form-container">
				<div class="form-detail flex-center">
					<div class="form-item form-item_left">
						<button ref="focusLoopTop" class="focus-loop"></button>
						<div class="form-item_input">
							<div class="form-group ms-big">
								<base-input
									ref="inputFocus"
									:required="true"
									:focus="true"
									:type="'text'"
									:maxLength="255"
                  :messageValid="t('validate.empty', { field: t('module.inventory.inventoryItemName') })"
									:label="$t('common.name')"
									v-model="inventoryItem.inventoryItemName"
									:class="{ 'is-valid': isValid && inventoryItem.inventoryItemName == '' }"
								></base-input>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group ms-small-s">
								<base-input
									:required="true"
									:type="'text'"
									:maxLength="25"
									:label="$t('common.id')" 
									:leftMessage="'95%'"
									v-model="inventoryItem.inventoryItemCode"
                  :messageValid="t('validate.empty', { field: t('module.inventory.inventoryItemCode') })"
									:class="{ 'is-valid': isValid && inventoryItem.inventoryItemCode == '' }"
								></base-input>
							</div>
							<div class="form-group ms-big">
								<base-combobox
									:options="optionCommodityIn.optionCommodity"
									widthOptionSelect="600px"
									widthLabelCode="250px"
									:value="'commodityGroupID'"
									:header="'commodityName'"
									:labelCode="$t('module.inventory.commodityCode')"
									:labelName="$t('module.inventory.commodityName')"
									:headerCode = "'commodityCode'"
									:label="$t('module.inventory.commodityGroupCompact')"
									:toolTip="$t('module.inventory.commodityGroup')"
									:selectMultiple="true"
									:headerSelectMultiple="'commodityCode'"
									v-model="inventoryItem.commodityGroupID"
									:addIcon="true"
									:handleAddIcon="BaseCommodityGroup.openModal"
								></base-combobox>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group ms-small-s">
								<base-combobox
									:options="optionUnitIn.optionUnit"
									:value="'unitCalculationID'"
									:header="'unitCalculationName'"
									:label="$t('module.inventory.unitCalculationName')"
									v-model="inventoryItem.unitCalculationID"
									v-model:textField="inventoryItem.unitCalculationName"
									:leftMessage="'90%'"
									:addIcon="true"
									:handleAddIcon="BaseUnit.openModal"
								></base-combobox>
							</div>
							<div class="form-group ms-small">
								<base-combobox
									:options="[
										{ value: DepreciatedTax.undefined, header: t('module.inventory.undefined') },
										{ value: DepreciatedTax.no_tax_reduction, header: t('module.inventory.no_tax_reduction') },
										{ value: DepreciatedTax.tax_reduction, header: t('module.inventory.tax_reduction') },
									]"
									:value="'value'"
									:header="'header'"
									:label="t('common.depreciatedTax')"
									:toolTip="t('common.depreciatedTaxStatus')"
									:disabled="true"
									v-model="inventoryItem.depreciatedTax"
								></base-combobox>
							</div>
							<div class="form-group ms-small info-input">
								<div class="info-input_icon"></div>
								<div class="info-input_text">
									{{ $t('common.depreciatedSearch') }}
								</div>
							</div>
						</div>
					</div>
					<base-image v-model="inventoryItem.avatar"></base-image>
				</div>
				<div class="divide-line"></div>
				<div class="form-detail">
					<div v-show="typeNature !== Nature.Service" class="form-item_input">
							<div class="form-group ms-small-s">
								<base-combobox
									:options="[
										{ value: `1 ${$t('calendar.month')}`, header: `1 ${$t('calendar.month')}` },
										{ value: `2 ${$t('calendar.month')}`, header: `2 ${$t('calendar.month')}` },
										{ value: `3 ${$t('calendar.month')}`, header: `3 ${$t('calendar.month')}` },
										{ value: `6 ${$t('calendar.month')}`, header: `6 ${$t('calendar.month')}` },
										{ value: `9 ${$t('calendar.month')}`, header: `9 ${$t('calendar.month')}` },
										{ value: `1 ${$t('calendar.year')}`, header: `1 ${$t('calendar.year')}` },
										{ value: `2 ${$t('calendar.year')}`, header: `2 ${$t('calendar.year')}` },
										{ value: `3 ${$t('calendar.year')}`, header: `3 ${$t('calendar.year')}` },
										{ value: `6 ${$t('calendar.year')}`, header: `6 ${$t('calendar.year')}` },
										{ value: `9 ${$t('calendar.year')}`, header: `9 ${$t('calendar.year')}` },
										{ value: `12 ${$t('calendar.year')}`, header: `12 ${$t('calendar.year')}` },
									]"
									:value="'value'"
									:header="'header'"
									:label="$t('module.inventory.warrantyPeriod')"
									v-model="inventoryItem.warrantyPeriod"
								></base-combobox>
							</div>
							<div class="form-group ms-small-s">
								<base-input
									:type="'text'"
									:label="$t('module.inventory.minimumStock')"
									:isNumber="true"
									v-model.number="inventoryItem.minimumStock"
								></base-input>
							</div>
							<div class="form-group ms-big ">
								<base-input
									:type="'text'"
									:label="$t('module.inventory.origin')"
									:maxLength="255"
									v-model="inventoryItem.origin"
								></base-input>
							</div>
						</div>
						<div v-show="typeNature !== Nature.Service" class="form-item_input">
							<div class="form-group">
								<label>{{ $t('common.description') }}</label>
								<textarea
									class="input"
									v-model="inventoryItem.description"
								></textarea>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group">
								<base-input
									:type="'text'"
									:label="$t('module.inventory.explanationBuy')"
									v-model="inventoryItem.explanationBuy"
								></base-input>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group">
								<base-input
									:type="'text'"
									:label="$t('module.inventory.explanationSell')"
									v-model="inventoryItem.explanationSell"
								></base-input>
							</div>
						</div>
				</div>
				<div class="form-hidden">
					<div class="form-hidden_container">
						<div class="form-hidden_container-item" :class="{active : isShowFormHidden}">
							<div @click="handleToggleShowFormHidden" class="form-hidden_item">
								<div class="form-hidden_icon"></div>
								<div class="form-hidden_text">
									{{ $t('module.inventory.implicit_information') }}
								</div>
							</div>
							<div class="form-hidden_content" :class="{ 'active-service' : typeNature === Nature.Service }">
								<div class="form-hidden_content-container" v-show="isShowFormHidden">
									<div class="form-item_input">
										<div class="form-group" style="display: none;"></div>
										<div v-show="typeNature !== Nature.Service" class="form-group">
											<base-combobox
												:widthLabelCode="'170px'"
												:widthOptionSelect="'450px'"
												:options="optionDepotIn.optionDepot"
												:value="'depotID'"
												:header="'depotName'"
												:label="$t('module.inventory.depot_impact')"
												:labelCode="$t('module.inventory.depotCode')"
												:labelName="$t('module.inventory.depotName')"
												:headerCode = "'depotCode'"
												v-model="inventoryItem.depotID"
												v-model:textField="inventoryItem.depotName"
												:addIcon="true"
												v-model:textCode="inventoryItem.depotCode"
												:handleAddIcon="BaseDepot.openModal"
											></base-combobox>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:maxLength="80"
												:label="$t('module.inventory.accountSale')"
												v-model="inventoryItem.accountSale"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.orderFix')"
												:isNumber="true"
												v-model.number="inventoryItem.orderFix"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.vatTax_info')"
												:toolTip="$t('module.inventory.vatTax')"
												:isNumber="true"
												:maxValue="100"
												v-model.number="inventoryItem.vatTax"
											></base-input>
										</div>
										<div v-show="typeNature !== Nature.Service" class="form-group ">
											<base-input
												:type="'text'"                          
												:maxLength="80"
												:label="$t('module.inventory.accountDepot')"
												v-model="inventoryItem.accountDepot"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.accountReturn')"
												:maxLength="80"
												v-model="inventoryItem.accountReturn"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.orderNearest')"
												:isNumber="true"
												v-model.number="inventoryItem.orderNearest"
											></base-input>
										</div>
										<div v-show="typeNature !== Nature.Service" class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.vatImport')"
												:isNumber="true"
												:maxValue="100"
												v-model.number="inventoryItem.vatImport"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:maxLength="80"
												:label="$t('module.inventory.accountRevenue')"
												v-model="inventoryItem.accountRevenue"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.accountCost')"
												:maxLength="80"
												v-model="inventoryItem.accountCost"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.orderSell')"
												:isNumber="true"
												v-model.number="inventoryItem.orderSell"
											></base-input>
										</div>
										<div v-show="typeNature !== Nature.Service" class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.vatExport')"
												:isNumber="true"
												:maxValue="100"
												v-model.number="inventoryItem.vatExport"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:maxLength="80"
												:label="$t('module.inventory.accountDiscount')"
												v-model="inventoryItem.accountDiscount"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.ratioDiscount')"
												:isNumber="true"
												:maxValue="100"
												v-model.number="inventoryItem.ratioDiscount"
											></base-input>
										</div>
										<div class="form-group">
											<base-input
												:type="'text'"
												:label="$t('module.inventory.vatGroupExciceTax')"
												v-model="inventoryItem.vatGroupExciceTax"
											></base-input>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="form-action">
				<div class="form-action_container">
          <div class="form-action_item">
            <button @click="handleSaveData(true)" style="margin-right: 9px" class="btn modal-icon up btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
              {{ $t('common.add_form') }}
            </button>
            <button @click="handleSaveData(false)" class="btn btn-success modal-icon up btn-form_cat-them" :content="$t('common.add_form_and_add') + ' (Ctrl + Shift +  S)'">
              {{ $t('common.add_form_and_add') }}
            </button>
          </div>
          <div class="form-action_item">
            <button @click="Base.closeModal" class="btn" :content="$t('common.cancel_form')">
              {{ $t('common.cancel_form') }}
            </button>
          </div>
        </div>
			</div>
			<button ref="focusLoop" class="focus-loop"></button>
		</div>
		<div v-show="!isShowFormMain" class="form">
			<div class="setting-header">
				<h1>{{ $t('module.inventory.select_nature') }}</h1>
				<div class="modal-close">
					<a href="/feature-built" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"></div>
				</div>
			</div>
			<div class="setting-container">
				<div @click="handleSelectNature(Nature.Goods)" class="setting-item item-goods">
					<div class="setting-icon"></div>
					<div class="setting-text">
						<div class="setting-text_title">{{ $t('module.inventory.goods') }}</div>
						<div class="setting-text_content">{{ $t('module.inventory.goods_info') }}</div>
					</div>
				</div>
				<div @click="handleSelectNature(Nature.Service)" class="setting-item item-service">
					<div class="setting-icon"></div>
					<div class="setting-text">
						<div class="setting-text_title">{{ $t('module.inventory.service') }}</div>
						<div class="setting-text_content">{{ $t('module.inventory.service_info') }}</div>
					</div>
				</div>
				<div @click="handleSelectNature(Nature.Materials)" class="setting-item item-materials">
					<div class="setting-icon"></div>
					<div class="setting-text">
						<div class="setting-text_title">{{ $t('module.inventory.materials') }}</div>
						<div class="setting-text_content">{{ $t('module.inventory.materials_info') }}</div>
					</div>
				</div>
				<div @click="handleSelectNature(Nature.FinishedProduct)" class="setting-item item-finished-product">
					<div class="setting-icon"></div>
					<div class="setting-text">
						<div class="setting-text_title">{{ $t('module.inventory.finished_product') }}</div>
						<div class="setting-text_content">{{ $t('module.inventory.finished_product_info') }}</div>
					</div>
				</div>
				<div @click="handleSelectNature(Nature.ToolTools)" class="setting-item item-tool-tools">
					<div class="setting-icon"></div>
					<div class="setting-text">
						<div class="setting-text_title">{{ $t('module.inventory.tool_tools') }}</div>
						<div class="setting-text_content">{{ $t('module.inventory.tool_tools_info') }}</div>
					</div>
				</div>
			</div>
		</div>
		<div @click="()=> {isShowFullModal = !isShowFullModal}" class="resize">
			<div class="resize-icon"></div>
		</div>
		<teleport to="#app">
			<base-modal-form v-if="BaseCommodityGroup.isShowModal">
				<form-commodity-group :Base="BaseCommodityGroup" :AddItem="AddCommodityGroup" :optionCommodityGroup="optionCommodityIn.optionCommodity"></form-commodity-group>
			</base-modal-form>
			<base-modal-form v-if="BaseUnit.isShowModal">
				<form-unit-calculation :Base="BaseUnit" :AddItem="AddUnit"></form-unit-calculation>
			</base-modal-form>
			<base-modal-form v-if="BaseDepot.isShowModal">
				<form-depot :Base="BaseDepot" :AddItem="AddDepot"></form-depot>
			</base-modal-form>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import CommodityGroupApi from '@/api/module/commodityGroup';
import DepotApi from '@/api/module/depot';
import UnitCalculationApi from '@/api/module/unitCalculation';
import { ActionTable, DepreciatedTax, InventoryItem, ENotificationType, Nature, Grid, ModuleName, ServiceResponse } from '@/core/public_api';
import { onUnmounted, onMounted, ref, onBeforeMount, defineAsyncComponent, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const FormUnitCalculation = defineAsyncComponent(()=> import('../unitCalculation/FormUnitCalculation.vue'));
const FormDepot = defineAsyncComponent(()=> import('../depot/FormDepot.vue'));
const FormCommodityGroup = defineAsyncComponent(()=> import('../commodityGroup/FormCommodityGroup.vue'));

const { t } = useI18n();

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
  typeNature: { default: null },
	optionUnitIn: { type: Object, required: true },
	optionDepotIn: { type: Object, required: true } ,
	optionCommodityIn: { type: Object, required: true },
  handleChangeNature: { type: Function, default: ()=> {} },
})
/** Dữ liệu dropdown đơn vị tính 
* Khắc Tiềm - 08.03.2023
*/
const apiUnit:UnitCalculationApi = new UnitCalculationApi();
const BaseUnit:Grid = reactive(new Grid(ModuleName.UnitCalculation, apiUnit));
BaseUnit.setStateForm(ActionTable.Add);
function AddUnit(item: any){
	props.optionUnitIn.addItem(item);
	inventoryItem.value.unitCalculationID = item.unitCalculationID;
	inventoryItem.value.unitCalculationName = item.unitCalculationName;
}

/** Dữ liệu dropdown kho 
 *  Khắc Tiềm - 08.03.2023
*/
const apiDepot:DepotApi = new DepotApi();
const BaseDepot:Grid = reactive(new Grid(ModuleName.Depot, apiDepot));
BaseDepot.setStateForm(ActionTable.Add);
function AddDepot(item: any){
	props.optionDepotIn.addItem(item);
	inventoryItem.value.depotID = item.depotID;
	inventoryItem.value.depotCode = item.depotCode;
	inventoryItem.value.depotName = item.depotName;
}

/** Dữ liệu dropdown nhóm vật tư hàng hoá 
 *  Khắc Tiềm - 08.03.2023
*/
const apiCommodityGroup:CommodityGroupApi = new CommodityGroupApi();
const BaseCommodityGroup:Grid = reactive(new Grid(ModuleName.CommodityGroup, apiCommodityGroup));
BaseCommodityGroup.setStateForm(ActionTable.Add);
function AddCommodityGroup(item: any){
	props.optionCommodityIn.addItem(item);
	inventoryItem.value.commodityGroupID = [...inventoryItem.value.commodityGroupID, item.commodityGroupID];
}

/**
 * Lắng nghe các sự thay đổi bật tắt modal để bật tắt sự kiện
 */
watch(BaseUnit, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});
watch(BaseCommodityGroup, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});
watch(BaseDepot, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});

/**
 * Lưu trạng thái hiển thị validate
 * NK Tiềm 08.03.2023
 */
const isValid = ref(false);

/** Biến lưu trạng thái gọi api có bị lỗi hay không
 *  Khắc Tiềm - 08.03.2023
 */
const errorApi = ref(false);

/** Biến lưu trạng thái mở full modal
 *  Khắc Tiềm - 08.03.2023
 */
const isShowFullModal = ref(false);

/** Biến lưu trạng thái mở form chính
 *  Khắc Tiềm - 08.03.2023
 */
const isShowFormMain = ref(false);

/**
 * Xử lý hiển thị form đang ẩn 
 * NK Tiềm 28/10/2022
 */
const isShowFormHidden = ref(false);
function handleToggleShowFormHidden(){
	isShowFormHidden.value = !isShowFormHidden.value;
}

/**
 * Khởi tạo đối tượng thêm sửa xoá và so sánh
 * Khắc Tiềm - 08.03.2023
 */
const inventoryItem = ref<InventoryItem>(new InventoryItem());
const inventoryItemComparison = ref<InventoryItem>(new InventoryItem());

/** 
 * Chuẩn bị dữ liệu trước khi mount
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(async () => {
	if(props.typeNature){
		inventoryItem.value.nature = props.typeNature;
		inventoryItemComparison.value.nature = props.typeNature;
		isShowFormMain.value = true;
	}
  if(props.Base.StateForm === ActionTable.Add){
    inventoryItem.value.inventoryItemCode = props.Base.RecordCode;
    inventoryItemComparison.value.inventoryItemCode = props.Base.RecordCode;
  }
  else{
    inventoryItem.value = {...props.Base.RecordEdit};
    inventoryItemComparison.value = {...props.Base.RecordEdit};
		await props.handleChangeNature(inventoryItem.value.nature);
		isShowFormMain.value = true;
  }
})

/** 
 * Hàm xử lý lưu dữ liệu
 * Khắc Tiềm - 08.03.2023
 */
async function handleSaveData(closeModal: any) {
  try {
    /** Kiểm tra validate */
    const messValid = validateInput();
    if (messValid.length > 0) {
      isValid.value = true;
      unListenEvent();
      props.Base.showNotificationError(messValid, ()=> { props.Base.focusInputError('form_inventoryitem_in'), listenEvent() });
    }
    else {
      if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication) {
        /** Nếu trạng thái form là thêm thì truyền api thêm */
        await callApiForm(props.Base.api.createRecordApi, props.Base.StateForm);
      } 
      else {
        /** nếu trạng thái form là sửa thì truyền api sửa */
        await callApiForm(props.Base.api.editRecordApi, props.Base.StateForm);
      }
      if (closeModal === true && errorApi.value === false) {
        /** Đóng form, không tiếp tục thêm  */
        props.Base.closeModal();
      } 
      else if (errorApi.value === false) {
        /** Nếu tiếp tục thêm thì reset dữ liệu, call mã mới và focus vào ô input */
        props.Base.setStateForm(ActionTable.Add);
        isValid.value = false;
        inventoryItem.value = new InventoryItem();
        inventoryItemComparison.value = new InventoryItem();
        await props.Base.apiService.callApi(props.Base.api.nextValue, null, (response: any) => { 
          inventoryItem.value.inventoryItemCode = response;
          inventoryItemComparison.value.inventoryItemCode = response;
        }, false );
        inputFocus.value.tagInput.focus(); 
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/** 
 * Hàm xử lý gọi api của một form thêm, sửa xoá
 * Khắc Tiềm - 08.03.2023
 */
const callApiForm = async (api: any, stateForm: string = '') => {
	if(props.typeNature === Nature.Service){
		inventoryItem.value.warrantyPeriod = "";
		inventoryItem.value.minimumStock = undefined;
		inventoryItem.value.origin = "";
		inventoryItem.value.description = "";
		inventoryItem.value.depotID = undefined;
		inventoryItem.value.depotName = "";
		inventoryItem.value.accountDepot = "";
		inventoryItem.value.vatImport = undefined;
		inventoryItem.value.vatExport = undefined;
	}
  errorApi.value = true;
  await props.Base.apiService.callApi(api, inventoryItem.value ,async (response: any) => { 
    if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication){
      props.Base.store.dispatch(`${props.Base.Module}/addRecordAction`, { ...inventoryItem.value, inventoryItemID: response });
    }
    else{
      props.Base.store.dispatch(`${props.Base.Module}/editRecordAction`, { ...inventoryItem.value, inventoryItemID: response });
      props.Base.setStateForm(ActionTable.Add);
    }
    errorApi.value = false;
    props.Base.addNotification(ENotificationType.Success, `${t(`common.${stateForm}`)} ${t(`common.success`)}`);
  },false , (res: ServiceResponse) => {
    props.Base.addNotificationCRUD(res.data.userMsg, 'module.inventory');
  });
}

/** 
 * Hàm validate input
 * Khắc Tiềm - 08.03.2023
 */
function validateInput() {
  return [
    /** Validate code */ 
    inventoryItem.value.inventoryItemCode.trim() === "" ? t('validate.empty', { field: t('module.inventory.inventoryItemCode') }) : null,
    /** Validate name */
    inventoryItem.value.inventoryItemName.trim() === "" ? t('validate.empty', { field: t('module.inventory.inventoryItemName') }) : null,
  ].filter((item) => { if(item){ return true; } });
}

/**
 * hàm xử lý chọn Tính chất
 * NK Tiềm 28/10/2022
 */
function handleSelectNature(Nature: any){
	try {
		if(Nature === false){
			isShowFormMain.value = false;
		}
		else{
			props.handleChangeNature(Nature);
			inventoryItem.value.nature = Nature;
			inventoryItemComparison.value.nature = Nature;
			isShowFormMain.value = true;
			setTimeout(()=>{inputFocus.value.tagInput.focus();},50)
		}
	} catch (e) {
		console.log(e);
	}
}

/**
 * Element input và các button ẩn đi bắt sự kiện focus vào tạo vòng lặp vào khi mở from
 * NK Tiềm 08.03.2023
 */
const inputFocus:any = ref(null);
const focusLoop:any = ref(null); 
const focusLoopTop:any = ref(null); 

/**
 * Hàm xử lý lặp khi tab focus
 * NK Tiềm 08.03.2023
 */
const handleLoopFocus = function () {
  inputFocus.value.tagInput.focus();
};

/** Xử lý hỏi lưu dữ liệu rồi mới đóng form */
const handleCloseModal = () => {
  try {
    if (JSON.stringify(inventoryItem.value) != JSON.stringify(inventoryItemComparison.value)) {
      unListenEvent();
      props.Base.showNotificationAction(saveDataAndCloseForm, props.Base.closeModal, t('common.question_data_change'), () => {
        listenEvent();
        handleLoopFocus();
      });
    } else {
      props.Base.closeModal();
    }
  } catch (e) {
    console.log(e);
  }
}

/** Call back truyền vào action hỏi (chạy khi người dùng bấm đồng ý) */
const saveDataAndCloseForm = () => {
  handleSaveData(true);
}

/** Lắng nghe các sử kiện */
const listenEvent = () => {
	window.addEventListener("keydown", handleKey);
  window.addEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
}

/** Bỏ lắng nghe */
const unListenEvent = () => {
	window.removeEventListener("keydown", handleKey);
	window.removeEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
}

/**
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
  props.Base.handleEventFormCtrlShiftS(event, handleCloseModal, null, handleSaveData, false, handleSaveData, true)
	props.Base.handleEventF1(event, () => {
    window.open('/feature-built');
  })
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onMounted(() => {
	focusLoop.value.addEventListener("focus", handleLoopFocus);
	focusLoopTop.value.addEventListener("focus", handleLoopFocus);
  listenEvent();
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("focus", handleLoopFocus);
  unListenEvent();
})
</script>

<style scoped>
@import "../../../../assets/css/formRight.css";

::-webkit-scrollbar-track {
	border-radius: 0;
	direction: rtl;
}

::-webkit-scrollbar-thumb {
	border-radius: 0;
	background: #B8BCC3;
}
::-webkit-scrollbar-thumb:hover {
	border-radius: 0;
	background: #808080;
}
::-webkit-scrollbar {
	height: 10px; /* height of horizontal scrollbar ← You're missing this */
	width: 8px;
}
.modal-body {
  width: 800px;
  height: 100%;
  margin: 0;
  left: calc(100%);
  top: 0;
  transform: none;
  padding: 0 16px;
  position: relative;
  transition: all ease 0.15s;
}
</style>
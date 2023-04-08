<template>
	<div class="modal-body">
    <div class="form form_depot_in">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ Base.StateForm === ActionTable.Add ? $t('common.add_record', {module: $t(`module.inventory.${ModuleName.Depot}_small`) }) 
          : Base.StateForm === ActionTable.Replication ? $t('common.replication_record', {module: $t(`module.inventory.${ModuleName.Depot}_small`) }) 
          : $t('common.edit_record', {module: $t(`module.inventory.${ModuleName.Depot}_small`) }) }}</h2>
        </div>
        <div class="modal-close">
          <a href="/feature-built" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
          ></div>
        </div>
      </div>
      <div class="form-container">
        <div class="form-item_input">
          <button ref="focusLoopTop" class="focus-loop"></button>
          <div class="form-group ms-small">
            <base-input
              :focus="true"
              :required="true"
              :type="'text'"
              :maxLength="20"
              :messageValid="t('validate.empty', { field: t('module.inventory.depotCode') })"
              :label="$t('common.id')" 
              v-model="depot.depotCode"
              :class="{ 'is-valid': isValid && depot.depotCode == '' }"
              ref="inputFocus"
            ></base-input>
          </div>
          <div class="form-group ms-big">
            <base-input
              :required="true"
              :type="'text'"
              :maxLength="255"
              :messageValid="t('validate.empty', { field: t('module.inventory.depotName') })"
              :label="$t('common.name')"
              v-model="depot.depotName"
              :class="{ 'is-valid': isValid && depot.depotName == '' }"
            ></base-input>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('common.delivery') }}</label>
          <textarea
            class="input"
            v-model="depot.depotDelivery"
          ></textarea>
        </div>
      </div>
      <div class="form-action">
        <div class="form-action_container">
          <div class="form-action_item">
            <button @click="handleSaveData(true)" style="margin-right: 9px" class="btn modal-icon btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
              {{ $t('common.add_form') }}
            </button>
            <button @click="handleSaveData(false)" class="btn btn-success modal-icon btn-form_cat-them" :content="$t('common.add_form_and_add') + ' (Ctrl + Shift +  S)'">
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
  </div>
</template>

<script setup lang="ts">
import { ActionTable, Depot, ENotificationType, Grid, ModuleName, ServiceResponse } from '@/core/public_api';
import { onUnmounted, onMounted, ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
  AddItem: { type: Function, default: () => {} },
})

/**
 * Lưu trạng thái hiển thị validate
 * NK Tiềm 08.03.2023
 */
const isValid = ref(false);

/** Biến lưu trạng thái gọi api có bị lỗi hay không
 *  Khắc Tiềm - 08.03.2023
 */
const errorApi = ref(false);

/**
 * Khởi tạo đối tượng thêm sửa xoá và so sánh
 * Khắc Tiềm - 08.03.2023
 */
const depot = ref<Depot>(new Depot());
const depotComparison = ref<Depot>(new Depot());

/** 
 * Chuẩn bị dữ liệu trước khi mount
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
  if(props.Base.StateForm === ActionTable.Edit || props.Base.StateForm === ActionTable.Replication){
    depot.value = {...props.Base.RecordEdit};
    depotComparison.value = {...props.Base.RecordEdit};
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
      props.Base.showNotificationError(messValid, ()=> { props.Base.focusInputError('form_depot_in'), listenEvent() });
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
        /** Nếu tiếp tục thêm thì reset dữ liệu, focus vào ô input */
        props.Base.setStateForm(ActionTable.Add);
        isValid.value = false;
        depot.value = new Depot();
        depotComparison.value = new Depot();
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
  errorApi.value = true;
  await props.Base.apiService.callApi(api, depot.value ,async (response: any) => { 
    if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication){
      props.Base.store.dispatch(`${props.Base.Module}/addRecordAction`, { ...depot.value, depotID: response });
      props.AddItem({ ...depot.value, depotID: response });
    }
    else{
      props.Base.store.dispatch(`${props.Base.Module}/editRecordAction`, { ...depot.value, depotID: response });
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
    depot.value.depotCode.trim() === "" ? t('validate.empty', { field: t('module.inventory.depotCode') }) : null,
    /** Validate name */
    depot.value.depotName.trim() === "" ? t('validate.empty', { field: t('module.inventory.depotName') }) : null,

  ].filter((item) => { if(item){ return true; } });
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
    if (JSON.stringify(depot.value) != JSON.stringify(depotComparison.value)) {
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
.modal-body {
  max-width: 500px !important;
  width: 500px !important;
  left: calc(50vw - 250px) !important;
  height: auto !important;
  top: 50vh !important;
  transform: translateY(-50%) !important;
  padding: 0 !important;
}
textarea{
  resize: none;
  display: block;
  padding: 9px;
  font-size: 13px;
  width: 100%;
  height: 100%;
}
</style>
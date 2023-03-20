<template>
	<div class="modal-body">
    <div class="form">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ Base.StateForm === ActionTable.Add ? $t('common.add_record', {module: $t(`module.cash.${ModuleName.Employee}_small`) }) 
          : Base.StateForm === ActionTable.Replication ? $t('common.replication_record', {module: $t(`module.cash.${ModuleName.Employee}_small`) }) 
          : $t('common.edit_record', {module: $t(`module.cash.${ModuleName.Employee}_small`) }) }}</h2>
          <div class="form-header_checkbox">
            <div class="check form-checkbox_item">
              <base-checkbox
                :true-value="true"
                :false-value="false"
                v-model="employee.isCustomer"
              >
                <div class="info-checkbox">{{ $t('module.cash.isCustomer') }}</div>
              </base-checkbox>
            </div>
            <div class="check form-checkbox_item">
              <base-checkbox
                :true-value="true"
                :false-value="false"
                v-model="employee.isVendor"
              >
                <div class="info-checkbox">{{ $t('module.cash.isVendor') }}</div>
              </base-checkbox>
            </div>
          </div>
        </div>
        <div class="modal-close">
          <a href="/" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
          ></div>
        </div>
      </div>
      <div class="form-container">
        <div class="form-detail flex-center">
          <div class="form-item">
            <div class="form-item_input">
              <button ref="focusLoopTop" class="focus-loop"></button>
              <div class="form-group ms-small">
                <base-input
                  :focus="true"
                  :required="true"
                  :type="'text'"
                  :maxLength="20"
                  :messageValid="t('validate.empty', { field: t('module.cash.employeeCode') })"
                  :label="$t('common.id')" 
                  v-model="employee.employeeCode"
                  :class="{ 'is-valid': isValid && employee.employeeCode == '' }"
                  ref="inputFocus"
                ></base-input>
              </div>
              <div class="form-group ms-big">
                <base-input
                  :required="true"
                  :type="'text'"
                  :maxLength="80"
                  :messageValid="t('validate.empty', { field: t('module.cash.employeeName') })"
                  :label="$t('common.name')"
                  v-model="employee.employeeName"
                  :class="{ 'is-valid': isValid && employee.employeeName == '' }"
                ></base-input>
              </div>
            </div>
            <div class="form-group">
              <base-combobox
                :options="optionBranch"
                :value="'branchID'"
                :header="'branchName'"
                :label="$t('module.cash.branch')"
                :labelCode="$t('module.cash.branchCode')"
                :labelName="$t('module.cash.branchName')"
                :required="true"
                :headerCode = "'branchCode'"
                v-model:textField="employee.branchName"
                :messageValid="t('validate.empty_data_cbx', { field: t('module.cash.branchName') })"
                v-model="employee.branchID"
                :class="{ 'is-valid': isValid && !employee.branchID }"
              ></base-combobox>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.employeeTitle')"
                v-model="employee.employeeTitle"
              ></base-input>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item_input">
              <div class="form-group ms-small">
                <base-calendar
                  :label="$t('common.dateOfBirth')"
                  :maxDate="new Date()"
                  :messageValid="t('validate.max_date_now', { field: t('common.dateOfBirth') })"
                  v-model="employee.dateOfBirth"
                >
                </base-calendar>
              </div>
              <div style="padding-left: 16px" class="form-group ms-big">
                <label>{{ $t('common.gender') }}</label>
                <div class="base-radio_item">
                  <base-radio
                    :label="$t('gender.male')"
                    :value="Gender.Male"
                    v-model.number="employee.gender"
                  ></base-radio>
                  <base-radio
                    :label="$t('gender.female')"
                    :value="Gender.Female"
                    v-model.number="employee.gender"
                  ></base-radio>
                  <base-radio
                    :label="$t('gender.other')"
                    :value="Gender.Other"
                    v-model.number="employee.gender"
                  ></base-radio>
                </div>
              </div>
            </div>
            <div class="form-item_input">
              <div class="form-group ms-big">
                <base-input
                  :type="'text'"
                  :label="$t('module.cash.identityCard_small')"
                  :toolTip="$t('module.cash.identityCard')"
                  v-model="employee.identityCard"
                ></base-input>
              </div>
              <div class="form-group ms-small">
                <base-calendar
                  :label="$t('module.cash.dayForIdentity_small')"
                  :maxDate="new Date()"
                  :messageValid="t('validate.max_date_now', { field: t('module.cash.dayForIdentity') })"
                  v-model="employee.dayForIdentity"
                >
                </base-calendar>
              </div>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.grantAddressIdentity_small')"
                v-model="employee.grantAddressIdentity"
              ></base-input>
            </div>
          </div>
        </div>
        <div class="form-detail">
          <div class="form-group">
            <base-input
              :type="'text'"
              :label="$t('common.address')"
              v-model="employee.employeeAddress"
            ></base-input>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.phoneNumber_small')"
                :toolTip="$t('module.cash.phoneNumber')"
                :isPhone="true"
                :messageValid="t('validate.malformed', { field: t('common.phoneNumber') })"
                v-model="employee.phoneNumber"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.fixed_phone_small')"
                :toolTip="$t('module.cash.fixed_phone')"
                :isPhone="true"
                :messageValid="t('validate.malformed', { field: t('module.cash.landlinePhone') })"
                v-model="employee.landlinePhone"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('common.email')"
                :isEmail="true"
                :messageValid="t('validate.malformed', { field: t('module.cash.employeeEmail') })"
                v-model="employee.employeeEmail"
              ></base-input>
            </div>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.bankAccount')"
                v-model="employee.bankAccount"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.nameBank')"
                v-model="employee.nameBank"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="$t('module.cash.branchBank_small')"
                v-model="employee.branchBank"
              ></base-input>
            </div>
          </div>
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
import { BaseInput, BaseCalendar, BaseCombobox, BaseCheckbox, BaseRadio } from '@/core/public_component';
import { ActionTable, Employee, ENotificationType, Gender, Grid, ModuleName } from '@/core/public_api';
import { onUnmounted, onMounted, ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
  optionBranch: { type: Array, required: true },
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
const employee = ref<Employee>(new Employee());
const employeeComparison = ref<Employee>(new Employee());

/** 
 * Chuẩn bị dữ liệu trước khi mount
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
  if(props.Base.StateForm === ActionTable.Add){
    employee.value.employeeCode = props.Base.RecordCode;
    employeeComparison.value.employeeCode = props.Base.RecordCode;
  }
  else if(props.Base.StateForm === ActionTable.Edit){
    employee.value = {...props.Base.RecordEdit};
    employeeComparison.value = {...props.Base.RecordEdit};
  }
  else{
    employee.value = {...props.Base.RecordEdit};
    employee.value.employeeCode = props.Base.RecordCode;
    employeeComparison.value = {...props.Base.RecordEdit};
    employeeComparison.value.employeeCode = props.Base.RecordCode;
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
      props.Base.showNotificationError(messValid, ()=> { props.Base.focusInputError(), listenEvent() });
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
        employee.value = new Employee();
        employeeComparison.value = new Employee();
        await props.Base.apiService.callApi(props.Base.api.nextValue, null, (response: any) => { 
          employee.value.employeeCode = response;
          employeeComparison.value.employeeCode = response;
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
  errorApi.value = true;
  await props.Base.apiService.callApi(api, employee.value ,async (response: any) => { 
    if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication){
      props.Base.store.dispatch(`${props.Base.Module}/addRecordAction`, { ...employee.value, employeeID: response });
    }
    else{
      props.Base.store.dispatch(`${props.Base.Module}/editRecordAction`, { ...employee.value, employeeID: response });
      props.Base.setStateForm(ActionTable.Add);
    }
    errorApi.value = false;
    props.Base.addNotification(ENotificationType.Success, `${t(`common.${stateForm}`)} ${t(`common.success`)}`);
  },false );
}

/** 
 * Hàm validate input
 * Khắc Tiềm - 08.03.2023
 */
function validateInput() {
  return [
    /** Validate code */ 
    employee.value.employeeCode.trim() === "" ? t('validate.empty', { field: t('module.cash.employeeCode') }) : null,
    /** Validate name */
    employee.value.employeeName.trim() === "" ? t('validate.empty', { field: t('module.cash.employeeName') }) : null,
    /** Validate branch */
    !employee.value.branchID ? t('validate.empty_data_cbx', { field: t('module.cash.branchName') }) : null, 
    /** Validate dateOfBirth */
    employee.value.dateOfBirth ? new Date(employee.value.dateOfBirth) > new Date() 
      ? t('validate.max_date_now', { field: t('common.dateOfBirth') }) : null : null,
    /** Validate dayForIdentity */ 
    employee.value.dayForIdentity ? new Date(employee.value.dayForIdentity) > new Date() 
      ? t('validate.max_date_now', { field: t('module.cash.dayForIdentity') }) : null : null,
    /** Validate PhoneNumber */
    props.Base.validatePhone(employee.value.phoneNumber) === false && employee.value.phoneNumber != "" && employee.value.phoneNumber 
      ? t('validate.malformed', { field: t('common.phoneNumber') }) : null,
    /** Validate landlinePhone */
    props.Base.validatePhone(employee.value.landlinePhone) === false && employee.value.landlinePhone != "" && employee.value.landlinePhone
      ? t('validate.malformed', { field: t('module.cash.landlinePhone') }) : null,
    /** Validate employeeEmail */
    props.Base.validateEmail(employee.value.employeeEmail) === false && employee.value.employeeEmail != "" && employee.value.employeeEmail
      ? t('validate.malformed', { field: t('module.cash.employeeEmail') }) : null,
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
    if (JSON.stringify(employee.value) != JSON.stringify(employeeComparison.value)) {
      unListenEvent();
      props.Base.showNotificationAction(saveDataAndCloseForm, props.Base.closeModal, t('common.question_data_change'), listenEvent);
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
    window.open('/');
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
  max-width: 900px;
  width: 900px;
  left: calc(50vw - 450px);
}
</style>
<template>
	<div class="modal-body">
    <div class="form">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ $t('module.cash.add_employee') }}</h2>
          <div class="form-header_checkbox">
            <div class="check form-checkbox_item">
              <base-checkbox
                :true-value="true"
                :false-value="false"
                v-model="employee.isCustomer"
              >
                <div class="info-checkbox">Là khách hàng</div>
              </base-checkbox>
            </div>
            <div class="check form-checkbox_item">
              <base-checkbox
                :true-value="true"
                :false-value="false"
                v-model="employee.isVendor"
              >
                <div class="info-checkbox">Là nhà cung cấp</div>
              </base-checkbox>
            </div>
          </div>
        </div>
        <div class="modal-close">
          <div class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></div>
          <div @click="Base.closeModal" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
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
                  :messageValid="''"
                  :label="'Mã'" 
                  v-model="employee.employeeCode"
                  ref="inputFocus"
                ></base-input>
                  <!-- :class="{ 'is-valid': isValid && employee.employeeCode == '' }" -->
              </div>
              <div class="form-group ms-big">
                <base-input
                  :required="true"
                  :type="'text'"
                  :maxLength="80"
                  :messageValid="''"
                  :label="'Tên'"
                  v-model="employee.employeeName"
                ></base-input>
                  <!-- :class="{ 'is-valid': isValid && employee.employeeName == '' }" -->
              </div>
            </div>
            <div class="form-group">
              <base-combobox
                :options="[]"
                :value="'unitID'"
                :header="'unitName'"
                :label="'Đơn vị'"
                :labelCode="'Mã đơn vị'"
                :labelName="'Tên đơn vị'"
                :required="true"
                :headerCode = "'unitCode'"
                v-model:textField="employee.branchName"
                :messageValid="''"
                v-model="employee.branchID"
              ></base-combobox>
                <!-- :class="{ 'is-valid': isValid && !employee.branchID }" -->
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Chức danh'"
                v-model="employee.employeeTitle"
              ></base-input>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item_input">
              <div class="form-group ms-small">
                <base-calendar
                  :label="'Ngày sinh'"
                  :maxDate="new Date()"
                  :messageValid="''"
                  v-model="employee.dateOfBirth"
                >
                </base-calendar>
              </div>
              <div style="padding-left: 16px" class="form-group ms-big">
                <label>Giới tính</label>
                <div class="base-radio_item">
                  <base-radio
                    label="Nam"
                    :value="Gender.Male"
                    v-model.number="employee.gender"
                  ></base-radio>
                  <base-radio
                    label="Nữ"
                    :value="Gender.Female"
                    v-model.number="employee.gender"
                  ></base-radio>
                  <base-radio
                    label="Khác"
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
                  :label="'Số CMND'"
                  :toolTip="'Số chứng minh nhân dân'"
                  v-model="employee.identityCard"
                ></base-input>
              </div>
              <div class="form-group ms-small">
                <base-calendar
                  :label="'Ngày cấp'"
                  :maxDate="new Date()"
                  :messageValid="''"
                  v-model="employee.dayForIdentity"
                >
                </base-calendar>
              </div>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Nơi cấp'"
                v-model="employee.grantAddressIdentity"
              ></base-input>
            </div>
          </div>
        </div>
        <div class="form-detail">
          <div class="form-group">
            <base-input
              :type="'text'"
              :label="'Địa chỉ'"
              v-model="employee.employeeAddress"
            ></base-input>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'ĐT di động'"
                :toolTip="'Điện thoại di động'"
                :isPhone="true"
                :messageValid="''"
                v-model="employee.phoneNumber"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'ĐT cố định'"
                :isPhone="true"
                :toolTip="'Điện thoại cố định'"
                :messageValid="''"
                v-model="employee.landlinePhone"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Email'"
                :isEmail="true"
                :messageValid="''"
                v-model="employee.employeeEmail"
              ></base-input>
            </div>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Tài khoản ngân hàng'"
                v-model="employee.bankAccount"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Tên ngân hàng'"
                v-model="employee.nameBank"
              ></base-input>
            </div>
            <div class="form-group">
              <base-input
                :type="'text'"
                :label="'Chi nhánh'"
                v-model="employee.branchBank"
              ></base-input>
            </div>
          </div>
        </div>
      </div>
      <div class="form-action">
        <div class="form-action_container">
          <div class="form-action_item">
            <button style="margin-right: 9px" class="btn modal-icon btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
              {{ $t('common.add_form') }}
            </button>
            <button class="btn btn-success modal-icon btn-form_cat-them" :content="$t('common.add_form_and_add') + ' (Ctrl + Shift +  S)'">
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
import { ActionTable, Employee, Gender, Grid } from '@/core/public_api';
import { reactive, defineProps, onUnmounted, onMounted, ref, onBeforeMount } from 'vue';

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
})

/**
 * Khởi tạo đối tượng thêm sửa xoá
 * Khắc Tiềm - 08.03.2023
 */
let employee: Employee = reactive(new Employee());

onBeforeMount(() => {
  if(props.Base.StateForm === ActionTable.Add){
    employee.employeeCode = props.Base.RecordCode;
  }
  else if(props.Base.StateForm === ActionTable.Edit){
    employee = reactive({...props.Base.RecordEdit});
  }
  else{
    employee = reactive({...props.Base.RecordEdit});
    employee.employeeCode = props.Base.RecordCode;
  }
})

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

/**
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
  props.Base.handleEventFormCtrlShiftS(event, props.Base.closeModal, null, () => {
    console.log('save ctrl shift s');
  }, false, () => {
    console.log('save ctrl s');
  }, true)
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
 onMounted(() => {
	focusLoop.value.addEventListener("focus", handleLoopFocus);
	focusLoopTop.value.addEventListener("focus", handleLoopFocus);
	window.addEventListener("keydown", handleKey);
  window.addEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("focus", handleLoopFocus);
	window.removeEventListener("keydown", handleKey);
	window.removeEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
})
</script>

<style scoped>
.modal-body {
  max-width: 900px;
  width: 900px;
  left: calc(50vw - 450px);
}
</style>
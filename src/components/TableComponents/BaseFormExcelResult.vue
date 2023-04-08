<template>
  <div class="modal-body">
    <div class="form">
      <div class="form-container">
        <div class="container-table">
          <div class="table-function sticky">
            <div class="modal-title">
              <h2>{{ $t('common.import_result_from_file') }}</h2>
            </div>
            <div class="modal-close">
              <base-combobox
                class="cbx"
                :options="[
                  { value: 0, header: $t('common.all_record', {record: Base.resultExcel.listFail.length + Base.resultExcel.listPass.length}) },
                  { value: 1, header: $t('common.illegal_record', {record: Base.resultExcel.listFail.length}) },
                  { value: 2, header: $t('common.valid_record', {record: Base.resultExcel.listPass.length}) },
                ]"
                :disabled="true"
                :value="'value'"
                :header="'header'"
                v-model="filterRecord"
              ></base-combobox>
              <div @click="Base.closeResultExcel()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
              ></div>
            </div>
          </div>
          <base-table :BaseComponent="BaseComponent">
          </base-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Grid, Header, KeyCode } from '@/core/public_api';
import { onMounted, onUnmounted, ref, watch } from 'vue';

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
  ModuleI18n: { type: String, required: true },
})

/**
 * option tìm kiếm
 */
const filterRecord = ref(0);

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
const columns: Header [] = [
  new Header(
    "lineExcel",
    "",
    'common.line_number',
    "100",
  ),
  new Header(
    "statusImportExcel",
    "",
    'common.status',
    "150",
  ),
  new Header(
    "errorDetail",
    "",
    'common.detailed_error',
    "300",
  ),
  ...props.Base.columns,
];

/** SetFormat */
columns.forEach((item: Header, index)=> {
  if(item.Field === 'lineExcel'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FixFirstColumn = true;
  }
  else if(item.Field === 'statusImportExcel'){
    columns[index].TypeFormat.FormatServiceResponseI18n = true;
  }
  else if(item.Field === 'errorDetail'){
    columns[index].TypeFormat.FormatServiceResponseI18n = true;
  }
})

/**
 * Khởi tạo Base truyền vào table
 * Khắc Tiềm - 08.03.2023
 */
const BaseComponent = ref(
  {
    OptionCheck : false,
    ModuleI18n: props.ModuleI18n,
    columns: columns.filter((item: Header) => {
      return item.Field !== 'avatar' && (item.FieldSelect.split('.')[0].toLowerCase() === props.Base.Module.toLowerCase() || item.Field.slice(-4) === 'Code' || item.Field === 'lineExcel' || item.Field === 'statusImportExcel' || item.Field === 'errorDetail' || item.Field === 'unitCalculationName');
    }),
    recordList: [...props.Base.resultExcel.listFail, ...props.Base.resultExcel.listPass],
    actionTable: props.Base.actionTable,
    hideAction: true,
    hideFilter: true,
    lineClamp: props.Base.lineClamp,
    formatServiceResponse: props.Base.formatServiceResponse,
    columnFix: columns.map((item: Header, index: number) => {
      if(index === 0){
        return {
          Width: 16,
        };
      }
    })
  }
);

/**
 * Xử lý chuyển option lọc
 * Khắc Tiềm - 08.03.2023
 */
watch(filterRecord, (newValue: any) => {
  // Chọn tất cả
  if(newValue === 0){
    BaseComponent.value.recordList = [...props.Base.resultExcel.listFail, ...props.Base.resultExcel.listPass];
  }
  // Chọn không hợp lệ
  else if(newValue === 1){
    BaseComponent.value.recordList = [...props.Base.resultExcel.listFail];
  }
  // Hợp lệ
  else{
    BaseComponent.value.recordList = [...props.Base.resultExcel.listPass];
  }
})

/**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
const handleEventKey = function (event: any) {
  if (event.keyCode === KeyCode.Esc) {
    props.Base.closeResultExcel();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEventKey);
});

onUnmounted(() => {
  props.Base.setResultExcel();
  window.removeEventListener("keydown", handleEventKey);
})
</script>

<style scoped>
@import "../../assets/css/crud.css";
/* Phần header table */
::-webkit-scrollbar-track {
  margin-bottom: 0 !important;
}
.modal-body {
  max-width: calc(100% - 40px); 
  width: calc(100% - 40px); 
  left: 20px; 
  margin: 0 !important;
  height: 90vh;
}
.modal-title{
  padding: 8px 12px 15px 25px !important;
}
h2{
  font-family: 'notosans-bold' !important;
}
.form-container,.form,.container-table{
  height: 100%;
}
.form-container{
  padding: 0 0 !important;
}
.container-table{
  padding: 5px 5px 10px 5px !important;
  overflow: unset !important;
}
.table-content{
  height: calc(100%);
}
.table-function.sticky{
  padding: 0 0 !important;
}
.table-scroll{
  padding: 0 0 !important;
}
.modal-icon{
  margin-left: 40px;
}
.cbx{
  margin-top: 15px;
}
</style>
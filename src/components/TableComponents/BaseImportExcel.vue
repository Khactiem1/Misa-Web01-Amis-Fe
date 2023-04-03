<template>
<div class="modal-body modal-body_import">
  <div class="form">
    <div class="form-header">
      <div class="modal-title">
        <h2>
          {{ $t('common.import') }}
        </h2>
      </div>
      <div class="modal-close">
        <div @click="closeFormExcel();" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
        ></div>
      </div>
    </div>
    <div class="form-container">
      <button ref="focusLoopTop" class="focus-loop"></button>
      <span class="ex-select">{{ $t('common.file_size_max') }} {{ Base.calcFile(Base.fileSizeMax) }}</span>
      <div style="position: relative;">
        <input ref="inputFocus" style="opacity: 0;" accept=".xlsx" name="file" id="fileExcel" @change="Base.choseExcel($event)" type="file">
        <label class="input" style="display: flex; align-items: center; " for="fileExcel"
        :class="{ 'dragover': isDragOver }" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
          {{ isDragOver ? $t('common.drag_file_in') : Base.fileNameExcel && Base.fileNameExcel !== '' ? `${Base.fileNameExcel} (${Base.fileSize})` : $t('common.select_file') }}
        </label>
        <i @click="Base.removeFileExcel()" class="remove-file" v-if="Base.fileNameExcel && Base.fileNameExcel">x</i>
      </div>
    </div>
    <div class="form-action">
      <div class="form-action_container">
        <div class="form-action_item">
          <button @click="Base.uploadExcel()" class="btn btn-success modal-icon btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
            {{ $t('common.add_form') }}
          </button>
        </div>
        <div class="form-action_item">
          <button @click="closeFormExcel();" class="btn" :content="$t('common.cancel_form')">
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
import { ENotificationType, Grid } from '@/core/public_api';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
})

/**
 * Trạng thái kéo thả
 * Khắc Tiềm - 08.03.2023
 */
const isDragOver = ref(false)

/**
 * Trạng thái đang kéo
 * Khắc Tiềm - 08.03.2023
 */
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

/**
 * Trạng thái thả
 * Khắc Tiềm - 08.03.2023
 */
const onDragLeave = () => {
  isDragOver.value = false
}

/**
 * Thả nhận file
 * Khắc Tiềm - 08.03.2023
 */
const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    if(file.name.split('.').pop() === 'xlsx'){
      props.Base.choseExcel(file);
    }
    else{
      props.Base.addNotification(ENotificationType.Error, t('common.please_choose_excel'));
    }
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
 * Hàm đóng form
 * NK Tiềm 08.03.2023
 */
const closeFormExcel = () => {
  props.Base.removeFileExcel();
  props.Base.closeDialog();
}

/**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
const handleEventKey = function (event: any) {
  props.Base.handleEventFormCtrlShiftS(event, closeFormExcel, null, ()=> {}, null, props.Base.uploadExcel, null)
};

/**
 * Hàm xử lý lặp khi tab focus
 * NK Tiềm 08.03.2023
 */
 const handleLoopFocus = function () {
  inputFocus.value.focus();
};

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
 onMounted(() => {
	focusLoop.value.addEventListener("focus", handleLoopFocus);
	focusLoopTop.value.addEventListener("focus", handleLoopFocus);
  window.addEventListener("keydown", handleEventKey);
  setTimeout(() => {
    inputFocus.value.focus(); 
  }, 100);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("focus", handleLoopFocus);
  window.removeEventListener("keydown", handleEventKey);
})

</script>

<style scoped>
.modal-body_import {
  max-width: 500px !important;
  width: 500px !important;
  left: calc(50vw - 250px) !important;
}

.modal-title {
  padding: 20px 12px 6px 32px !important;
}

#fileExcel:focus ~ label.input{
  border: dashed 1px var(--primary__color);
}

.form-container{
  position: relative;
}

#fileExcel{
  position: absolute;
}

.modal-title h2{
  font-size: 20px !important;
}
label.input{
  height: 46px;
  border: dashed 1px var(--border__input);
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-family: "notosans-italic";
  color: var(--border__input);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
label.input.dragover{
  background-color: #505050;
  color: var(--while__color);
}
.remove-file{
  cursor: pointer;
  position: absolute;
  font-family: "notosans-italic";
  color: var(--border__input);
  top: 0;
  right: 0;
  padding: 0 6px;
}
.ex-select{
  color: #757575;
  display: block;
  margin-bottom: 8px;
}
</style>
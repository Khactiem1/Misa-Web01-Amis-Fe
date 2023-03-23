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
        <div @click="Base.closeDialog()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
        ></div>
      </div>
    </div>
    <div class="form-container">
      <button ref="focusLoopTop" class="focus-loop"></button>
      <div>
        <input ref="inputFocus" style="opacity: 0;" accept=".xlsx" name="file" id="fileExcel" @change="Base.choseExcel($event)" type="file">
        <label class="input" style="display: flex; align-items: center; " for="fileExcel">
          <i class="i excel"></i>
          <span>
            {{ Base.fileNameExcel && Base.fileNameExcel !== '' ? Base.fileNameExcel : $t('common.select_file') }}
          </span>
        </label>
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
          <button @click="Base.closeDialog()" class="btn" :content="$t('common.cancel_form')">
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
import { Grid } from '@/core/public_api';
import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
 const props = defineProps({
  Base: { type: Grid, required: true },
})

/**
 * Element input và các button ẩn đi bắt sự kiện focus vào tạo vòng lặp vào khi mở from
 * NK Tiềm 08.03.2023
 */
const inputFocus:any = ref(null);
const focusLoop:any = ref(null); 
const focusLoopTop:any = ref(null); 

/**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
const handleEventKey = function (event: any) {
  props.Base.handleEventFormCtrlShiftS(event, props.Base.closeDialog, null, ()=> {}, null, props.Base.uploadExcel, null)
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

#fileExcel:focus ~ label.input{
  border: solid 1px var(--primary__color);
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
</style>
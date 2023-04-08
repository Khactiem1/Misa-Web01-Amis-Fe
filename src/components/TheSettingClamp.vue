<template>
<div class="modal-body modal-body_import">
  <div class="form">
    <div class="form-header">
      <div class="modal-title">
        <h2>
          {{ $t('ui.setting_display') }}
        </h2>
      </div>
      <div class="modal-close">
        <div @click="close();" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
        ></div>
      </div>
    </div>
    <div class="form-container">
      <span class="title">{{ $t('ui.ques_setting_clamp') }}</span>
      <div class="base-radio_item">
        <base-radio
          :label="`1 ${$t('ui.line')}`"
          :value="'hidden-space_1'"
          v-model="lineClampModel"
        ></base-radio>
        <base-radio
          :label="`2 ${$t('ui.line')}`"
          :value="'hidden-space_2'"
          v-model="lineClampModel"
        ></base-radio>
        <base-radio
          :label="`3 ${$t('ui.line')}`"
          :value="'hidden-space_3'"
          v-model="lineClampModel"
        ></base-radio>
        <base-radio
          :label="`${$t('ui.unlimited')}`"
          :value="''"
          v-model="lineClampModel"
        ></base-radio>
      </div>
    </div>
    <div class="form-action">
      <div class="form-action_container">
        <div class="form-action_item">
          <button @click="save()" class="btn btn-success ">
            {{ $t('common.add_form') }}
          </button>
        </div>
        <div class="form-action_item">
          <button @click="close();" class="btn" :content="$t('common.cancel_form')">
            {{ $t('common.cancel_form') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { EntitySystem, KeyCode, StorageService } from '@/core/public_api';
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted, ref } from 'vue';
const store = useStore();
const props = defineProps({
  close: {type: Function , required: true },
})
/** chế độ ẩn dòng khi xuống dòng của table */
const lineClamp:any = computed(() => store.state.config.lineClamp);

/** chế độ ẩn dòng khi xuống dòng của table giá trị v-model */
const lineClampModel: any = ref(lineClamp.value);

/**
 * Hàm lưu giá trị clamp
 * Khắc Tiềm 19.09.2022
 */
function save(){
  StorageService.setItemWithSystemConstants(EntitySystem.lineClamp, lineClampModel.value)
  store.dispatch("config/setLineClampAction", lineClampModel.value);
  props.close();
}

 /**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
const handleEventKey = function (event: any) {
  if (event.keyCode === KeyCode.Esc) {
    props.close();
  }
};
onMounted(() => {
  window.addEventListener("keydown", handleEventKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEventKey);
});
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

.form-container{
  position: relative;
}
.modal-title h2{
  font-size: 20px !important;
}
.form-container .title {
  display: inline-block;
  margin: 5px 0;
}
</style>
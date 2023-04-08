<template>
  <div class="form-item">
    <div class="p-upload_image">
      <div class="image-form">
        <img v-if="modelValue !== '' && modelValue" @click="v_image.click()" v-bind:src="environment.IMAGE_API + modelValue" class="image-form-style" alt="">
        <div @click="v_image.click()" class="upload-image"></div>
      </div>
      <div class="image-tool">
        <div @click="v_image.click()" class="image-tool_item tool-edit"></div>
        <div class="separate-line-upload"></div>
        <input accept="image/*" @change="onFileSelected" ref="v_image" class="separate-line-chose_image" type="file">
        <div @click="v_image.value = ''; emits('update:modelValue', '');" class="image-tool_item tool-delete"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CoreApi from '@/api/module/coreApi';
import { ApiService } from '@/core/public_api';
import { environment } from '@/environments/environment.prod'
import { ref } from 'vue';

/** 
 * Model hình ảnh và emit update model
 */
const props = defineProps({
  modelValue: { required: true }
})
const emits = defineEmits(['update:modelValue']);

/**
 * Biến chứa element input hình ảnh
 * NK Tiềm 08/04/2023
 */
const v_image = ref<any>(null);
const apiService = new ApiService();

/**
 * Hàm select file
 * NK Tiềm 08/04/2023
 */
function onFileSelected(event: any){
  let file = null;
  if (event.type === 'change' && event.target.files && event.target.files.length > 0) {
    file = event.target.files[0];
  }
  if(file){
    apiService.callApi(CoreApi.uploadImage, file, (res: any) => {
      emits('update:modelValue', res);
      v_image.value.value = null;
    });
  }
}

</script>

<style scoped>
  .p-upload_image{
    padding: 22px 0 0 45px;
  }
  .image-form{
    min-width: 120px;
    border: 1px solid #e0e0e0;
    min-height: 120px;
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .image-form-style{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .image-tool{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
  }
  .image-tool_item{
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    background: var(--url__icon) no-repeat;
    cursor: pointer;
  }
  .separate-line-upload{
    height: 14px;
    width: 1px;
    background: #d4d7dc;
    margin: 0 10px;
  }
  
  .tool-edit{
    background-position: -412px -308px;
  }
  .tool-delete{
    background-position: -460px -308px;
  }
  .upload-image{
    width: 64px;
    height: 64px;
    background: var(--url__icon) no-repeat;
    background-position: -25px -448px;
    transform: scale(1.5);
    cursor: pointer;
    z-index: 0;
  }
  .separate-line-chose_image{
    width: 0;
    height: 0;
    visibility: hidden;
  }
</style>
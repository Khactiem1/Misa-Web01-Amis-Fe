<template>
  <div class="wrapper">
    <router-view></router-view>
    <teleport to="#app">
      <the-loader v-show="isShowLoader"></the-loader>
      <the-top-message-list></the-top-message-list>
      <list-notification></list-notification>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from "vuex";
import { TheLoader, TheTopMessageList, ListNotification } from '@/core/public_component';

  /**
  * Biến store trong vuex
  * Khắc Tiềm - 15.09.2022
  */
  const store: any = useStore();

  /**
   * Biến lưu trạng thái loader 
   * Khắc Tiềm - 15.09.2022
   */
  const isShowLoader: any = computed(() => store.state.config.isShowLoader);
</script>

<style scoped>

</style>

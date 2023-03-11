<template>
  <div class="wrapper">
    <router-view></router-view>
    <teleport to="#app">
      <the-loader v-show="isShowLoader"></the-loader>
      <the-top-message-list></the-top-message-list>
      <notification-modal v-if="isShowNotificationWanning">
        <notification-wanning
          :cancelAction="configNotificationWanning.cancelAction"
          :agreeAction="configNotificationWanning.agreeAction"
          :messageAction="configNotificationWanning.messageAction"
        ></notification-wanning>
      </notification-modal>
      <notification-modal v-if="isShowNotificationError">
        <notification-error
          :agreeAction="configNotificationError.agreeAction"
          :messageAction="configNotificationError.messageAction"
        ></notification-error>
      </notification-modal>
      <notification-modal v-if="isShowNotificationQuestion">
          <notification-question
            :cancelAction="configNotificationQuestion.cancelAction"
            :agreeAction="configNotificationQuestion.agreeAction"
            :messageAction="configNotificationQuestion.messageAction"
          ></notification-question>
        </notification-modal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from "vuex";
import { TheLoader, TheTopMessageList, NotificationModal, NotificationQuestion, NotificationError, NotificationWanning } from '@/core/public_component';

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

  /**
   * Biến lưu trạng thái thông báo 
   * Khắc Tiềm - 15.09.2022
   */
  const isShowNotificationWanning: any = computed(() => store.state.config.isShowNotificationWanning);
  const configNotificationWanning: any = computed(() => store.state.config.configNotificationWanning);

  /**
   * Biến lưu trạng thái thông báo  
   * Khắc Tiềm - 15.09.2022
   */
  const isShowNotificationError: any = computed(() => store.state.config.isShowNotificationError);
  const configNotificationError: any = computed(() => store.state.config.configNotificationError);

  /**
   * Biến lưu trạng thái thông báo  
   * Khắc Tiềm - 15.09.2022
   */
  const isShowNotificationQuestion: any = computed(() => store.state.config.isShowNotificationQuestion);
  const configNotificationQuestion: any = computed(() => store.state.config.configNotificationQuestion);
</script>

<style scoped>

</style>

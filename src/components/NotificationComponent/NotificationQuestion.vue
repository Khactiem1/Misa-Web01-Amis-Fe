<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-question"></div>
      <div class="modal-notification_mess">{{ messageAction.display }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          ref="elmTabNext"
          v-if="cancelAction"
          @click="cancelAction.action"
          class="btn"
        >
          {{ cancelAction.display }}
        </button>
      </div>
      <div class="modal-notification_action-item">
        <button 
          @click="agreeAction.refuseAction" 
          class="btn">
          {{ agreeAction.refuseActionDisplay }}
        </button>
        <button
          ref="elmAgree"
          @click="agreeAction.action"
          class="btn btn-success"
        >
          {{ agreeAction.display }}
        </button>
        <button ref="focusLoop" class="focus-loop"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
export default {
  props: {
    /**
     * Các xử lý khi bấm huỷ
     */
    cancelAction: {
      type: Object,
    },
    /**
     * Các xử lý khi bấm chấp nhận
     */
    agreeAction: {
      type: Object,
    },
    /**
     * Các xử lý hiển thị message
     */
    messageAction: {
      type: Object,
    },
  },
  setup() {
    /**
     * Biến chứa element nút bấm 
     * Khắc Tiềm - 15.09.2022
     */
    const elmAgree = ref(null);

    /**
     * Khi mounted thì sẽ focus vào một nút chỉ định
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => {
      elmAgree.value.focus();
    });

    /**
     * Element chứa vị trí tab đến sẽ quay lại tab ban đầu tạo thành vòng lặp
     * NK Tiềm 28/10/2022
     */
     const focusLoop = ref(null); 
     const elmTabNext = ref(null);

    /**
     * Hàm xử lý lặp khi tab focus
     * NK Tiềm 28/10/2022
     */
     const handleLoopFocus = function () {
      elmTabNext.value.focus();
    };
    // const handleLoopFocusTabNext = function(){
    //   elmTabEnd.value.focus();
    // }
    onMounted(() => {
      focusLoop.value.addEventListener("focus", handleLoopFocus)
    });
    onUnmounted(() => {
      window.removeEventListener("focus", handleLoopFocus)
    });
    return {
      elmAgree,
      focusLoop,
      elmTabNext,
    };
  },
};
</script>

<style></style>

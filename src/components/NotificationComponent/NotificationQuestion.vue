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
          @click="cancelAction.action(); cancelAction.callBack();"
          class="btn"
        >
          {{ $t(cancelAction.display) }}
        </button>
      </div>
      <div class="modal-notification_action-item">
        <button 
          @click="agreeAction.refuseAction()" 
          class="btn">
          {{ $t(agreeAction.refuseActionDisplay) }}
        </button>
        <button
          ref="elmAgree"
          @click="agreeAction.action()"
          class="btn btn-success"
        >
          {{ $t(agreeAction.display) }}
        </button>
        <button ref="focusLoop" class="focus-loop"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { KeyCode } from "@/core/public_api";
import { onMounted, onUnmounted, ref, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    /**
     * Các xử lý khi bấm huỷ
     */
    cancelAction: {
      default: {
        display: '',
        action: () => {},
        callBack: () => {},
      }
    },
    /**
     * Các xử lý khi bấm chấp nhận
     */
    agreeAction: {
      default: {
        display: '',
        action: () => {},
        refuseAction: () => {},
        refuseActionDisplay: ''
      }
    },
    /**
     * Các xử lý hiển thị message
     */
    messageAction: {
      default: {
        display: '',
        action: () => {}
      }
    },
  },
  setup(props) {
    const { cancelAction }: any = toRefs(props);
    /**
     * Biến chứa element nút bấm 
     * Khắc Tiềm - 15.09.2022
     */
    const elmAgree: any = ref(null);

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
     const focusLoop: any = ref(null); 
     const elmTabNext: any = ref(null);

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
    /**
     * Hàm xử lý đóng
     * Khắc Tiềm 19.09.2022
     */
    const handleEventKey = function (event: any) {
      if (event.keyCode === KeyCode.Esc) {
        cancelAction.value.action(); 
        cancelAction.value.callBack(); 
      }
    };
    onMounted(() => {
      focusLoop.value.addEventListener("focus", handleLoopFocus);
      window.addEventListener("keydown", handleEventKey);
    });
    onUnmounted(() => {
      window.removeEventListener("focus", handleLoopFocus);
      window.removeEventListener("keydown", handleEventKey);
    });
    return {
      elmAgree,
      focusLoop,
      elmTabNext,
    };
  },
});
</script>

<style></style>

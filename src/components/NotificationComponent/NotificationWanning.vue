<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-wanning"></div>
      <div class="modal-notification_mess">{{ messageAction.display }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          v-if="cancelAction"
          ref="elmAgree"
          @click="cancelAction.action(); cancelAction.callBack()"
          class="btn"
        >
          {{ $t(cancelAction.display) }}
        </button>
      </div>
      <div class="modal-notification_action-item">
        <button
          @click="agreeAction.action(messageAction.id)"
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
import { defineComponent, onMounted, onUnmounted, ref, toRefs } from "vue";

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
        action: (id: any = '') => { console.log(id); }
      }
    },
    /**
     * Các xử lý hiển thị message
     */
    messageAction: {
      default: {
        display: '',
        id: '',
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

    /**
     * Hàm xử lý lặp khi tab focus
     * NK Tiềm 28/10/2022
     */
    const handleLoopFocus = function () {
      elmAgree.value.focus();
    };
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
    };
  },
});
</script>

<style></style>

<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-error"></div>
      <div class="modal-notification_mess">{{ displayMessage }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          tabindex="-1"
          ref="elmAgree"
          @click="agreeAction.action(); messageAction.callBack()"
          class="btn btn-success"
        >
          {{ $t(agreeAction.display) }}
        </button>
        <div tabindex="0" ref="focusLoop" class="focus-loop"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { KeyCode } from '@/core/public_api';
import { onBeforeMount, onMounted, onUnmounted, ref, toRefs, defineComponent } from 'vue';

export default defineComponent({
  props: {
    /**
     * Các xử lý khi bấm chấp nhận
     */
    agreeAction: {
      default: {
        display: '',
        action: () => {}
      }
    },
    /**
     * Các xử lý hiển thị message
     */
    messageAction: {
      default: {
        display: '',
        callBack: () => {}
      }
    },
  },
  setup(props) {
    /**
     * Lấy ra thông báo
     */
    const { messageAction, agreeAction }: any = toRefs(props);

    /**
     * Thông báo hiển thị
     */
    const displayMessage: any = ref('');
    /**
     * Kiểm tra thông báo nếu là mảng thì hiển thị theo danh sách
     */
    onBeforeMount(()=> {
      if(Array.isArray(messageAction.value.display)){
        messageAction.value.display.length = 1;
        if(messageAction.value.display.length === 1){
          displayMessage.value = messageAction.value.display[0];
        }
        else{
          displayMessage.value = messageAction.value.display.reduce((acc: any, cur: any) => {
            // Nối lại thành chuỗi HTML
            return (acc += cur ? "- " + cur + "<br>" : "");
          }, "");
        }
      }
      else{
        displayMessage.value = messageAction.value.display;
      }
    });
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
        agreeAction.value.action(); 
        messageAction.value.callBack()
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
      displayMessage,
      focusLoop,
    };
  },
});
</script>

<style scoped>
.modal-notification_action {
  justify-content: end;
}
</style>

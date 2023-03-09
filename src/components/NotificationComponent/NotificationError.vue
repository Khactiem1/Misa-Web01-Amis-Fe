<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-error"></div>
      <div v-html="displayMessage" class="modal-notification_mess"></div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          tabindex="-1"
          ref="elmAgree"
          @click="agreeAction.action"
          class="btn btn-success"
        >
          {{ agreeAction.display }}
        </button>
        <div tabindex="0" ref="focusLoop" class="focus-loop"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, ref, toRefs } from "vue";
export default {
  props: {
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
  setup(props) {
    /**
     * Lấy ra thông báo
     */
    const { messageAction } = toRefs(props);

    /**
     * Thông báo hiển thị
     */
    const displayMessage = ref('');
    /**
     * Kiểm tra thông báo nếu là mảng thì hiển thị theo danh sách
     */
    onBeforeMount(()=> {
      if(Array.isArray(messageAction.value.display)){
        if(messageAction.value.display.length === 1){
          displayMessage.value = messageAction.value.display[0];
        }
        else{
          displayMessage.value = messageAction.value.display.reduce((acc, cur) => {
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

    /**
     * Hàm xử lý lặp khi tab focus
     * NK Tiềm 28/10/2022
     */
     const handleLoopFocus = function () {
      elmAgree.value.focus();
    };
    onMounted(() => focusLoop.value.addEventListener("focus", handleLoopFocus));
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    return {
      elmAgree,
      displayMessage,
      focusLoop,
    };
  },
};
</script>

<style scoped>
.modal-notification_action {
  justify-content: end;
}
</style>

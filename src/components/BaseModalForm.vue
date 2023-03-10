<template>
  <div class="modal" :class="{ active: isShowModalAnimation }">
    <div class="modal-overlay"></div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  setup() {
    /**
     * Biến trạng thái khi mounted modal có hiệu ứng hiện từ từ
     * Khắc Tiềm - 15.09.2022
     */
    const isShowModalAnimation: any = ref(false);

    /**
     * Khi mounted xong thì thêm class active để có hiệu ứng mở lên từ từ
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => {
      setTimeout(() => {
        isShowModalAnimation.value = !isShowModalAnimation.value;
      }, 0);
    });
    return {
      isShowModalAnimation,
    };
  },
});
</script>

<style>
/* modal */
.form-header {
  display: flex;
  justify-content: space-between;
}
.modal-title {
  padding: 20px 12px 20px 32px;
  display: flex;
  align-items: center;
}
.modal-title h2 {
  font-size: 24px;
  font-weight: 700;
  font-family: 'notosans-semibold';
}
.modal-close {
  display: flex;
  padding: 12px;
}
.modal-icon_help {
  background: var(--url__icon) no-repeat;
  background-position: -89px -144px;
  width: 24px;
  height: 24px;
  margin-right: 6px;
  cursor: pointer;
  position: relative;
}
.modal-icon_close {
  background: var(--url__icon) no-repeat;
  background-position: -144px -144px;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}
.modal-icon_help::before {
  content: "Giúp F1";
}
.modal-icon_close::before {
  content: "Đóng ESC";
}
.btn-form_cat::before {
  content: "Cất (Ctrl + S)";
}
.btn-form_cat-them::before {
  content: "Cất và thêm (Ctrl + Shift +  S)";
}
.modal-icon {
  position: relative;
}
.modal-icon::before {
  background-color: #505050;
  position: absolute;
  padding: 6px 8px;
  color: var(--while__color);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 3px;
  top: 125%;
  z-index: 15;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  font-family: "notosans-regular";
  font-size: 12px;
  white-space: nowrap;
}
.modal-icon::after {
  position: absolute;
  top: 110%;
  content: "";
  width: 0px;
  left: 50%;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #505050;
}
.modal-icon:hover::after,
.modal-icon:hover::before {
  opacity: 1;
  visibility: visible;
}
/* Phần xử lý form */
.form-header_checkbox {
  display: flex;
}
.form-checkbox_item {
  padding: 0 19px;
  margin-top: 2px;
  display: flex;
  align-items: center;
}
.form-container {
  padding: 0 32px;
}
.form-action {
  margin-top: 20px;
  padding: 0 32px;
}
.form-detail {
  padding-bottom: 12px;
}
.form-item {
  width: 50%;
}
.form-item + .form-item {
  padding-left: 26px;
}
.form-group {
  padding-bottom: 12px;
  width: 100%;
}
.form-group label {
  font-family: "notosans-semibold";
  margin-bottom: 4px;
  display: block;
  white-space: nowrap;
}
.form-group label span {
  font-family: "notosans-regular";
}
label.required::after {
  content: "*";
  color: red;
  margin-left: 3px;
}
.form-item_input {
  display: flex;
}
.form-item_input .form-group + .form-group {
  padding-left: 6px;
}
.ms-small {
  width: 40%;
}
.ms-big {
  flex: 1;
}
.form-item.flex-center {
  width: 100%;
}
.form-item.flex-center + .form-item.flex-center {
  padding: 0;
}
.form-item.flex-center .form-group {
  width: 25%;
}
.form-item.flex-center .form-group + .form-group {
  padding-left: 6px;
}
.form-action_container {
  padding: 20px 0;
  border-top: solid 1px #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
}
/* Phần modal thông báo */
.modal-notification_container {
  width: 444px;
  left: calc(50vw - 222px);
}
.modal-notification_content {
  padding: 32px;
}
.modal-notification_body {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.modal-notification_icon {
  background: var(--url__icon) no-repeat;
  width: 48px;
  height: 48px;
}
.modal-notification_mess {
  flex: 1;
  padding-left: 16px;
}
.modal-notification_icon.icon-error {
  background-position: -24px -954px;
}
.modal-notification_icon.icon-wanning {
  background-position: -592px -456px;
}
.modal-notification_icon.icon-question {
  background-position: -826px -456px;
}
.mess-line_notification {
  height: 0.1px;
  background: #b8bcc3;
  margin-bottom: 20px;
}
.modal-notification_action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-notification_action-item .btn + .btn {
  margin-left: 5px;
}
.input-radio_item {
  display: flex;
  padding-top: 5px;
}
label{
  font-size: 12px;
}
</style>
  
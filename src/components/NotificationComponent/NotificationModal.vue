<template>
  <div class="modal modal-notification active">
    <div class="modal-overlay"></div>
    <div class="modal-body modal-notification_container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style>
.modal-notification_container {
  width: 444px;
  left: calc(50vw - 222px);
}
.modal-notification_content {
  padding: 32px 24px 24px 24px !important;
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
  margin-left: 8px !important;
}
</style>

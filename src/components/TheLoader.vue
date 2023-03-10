<template>
  <div class="modal modal-loader active">
    <div class="modal-overlay"></div>
    <div class="modal-body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(){

  }
});
</script>

<style scoped>
/* Modal loader */
/* Chrome, Safari, Opera */
@-webkit-keyframes loader {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}
/* Standard syntax */
@keyframes loader {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}
.modal-loader .modal-overlay {
  background-color: var(--while__color);
  opacity: 0.2;
}
.modal-loader .modal-body {
  min-height: 32px;
  max-height: 32px;
  min-width: 32px;
  max-width: 32px;
  left: calc(50vw - 16px);
  top: 50vh;
  transform: translateY(-50%);
  border-radius: 50%;
  background: var(--url__loader) no-repeat;
  width: 33px;
  height: 33px;
  animation: loader 1s linear 0s infinite;
  -webkit-animation: loader 1s linear 0s infinite;
  -moz-animation: loader 1s linear 0s infinite;
  -o-animation: loader 1s linear 0s infinite;
}
</style>

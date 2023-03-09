<template>
  <label class="check">
    <input
      class="checkbox"
      type="checkbox"
      :id="id"
      v-model="computedValue"
      :name="name"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :true-value="trueValue"
      :false-value="falseValue"
      :value="value"
      :checked="checked"
    />
    <span class="input-focus"></span>
    <div class="label-checkbox"></div>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "InputCheckbox",
  props: [
    /**
     * v-model
     * Khắc Tiềm - 15.09.2022
     */
    "modelValue", 
    
    /**
     * Giá trị của ô checkbox
     * Khắc Tiềm - 15.09.2022
     */
    "value", 
    
    /**
     * Dữ liệu khi được check
     * Khắc Tiềm - 15.09.2022
     */
    "trueValue", 
    
    /**
     * Dữ liệu khi không được check
     * Khắc Tiềm - 15.09.2022
     */
    "falseValue", 

    /**
     * Có được check hay không khi k sử dụng đến v-model
     * Khắc Tiềm - 15.09.2022
     */
    "checked",
    "id",
    "name",
    "round",
    "disabled",
    "indeterminate",
  ],
  emits: [
    "update:modelValue",
    "custom-handle-click-checkbox",
    "custom-handle-click-checkbox-with-value",
  ],
  setup: (props, { emit }) => {
    /**
     * Sự kiện bắn dữ liệu cập nhật cho component cha
     * Khắc Tiềm - 15.09.2022
     */
    const computedValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
        //custom sự kiện check không có value
        emit("custom-handle-click-checkbox"); 
        //custom sự kiện check có value truyền vào
        emit("custom-handle-click-checkbox-with-value", value); 
      },
    });
    return { computedValue };
  },
});
</script>

<style scoped>
/* checkbox */
.check {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.label-checkbox {
  width: 18px;
  height: 18px;
  align-items: center;
  background-color: var(--while__color);
  border: solid 1px var(--border__input);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  transition: all ease 0.15s;
  position: relative;
}
.input-focus {
  position: absolute;
  border-radius: 2px;
  left: -3px;
  top: -3px;
  width: 24px;
  height: 24px;
  display: block;
  border: solid 1px #0076c04b;
  opacity: 0;
  visibility: hidden;
}

.checkbox {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  left: 0;
  top: 0;
}
input:checked ~ .label-checkbox::before {
  opacity: 1;
  visibility: visible;
}
input:checked ~ .label-checkbox {
  border-color: var(--primary__color);
  transform: rotate(0deg);
}

.check:active .input-focus{
  opacity: 1;
  visibility: visible;
}
input {
  z-index: 10;
}
.label-checkbox::before {
  content: "";
  background: var(--url__icon) no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  display: block;
}
.input.disabled-input {
  box-shadow: none;
}
</style>

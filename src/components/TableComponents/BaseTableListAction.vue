<template>
  <div
    :style="{
      top: positionAction.top + 'px',
      right: positionAction.right + 'px',
    }"
    v-if="actionTable && row"
    class="table-list_action"
    ref="template"
  >
    <div
      v-for="(actionItem, index) in actionTable.actionList"
      :key="index"
      class="list_action-item"
      @click="
        handleCloseAction();
        handleClickActionColumTable(
          actionItem,
          row[actionTable.fieldId],
          row[actionTable.fieldCode]
        );
      "
    >
      {{ actionItem === actionList.STOP_USING && row[actionTable.fieldActive] === false ? actionList.USING : actionItem}} 
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref } from "vue";
import actionList from "../../utils/actionTable";
export default {
  props: {
    /**
     * Các hành đồng của table
     */
    actionTable: {
      type: Object,
    },
    /**
     * Row kèm data được chọn
     */
    row: {},
    /**
     * Hàm xử lý click vào từng hành động của action table
     */
    handleClickActionColumTable: {
      type: Function,
    },
    /**
     * Hàm đóng action
     */
    handleCloseAction: {
      type: Function,
    },
    /**
     * Set vị trí của actable hiển thị
     */
    positionAction: {
      type: Object,
    },
  },
  setup(props) {
    /**
     * biến bắt lấy thẻ to nhất của component
     * Khắc Tiềm - 15.09.2022
     */
    const template = ref(null);

    /**
     *  khi không click trúng component thì sẽ unmount component
     * khắc Tiềm - 15.09.2022
     */
    const handleClickTemplate = function () {
      try {
        const isClick = template.value.contains(event.target);
        if (!isClick) {
          props.handleCloseAction();
        }
      } catch {
        return;
      }
    };
    
    /**
     * lắng nghe sự kiện click component
     * Khắc Tiềm - 15.09.2022
     */
    setTimeout(() => {
      window.addEventListener("click", handleClickTemplate);
    }, 100);

    /**
     * xoá bỏ sự kiện lắng nghe
     * Khắc Tiềm - 15.09.2022
     */ 
    onUnmounted(() => window.removeEventListener("click", handleClickTemplate));

    return {
      template,
      actionList,
    };
  },
};
</script>

<style scoped>
.table-list_action {
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 5px 0;
  top: 0;
  right: 5px;
  position: absolute;
  min-width: 115px;
  z-index: 5;
  transition: all ease 0.15s;
}
.list_action-item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  transition: all ease 0.15s;
  color: inherit;
}
.list_action-item:hover {
  background-color: #f5f5f5;
  color: var(--primary__color);
}
</style>

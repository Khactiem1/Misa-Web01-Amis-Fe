<template>
  <div
    class="modal modal-setting"
    :class="{ active: isShowSettingTableAnimation }"
  >
    <div class="modal-overlay"></div>
    <div class="modal-body modal-setting_container">
      <div class="modal-setting_content">
        <div class="setting-header">
          <h1>{{ $t('common.setting_table') }}</h1>
          <div
            class="setting-header_icon"
            @click="handleShowSettingTable()"
          ></div>
        </div>
        <div class="setting-content">
          <div class="setting-name setting-header_name">
            <div class="info-setting">{{ $t('common.name_column') }}</div>
          </div>
          <!-- thêm vào đây để đổi màu background active -->
          <div
            class="setting-name"
            v-for="(item, index) in columns"
            :key="item.Field"
          >
            <base-checkbox
              @custom-handle-click-checkbox="handleClickCheckbox(index)"
              :checked="item.IsShow"
            ></base-checkbox>
            <div class="info-setting">{{ item.Header }}</div>
          </div>
        </div>
        <div class="setting-footer">
          <button @click="handleShowSettingTable()" class="btn">{{ $t('common.close') }}</button>
          <button @click="handleShowSettingTable()" class="btn btn-success">
            {{ $t('common.done') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseCheckbox } from "@/core/public_component";
import { Header, KeyCode } from "@/core/public_api";

import { onMounted, onUnmounted, toRefs, ref, defineComponent, type PropType } from "vue";
export default defineComponent({
  props: {
    /**
     * Cột hiển thị
     */
    columns: {
      type: Array as PropType<Header[]>,
      required: true,
      default: ():Header[] => [],
    },
    /**
     * Hàm đóng mở form 
     */
    handleShowSettingTable: {
      type: Function,
      default: () => {}
    },
    /**
     * Hàm xử lý khi click check box hiển thị column
     */
    handleClickCheckbox: {
      type: Function,
      default: () => {}
    },
  },
  components: {
    BaseCheckbox,
  },
  setup(props) {
    /**
     * Hàm xử lý ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const { handleShowSettingTable }: any = toRefs(props);

    /**
     * Biến chứa trạng thái ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowSettingTableAnimation = ref(false);

    /**
     * Hàm xử lý đóng mở cài đặt table
     * Khắc Tiềm 19.09.2022
     */
    const handleEventKey = function (event: any) {
      if (event.keyCode === KeyCode.Esc) {
        handleShowSettingTable;
        handleShowSettingTable.value();
      }
    };

    /**
     * Khi mounted thì sẽ lắng nghe sự kiện nhấn phím
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => {
      window.addEventListener("keydown", handleEventKey);
      setTimeout(()=>{
        isShowSettingTableAnimation.value = true;
      },0)
    });

    /**
     * Khi onUnmounted thì sẽ xoá bỏ sự kiện nhấn phím
     * Khắc Tiềm - 15.09.2022
     */
    onUnmounted(() => {
      window.removeEventListener("keydown", handleEventKey);
    });
    return {
      isShowSettingTableAnimation,
    };
  },
});
</script>

<style scoped>
/* Modal setting */
.modal {
  top: 0;
}
.modal-body.modal-setting_container {
  width: 800px;
  height: 100%;
  margin: 0;
  left: calc(100%);
  top: 0;
  transform: none;
  padding: 0 16px;
  transition: all ease 0.15s;
}
.modal-setting.active .modal-body.modal-setting_container {
  left: calc(100% - 800px);
}
.modal-setting {
  z-index: 15;
}

.modal-setting_content {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.setting-header {
  display: flex;
  height: 64px;
  justify-content: space-between;
}
.setting-header h1 {
  padding: 12px 0 16px 0;
}
.setting-header_icon {
  background: var(--url__icon) no-repeat;
  background-position: -144px -144px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 12px;
}

.setting-content {
  margin-top: 12px;
  flex-grow: 1;
  overflow: auto;
}
.setting-name {
  display: flex;
  align-items: center;
  padding: 13px 13px;
  border-bottom: 1px solid #c7c7c7;
}
.setting-name:hover {
  background-color: #f2f9ff;
}
.active.setting-name {
  background-color: #e5f3ff;
}
.setting-header_name {
  border-bottom: 2px solid #c7c7c7;
  background-color: #e5e8ec;
  font-family: "notosans-semibold";
}
.setting-header_name:hover {
  background-color: #e5e8ec;
}
.info-setting {
  padding-left: 20px;
}
.setting-header_name .info-setting {
  padding-left: 0;
}
.setting-footer {
  display: flex;
  padding: 11px 0;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  border-top: 4px solid #f4f5f8;
}
</style>

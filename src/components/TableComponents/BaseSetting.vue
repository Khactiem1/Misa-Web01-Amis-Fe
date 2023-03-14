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
            <div style="padding-left: 26px;">
              <base-checkbox
                :checked="showAll"
                @custom-handle-click-checkbox="handleClickCheckAll"
              ></base-checkbox>
            </div>
            <div style="padding-left: 19px;" class="info-setting">{{ $t('common.name_column') }}</div>
            <div style="padding-left: 30px;" class="info-setting">{{ $t('common.name_column_custom') }}</div>
            <div style="padding-left: 105px;" class="info-setting">{{ $t('common.width') }}</div>
          </div>
          <draggable
            :list="columnCustom"
            :disabled="!true"
            item-key="Field"
            class="list-group"
            ghost-class="ghost"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="list-group-item setting-name" :class="{ 'not-draggable': !true }">
                <div :title="$t('common.drag')" class="icon-drag-grid"></div>
                <base-checkbox
                  v-model="element.IsShow"
                  :trueValue="true"
                  :falseValue="false"
                ></base-checkbox>
                <div class="info-setting">{{ $t(element.Header) }}</div>
                <input v-model="element.HeaderCustom" class="input input-setting" type="text" />
                <input @keypress="isInputNumber($event, element.Width)" v-model="element.Width" class="input input-setting_width" type="text" />
              </div>
            </template>
          </draggable>
        </div>
        <div class="setting-footer">
          <button @click="handleShowSettingTable()" class="btn">{{ $t('common.close') }}</button>
          <button @click="closeDone()" class="btn btn-success">
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
import draggable from "vuedraggable";

import { onMounted, onUnmounted, toRefs, ref, defineComponent, type PropType, reactive, computed } from "vue";
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
  },
  components: {
    draggable,
    BaseCheckbox,
  },
  setup(props) {
    /**
     * Hàm xử lý ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const { handleShowSettingTable, columns }: any = toRefs(props);

    /** Các column */
    const columnCustom: Header[] = reactive(JSON.parse(JSON.stringify(columns.value)));

    const dragging = ref(false);

    /** Có show all hay không */
    const showAll = computed(() => {
      if(columnCustom.find((item: Header) => !item.IsShow)){
        return false;
      }
      else{
        return true;
      }
    });

    /** Hàm xử lý toggle all các checkbox */
    function handleClickCheckAll(){
      if(showAll.value){
        columnCustom.forEach((item: Header, index) => {
          columnCustom[index].IsShow = false;
        })
      }
      else{
        columnCustom.forEach((item: Header, index) => {
          columnCustom[index].IsShow = true;
        })
      }
    }

    /**
     * Biến chứa trạng thái ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowSettingTableAnimation = ref(false);

    /** Hàm đóng và lưu dữ liệu 
     * Khắc Tiềm - 15.09.2022
    */
    function closeDone(){
      columnCustom.forEach((item: Header, index: any) => {
        columnCustom[index].Filter.headerCustom = columnCustom[index].HeaderCustom;
      })
      handleShowSettingTable.value(columnCustom);
    }

    /**
     * Hàm xử lý đóng mở cài đặt table
     * Khắc Tiềm 19.09.2022
     */
    const handleEventKey = function (event: any) {
      if (event.keyCode === KeyCode.Esc) {
        handleShowSettingTable.value();
      }
    };

    function isInputNumber(evt: any, width: any) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57 || width > 999)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }

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
      columnCustom,
      dragging,
      showAll,
      closeDone,
      isInputNumber,
      handleClickCheckAll,
    };
  },
});
</script>

<style scoped>
/* Modal setting */

::-webkit-scrollbar-track {
  border-radius: 0;
  direction: rtl;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b0b0b0;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 0;
  background: #808080;
}
::-webkit-scrollbar {
  height: 10px; /* height of horizontal scrollbar ← You're missing this */
  width: 8px;
	background-color: var(--while__color);
}
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
  flex-grow: 1;
  overflow: auto;
}
.setting-name {
  display: flex;
  align-items: center;
  padding: 6px 12px;
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
  width: 260px;
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
.input-setting{
  width: 250px;
  height: 26px;
}
.input-setting_width{
  height: 26px;
  width: 100px;
  margin-left: 55px;
}
.icon-drag-grid{
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background: var(--url__icon) no-repeat;
  cursor: pointer;
  background-position: -416px -360px;
  margin-right: 10px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

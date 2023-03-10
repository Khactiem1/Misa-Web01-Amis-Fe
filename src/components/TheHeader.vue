<template>
  <div class="header">
    <div class="content-header_info">
      <div @click="handleToggleSidebar" v-if="showSidebar" class="header-icon_left"></div>
      <div class="header-text">
        Công ty sản xuất - thương mại - dịch vụ qui phúc
      </div>
      <div class="header-icon_right"></div>
    </div>
    <div class="content-header_info">
      <div class="header-bell_notification"></div>
      <div class="header-user">
        <div class="header-user_avatar"></div>
        <div class="header-user_name">Nguyễn Khắc Tiềm</div>
        <div class="header-user_icon"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    /**
     * Biến store vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store: any = useStore();

    /**
     * Lấy ra trạng thái show sidebar
     * Khắc Tiềm - 15.09.2022
     */
    const showSidebar: any = computed(() => store.state.config.showSidebar);
    
    /**
     * Hàm sử lý sự kiện toggle sidebar
     * Khắc Tiềm - 15.09.2022
     */
    function handleToggleSidebar() {
      store.dispatch("config/setToggleShowSidebarAction");
    }
    return {
      showSidebar,
      handleToggleSidebar,
    };
  },
});
</script>

<style scoped>
/* phần header công ty */
.header {
  height: var(--height__header);
  min-height: var(--height__header);
  background-color: var(--while__color);
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  font-family: "notosans-semibold";
}
.content-header_info {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-icon_left {
  width: 16px;
  height: 14px;
  background: var(--url__icon) no-repeat -847px -35px;
  cursor: pointer;
  margin-right: 24px;
}
.header-text {
  text-transform: uppercase;
  font-size: 14px;
}
.header-icon_right {
  background: var(--url__icon) no-repeat -84px -361px;
  width: 8px;
  height: 14px;
  transform: rotate(90deg);
  cursor: pointer;
  margin-left: 14px;
}
/* Phần header người dùng */
/* Phần header thông báo */
.header-bell_notification {
  background: var(--url__icon) no-repeat -788px -30px;
  width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
}
/* header thao tác người dùng */
.header-user_avatar {
  background: var(--url__icon) no-repeat -352px -894px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.header-user {
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background-color: var(--while__color);
  cursor: pointer;
}
.header-user_name {
  margin-left: 5px;
  font-family: "notosans-semibold";
}
.header-user_icon {
  background: var(--url__icon) no-repeat -1078px -38px;
  width: 9px;
  height: 6px;
  cursor: pointer;
  margin-left: 6px;
}
</style>

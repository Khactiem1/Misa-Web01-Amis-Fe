<template>
  <div class="sidebar" :class="{ small : !showSidebar}">
    <div class="logo-sidebar">
      <a v-if="showSidebar" class="logo-sidebar_home"></a>
      <a v-if="showSidebar" class="logo-sidebar_menu">
        <img
          src="../../public/asset/logo/logo_event_trungthu.090d014b.svg" alt=""
        />
      </a>
      <div v-if="!showSidebar" @click="handleToggleSidebar" class="logo-sidebar_active"></div>
    </div>
    <div class="menu-sidebar">
      <router-link to="/" class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tổng quan</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Tổng quan
        </div>
      </router-link>
      <router-link to="/nhanvien" class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tiền mặt</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Tiền mặt
        </div>
      </router-link>
      <router-link to="/warehouse" class="menu-sidebar_item warehouse-page">
        <div
          style="background-position: -291px -1628px;"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Kho</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Kho
        </div>
      </router-link>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tiền gửi</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Tiền gửi
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -161px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Mua hàng</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Mua hàng
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -204px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Bán hàng</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Bán hàng
        </div>
      </a>
      <router-link to="/test404ssssss" class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Quản lý hoá đơn</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Quản lý hoá đơn
        </div>
      </router-link>
      <a class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Công cụ dụng cụ</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Công cụ dụng cụ
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tài sản cố định</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Tài sản cố định
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -161px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tiền lương</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Tiền lương
        </div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -204px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Thuế</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Thuế
        </div>
      </a>
      <a class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Giá thành</div>
        <div v-if="!showSidebar" class="menu-sidebar_item-info">
          Giá thành
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(){
    /**
     * Biến store vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store = useStore();

    /**
     * Lấy ra trạng thái show sidebar
     * Khắc Tiềm - 15.09.2022
     */
    let showSidebar = computed(() => store.state.config.showSidebar);
    
    /**
     * Hàm sử lý sự kiện toggle sidebar
     * Khắc Tiềm - 15.09.2022
     */
    function handleToggleSidebar(){
      store.dispatch("config/setToggleShowSidebarAction");
    }
    return{
      showSidebar,
      handleToggleSidebar,
    }
  }

};
</script>

<style scoped>
/* chia sidebar 
----------------------------
*/
.sidebar {
  position: relative;
  width: auto;
  background-color: var(--menu__color);
  height: 100vh;
  top: 0;
  left: 0;
}

/* Phần logo sidebar */
.logo-sidebar {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  height: var(--height__header);
  justify-content: center;
}
.logo-sidebar_home {
  width: 24px;
  height: 24px;
  margin-right: 18px;
  background: var(--url__icon) no-repeat -424px -86px;
}
.logo-sidebar_menu {
  margin-right: 6px;
}
.logo-sidebar_menu img {
  height: 32px;
  vertical-align: middle;
  transform: scale(1.15);
}
.logo-sidebar_active {
  background: var(--url__icon) no-repeat;
  background-position: -316px -37px;
  width: 16px;
  height: 14px;
  cursor: pointer;
}


/* Phần menu */
.menu-sidebar{
  padding-top: 14px;
}
.menu-sidebar_item {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--while__color);
  height: 42px;
  padding: 0 12px;
}
.menu-sidebar_item:hover .menu-sidebar_item-info{
  opacity: 1;
  visibility: visible;
}
.menu-sidebar_item-info{
  position: absolute;
  opacity: 0;
  visibility: hidden;
  background-color: #585858;
  height: 40px;
  padding: 11px 16px;
  border-radius: 4px;
  white-space: nowrap;
  left: 60px;
  top: 2;
  z-index: 10;
}
.menu-sidebar_item-info::before{
  position: absolute;
  content: '';
  width:0px;
  height:0px;
  border-left:8px solid transparent;
  border-right:8px solid transparent;
  border-bottom:8px solid #585858; /* Tam giác phía dưới được đổ màu */
  transform: rotate(-90deg);
  top: 50%;
  margin-top: -4px;
  left: -8px;
}
.menu-sidebar_item.active {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item:hover {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
}
.menu-sidebar_item.active::before {
  background-color: var(--primary__color);
}
.menu-sidebar_icon {
  background: var(--url__icon) no-repeat;
  width: 24px;
  height: 24px;
}
.menu-sidebar_text {
  line-height: 42px;
  margin-left: 8px;
}
/* Khi được active thì sẽ dùng icon khác màu trắng */
.nhanvien-page.active .menu-sidebar_icon {
  background-position: -73px -1585px !important;
}
.dashboard-page.active .menu-sidebar_icon {
  background-position: -30px -1585px !important;
}
.warehouse-page.active .menu-sidebar_icon {
  background-position: -291px -1585px !important;
}
.menu-sidebar_item.active .menu-sidebar_text {
  font-family: "notosans-bold";
}
</style>

<template>
  <div :class="{ 'lang-hidden_active' : !showSidebar }" class="lang-hidden"> {{ lang }} </div>
  <div :class="{ 'switch-lang_hidden': !showSidebar }" class="switch-lang">
    <div :class="{ 'active' : lang === SystemConstants.get(EntitySystem.Vi) }" class="switch-lang_item" @click="handleChangLang(SystemConstants.get(EntitySystem.Vi))">{{ $t('common.vi') }}</div>
    <div :class="{ 'active' : lang === SystemConstants.get(EntitySystem.En) }" class="switch-lang_item" @click="handleChangLang(SystemConstants.get(EntitySystem.En))">{{ $t('common.en') }}</div>
  </div>
</template>

<script setup lang="ts">
import { StorageService, SystemConstants, EntitySystem } from '@/core/public_api';
import i18n from '@/locales/i18n';
import { computed } from 'vue';
import { useStore } from "vuex";

/** Lấy ra ngôn ngữ đang sử dụng */
const lang = computed(() => i18n.global.locale.value);

/**
 * Biến store vuex
 * Khắc Tiềm - 15.09.2022
 */
 const store: any = useStore();

 /**
 * Lấy ra trạng thái show sidebar
 * Khắc Tiềm - 15.09.2022
 */
let showSidebar: any = computed(() => store.state.config.showSidebar);

/** Hàm thay đổi ngôn ngữ */
function handleChangLang(lang: string){
  try{
    i18n.global.locale.value = lang;
    StorageService.setItemWithSystemConstants(EntitySystem.Lang, lang);
  }
  catch(e: any){
    console.log(e);
  }
}
</script>

<style scoped>
.switch-lang{
  display: flex;
  color: var(--while__color);
  font-family: "notosans-bold";
  width: 100%;
  text-align: center;
  align-items: center;
  position: absolute;
  top: calc(100% - 36px);
  left: 0;
  z-index: 100;
  border-top: solid 2px var(--primary__color);
}
.lang-hidden{
  position: absolute;
  top: calc(100% - 36px);
  left: 0;
  width: 100%;
  height: 36px;
  background-color: var(--menu__color);
  border-top: solid 2px var(--primary__color);
  cursor: pointer;
  color: var(--while__color);
  font-family: "notosans-bold";
  text-align: center;
  padding: 7px 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
}
.lang-hidden:hover {
  background-color: var(--menu__color-active) !important;
}
.lang-hidden_active{
  opacity: 1;
  visibility: visible;
}
.switch-lang.switch-lang_hidden{
  width: 175px;
  left: 52px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
.switch-lang.switch-lang_hidden:hover{
  visibility: visible;
  opacity: 1;
}
.switch-lang_item{
  cursor: pointer;
  height: 34px;
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  width: 50%;
  background-color: var(--menu__color);
}
.switch-lang_item:hover:not(.active){
  background-color: var(--menu__color-active) !important;
}
.switch-lang_item.active{
  background-color: var(--primary__color) !important;
}

.lang-hidden:hover ~ .switch-lang.switch-lang_hidden {
  visibility: visible;
  opacity: 1;
}
</style>
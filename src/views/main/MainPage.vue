<template>
  <the-sidebar></the-sidebar>
  <div class="content">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TheSidebar, TheHeader } from '@/components/public_component'

export default defineComponent({
  components: {
    TheSidebar,
    TheHeader,
  },
  setup(){

    return {

    }
  }
})
</script>

<style scoped>
h1{
    text-align: center;
    margin-top: 20px;
}
</style>
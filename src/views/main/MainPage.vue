<template>
  <the-sidebar></the-sidebar>
  <div class="content">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { TheSidebar, TheHeader } from '@/core/public_component';

</script>

<style scoped>
h1{
    text-align: center;
    margin-top: 20px;
}
</style>
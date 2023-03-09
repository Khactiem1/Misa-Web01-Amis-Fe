<template>
	<h1>Đây là employee</h1>
</template>

<script lang="ts">
import { Grid, ModuleName } from '@/core/public_api';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup(){
		const Base = reactive(new Grid(ModuleName.Employee));
		console.log(Base.columns);
	}
})
</script>

<style scoped>
h1{
		text-align: center;
		margin-top: 20px;
}
</style>
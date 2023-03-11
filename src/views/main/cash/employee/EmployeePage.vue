<template>
	<div>
		{{ api }}
	</div>
</template>

<script setup lang="ts">
import { Grid, ModuleName, ActionTable, ENotificationType, ApiService, Employee } from '@/core/public_api';
import { BaseTable, BasePaging, BaseSetting, BaseFormKeySearch, BaseModalForm, BaseCombobox } from '@/core/public_component';
import { reactive ,computed, ref, watch, onBeforeMount, onUnmounted, onMounted } from 'vue';
import { environment } from '@/environments/environment.prod';
import EmployeeApi from '@/api/module/employee';

const Base: Grid = reactive(new Grid(ModuleName.Employee));
const api:EmployeeApi = new EmployeeApi();
console.log(Base.columns);

</script>

<style scoped>
h1{
	text-align: center;
	margin-top: 20px;
}
</style>
<template>
	<div>
		<h1>Đây là employee</h1>
		<input-calendar
			:label="'Ngày sinh'"
		>
		</input-calendar>
		<input-combobox
			:options="[
				{
					unitID: '1',
					unitName: '1',
					unitCode: '1',
				},
				{
					unitID: '2',
					unitName: '2',
					unitCode: '2',
				},
				{
					unitID: '3',
					unitName: '3',
					unitCode: '3',
				},
			]"
			:value="'unitID'"
			:header="'unitName'"
			:label="'Đơn vị'"
			:labelCode="'Mã đơn vị'"
			:labelName="'Tên đơn vị'"
			:required="true"
			
			:headerSelectMultiple="'unitName'"
			:headerCode = "'unitCode'"
			:messageValid="'ghjghj'"
			:class="{ 'is-valid': !value }"
			:selectMultiple="true"
			v-model="value"
		></input-combobox>
		{{ value }}
	</div>
</template>

<script lang="ts">
import { Grid, ModuleName } from '@/core/public_api';
import { defineComponent, reactive, ref } from 'vue';
import InputCalendar from "../../../../components/InputComponents/BaseCalendar.vue";
import InputCombobox from "../../../../components/InputComponents/BaseCombobox.vue";

export default defineComponent({
	components: {
		InputCalendar,
		InputCombobox,
	},
	setup(){
		const Base:Grid = reactive(new Grid(ModuleName.Employee));
		const value = ref([]);
		console.log(Base.columns);
		console.log(new Date(2023, 3).toLocaleString("vi", {
                month: "long",
              }));
		return {
			Base,
			value
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
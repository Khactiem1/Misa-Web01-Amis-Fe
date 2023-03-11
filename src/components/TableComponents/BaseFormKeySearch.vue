<template>
  <div class="form-key-search">
    <div
      class="filter-item"
      v-for="(item, index) in dataBindFilter"
      :key="index"
    >
      <span> {{ item.labelSearch }}: {{ item.typeSearch === "date" ? Base.formatDateDDMMYYYY(item.headerSearch) : item.headerSearch }}</span>
      <div
        @click="handleDeleteFilterItem(item.columnSearch)"
        class="delete-filter-icon"
      ></div>
    </div>
    <div
      @click="handleDeleteFilterItem()"
      class="filter-item delete-filter-item"
      v-if="dataBindFilter.length > 0"
    >
      <span>{{ $t('common.remove_search') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent } from "vue";
import { useStore } from "vuex";
import { UtilsComponents } from "@/core/public_api";

export default defineComponent({
  props: {
    moduleFilter: {
      type: String,
    },
    loadData: {
      type: Function,
    },
  },
  setup(props){
    const Base = new UtilsComponents();
    const { loadData, moduleFilter }: any = toRefs(props);
    /**
     * Sử dụng store của vuex
     * Khắc Tiềm - 15.09.2022
     */
     const store = useStore();
    /**
    * Dữ liệu đang được tìm kiếm
    */
    const dataBindFilter = computed(()=> {
      return store.state[moduleFilter.value].filter.customSearch.filter((item: any) => item.valueSearch || item.valueSearch === 0 || item.comparisonType === "!=Null" || item.comparisonType === "=Null");
    });

    /**
    * Hàm xử lý filter
    * @param {Cột cần xoá k filetr} column 
    * Khắc Tiềm - 15.09.2022
    */
    function handleDeleteFilterItem(column: any = undefined){
      try {
        if(!column){
          store.dispatch(`${moduleFilter.value}/setFilterCustomSearchEmptyAction`);
          loadData.value({resetPage: true});
        }
        else{
          store.dispatch(`${moduleFilter.value}/setFilterCustomSearchDropAction`, column);
          loadData.value({resetPage: true});
        }
      } catch (e) {
        console.log(e);
      }
    }
    return{
      Base,
      dataBindFilter,
      handleDeleteFilterItem,
    }
  },
});
</script>

<style scoped>
  
.form-key-search{
  display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.filter-item{
    display: flex;
    align-items: center;
    position: relative;
    color: #0075c0;
    margin-left: 6px;
    white-space: nowrap;
  }
  .delete-filter-icon{
    background: var(--url__icon);
    background-position: -80px -312px;
    margin-left: 3px;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    min-width: 16px;
    min-height: 16px;
    cursor: pointer;
  }
  .delete-filter-item{
    cursor: pointer;
  }
  .delete-filter-item:hover{
    text-decoration: underline
  }
</style>

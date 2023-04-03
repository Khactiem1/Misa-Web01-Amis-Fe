<template>
  <div ref="elmMain" class="form-filter-container">
  <div class="formFilter">
    <div @click="handleToggleSearchKey" class="table-function_series">
      <span>{{ $t('common.filter') }}</span>
      <div class="table-function_series-icon"></div>
    </div>
  </div>
  <div class="ms-dropdown-menu" :class="{ active: isActiveAnimation }" v-show="isShowSearchKey">
    <div class="form-control">
      <div class="form-group no-padding">
        <label>{{ $t('module.inventory.nature') }}</label>
        <base-combobox
          :options="[
            { value: '', header: 'common.all' },
            { value: Nature.Goods, header: 'module.inventory.goods' },
            { value: Nature.Service, header: 'module.inventory.service' },
            { value: Nature.Materials, header: 'module.inventory.materials' },
            { value: Nature.FinishedProduct, header: 'module.inventory.finished_product' },
            { value: Nature.ToolTools, header: 'module.inventory.tool_tools' },
          ]"
          :value="'value'"
          :header="'header'"
          v-model="nature.ValueSearch"
          :i18n="true"
          v-model:textField="nature.HeaderSearch"
          ref="inputFocus"
        ></base-combobox>
      </div>
      <div class="form-group">
        <label>{{ $t('common.group') }}</label>
        <base-combobox
          :options="optionCommodityGroup"
          widthOptionSelect="500px"
          widthLabelCode="150px"
          :value="'commodityGroupID'"
          :header="'commodityName'"
          :labelCode="$t('module.inventory.commodityCode_small')"
          :labelName="$t('module.inventory.commodityName_small')"
          :headerCode = "'commodityCode'"
          v-model="group.ValueSearch"
          v-model:textField="group.HeaderSearch"
        ></base-combobox>
      </div>
      <div class="form-group no-padding">
        <label>{{ $t('common.inventory_status') }}</label>
        <base-combobox
          :options="[
            { value: '', header: $t('common.all') },
            { value: 1, header: $t('common.remains') },
            { value: 2, header: $t('common.out_of_stock_soon') },
            { value: 3, header: $t('common.out_of_stock') },
          ]"
          :value="'value'"
          :header="'header'"
          v-model="inventory.ValueSearch"
          v-model:textField="inventory.HeaderSearch"
        ></base-combobox>
      </div>
      <div class="form-group">
        <label>{{ $t('common.status') }}</label>
        <base-combobox
          :options="[
            { value: '', header: 'common.all' },
            { value: 'true', header: 'common.using' },
            { value: 'false', header: 'common.stopUsing' },
          ]"
          :i18n="true"
          :value="'value'"
          :header="'header'"
          v-model="status.ValueSearch"
          v-model:textField="status.HeaderSearch"
        ></base-combobox>
      </div>
    </div>
    <div class="form-action_container">
      <div class="form-action_item">
        <button class="btn" @click="handleResetDataSearch()">
          {{ $t('common.reset') }}
        </button>
        <button class="btn btn-success" @click="searchData()">
          {{ $t('common.filter') }}
        </button>
      </div>
      <div class="form-action_item">
        <button class="btn" @click="handleToggleSearchKey()">
          {{ $t('common.cancel_form') }}
        </button>
      </div>  
    </div>
    <button ref="focusLoop" class="focus-loop"></button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ComparisonTypeSearch, Grid, TypeSearch, Nature, ComparisonType } from '@/core/public_api';
import { ref, onMounted, onUnmounted} from 'vue';
/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
 const props = defineProps({
  Base: { type: Grid, required: true },
  optionCommodityGroup: { type: Array, required: true },
})

/**
 * Element chứa vị trí tab đến sẽ quay lại tab ban đầu tạo thành vòng lặp
 * NK Tiềm 28/10/2022
 */
const focusLoop: any = ref(null); 

/**
 * Biến tạo hiệu ứng
 */
const isActiveAnimation = ref(false);

/**
 * Input được focus
 */
const inputFocus: any = ref(null);

/** Show search */
const isShowSearchKey = ref(false);

/**
 * Hàm xử lý đóng mở form tìm kiếm lọc
 */
function handleToggleSearchKey(){
  try {
    if(!isShowSearchKey.value){
      setTimeout(()=> {
        isActiveAnimation.value = true;
      },0)
    }
    else{
      isActiveAnimation.value = false;
    }
    isShowSearchKey.value = !isShowSearchKey.value;
    if(isShowSearchKey.value){
      const dataBindFilter = props.Base.store.state.inventoryItem.filter.CustomSearch
      .filter((item: ComparisonTypeSearch) => (item.ValueSearch || item.ValueSearch === 0 || item.ComparisonType === ComparisonType.NotEmpty || item.ComparisonType === ComparisonType.Empty) && (item.ColumnSearch === 'inventoryitem.Nature' || item.ColumnSearch === 'inventoryitem.CommodityGroupID' || item.ColumnSearch === "inventoryitem.IsActive"));
      dataBindFilter.forEach((item: ComparisonTypeSearch) => {
        if(item.ColumnSearch === nature.value.ColumnSearch){
          nature.value.ValueSearch = item.ValueSearch;
          nature.value.HeaderSearch = item.HeaderSearch;
        }
        if(item.ColumnSearch === group.value.ColumnSearch){
          group.value.ValueSearch = item.ValueSearch;
          group.value.HeaderSearch = item.HeaderSearch;
        }
        if(item.ColumnSearch === status.value.ColumnSearch){
          status.value.ValueSearch = item.ValueSearch;
          status.value.HeaderSearch = item.HeaderSearch;
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 * Thuộc tính, tính chất
 */
const nature: any = ref<ComparisonTypeSearch>({ TypeSearch: TypeSearch.Number, ColumnSearch: 'inventoryitem.Nature', ValueSearch: '', HeaderSearch: '', LabelSearch: 'module.inventory.nature', ComparisonType: ComparisonType.Equal});
/**
 * Nhóm vthh
 */
const group: any = ref<ComparisonTypeSearch>({ TypeSearch: TypeSearch.Text, ColumnSearch: 'inventoryitem.CommodityGroupID', ValueSearch: '', HeaderSearch: '', LabelSearch: 'common.group', ComparisonType: ComparisonType.Contain});
/**
 * Tình trạng tồn kho
 */
const inventory: any = ref<ComparisonTypeSearch>({ TypeSearch: TypeSearch.Number, ColumnSearch: 'inventoryitem.QuantityTock', ValueSearch: '', HeaderSearch: '', LabelSearch: 'common.inventory_status', ComparisonType: ComparisonType.Equal});
/**
 * Trạng thái hoạt động
 */
const status: any = ref<ComparisonTypeSearch>({ TypeSearch: TypeSearch.Number, ColumnSearch: 'inventoryitem.IsActive', ValueSearch: '', HeaderSearch: '', LabelSearch: 'common.status', ComparisonType: ComparisonType.Equal});

/**
 * Hàm xử lý vòng lặp tab
 */
const handleLoopFocus = function () {
  inputFocus.value.input.focus();
};
/**
 * Hàm xử lý reset data search
 */
function handleResetDataSearch(){
  nature.value.ValueSearch = "";
  group.value.ValueSearch = "";
  inventory.value.ValueSearch = "";
  status.value.ValueSearch = "";
}
/**
 * Hàm xử lý bấm search
 */
function searchData(){
  const QuantityTock = {...inventory.value};
  if(inventory.value.ValueSearch == 1){
    QuantityTock.ValueSearch = "inventoryitem.MinimumStock";
    QuantityTock.ComparisonType = ComparisonType.GreaterOrEqual;
  }
  else if(inventory.value.ValueSearch == 2){
    QuantityTock.ValueSearch = "inventoryitem.MinimumStock AND inventoryitem.QuantityTock > 0";
    QuantityTock.ComparisonType = ComparisonType.Less;
  }
  else if(inventory.value.ValueSearch == 3){
    QuantityTock.ValueSearch = "0";
    QuantityTock.ComparisonType = ComparisonType.LessOrEqual;
  }
  props.Base.loadData({ resetPage:true, ['inventoryitem.Nature']:{...nature.value}, ['inventoryitem.QuantityTock']: {...QuantityTock}, ['inventoryitem.IsActive']:{...status.value} }); //['inventoryitem.CommodityGroupID']:{...group.value}
  handleToggleSearchKey();
}
/**
 *  khi không click trúng component thì sẽ unmount component
 * khắc Tiềm - 15.09.2022
 */
const elmMain:any = ref(null);
  const handleClickTemplate = function (event: any) {
  try {
    const isClickElmMain = elmMain.value.contains(event.target);
    if (!isClickElmMain && isShowSearchKey.value === true) {
      isActiveAnimation.value = false;
      isShowSearchKey.value = false;
    }
  } catch {
    return;
  }
};
onUnmounted(() => {
  window.removeEventListener("focus", handleLoopFocus)
  window.removeEventListener("click", handleClickTemplate)
});
onMounted(() => {
  window.addEventListener("click", handleClickTemplate)
  focusLoop.value.addEventListener("focus", handleLoopFocus);
});
</script>

<style scoped>
.ms-dropdown-menu{
  background-color: var(--while__color);
  padding: 16px 20px 0px 20px;
  position: absolute;
  width: 550px;
  transition: all ease 0.2s;
  top: 150%;
  border-radius: 2px;
  border: 1px solid #babec5;
  left: -222px;
  box-shadow: rgb(0, 0, 0, 20%) 0px 5px 15px;
  border-radius: 3px;
}
.ms-dropdown-menu.active{
  top: 105%;
  z-index: 1;
}
.no-padding{
  padding-left: 0;
}
.distance-line{
  background: #e0e0e0;
  width: 100%;
  margin: 8px 0 20px 0;
  height: 1px;
}
button + button{
  margin-left: 9px;
}
.table-function_series {
  border: 2px solid #3b3c3f;
  padding: 0 16px;
  border-radius: 30px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  margin-left: 12px;
}
.table-function_series:hover:not(.not-css) {
  background-color: #d2d3d6;
}
.table-function_series:active:not(.not-css) {
  background-color: #bbbcbc;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.table-function_series:not(.not-css) span {
  font-family: "notosans-bold";
  padding-right: 4px;
}
.table-function_series-icon {
  background: var(--url__icon);
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.table-function_series-icon {
  background: var(--url__icon);
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.form-control{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 12px;
}
.form-group{
  width: 50%;
  padding-left: 6px;
  padding-bottom: 12px;
}
.form-group label {
  font-family: "notosans-semibold" !important;
  margin-bottom: 4px;
  display: block;
  white-space: nowrap;
  font-size: 12px;
}
.form-group label span {
  font-family: "notosans-regular" !important;
}
.form-item_input .form-group + .form-group {
  padding-left: 6px;
}
.form-item.flex-center .form-group {
  width: 25%;
}
.form-item.flex-center .form-group + .form-group {
  padding-left: 6px;
}
.form-action_container {
  padding: 20px 0;
  border-top: solid 1px #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.no-padding{
  padding-left: 0;
}
</style>
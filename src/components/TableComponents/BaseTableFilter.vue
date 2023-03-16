<template>
  <div ref="elmMain" :style="{
      top: setPositionFilter.top + 'px',
      left: setPositionFilter.left + 'px',
    }" class="condition-container">
    <div class="lock">
        {{ $t('common.fixed_column') }}
    </div>
    <div class="filter-container">
        <div class="view-filter-text">
            <div class="column-filter">
              {{ $t('common.filter') }} {{ (dataFilter.headerCustom && dataFilter.headerCustom !== '') ? dataFilter.headerCustom : $t(dataFilter.headerSearch) }}
            </div>
            <div v-if="dataFilter.typeFilter !== TypeFilter.Combobox && dataFilter.typeFilter !== TypeFilter.Radio" class="filter-op-dropdown">
              <div ref="elmDropDown" @click="isShowDropDown = !isShowDropDown;" class="drop-icon">
                {{ $t(selectComparison[comparisonType].header) }}
              </div>
              <div v-if="isShowDropDown" class="dropdown-list">
                  <div @click="handleSelectComparisonType(index)" v-for="(item, index) in selectComparison" :key="index" class="dropdown-item">
                    {{ $t(item.header) }}
                  </div>
              </div>
            </div>
        </div>
        <div class="filter-value">
          <base-input v-if="dataFilter.typeFilter === TypeFilter.Number || dataFilter.typeFilter === TypeFilter.Text" :disabled="isDisableInput" :placeholder="$t('common.enter_filter')" v-model="valueSearch" :isNumber="dataFilter.typeFilter === TypeFilter.Number" ></base-input>
          <base-calendar v-if="dataFilter.typeFilter === TypeFilter.Date" :disabled="isDisableInput" v-model="valueSearch"></base-calendar>
          <base-combobox 
            v-if="dataFilter.typeFilter === TypeFilter.Combobox" 
            :placeholder="$t('common.enter_filter')"
            :value="'value'"
            :header="'header'"
            :options="dataFilter.data"
            v-model="valueSearch"
            v-model:textField="valueLabel"
            :i18n="true"
          >
          </base-combobox>
          <div class="radio" v-if="dataFilter.typeFilter === TypeFilter.Radio">
            <div v-for="(item, index) in dataFilter.data" :key="index" class="radio-item">
              <base-radio
                :label="$t(item.header)"
                :value="item.value"
                v-model="valueSearch"
                v-model:textField="valueLabel"
              ></base-radio>
            </div>
          </div>
        </div>
    </div>
    <div class="filter-footer">
      <button class="btn" @click="handleDeleteFilterItem()">{{ $t('common.un_filter') }}</button>
      <button class="btn btn-success" @click="handleSearchData">{{ $t('common.filter') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseInput, BaseCombobox, BaseCalendar, BaseRadio } from "@/core/public_component";
import { ref, onUnmounted, toRefs, onBeforeMount, defineComponent } from 'vue';
import { useStore } from "vuex";
import { ComparisonType, ComparisonTypeSearch, FilterHeaderIn, KeyCode, TypeFilter } from '@/core/public_api';

export default defineComponent({
  props: {
    /**
     * Hàm xử lý đóng mở form filter
     */
    handleShowFilter: {
      type: Function,
      default: ()=> {}
    },
    /**
     * set vị trí hiển thị form
     */
    setPositionFilter: {
      default: {
        top: 0,
        left: 1,
      },
    },
    /**
     * Dữ liệu đi kèm form để binding và tìm kiếm
     */
    dataFilter: {
      required: true,
      default: ():FilterHeaderIn => new FilterHeaderIn(),
    },

    /**
     * Dữ liệu tìm kiếm trước đó
     */
     oldSearch: {

     },
  },
  components: {
    BaseInput,
    BaseCombobox,
    BaseCalendar,
    BaseRadio,
  },
  setup(props, context){
    const store = useStore();
    /**
     * Lấy ra props
     */
    const { handleShowFilter, dataFilter, oldSearch }: any = toRefs(props);
    /**
     * Biến lưu trạng thái show dropdown chọn cách lọc
     */
    const isShowDropDown = ref(false);
    /**
     * element dropdown
     */
    const elmDropDown:any = ref(null);
    /**
     *element chứa toàn bộ component
     */
    const elmMain:any = ref(null);
    /**
     * option select kiểu truy vấn cho kiểu text
     */
    const selectComparisonTypeText = [
      {header: 'search.Empty' , comparisonType: ComparisonType.Empty},
      {header: 'search.NotEmpty' , comparisonType: ComparisonType.NotEmpty},
      {header: 'search.Equal' , comparisonType: ComparisonType.Equal},
      {header: 'search.Other' , comparisonType: ComparisonType.Other},
      {header: 'search.Contain' , comparisonType: ComparisonType.Contain},
      {header: 'search.NotContain' , comparisonType: ComparisonType.NotContain},
      {header: 'search.StartedBy' , comparisonType: ComparisonType.StartedBy},
      {header: 'search.EndBy' , comparisonType: ComparisonType.EndBy},
    ];
    /**
     * option select kiểu truy vấn cho kiểu Number
     */
    const selectComparisonTypeNumber = [
      {header: 'search.Empty' , comparisonType: ComparisonType.Empty},
      {header: 'search.NotEmpty' , comparisonType: ComparisonType.NotEmpty},
      {header: 'search.Other' , comparisonType: ComparisonType.Other},
      {header: 'search.Less' , comparisonType: ComparisonType.Less},
      {header: 'search.Equal' , comparisonType: ComparisonType.Equal},
      {header: 'search.LessOrEqual' , comparisonType: ComparisonType.LessOrEqual},
      {header: 'search.Bigger' , comparisonType: ComparisonType.Bigger},
      {header: 'search.GreaterOrEqual' , comparisonType: ComparisonType.GreaterOrEqual},
    ];
    /**
     * Giá trị comparisonType được select mặc định sẽ là 4 (là index của mảng)
     */
    const comparisonType = ref(4);
    /**
     * option select 
     */
    const selectComparison = ref(dataFilter.value.typeFilter === TypeFilter.Text ? selectComparisonTypeText : dataFilter.value.typeFilter === TypeFilter.Number || dataFilter.value.typeFilter === TypeFilter.Date ? selectComparisonTypeNumber: []);
    /**
     * Dữ liệu select
     */
    const valueSearch = ref('');
    onBeforeMount(()=> {
      if(oldSearch.value){
        if(oldSearch.value.ComparisonType === ComparisonType.Empty || oldSearch.value.ComparisonType === ComparisonType.NotEmpty){
          isDisableInput.value = true;
        }
        valueSearch.value = oldSearch.value.ValueSearch;
        if(oldSearch.value.TypeSearch === TypeFilter.Text){
          const index = selectComparisonTypeText.findIndex(item => item.comparisonType === oldSearch.value.ComparisonType);
          comparisonType.value = index;
        }
        else if(oldSearch.value.TypeSearch === TypeFilter.Number || oldSearch.value.TypeSearch === TypeFilter.Date){
          const index = selectComparisonTypeNumber.findIndex(item => item.comparisonType === oldSearch.value.ComparisonType);
          comparisonType.value = index;
        }
      }
    })
    /**
     * Dữ liệu select
     */
    const valueLabel = ref('');
    /**
     * khoá ô input khi option là trống hoặc không trống
     */
    const isDisableInput = ref(false);
    /**
     * Hàm xử lý lưu thông tin và tìm kiếm
     */
    function handleSelectComparisonType(index: any){
      /// 0 và 1 là vị trí mảng của trống và không trống khi chọn cái này thì ô input sẽ bị disable
      if(index === 0 || index === 1){
        valueSearch.value = '';
        isDisableInput.value = true;
      }
      else{
        isDisableInput.value = false;
      }
      comparisonType.value = index;
    }

    /**
     * Hàm xử lý tìm kiếm lọc
     */
    function handleSearchData(){
      if(dataFilter.value.typeFilter === TypeFilter.Radio){
        const dataSearch: ComparisonTypeSearch = { HeaderCustom: dataFilter.value.headerCustom ,TypeSearch: dataFilter.value.typeSearch, ColumnSearch: dataFilter.value.columnSearch, ValueSearch: valueSearch.value, HeaderSearch: valueLabel.value, LabelSearch: dataFilter.value.headerSearch, ComparisonType: dataFilter.value.comparisonType};
        context.emit("handle-filter-data", { [dataFilter.value.columnSearch]:{...dataSearch} });
      }
      else if(dataFilter.value.typeFilter === TypeFilter.Combobox){
        const dataSearch: ComparisonTypeSearch = { HeaderCustom: dataFilter.value.headerCustom ,TypeSearch: dataFilter.value.typeSearch, ColumnSearch: dataFilter.value.columnSearch, ValueSearch: valueSearch.value, HeaderSearch: valueLabel.value, LabelSearch: dataFilter.value.headerSearch, ComparisonType: dataFilter.value.comparisonType};
        context.emit("handle-filter-data", { [dataFilter.value.columnSearch]:{...dataSearch} });
      }
      else{
        const dataSearch: ComparisonTypeSearch = { HeaderCustom: dataFilter.value.headerCustom ,TypeSearch: dataFilter.value.typeSearch, ColumnSearch: dataFilter.value.columnSearch, ValueSearch: valueSearch.value, HeaderSearch: valueSearch.value, LabelSearch: dataFilter.value.headerSearch + ' ' + selectComparison.value[comparisonType.value].header, ComparisonType: selectComparison.value[comparisonType.value].comparisonType};
        context.emit("handle-filter-data", { [dataFilter.value.columnSearch]:{...dataSearch} });
      }
      handleShowFilter.value();
    }

    /**
     * Hàm xử lý xoá lọc
     */
    function handleDeleteFilterItem(){
      store.dispatch(`${dataFilter.value.module}/setFilterCustomSearchDropAction`, dataFilter.value.columnSearch);
      context.emit("handle-filter-data", { resetPage:true});
      handleShowFilter.value();
    }

    /**
     *  khi không click trúng component thì sẽ unmount component
     * khắc Tiềm - 15.09.2022
     */
     const handleClickTemplate = function (event: any) {
      try {
        const isClickElmMain = elmMain.value.contains(event.target);
        if(dataFilter.value.typeFilter === TypeFilter.Combobox){
          if (!isClickElmMain) {
            handleShowFilter.value();
          }
        }
        else{
          if (!isClickElmMain) {
            handleShowFilter.value();
          }
          const isClickDropDown = elmDropDown.value.contains(event.target);
          if (!isClickDropDown) {
            isShowDropDown.value = false;
          }
        }
      } catch{
        return;
      }
    };
    /**
     * Hàm xử lý sự kiện khi nhấn enter
     */
    const keyEnter = function(event: any){
      if(event.keyCode === KeyCode.Enter){
        handleSearchData();
      }
    }
    setTimeout(()=> {
      window.addEventListener("click", handleClickTemplate)
      window.addEventListener("keydown", keyEnter);
    }, 100)
    /**
     * xoá bỏ sự kiện lắng nghe
     * Khắc Tiềm - 15.09.2022
     */ 
     onUnmounted(() => {
      window.removeEventListener("click", handleClickTemplate);
      window.removeEventListener("keydown", keyEnter);
     });

    return{
      isShowDropDown,
      elmDropDown,
      isDisableInput,
      elmMain,
      comparisonType,
      selectComparison,
      valueLabel,
      valueSearch,
      handleClickTemplate,
      handleSelectComparisonType,
      handleDeleteFilterItem,
      handleSearchData,
      TypeFilter,
    }
  },
  emits: ["handle-filter-data"],
});
</script>

<style scoped>
.condition-container{
  font-family: "notosans-regular";
  position: absolute;
  padding: 22px 17px;
  border: 1px solid #babec5;
  z-index: 10;
  background: #fff;
  min-width: 350px;
  max-width: 350px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 400;
  font-size: 13px;
  border-radius: 2px;
  box-shadow: 3px 3px 6px #ddd;
}
.condition-container .lock{
  position: relative;
  padding-left: 30px;
  line-height: 24px;
  cursor: pointer;
  border-bottom: 1px solid #ebedf0;
  padding-bottom: 14px;
  margin-bottom: 14px;
}
.condition-container .lock::before{
  content: "";
  position: absolute;
  display: block;
  height: 24px;
  width: 24px;
  top: 0;
  left: 2px;
  background: transparent var(--url__icon) no-repeat -1726px -560px;
}
.view-filter-text{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}
.filter-op-dropdown{
  font-size: 13px;
  font-weight: 600;
  color: #0075c0;
  cursor: pointer;
  position: relative;
  position: relative;
  display: inline-block;
  margin-left: 15px;
  line-height: 19px;
}
.drop-icon{
  padding-right: 20px;
  font-family: 'notosans-bold';
}
.drop-icon::after{
  content: "";
  position: absolute;
  height: 10px;
  width: 13px;
  background: transparent var(--url__icon) no-repeat -178px -363px;
  top: 4px;
  right: 2px;
}
.filter-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.dropdown-list{
  background: #fff;
  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;
  position: absolute;
  color: var(--text__color);
  text-align: left;
  font-weight: 400;
  font-size: 13px;
  z-index: 5;
  width: 150px;
  top: 100%;
  right: 0;
  transition: all ease .2s;
}
.dropdown-item{
  background: inherit;
  color: inherit;
  cursor: pointer;
  transition: all .2s ease;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  display: block;
}
.dropdown-item:hover{
  color: var(--primary__color) !important;
  background-color: #ebedf0 !important;
}
.radio{
  display: flex;
  flex-wrap: wrap;
}
.radio-item{
  margin-right: 16px;
  margin-bottom: 6px;
}
</style>
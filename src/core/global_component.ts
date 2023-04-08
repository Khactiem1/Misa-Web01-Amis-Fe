import type{ App } from 'vue';
import { 
  BaseCalendar, BaseCheckbox, BaseCombobox, BaseInput, BaseRadio, BaseModalForm, BaseImage,
  BaseFormKeySearch, BaseSetting, BaseTable, BaseImportExcel, BaseFormExcelResult,
} from './public_component';

export const registerGlobalComponents = (app: App): void => {
  app.component('base-calendar', BaseCalendar);
  app.component('base-checkbox', BaseCheckbox);
  app.component('base-combobox', BaseCombobox);
  app.component('base-input', BaseInput);
  app.component('base-radio', BaseRadio);
  app.component('base-modal-form', BaseModalForm);
  app.component('base-image', BaseImage);

  app.component('base-form-key-search', BaseFormKeySearch);
  app.component('base-setting', BaseSetting);
  app.component('base-table', BaseTable);
  app.component('base-import-excel', BaseImportExcel);
  app.component('base-form-excel-result', BaseFormExcelResult);
};
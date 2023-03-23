import { defineAsyncComponent } from "vue";

/** Input */
const BaseCalendar = defineAsyncComponent(() => import('@/components/InputComponents/BaseCalendar.vue'))
const BaseCheckbox = defineAsyncComponent(() => import('@/components/InputComponents/BaseCheckbox.vue'))
const BaseCombobox = defineAsyncComponent(() => import('@/components/InputComponents/BaseCombobox.vue'))
const BaseInput = defineAsyncComponent(() => import('@/components/InputComponents/BaseInput.vue'))
const BaseRadio = defineAsyncComponent(() => import('@/components/InputComponents/BaseRadio.vue'))

/** Notification */
const NotificationError = defineAsyncComponent(() => import('@/components/NotificationComponent/NotificationError.vue'))
const NotificationModal = defineAsyncComponent(() => import('@/components/NotificationComponent/NotificationModal.vue'))
const NotificationQuestion = defineAsyncComponent(() => import('@/components/NotificationComponent/NotificationQuestion.vue'))
const NotificationWanning = defineAsyncComponent(() => import('@/components/NotificationComponent/NotificationWanning.vue'))
const ListNotification = defineAsyncComponent(() => import('@/components/NotificationComponent/ListNotification.vue'))
/** Table */
const BaseTableEmpty = defineAsyncComponent(() => import('@/components/TableComponents/BaseTableEmpty.vue'))
const BaseFormKeySearch = defineAsyncComponent(() => import('@/components/TableComponents/BaseFormKeySearch.vue'))
const BasePaging = defineAsyncComponent(() => import('@/components/TableComponents/BasePaging.vue'))
const BaseSetting = defineAsyncComponent(() => import('@/components/TableComponents/BaseSetting.vue'))
const BaseTable = defineAsyncComponent(() => import('@/components/TableComponents/BaseTable.vue'))
const BaseTableFilter = defineAsyncComponent(() => import('@/components/TableComponents/BaseTableFilter.vue'))
const BaseTableListAction = defineAsyncComponent(() => import('@/components/TableComponents/BaseTableListAction.vue'))
const BaseTableLoader = defineAsyncComponent(() => import('@/components/TableComponents/BaseTableLoader.vue'))
const BaseImportExcel = defineAsyncComponent(() => import('@/components/TableComponents/BaseImportExcel.vue'))

/** The */
const BaseModalForm = defineAsyncComponent(() => import('@/components/BaseModalForm.vue'))
const TheFooter = defineAsyncComponent(() => import('@/components/TheFooter.vue'))
const TheHeader = defineAsyncComponent(() => import('@/components/TheHeader.vue'))
const TheLoader = defineAsyncComponent(() => import('@/components/TheLoader.vue'))
const TheSidebar = defineAsyncComponent(() => import('@/components/TheSidebar.vue'))
const TheTopMessage = defineAsyncComponent(() => import('@/components/TheTopMessage.vue'))
const TheTopMessageList = defineAsyncComponent(() => import('@/components/TheTopMessageList.vue'))
const TheChangeLanguage = defineAsyncComponent(() => import('@/components/TheChangeLanguage.vue'))

export {
  BaseCalendar, BaseCheckbox, BaseCombobox, BaseInput, BaseRadio, BaseModalForm,
  NotificationError, NotificationModal, NotificationQuestion, NotificationWanning, ListNotification,
  TheFooter, TheHeader, TheLoader, TheSidebar, TheTopMessage, TheTopMessageList, TheChangeLanguage,
  BaseTableEmpty, BaseFormKeySearch, BasePaging, BaseSetting, BaseTable, BaseTableFilter, BaseTableListAction, BaseTableLoader,BaseImportExcel,
}
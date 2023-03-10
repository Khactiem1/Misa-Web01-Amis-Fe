import { defineAsyncComponent } from "vue";

/** Input */
const BaseCalendar = defineAsyncComponent(() => import('./InputComponents/BaseCalendar.vue'))
const BaseCheckbox = defineAsyncComponent(() => import('./InputComponents/BaseCheckbox.vue'))
const BaseCombobox = defineAsyncComponent(() => import('./InputComponents/BaseCombobox.vue'))
const BaseInput = defineAsyncComponent(() => import('./InputComponents/BaseInput.vue'))
const BaseRadio = defineAsyncComponent(() => import('./InputComponents/BaseRadio.vue'))

/** Notification */
const NotificationError = defineAsyncComponent(() => import('./NotificationComponent/NotificationError.vue'))
const NotificationModal = defineAsyncComponent(() => import('./NotificationComponent/NotificationModal.vue'))
const NotificationQuestion = defineAsyncComponent(() => import('./NotificationComponent/NotificationQuestion.vue'))
const NotificationWanning = defineAsyncComponent(() => import('./NotificationComponent/NotificationWanning.vue'))
/** Table */


/** The */
const BaseModalForm = defineAsyncComponent(() => import('./BaseModalForm.vue'))
const TheFooter = defineAsyncComponent(() => import('./TheFooter.vue'))
const TheHeader = defineAsyncComponent(() => import('./TheHeader.vue'))
const TheLoader = defineAsyncComponent(() => import('./TheLoader.vue'))
const TheSidebar = defineAsyncComponent(() => import('./TheSidebar.vue'))
const TheTopMessage = defineAsyncComponent(() => import('./TheTopMessage.vue'))
const TheTopMessageList = defineAsyncComponent(() => import('./TheTopMessageList.vue'))

export {
  BaseCalendar,
  BaseCheckbox,
  BaseCombobox,
  BaseInput,
  BaseRadio,
  NotificationError,
  NotificationModal,
  NotificationQuestion,
  NotificationWanning,
  BaseModalForm,
  TheFooter,
  TheHeader,
  TheLoader,
  TheSidebar,
  TheTopMessage,
  TheTopMessageList,
}
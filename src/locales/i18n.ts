import { createI18n } from 'vue-i18n';
import { EntitySystem, StorageService, SystemConstants } from '@/core/public_api';
import enMessage from './en.json';
import viMessage from './vi.json';

/**
 * Kiểm tra xem đã lưu ngôn ngữ người dùng cài chưa vào localstore, 
 * nếu chưa lưu thì tiến hành lưu lại ngôn ngữ mặc định được cấu hình trong file config.prod.json
 * Khắc Tiềm - 08.03.2023
 */
if(!StorageService.getItem(SystemConstants.get(EntitySystem.Lang))){
  StorageService.setItem(SystemConstants.get(EntitySystem.Lang), SystemConstants.get(EntitySystem.LocalLang))
}

/**
 * Khởi tạo i18n với ngôn ngữ là vi và en
 * Khắc Tiềm - 08.03.2023
 */
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: StorageService.getItem(SystemConstants.get(EntitySystem.Lang)) || SystemConstants.get(EntitySystem.LocalLang),
  messages: {
    vi: viMessage,
    en: enMessage
  },
  fallbackLocale: StorageService.getItem(SystemConstants.get(EntitySystem.Lang)) || SystemConstants.get(EntitySystem.LocalLang)
})

export default i18n;
/**
 * Chứa các Api service
 * Khắc Tiềm - 08.03.2023
 */
import { useStore } from "vuex";
import i18n from '@/locales/i18n';
import { ENotificationType, type ServiceResponse } from "@/core/public_api";

export class ApiService {
  /** Store vuex */
  public Store: any = useStore();
  
  /** Hàm gọi api */
  public async callApi(Api: Function, data: any, thenApi: Function, catchApi: Function, noLoaderAnimation: boolean = true) {
    if(!noLoaderAnimation){
      this.Store.dispatch("config/setToggleShowLoaderAction");
    }
    await Api(data)
      .then((response: ServiceResponse) => {
        if(!noLoaderAnimation){
          this.Store.dispatch("config/setToggleShowLoaderAction");
        }
        if(response.success){
          if(thenApi){
            thenApi(response.data)
          }
        }
        else{
          if(catchApi){
            catchApi(response);
          }
          else{
            this.Store.dispatch("config/addNotification", {
              type: ENotificationType.Error,
              message: i18n.global.t(`${response.data.userMsg}`)
            });
          }
        }
      })
      .catch((response: ServiceResponse) => {
        if(catchApi){
          catchApi(response);
        }
        else{
          this.Store.dispatch("config/addNotification", {
            type: ENotificationType.Error,
            message: i18n.global.t('message.api.error_internet')
          });
        }
        if(!noLoaderAnimation){
          this.Store.dispatch("config/setToggleShowLoaderAction");
        }
      });
  }
}
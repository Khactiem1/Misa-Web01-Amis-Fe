/**
 * Chứa các Api service
 * Khắc Tiềm - 08.03.2023
 */
import { useStore } from "vuex";
import i18n from '@/locales/i18n';
import { ENotificationType } from "@/core/public_api";

export class ApiService {
  /** Store vuex */
  public Store: any = useStore();
  
  /** Hàm gọi api */
  public async callApi(Api: Function, data?: any, thenApi?: Function, noLoaderAnimation: boolean = true, catchApi?: Function) {
    if(!noLoaderAnimation){
      this.Store.dispatch("config/setToggleShowLoaderAction");
    }
    await Api(data)
      .then((response: any) => {
        if(!noLoaderAnimation){
          this.Store.dispatch("config/setToggleShowLoaderAction");
        }
        if(response.success || response.Success){
          if(thenApi){
            if(response.data){
              thenApi(response.data);
            }
            else if(response.Data){
              thenApi(response.Data);
            }
            else{
              thenApi(response);
            }
          }
        }
        else{
          if(catchApi){
            catchApi(response);
          }
          else{
            if(response.Data){
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: i18n.global.t(`${response.Data.UserMsg}`)
              });
            }
            else if(response.data){
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: i18n.global.t(`${response.data.userMsg}`)
              });
            }
            else{
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: i18n.global.t(`message.api.exception`)
              });
            }
          }
        }
      })
      .catch((response: any) => {
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
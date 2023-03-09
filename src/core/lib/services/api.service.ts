/**
 * Chứa các Api service
 * Khắc Tiềm - 08.03.2023
 */
import { useStore } from "vuex";
import i18n from '@/locales/i18n';
import { ENotificationType, type ServiceResponse } from "@/core/public_api";

export class ApiService {
  /** Store vuex */
  public Store: any;

  constructor(){
    this.Store = useStore();
  }
  public async callApi(Api: Function, data: any, thenApi: Function, catchApi: Function, noLoaderAnimation: boolean = true, store: any = undefined) {
    store = this.Store;
    if(!noLoaderAnimation){
      store.dispatch("config/setToggleShowLoaderAction");
    }
    await Api(data)
      .then(function(response: ServiceResponse){
        if(!noLoaderAnimation){
          store.dispatch("config/setToggleShowLoaderAction");
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
            store.dispatch("config/addNotification", {
              type: ENotificationType.Error,
              message: i18n.global.t(`${response.data.userMsg}`)
            });
          }
        }
      })
      .catch(function (response: ServiceResponse) {
        if(catchApi){
          catchApi(response);
        }
        else{
          store.dispatch("config/addNotification", {
            type: ENotificationType.Error,
            message: i18n.global.t('message.api.error_internet')
          });
        }
        if(!noLoaderAnimation){
          store.dispatch("config/setToggleShowLoaderAction");
        }
      });
  }
}
import { EntitySystem, StorageService, SystemConstants } from '@/core/public_api';
const config = {
	namespaced: true,
	state: () => {
		return {
			/**
			 * Trạng thái mở rộng sidebar
			 * Khắc Tiềm - 08.03.2023
			 */
			showSidebar: JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.isShowSidebar)) === false ? false : true,

			/**
			 * Số dòng hiển thị trên table
			 * Khắc Tiềm - 08.03.2023
			 */
			lineClamp: StorageService.getItemWithSystemConstants(EntitySystem.lineClamp) || StorageService.getItemWithSystemConstants(EntitySystem.lineClamp) === '' ? 
			StorageService.getItemWithSystemConstants(EntitySystem.lineClamp) : SystemConstants.get(EntitySystem.lineClampDefault),

			/**
			 * Trạng thái show loader 
			 * Khắc Tiềm - 08.03.2023
			 */
			isShowLoader: false,

			/**
			 * Chứa danh sách thông báo
			 * Khắc Tiềm - 08.03.2023
			 */
			notifications: [],

			/**
			 * Trạng thái show thông báo   
			 * Khắc Tiềm - 08.03.2023
			 */
			isShowNotificationWanning: false,

			/**
			* Config thông báo wanning
			* Khắc Tiềm - 08.03.2023
			*/
			configNotificationWanning: {
				cancelAction: {
					display: 'notification.no',
					action: ()=>{},
					callBack: ()=>{},
				},
				agreeAction: {
					display: 'notification.yes',
					action: ()=>{},
				},
				messageAction: {
					display: '',
					id: '',
				},
			},

			/**
			 * Trạng thái show thông báo   
			 * Khắc Tiềm - 08.03.2023
			 */
			isShowNotificationError: false,
			
			/**
			* Config thông báo error
			* Khắc Tiềm - 08.03.2023
			*/
			configNotificationError: {
			agreeAction: {
				display: 'notification.close',
				action: ()=>{},
			},
			messageAction: {
					display: '',
					callBack: () => {}
				},
			},

			/**
			 * Trạng thái show thông báo   
			 * Khắc Tiềm - 08.03.2023
			 */
			isShowNotificationQuestion: false,

				/**
				* Config thông báo Question
				* Khắc Tiềm - 08.03.2023
				*/
			configNotificationQuestion: {
				cancelAction: {
					display: 'notification.destroy',
					action: ()=>{},
					callBack: ()=>{},
				},
				agreeAction: {
					display: 'notification.yes',
					refuseActionDisplay: 'notification.no',
					refuseAction: ()=>{},
					action: ()=>{},
				},
				messageAction: {
					display: '',
				},
			},
		};
	},
	mutations: {
		/**
		 * Mở thông báo wanning
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowNotificationWanningMutation(state: any, payload: any) {
			state.configNotificationWanning.cancelAction.action = ()=> {
				state.isShowNotificationWanning = false;
			}
			state.configNotificationWanning.agreeAction.action = (id: any)=> {
				state.isShowNotificationWanning = false;
				payload.action(id);
			}
			state.configNotificationWanning.messageAction.display = payload.message;
			state.configNotificationWanning.cancelAction.callBack = payload.callBack;
			if(payload.id){
				state.configNotificationWanning.messageAction.id = payload.id;
			}
			state.isShowNotificationWanning = true;
		},

		/**
		 * Mở thông báo error
		 * Khắc Tiềm - 08.03.2023
		 */
			setToggleShowNotificationErrorMutation(state: any, payload: any) {
			state.configNotificationError.agreeAction.action = ()=> {
				state.isShowNotificationError = false;
			}
			state.configNotificationError.messageAction = payload;
			state.isShowNotificationError = true;
		},

		/**
		 * Mở thông báo Question
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowNotificationQuestionMutation(state: any, payload: any) {
			state.configNotificationQuestion.cancelAction.action = ()=> {
				state.isShowNotificationQuestion = false;
			}
			state.configNotificationQuestion.agreeAction.action = ()=> {
				state.isShowNotificationQuestion = false;
				payload.action();
			}
			state.configNotificationQuestion.agreeAction.refuseAction = ()=> {
				state.isShowNotificationQuestion = false;
				payload.refuseAction();
			}
			state.configNotificationQuestion.messageAction.display = payload.message;
			state.configNotificationQuestion.cancelAction.callBack = payload.callBack;
			state.isShowNotificationQuestion = true;
		},

		/**
		 * Set số dòng hiển thị 
		 * Khắc Tiềm - 08.03.2023
		 * */
		setLineClampMutation(state: any, payload: any){
			state.lineClamp = payload;
		},

		/**
		 * Set mở rộng, thu nhỏ sidebar
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowSidebarMutation(state: any) {
			state.showSidebar = !state.showSidebar;
		},

		/**
		 * Set ẩn hiện hiệu ứng loader
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowLoaderMutation(state: any) {
			state.isShowLoader = !state.isShowLoader;
		},

		/**
		 * Thêm thông báo
		 * Khắc Tiềm - 08.03.2023
		 */
			pushNotification(state: any, notification: any) {
			state.notifications.push({
				...notification,
				id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
			})
		},

		/**
		 * Xoá thông báo
		 * Khắc Tiềm - 08.03.2023
		 */
			removeNotification(state: any, notificationToRemove: any) {
			state.notifications = state.notifications.filter((notification: any) => {
				return notification.id != notificationToRemove.id;
			})
		},
	},
	actions: {
		/**
				 * Mở thông báo wanning
				 * Khắc Tiềm - 08.03.2023
				 */
		setToggleShowNotificationWanningAction(context: any, payload: any) {
			context.commit("setToggleShowNotificationWanningMutation", payload);
		},

		/**
				 * Mở thông báo error
				 * Khắc Tiềm - 08.03.2023
				 */
			setToggleShowNotificationErrorAction(context: any, payload: any) {
			context.commit("setToggleShowNotificationErrorMutation", payload);
		},

		/**
				 * Mở thông báo Question
				 * Khắc Tiềm - 08.03.2023
				 */
			setToggleShowNotificationQuestionAction(context: any, payload: any) {
			context.commit("setToggleShowNotificationQuestionMutation", payload);
		},

		/**
		 * Set số dòng hiển thị 
		 * Khắc Tiềm - 08.03.2023
		 * */
		setLineClampAction(context: any, payload: any){
			context.commit("setLineClampMutation", payload);
		},

		/**
		 * Set mở rộng, thu nhỏ sidebar
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowSidebarAction(context: any) {
			context.commit("setToggleShowSidebarMutation");
		},

		/**
		 * Set ẩn hiện hiệu ứng loader
		 * Khắc Tiềm - 08.03.2023
		 */
		setToggleShowLoaderAction(context: any) {
			context.commit("setToggleShowLoaderMutation");
		},

		/**
		 * Thêm thông báo
		 * Khắc Tiềm - 08.03.2023
		 */
		addNotification(context: any, notification: any){
			context.commit('pushNotification', notification);
		},

		/**
		 * Xoá thông báo
		 * Khắc Tiềm - 08.03.2023
		 */
			removeNotification(context: any, notification: any){
			context.commit('removeNotification', notification);
		},
	},
};
export default config;
  
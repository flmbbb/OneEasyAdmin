import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
//
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//
import TBaseAPI from '@/baselib/BaseApi'
import TBaseRightAPI from '@/baselib/right/BaseRightApi'
import THTTPClient, { THTTPRequest } from '@/baselib/helper/HTTPClient'
import TGlobal from '@/baselib/helper/GlobalHelper'
import { TStringHelper } from '@/baselib/helper/StringHelper'
import axios from 'axios'
import EvenBus from '@/evenBus'
import installElementPlus, { TElmMsgHelper } from '@/plugins/element'
import comRegister from "@/views/zComRegister";
import elemDialogDrag from './plugins/elemDialogDrag'

//*********************axios拦截***************/
axios.interceptors.request.use(
    config => {
        // 改变vuex中的isLoading状态数据，当为true，loading显示
        //TElmMsgHelper.msgLoading();
        return config;
    }
);
// 响应拦截器

axios.interceptors.request.use(
    config => {
        // 改变vuex中的isLoading状态数据，当为true，loading显示
        TElmMsgHelper.msgLoading();
        return config;
    }
);
// 响应拦截器
axios.interceptors.response.use(
    response => {
        TElmMsgHelper.msgLoadingClose();
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            //loading隐藏
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        TElmMsgHelper.msgLoadingClose();
        return Promise.reject(error);
    }
);

//*********************注入this.$全局提醒**************************************
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $myBaseAPI: typeof TBaseAPI;
        $myBaseRightAPI: typeof TBaseRightAPI;
        $myHTTPRequest: typeof THTTPRequest;
        $myHTTPCleint: typeof THTTPClient;
        $myGlobal: typeof TGlobal;
        $myStrHelper: typeof TStringHelper;
        $myEvenBus: typeof EvenBus;
        $myMsgHelp: typeof TElmMsgHelper;
    }
}

//获取myConfig.json配置
async function getMyConfig(): Promise<boolean> {
    let timestamp = Date.now();
    let lConfigUrl = "./myConfig.json?timestamp=" + timestamp;
    let lHTTPRequest = new THTTPRequest();
    lHTTPRequest.url = lConfigUrl;
    lHTTPRequest.isResult = false;
    let lResult = await lHTTPRequest.getAsync();
    if (TStringHelper.stringIsEmpty(lResult.resultData.apiBaseUrl)) {
        alert(
            "参数【apiBaseUrl】，不存在,请求结果【" +
            JSON.stringify(lResult.resultData) +
            "】"
        );
        return false;
    }
    TGlobal.apiBaseUrl = lResult.resultData.apiBaseUrl;
    TGlobal.appTitle = lResult.resultData.appTitle;
    TGlobal.appCaptoin = lResult.resultData.appCaption;
    if (lResult.resultData.dbCode) {
        TGlobal.dbCode = lResult.resultData.dbCode;
    }
    if (lResult.resultData.cmsCode) {
        TGlobal.cmsCode = lResult.resultData.cmsCode;
    }
    return true;
}

async function startApp() {
    var lOK = await getMyConfig()
    if (lOK) {
        //禁用前进后退 配合router也要
        window.addEventListener('popstate', function () {
            history.pushState(null, "", document.URL)
        })
        const app = createApp(App)
        app.use(store)
        app.use(router)
        installElementPlus(app)
        app.use(elemDialogDrag);
        app.use(VXETable)
        app.config.globalProperties.$myHTTPRequest = THTTPRequest;
        app.config.globalProperties.$myHTTPCleint = THTTPClient;
        app.config.globalProperties.$myGlobal = TGlobal;
        app.config.globalProperties.$myStrHelper = TStringHelper;
        app.config.globalProperties.$myBaseAPI = TBaseAPI;
        app.config.globalProperties.$myBaseRightAPI = TBaseRightAPI;
        app.config.globalProperties.$myEvenBus = EvenBus;
        app.config.globalProperties.$myMsgHelp = TElmMsgHelper;
        comRegister(app);
        app.mount('#app')
    }
}
startApp();




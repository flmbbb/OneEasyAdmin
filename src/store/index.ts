import { emAuthorRole } from '@/baselib/BaseClass';
import { createStore } from 'vuex'

//用户信息缓存
export class TTokenInfo {
    public static storageName = "token";
    public isLogin: boolean = false; //是否登陆
    public tokenID: string = "";  //交互token
    public privateKey: string = "";  //用户私钥
    public userID: string = "";   //用户ID
    public userName: string = "游客"; //用户名称
    public loginCode: string = "";
    public loginPass: string = ""; //用户密码
    public loginTime: number = 0;
    public lastTime: number = 0;
    public userInfo: any = {};  //用户其它信;
    public userCookies = ""; //Cookies
    public userRole: emAuthorRole = emAuthorRole.noneRole;
    public static initTokenInfo(qTokenInfo: TTokenInfo): void {
        qTokenInfo.isLogin = false; //是否登陆
        qTokenInfo.tokenID = "";  //交互token
        qTokenInfo.privateKey = "";  //用户私钥
        qTokenInfo.userID = "";   //用户ID
        qTokenInfo.userName = "游客"; //用户名称
        // qTokenInfo.loginCode = ""; //不清保留
        qTokenInfo.loginPass = ""; //用户密码
        qTokenInfo.userInfo = {};  //用户其它信息
        qTokenInfo.userCookies = ""; //Cookies
        //清locastarol
        localStorage.removeItem(TTokenInfo.storageName);
    }
    public static saveLocalStorage(qTokenInfo: TTokenInfo): void {
        localStorage.setItem(TTokenInfo.storageName, JSON.stringify(qTokenInfo));
        let lTempStr = localStorage.getItem(TTokenInfo.storageName);
    }
    public static loadLocalStorage(): TTokenInfo {
        let lJsonStr = localStorage.getItem(TTokenInfo.storageName);
        if (lJsonStr != null) {
            let lTokenInfo: TTokenInfo;
            lTokenInfo = JSON.parse(lJsonStr) as TTokenInfo;
            let lNow = Date.now();
            //不存在最后交互时间和已经无交互超过半小时
            if (!lTokenInfo.lastTime || (lNow - lTokenInfo.lastTime) >= 30 * 60 * 1000) {
                return new TTokenInfo();
            }
            return lTokenInfo;
        } else {
            return new TTokenInfo();
        }

    }
}

export const defaultTag: IMenuItem = {
    menuIndexName: "-1", //索引值一般是唯一的
    menuComponent: '',  //挂载的组件
    menuTitle: '',  //标题
    menuIcon: '',//图标
    menuParams: {},//参数
    menuChildren: []
};
export interface IMenuItem {
    menuIndexName: string;  //索引值一般是唯一的，同个控件indexName不同就可以多开
    menuComponent: string;  //挂载的组件
    menuTitle: string;  //标题
    menuIcon: string; //图标
    menuParams: any; //参数
    menuChildren: IMenuItem[]; //子菜单
}
export class TMenuList {
    itemTags: IMenuItem[] = [];
}
//菜单
export const menuList: IMenuItem[] = [
    {
        menuIndexName: "TDashboard",
        menuComponent: "TDashboard",
        menuTitle: "主页",
        menuIcon: "el-icon-s-home",
        menuParams: {},
        menuChildren: [],
    },
    {
        menuIndexName: "TDashboard2",
        menuComponent: "TDashboard",
        menuTitle: "主页2-多开测试",
        menuIcon: "el-icon-s-home",
        menuParams: {},
        menuChildren: [],
    },
    {
        menuIndexName: "TAbout",
        menuComponent: "TAbout",
        menuTitle: "关于",
        menuIcon: "el-icon-s-home",
        menuParams: { "参数1": "值1" },
        menuChildren: [],
    },
];
export default createStore({
    state: {
        menuList: menuList,
        tagsList: new TMenuList(),
        indexTag: defaultTag,
        collapse: false,
        tokenInfo: new TTokenInfo(),
    },
    mutations: {
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})
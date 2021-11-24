
import {
    TModuleResultDataInfo, TFastApiRequest, TResult, TBaseUser, IResult, TModuleBase,
    TModuelInfo, TDBHelper, TWXAccount, TWXMenu, TWXUserBind, TModuleField,
    TWXAuthorResult, TModuleFileSet, TProcessSet, TProcessSetInfo, TProcesSetStep, TFileReturn
} from "./BaseClass"
import { THTTPRequest, TResultFormat } from "./helper/HTTPClient"
import { TGlobal } from "./helper/GlobalHelper"
import store, { TTokenInfo } from "@/store";
import { TStringHelper } from "./helper/StringHelper";

export default class TBaseAPI {
    public static createNewModuleInfo(): TFastApiRequest {
        return new TFastApiRequest();
    }
    //快速交互API
    public static async fastAPI(qModuleInfo: TFastApiRequest): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/FastModule");
        lRequest.data = qModuleInfo;
        if (TStringHelper.stringIsEmptyYW(qModuleInfo.dbCode)) {
            qModuleInfo.dbCode = TGlobal.dbCode;
        }
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //模板管理
    public static async getModuleList(): Promise<IResult<TModuleBase[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleList");
        lRequest.data = {}
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取模块信息
    public static async getModuleInfo(qModuleID: string): Promise<IResult<TModuelInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleInfo/" + qModuleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存模块信息
    public static async saveModuleInfo(qModuleInfo: TModuelInfo): Promise<IResult<TModuelInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/SaveModuleInfo");
        lRequest.data = qModuleInfo
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //添加模板
    public static async addModule(qAdd: TModuleBase): Promise<IResult<TModuleBase>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/AddModule");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除模板
    public static async delModuleInfo(qModuleID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/DelModuleInfo/" + qModuleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新服务端模板
    public static async initModule(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/InitModule");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //跟据表名获取字段
    public static async GetDataFields(qTableName: string): Promise<IResult<TModuleField[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetDataFields/" + qTableName);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取服务端账套配置
    public static async getDBList(): Promise<IResult<TDBHelper>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/GetDBList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存服务端账套配置
    public static async saveDBList(qDBHelper: TDBHelper): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/SaveDBList");
        lRequest.data = qDBHelper;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新服务端账套配置
    public static async refreshDBList(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/RefreshDBList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //初始化账套基本数据库
    public static async initDBFirst(qDBCode: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/InitDBFirst/" + qDBCode);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //用户角色登陆
    public static async userLogin(qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TTokenInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserLogin");
        lRequest.data = { "loginCode": qLoginCode, "loginPass": qLoginPass, "verCode": verCode }
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        if (lResult.resultSuccess) {
            //写入全局信息
            if (lResult.resultData.tokenID == undefined) {
                lResult.resultSuccess = false;
                lResult.resultMsg = "登陆成功,但返回的信息格式不正确【" + JSON.stringify(lResult.resultData) + "】";
            }
            else {
                store.state.tokenInfo.isLogin = true;
                store.state.tokenInfo.tokenID = lResult.resultData.tokenID;
                store.state.tokenInfo.privateKey = lResult.resultData.privatekey;
                store.state.tokenInfo.loginCode = lResult.resultData.loginCode;;
                store.state.tokenInfo.userID = lResult.resultData.userID;
                store.state.tokenInfo.userName = lResult.resultData.userName;
                store.state.tokenInfo.loginTime = Date.now();
                store.state.tokenInfo.lastTime = store.state.tokenInfo.loginTime;
                if (TStringHelper.stringIsEmpty(store.state.tokenInfo.privateKey)) {
                    store.state.tokenInfo.privateKey = "";
                }
                //保存到缓存
                TTokenInfo.saveLocalStorage(store.state.tokenInfo);
            }
        }
        return lResult;
    }
    //用户角色注册
    public static async userRegister(qUserInfo: TBaseUser): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserRegister");
        lRequest.data = qUserInfo;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //用户角色登出
    public static async userLoginOut(qUserInfo: TTokenInfo): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserLoginOut");
        lRequest.data = qUserInfo;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        if (lResult.resultSuccess) {
            //重新赋值一个新的
            TTokenInfo.initTokenInfo(qUserInfo);
        }
        return lResult;
    }
    //用户角色更改密码
    public static async userChangePass(qOldPass: string, qNewPass: String): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserChangePass");
        lRequest.data = "oldPass=" + qOldPass + "&newPass=" + qNewPass;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //用户绑定 FFaceFileID
    public static async userFaceFileIDBind(qFileID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserFaceFileIDBind");
        lRequest.url = TStringHelper.urlJoinParams(lRequest.url, "fileID", qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //*********************文件配置****************************//
    public static async getModuleFileSetList(): Promise<IResult<TModuleFileSet[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleFileSetList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存文件配置
    public static async saveModuleFileSet(qFileSet: TModuleFileSet): Promise<IResult<TModuleFileSet>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/SaveModuleFileSet");
        lRequest.data = qFileSet;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除文件配置
    public static async delModuleFileSet(qFileSetID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/DelModuleFileSet/" + qFileSetID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //************************文件上传*************************/
    //FormData参数 jobID:关联业务ID，detailID:关联业务明细ID，remark:备注,
    //customerTag:自定义内容
    public static async uploadFile(qFormData: FormData): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/PostFile");
        lRequest.data = qFormData;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //文件预览 url路径:/OneService/FileHelper/BrowserFileByID
    public static BrowserFileByID(qFileID: string, qFileCode: string = ""): string {
        let lUrl = TGlobal.urlCombination("/OneService/FileHelper/BrowserFileByID");
        lUrl = lUrl + "?fileID=" + qFileID;
        if (qFileCode != "") {
            lUrl = lUrl + "&fileCode=" + qFileCode;
        }
        return lUrl;
    }
    //文件下载
    public static async DownFileByID(qFileID: string, qFileCode: string = "") {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew(true);
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DownFileByID");
        lRequest.url = lRequest.url + "?fileID=" + qFileID;
        if (qFileCode != "") {
            lRequest.url = lRequest.url + "&fileCode=" + qFileCode;
        }
        lRequest.data = {};
        lRequest.resultFormat = TResultFormat.fileDown;
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //文件删除,删除记录加文件
    public static async DelFileByID(qFileID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DelFileByID/" + qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //文件删除,删除记录但不删除文件
    public static async DelFileToHis(qFileID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DelFileToHis/" + qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetFileIDByJobID(qJobID: string): Promise<IResult<TFileReturn[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/GetFileIDByJobID/" + qJobID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //人脸--图片判断是不是人脸
    public static async faceCheckByFileID(qFileID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceCheckByFileID");
        lRequest.url = TStringHelper.urlJoinParams(lRequest.url, "fileID", qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //人脸--图片人脸对比
    public static async faceCompare(qSourceFile: string, qDestFile: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceCompare");
        lRequest.setHeadersUrlencoded();
        lRequest.data = "sourceFile=" + qSourceFile + "&destFile=" + qDestFile;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async faceTokenAuthor(qDestFile: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceTokenAuthor");
        lRequest.setHeadersUrlencoded();
        lRequest.data = "destFile=" + qDestFile;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //**************流程步骤相关API**************/
    public static async GetProcessSetList(): Promise<IResult<TProcessSet[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/GetProcessSetList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveProcessSet(qSet: TProcessSet): Promise<IResult<TProcessSet>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/SaveProcessSet");
        lRequest.data = qSet;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetProcessSetInfo(): Promise<IResult<TProcessSetInfo[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/GetProcessSetInfo");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveSetSetp(qAdd: TProcesSetStep): Promise<IResult<TProcesSetStep[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/SaveSetSetp");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //**************微信相关API*********************/
    public static async GetWXAccountList(): Promise<IResult<TWXAccount[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetAccountList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetWXAccountByID(qAccountID: string): Promise<IResult<TWXAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetAccountByID/" + qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存微信配置
    public static async SaveWXAccount(qAdd: TWXAccount): Promise<IResult<TWXAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/SaveAccount");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除微信配置
    public static async DelWXAccountByID(qAccountID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/DelAccountByID/" + qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新配置
    public static async InitWXAccountList(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/InitAccountList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取微信菜单
    public static async GetWXMenuListByAppID(qWXAppID: string): Promise<IResult<TWXMenu[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/GetWXMenuListByAppID/" + qWXAppID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetWXMenuByMenuID(qWXMenuID: string): Promise<IResult<TWXMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/GetWXMenuByMenuID/" + qWXMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async DelWXMenuByMenuID(qWXMenuID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/DelWXMenuByMenuID/" + qWXMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveWXMenu(qAdd: TWXMenu): Promise<IResult<TWXMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/SaveWXMenu");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //推送微信菜单到微信服务器
    public static async PushWXMenuAsync(qWXAppID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/PushWXMenuAsync/" + qWXAppID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取微信账号信息
    public static async GetWXUserInfoByAuthorCode(WXCode: string, WXState: string): Promise<IResult<TWXAuthorResult>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/GetUserInfoByAuthorCode");
        lRequest.data = { code: WXCode, state: WXState };
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取绑定用户账号，可能一个微信号绑多个用户,跟据 WXState(安全，登陆用完即抛弃)
    public static async GetWXBindList(WXState: string): Promise<IResult<TWXUserBind[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/GetWXBindList/" + WXState);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //微信登陆
    public static async WXUserLogin(WXState: string, WXBindID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/WXUserLogin");
        lRequest.data = { code: "", state: WXState, bindID: WXBindID };
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        if (lResult.resultSuccess) {
            //写入全局信息
            if (lResult.resultData.tokenID == undefined) {
                lResult.resultSuccess = false;
                lResult.resultMsg = "登陆成功,但返回的信息格式不正确【" + JSON.stringify(lResult.resultData) + "】";
            }
            else {
                store.state.tokenInfo.isLogin = true;
                store.state.tokenInfo.tokenID = lResult.resultData.tokenID;
                store.state.tokenInfo.privateKey = lResult.resultData.privatekey;
                store.state.tokenInfo.loginCode = lResult.resultData.loginCode;;
                store.state.tokenInfo.userID = lResult.resultData.userID;
                store.state.tokenInfo.userName = lResult.resultData.userName;
                store.state.tokenInfo.loginTime = Date.now();
                store.state.tokenInfo.lastTime = store.state.tokenInfo.loginTime;
                if (TStringHelper.stringIsEmpty(store.state.tokenInfo.privateKey)) {
                    store.state.tokenInfo.privateKey = "";
                }
                //保存到缓存
                TTokenInfo.saveLocalStorage(store.state.tokenInfo);
            }
        }
        return lResult;
    }
}
import { THTTPRequest } from "@/baselib/helper/HTTPClient"
import { TGlobal } from "@/baselib/helper/GlobalHelper"
import { IResult, TResult } from "@/baselib/BaseClass";
import {
    TBaseAdmin, TBaseCompany, TBaseCompanyClass, TBaseLsh,
    TBaseRight, TBaseRole, TMenuItem, TPersonRightCompany, TPersonRole, TRoleRightItem
} from "./BaseRightClass";
import store, { IMenuItem, TTokenInfo } from "@/store";
import { TStringHelper } from "../helper/StringHelper";
export default class TBaseRightAPI {
    //***************************组织架构 *********************/
    //获取结构类型
    public static async getCompanyClassList(): Promise<IResult<TBaseCompanyClass[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/GetCompanyClassList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async getCompanyClass(qClassID: string): Promise<IResult<TBaseCompanyClass>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/GetCompanyClass" + "/" + qClassID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存结构类型
    public static async saveCompanyClass(qCompanyClass: TBaseCompanyClass): Promise<IResult<TBaseCompanyClass>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/SaveCompanyClass");
        lRequest.data = qCompanyClass;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除结构色类型
    public static async delCompanyClass(qClassID: string): Promise<IResult<TBaseCompanyClass>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/DelCompanyClass/" + qClassID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取组织架构
    public static async getCompanyList(): Promise<IResult<TBaseCompany[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/GetCompanyList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async getCompany(qCompanyID: string): Promise<IResult<TBaseCompany>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/GetCompany" + "/" + qCompanyID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存组织架构
    public static async saveCompany(qCompany: TBaseCompany): Promise<IResult<TBaseCompany>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/CompanyHelper/SaveCompany");
        lRequest.data = qCompany;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //***************************角色 *********************/
    public static async getRoleList(): Promise<IResult<TBaseRole[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleHelper/GetRoleList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async getRole(qRoleID: string): Promise<IResult<TBaseRole>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleHelper/getRole" + "/" + qRoleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async saveRole(qBaseRole: TBaseRole): Promise<IResult<TBaseRole>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleHelper/SaveRole");
        lRequest.data = qBaseRole;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //***************************角色菜单相关（管理员） *********************/
    //
    public static async initSystemMenuList(): Promise<IResult<string>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/MenuHelper/InitSystemMenuList");
        lRequest.data = store.state.menuList;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取角色菜单
    public static async getRoleMenuList(qRoleID: string): Promise<IResult<TMenuItem[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/MenuHelper/GetRoleMenuList/" + qRoleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async saveRoleMenu(qRoleID: string, qIndexNames: string[]): Promise<IResult<TMenuItem[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew(true); //创建表单数据
        lRequest.url = TGlobal.urlCombination("/OneService/MenuHelper/SaveRoleMenu");
        //"roleID="+qRoleID+"&indexNames="+qIndexNames
        lRequest.data = "roleID=" + qRoleID + "&indexNames=" + qIndexNames;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //***************************操作员（管理员） *********************/
    //操作员登陆
    public static async adminLogin(qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TTokenInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/AdminHelper/AdminLogin");
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
                store.state.tokenInfo.userRole = lResult.resultData.userRole;
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
    //获取操作员
    public static async getAdminList(): Promise<IResult<TBaseAdmin[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/AdminHelper/GetAdminList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async getAdmin(qAdminID: string): Promise<IResult<TBaseAdmin>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/AdminHelper/GetAdmin/" + qAdminID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async saveAdmin(qBaseAdmin: TBaseAdmin): Promise<IResult<TBaseAdmin>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/AdminHelper/AdminSave");
        lRequest.data = qBaseAdmin;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //********************权限管理 *************/
    public static async getControllerToDB(): Promise<IResult<string>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/GetControllerToDB");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //获取角色权限
    public static async getRoleRightList(qRoleID: string): Promise<IResult<TRoleRightItem[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/GetRoleRightList/" + qRoleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存角色权限
    public static async saveRoleRigt(qRoleID: string, qRightIDs: string[]): Promise<IResult<string[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew(true); //创建表单数据
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/saveRoleRigt");
        //"roleID="+qRoleID+"&indexNames="+qIndexNames
        lRequest.data = "roleID=" + qRoleID + "&rightIDs=" + qRightIDs;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async InitRoleRight(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/InitRoleRight");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取权限
    public static async getRight(qRightID: string): Promise<IResult<TBaseRight>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/GetRight/" + qRightID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async saveRight(qRight: TBaseRight): Promise<IResult<TBaseRight>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/RoleRightHelper/SaveRight");
        lRequest.data = qRight;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取个人数据权限
    public static async getPersonRightCompanyList(qPersonID: string): Promise<IResult<TPersonRightCompany[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/GetPersonRightCompanyList/" + qPersonID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取个人公司，分公司结构
    public static async GetPersonCompanyBranchTreeByToken(): Promise<IResult<TPersonRightCompany[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/GetPersonCompanyBranchTreeByToken");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取个人公司，分公司结构 id,pid,treecode模式
    public static async GetPersonCompanyBranchListByToken(): Promise<IResult<TPersonRightCompany[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/GetPersonCompanyBranchListByToken");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //保存个人数据权限
    public static async savePersonRightCompany(qPersonRightCompany: TPersonRightCompany): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/SavePersonRightCompany");
        lRequest.data = qPersonRightCompany;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取个人角色
    public static async GetPersonRoleList(qPersonID: string): Promise<IResult<TPersonRole[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/GetPersonRoleList/" + qPersonID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存个人角色权限
    public static async SavePersonRole(qPersonRole: TPersonRole): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/SavePersonRole");
        lRequest.data = qPersonRole;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //登陆用户获授权后的菜单
    public static async GetUserMenuListByToken(): Promise<IResult<TMenuItem[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew(); //创建表单数据
        lRequest.url = TGlobal.urlCombination("/OneService/MenuHelper/GetUserMenuListByToken");
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async RefreshPersonRight(qPersonID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/PersonRightHelper/RefreshPersonRight/" + qPersonID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //******************流水号相关**************/
    public static async GetLshList(): Promise<IResult<TBaseLsh[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/LshHelper/GetLshList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveLsh(qAdd: TBaseLsh): Promise<IResult<TBaseLsh[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/LshHelper/SaveLsh");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async InitLshManage(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/LshHelper/InitLshManage");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

}
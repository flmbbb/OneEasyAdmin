//一些公共的类
export enum emAuthorRole { noneRole, userRole, operatorRole, adminRole, superRole }
//FastAPI请求成功后回来的数据集信息
export class TModuleResultDataInfo {
    iTotal: number = 0; //如果有分页的情况,代表总记录数
    iData: number = 0;  //代表返回几个数据集
    iPageIndex: number = 0;  //代表当前第几页
    iPageSize: number = 0; //代表每页最大条数
    iRow: number = 0; //当前数据有几条
    datas: any = []; //当前数据
    params: any = {};
    jsonFormat: string = "";
}
//本地分页信息,无法与服务端对接 因为  get pageSize是无法转化成属性的
//JSON系列化会把 _pageSize系列化进去,但GET SET 属性是不会的
export class TPageInfo {
    private _pageSize: number = 50; //每页条数
    public pageSizeOption: number[] = [20, 50, 100, 200]; //每页条数选择
    public pageIndex: number = 1;  //当前第几页
    public _pageTotal: number = 0;  //总条数
    public pageCount: number = 0; //总页数
    public get pageSize() {
        return this._pageSize;
    }
    public set pageSize(iSize: number) {
        if (iSize <= 0) {
            iSize = 50;
        }
        if (this._pageTotal < 0) {
            this._pageTotal = 0;
        }
        //
        if (iSize != this._pageSize) {
            this._pageSize = iSize
            this.pageIndex = 0;
            this.pageCount = Math.ceil(this._pageSize / iSize); //向上取整
        }
    }
    public get pageTotal(): number {
        return this._pageTotal;
    }
    public set pageTotal(iTotal: number) {
        if (iTotal <= 0) {
            iTotal = 0;
        }
        this._pageTotal = iTotal;
        if (this._pageSize <= 0) {
            this._pageSize = 50;
        }
        this.pageCount = Math.ceil(this._pageTotal / this._pageSize); //向上取整
        if (this.pageIndex > this.pageCount) {
            this.pageIndex = this.pageCount;
        }
    }
}

export interface IPageRequest {
    pageSize: number;
    pageIndex: number;
    filters: any;
}
//FastAPI请求参数集合
export class TFastApiRequest {
    public moduleCode: string = "";
    public moduleDatas: any = {};
    public moduleParams: any = {};
    public pageIndex: number = 0;
    public pageSize: number = 0;
    public dbCode: string = "";
    public initInfo() {
        this.moduleCode = "";
        this.moduleDatas = {};
        this.moduleParams = {};
        this.pageIndex = 0;
        this.pageSize = 0;
        this.dbCode = "";
    }
}

export interface IResult<T> {
    resultSuccess: boolean;
    resultCode: string;
    resultMsg: string;
    resultData: T;
    resultDataPageCount: number;
    resultFormat: string;
    resultModuleDataInfo: TModuleResultDataInfo;
}

//结果集
export class TResult {
    public resultSuccess: boolean = false;
    public resultCode: string = "";
    public resultMsg: string = "";
    public resultData: any = null;
    public resultDataPageCount: number = 0; //分页时返回数据总条数，
    public resultFormat: string = "json"; //string(字符串),jsonstring(JSON格式字符串),json(json);
    public resultModuleDataInfo: TModuleResultDataInfo = new TModuleResultDataInfo(); //快速接口FastApi信息多是放在resultData里面,  包括页数等信息，一般取第一个数据集时用的
    static createNew(): TResult {
        return new TResult();
    }
    public getData(qDataName: string = "data1"): any {
        let lDataInfo = new TModuleResultDataInfo();
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 1) {
            tempInfo = this.resultData[lKeys[0]];
            this.resultModuleDataInfo = tempInfo;
        } else {
            tempInfo = this.resultData[qDataName];
        }
        return tempInfo["datas"];
    }
    public getDataIndex(qIndex: number = 0): any {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length < qIndex + 1) {
            throw "数据集总共:" + lKeys.length;
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        if (qIndex == 0) {
            this.resultModuleDataInfo = tempInfo;
        }
        return tempInfo["datas"];
    }
    public getFirstRow(qIndex: number = 0): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空"
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        let lFirst = tempInfo["datas"];
        return lFirst[0];
    }
    public getFirstValue(): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空"
            return;
        }
        tempInfo = this.resultData[lKeys[0]];
        let lFirst = tempInfo["datas"];
        lFirst = lFirst[0];
        let lFirstKey = "";
        for (var key in lFirst) {
            return lFirst[key];
        }
    }
    //上传文件返回来的文件信息
    public getFileReturn(qIndex: number = 0): TFileReturn {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let lFileReturn: TFileReturn;
        let lResultArry = this.resultData as [];
        if (lResultArry.length >= qIndex) {
            lFileReturn = lResultArry[qIndex];
            return lFileReturn;
        } else {
            return new TFileReturn();
        }
    }
    //
    public getDataT<T>(): IResult<T> {
        return this as IResult<T>;
    }
}

//
export class TBaseUser {
    FUserCode: string = "";
    FUserName: string = "";
    FUserTel: string = "";
    FUserPass: string = "";
    FUserMail: string = "";
    FUserBirthday: string = "";
    FUserSex: string = "";
}

export class TFileReturn {
    fileID: string = "";
    fileName: string = "";
    filePath: string = "";
    httpUrl: string = "";
    fileType: string = "";
    fileSize: number = 0;
    jobID: string = "";
    detailID: string = "";
}


export const constHelper = {
    TMyOpenMode: [{
        "value": "openData",
        "label": "跟据SQL打开数据"
    },
    {
        "value": "openTable",
        "label": "跟据表名打开数据"
    },
    {
        "value": "doStored",
        "label": "执行存储过程"
    }, {
        "value": "doSQLStored",
        "label": "跟据SQL执行存储过程"
    },
    {
        "value": "doDML",
        "label": "执行DML语句"
    },
    {
        "value": "doSave",
        "label": "保存数据"
    }
    ],
    TMyDataType: [{
        "value": "字符串",
        "label": "字符串"
    }, {
        "value": "数字",
        "label": "数字"
    }, {
        "value": "时间",
        "label": "时间"
    }, {
        "value": "布尔",
        "label": "布尔"
    }],
    TMyFilterMode: [{
        "value": "单字段过滤",
        "label": "单字段过滤"
    }, {
        "value": "自定义SQL",
        "label": "自定义SQL"
    }, {
        "value": "多字段过滤",
        "label": "多字段过滤"
    }, {
        "value": "值选择SQL",
        "label": "值选择SQL"
    }],
    TMyDataJsonFormat: [{
        "value": "jsonObject",
        "label": "json对象"
    },
    {
        "value": "jsonArray",
        "label": "json数组"
    }
    ],
    TMyFilterExpression: [{
        "value": "=",
        "label": "等号"
    }, {
        "value": ">",
        "label": "大于"
    }, {
        "value": "<",
        "label": "小于"
    }, {
        "value": ">=",
        "label": "大于等于"
    }, {
        "value": "<=",
        "label": "小于等于"
    }, {
        "value": "in",
        "label": "包含"
    }, {
        "value": "notin",
        "label": "不包含"
    }, {
        "value": "like",
        "label": "相似"
    }, {
        "value": "likeL",
        "label": "左相似"
    }, {
        "value": "likeR",
        "label": "右相似"
    }],
    TMyValueDefaultType: [{
        "value": "json值",
        "label": "json值"
    },
    {
        "value": "系统值",
        "label": "系统值"
    },
    {
        "value": "token信息",
        "label": "token信息"
    },
    {
        "value": "默认值",
        "label": "默认值"
    },
    {
        "value": "SQL取值",
        "label": "SQL取值"
    },
    {
        "value": "步骤取值",
        "label": "步骤取值"
    },
    {
        "value": "父数据取值",
        "label": "父数据取值"
    }],
    TMyValueDefaultValue: [{
        "value": "GUID32",
        "label": "系统值-取GUID"
    },
    {
        "value": "UnionID",
        "label": "系统值-执行ID"
    },
    {
        "value": "SystemTime",
        "label": "系统值-获取时间"
    },
    {
        "value": "TokenID",
        "label": "token信息-tokenID"
    },
    {
        "value": "TokenUserID",
        "label": "token信息-用户信息ID"
    },
    {
        "value": "TokenTryUserID",
        "label": "token信息-用户信息ID可为空"
    },
    {
        "value": "TokenUserName",
        "label": "token信息-用户信息名称"
    },
    {
        "value": "TokenFaceAuthor",
        "label": "token信息-人脸授权"
    }, {
        "value": "TokenWXOpenID",
        "label": "token信息-公众号用户ID"
    }, {
        "value": "TokenWXAppID",
        "label": "token信息-公众号AppID"
    }],
    TMYDBType: [{
        "value": "sqlserver",
        "label": "微软数据库"
    }, {
        "value": "mysql",
        "label": "mysql数据库"
    },
    {
        "value": "sqlite",
        "label": "sqlite数据库"
    },
    {
        "value": "oracle",
        "label": "oracle数据库"
    },
    {
        "value": "postgresql",
        "label": "pg数据库"
    }],
    TMYFileYMDRoot: [{
        "value": "YMD",
        "label": "格式20210605"
    }, {
        "value": "Y",
        "label": "格式2021"
    },
    {
        "value": "YM",
        "label": "格式202106"
    },
    {
        "value": "YMDH",
        "label": "格式20210615"
    },
    {
        "value": "NONE",
        "label": "无格式"
    }],
    TMYWXMenuType: [{
        "value": "menu",
        "label": "菜单"
    }, {
        "value": "view",
        "label": "页面URL"
    }, {
        "value": "click",
        "label": "事件触发"
    }],
    TMYDataFormat: [{
        "value": "yyyy-MM-dd HH:mm:ss",
        "label": "年-月-日 时:分:秒"
    }, {
        "value": "yyyy-MM-dd",
        "label": "年-月-日"
    }, {
        "value": "yyyyMMdd",
        "label": "年月日"
    },
    {
        "value": "UTCSeconds",
        "label": "UTC时间单位秒"
    },
    {
        "value": "UTCMilSeconds",
        "label": "UTC时间单位毫秒"
    }]
}

//*********模板信息**********//
export class TModuleField {
    public FFieldID: string = "";
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 0;
    public FFieldName: string = "";
    public FFieldJsonName: string = "";
    public FFieldCaption: string = "";
    public FFieldDataType: string = "字符串";
    public FFieldSiz: number = 0;
    public FFieldPrecision: number = 0;
    public FFieldProvidFlag: string = "";
    public FFieldDefaultType: string = "";
    public FFieldDefaultValue: string = "";
    public FFieldFormat: string = "";
    public FFieldNullValue: string = "";
    public FSetValueIfEmpty: boolean = false;
    public FFieldbValue: boolean = false;
    public myTempID: string = "";
}

export class TModuleFilter {
    public FFilterID: string = "";
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 1;
    public FFilterName: string = "";
    public FFilterJsonName: string = "";
    public FFilterCaption = "新建条件";
    public FFilterField: string = "";
    public FFilterDataType = "字符串";
    public FFilterExpression = "=";
    public FFilterFormat: string = "";
    public FFilterbMust: boolean = false;
    public FFilterbValue: boolean = false;
    public FFilterDefaultType: string = "";
    public FFilterDefaultValue: string = "";
    public FFilterMode: string = "单字段过滤";
    public FFilterItemsType: string = "";
    public FFilterItemsValue: string = "";
    public FFilterSQL = "";
    public FbOutParam: boolean = false;
    public FOutTrueValue: string = "";
    public FIsOutMsg: boolean = false;
    public myTempID = "";
}

export class TModuleDataSet {
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 1;
    public FDataName: string = "";
    public FDataCaption = "新建数据";
    public FDataZTCode: string = "";
    public FDataSQL: string = "";
    public FDataOpenMode = "openData";
    public FDataTableName: string = "";
    public FDataPrimaryKey: string = "";
    public FDataPageSize: number = 0;
    public FDataJsonFormat: string = "";
    public FMaxAffectRows: number = 0;
    public FMustAffectRows: number = 0;
    public fieldList: TModuleField[] = [];
    public filterList: TModuleFilter[] = []
    public children: TModuleDataSet[] = [];
    public myTempID = "";
};

export class TModuleFileSet {
    public FSetID: string = "";
    public FOrderNo: number = 0;
    public FFileCode: string = "";
    public FSetCaption: string = "";
    public FPhysicalPath: string = "";
    public FHttpRoot: string = "";
    public FIsWeb = true;
    public FIsUse = true;
    public FAutoYMDRoot = "YMD";
    //
    public FIsDefault: boolean = false;
    public FIsBaseFile: boolean = false;
    public FDBCode: string = "";
    public FTableName: string = "";
    public FFileIDField: string = "";
    public FFileNameField: string = "";
    public FFileTypeField: string = "";
    public FFileSizeField: string = "";
    public FFilePathField: string = "";
    public FFileTimeField: string = "";
    public FFileHttpField: string = "";
    public FJobField: string = "";
    public FDetailField: string = "";
    public FRemarkField: string = "";
    public FCustomerTagField: string = "";

}
export class TModuleBase {
    public FModuleID: string = "";
    public FPModuleID: string = "";
    public FTreeCode: string = "";
    public FModuleCode = "接口代码";
    public FModuleCaptoin: string = "";
    public FModuleAuthor: string = "";
    public FbUse = true;
};
export class TModuelInfo {
    public moduleBase: TModuleBase = new TModuleBase();
    public moduleDataList: TModuleDataSet[] = [];
    public delIDs: string[] = [];
}
//*********数据库或账套信息 *************/
export class TDBInfo {
    public dbCode: string = "新建代码"; //数据库代码 必需，每个连接一个代码且不能重复 全小写
    public dbType: string = "sqlserver"; //数据库类型 sqlserver|mysql|sqlite|oracle|postgresql  必需
    public dbVersin: string = "2019"; //数据库版本;可以不管
    //数据库连接字符串 以SQLSERVER为例其它参考 https://www.donet5.com/Doc/1/1218 数据库特色
    public connectionString: string = "server=XXX;uid=XX;pwd=XXX;database=XXX"; //数据库连接字符串必需，
    public initPool: number = 0; //待扩展
    public maxPool: number = 0;
    public tempID: string = "";
}
export class TZTInfo {
    public ztCode: string = ""; //账套 必需;每个账套一个代码 且不能重复 全小写
    public masterDBCode: string = ""; //挂勾的主数据库 数据库代码
    public slaveDBCodeList: string[] = [];//从数据库["mssql1";"mssql2";"mssql3"] 这样。
    public tempID = ""
}
export class TDBHelper {
    public dbList: TDBInfo[] = [];
    public ztList: TZTInfo[] = [];
    public mainZTCode: string = "";
    public adminZTCode: string = "";
}
//
export class TLogSet {
    public logHTTP: string = "0"; //是否记录HTTP日记
    public logSQL: string = "0"; //是否记录SQL日记
    public logToDB: string = "0"; //是否把日记写到SQL
    public logDBCode: string = ""; //日记账套
}
//
export class TWXAccount {
    public FAccountID: string = "";
    public FSourceID: string = "";
    public FAppID: string = "";
    public FAppSecret: string = "";
    public FMessageToken: string = "";
    public FMessageEncodingAESKey: string = "";
    public FAccessTokenExpireIn: number = 0;
    public FAccessToken: string = ""
    public FAccessTokenLastTime: string = "";
    public FGetAuthorCodeUrl: string = "";
    public FErrWebUrl: string = "";
}
//
export class TWXMenu {
    public FMenuID: string = "";
    public FPMenuID: string = "";
    public tempPMenuID: any;
    public FTreeCode: string = "";
    public FWXAppID: string = "";
    public FMenuType: string = "";
    public FMenuName: string = "";
    public FMenuKey: string = "";
    public FMenuUrl: string = "";
    public FMenuMiniAppid: string = "";
    public FMenuMiniPagepath: string = "";
    public children: TWXMenu[] = [];
}
export class TWXUser {
    public appid: string = "";
    public openid: string = "";
    public nickname: string = "";
    public sex: string = "";
    public province: string = "";
    public city: string = "";
    public country: string = "";
    public headimgurl: string = "";
    public privilege: string = "";
    public unionid: string = "";
    public isDeveloper: boolean = false;//在基础表wx_user设置 FIsDeveloper
}
export class TWXAuthorResult {
    user: TWXUser = new TWXUser();
    cmdParams: any;
}

export class TWXUserBind {
    public FBindID: string = "";
    public FYWUserType: string = "";
    public FYWUserTypeName: string = "";
    public FYWUserID: string = "";
    public FYWUserName: string = "";
}
//步骤
export class TProcessSetInfo {
    FProcessSet: TProcessSet = new TProcessSet();
    FSetStepList: TProcesSetStep[] = [];
}
export class TProcessSet {
    public FSetID: string = "";
    public FSetCode: string = "";
    public FSetName: string = "";
    public FTableName: string = "";
    public FKeyFieldName: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public FIsUse: boolean = false;
}
export class TProcesSetStep {
    public FSetStepID: string = "";
    public FPSetStepID: string = "";
    public FTreeCode: string = "";
    public FSetID: string = "";
    public FStepName: string = "";
    public FStepMode: string = "";
    //
    public FStepConditions: string = ""; //条件
    public FModuleID: string = ""; //节点挂勾什么模块做什么事
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public FModifyName: string = "";
    public FModifyTime: string = "";
}

//函数类型定义
export type evenDataSetIndexChange = (qDataSet: TModuleDataSet) => void; //事件回调
export type evenDels = (qID: string) => void; //事件回调

export class TBaseCompanyClass {
    public FClassID: string = "";
    public FPClassID: string = "";
    public tempPClassID: any;
    public FTreeCode: string = "";
    public FClassName: string = "";
    public FClassType: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public children: TBaseCompanyClass[] = [];
}
export class TBaseCompany {
    public FCompanyID: string = "";
    public FPCompanyID: string = "";
    public tempPCompanyID: any;
    public FCompanyClassID: string = "";
    public tempClassID: any;
    public FCompanyClassName: string = "";
    public FCompanyName: string = "";
    public FCompanyCode: string = "";
    public FTreeCode: string = "";
    public FStatusCode: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public children: TBaseCompany[] = [];
}

export class TBaseRole {
    public FRoleID: string = "";
    public FPRoleID: string = "";
    public tempPRoleID: any;
    public FRoleName: string = "";
    public FTreeCode: string = "";
    public FStatusCode: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public children: TBaseRole[] = [];
}

export class TBaseAdmin {
    public FAdminID: string = "";
    public FAdminCode: string = "";
    public FAdminName: string = "";
    public FAdminTel: string = "";
    public FAdminPass: string = "";
    public FAdminMail: string = "";
    public FAdminBirthday: string = "";
    public FAdminSex: string = "";
    public FCompanyID: string = "";
    public FCompanyName: string = "";
    public FCompanyTreeCode: string = "";
    public tempCompanyID: any;
    public FRemark: string = "";
    public FMyCompanyID: string = "";
    public FMyCompanyName: string = "";
    public FDepartmentID: string = "";
    public FMyDepartmentName: string = "";
    public FFaceFileID: string = "";
    public FRoleID: string = "";
    public tempRoleID: any;
    public FRoleName: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
    public FStatusCode: string = "";
    public FIsAdmin: Boolean = false;
}
export class TBaseRight {
    public FRightID = "";
    public FPRightID = "";
    public FRightCode = "";
    public FRightName = "";
    public FRightType = "";
    public FTreeCode = "";
    public FNamespace = "";
    public FControllerName = "";
    public FActionDescribe = "";
    public FActionName = "";
    public FActionRole = "";
    public FRightScope = "";
    public FCustomerScope = "";
}
export class TMenuItem {
    public menuIndexName: string = "";
    public menuComponent: string = "";
    public menuTitle: string = "";
    public menuIcon: string = "";
    public menuChildren: TMenuItem[] = [];
    public menuStatus: string = "";
}

export class TRoleRightItem {
    //跟据 indexName md5换算出来的
    public FRightID: string = "";
    public FRightName: string = "";
    public FControllerName: string = "";
    public FActionName: string = "";
    public rightChildren: TRoleRightItem[] = [];
    public rightStatus: string = "";
}

export class TPersonRightCompany {
    public FCompanyID: string = "";
    public FPCompanyID: string = "";
    public FPersonID: string = "";
    public FCompanyCode: string = "";
    public FCompanyName: string = "";
    public FCompanyFullName: string = "";
    public FCompanyClassID: string = "";
    public FCompanyClassName: string = "";
    public FCompanyClassType: string = "";
    public FCompanyStatus: string = "";
    public FAddStatus: string = "";
    public FQueryStatus: string = "";
    public FEditStatus: string = "";
    public FDelStatus: string = "";
    public children: TPersonRightCompany[] = [];
}

export class TPersonRole {
    public FRoleID: string = "";
    public FPRoleID: string = "";
    public FPersonID: string = "";
    public FRoleCode: string = "";
    public FRoleName: string = "";
    public FRoleStatus: string = "";
}


export class TBaseLsh {
    public FLshID: string = "";
    public FLshCode: string = "";
    public FLshCaption: string = "";
    public FLshStore: string = ""; //通过存储过程获取Lsh
    public FLshHead: string = "";
    public FLshDateFormat: string = "yyyyMMdd";
    public FLshPrecision: number = 4;
    public FLshMaxNumber: number = 0;
    public FLshRemark: string = "";
    public FCreateTime: string = "";
    public FIsUse: boolean = false;
}


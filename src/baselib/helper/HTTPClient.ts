import axios, { Method } from "axios"
import { TFastApiRequest, TResult } from "../BaseClass"
import store, { TTokenInfo } from "@/store";
import { TStringHelper } from "./StringHelper";
import md5 from 'js-md5';
const TResultCode = {
    resultInit: "0000",
    resultTrue: "0001",
    resultFail: "0002",
}
//定义事件类型
type callBackHTTP = (response: TResult) => void; //事件回调
export enum TResultFormat { json, text, fileDown }

//定义一个请求其相关类容
export class THTTPRequest {
    public url: string = "";  //请求的URL
    public method: Method = 'post';
    public headers: any = { "Content-Type": "application/json" };
    public data: any = null;    //数据
    public onSuccess = function (response: TResult) { }; //执行成功事件
    public onFailed = function (response: TResult) { };  //执行失败事件
    public onError = function (response: TResult) { };  //执行异常事件
    public moduleInfo !: TFastApiRequest;
    public isResult = true;  //返回的是个标准接口格式
    public resultFormat: TResultFormat = TResultFormat.json;
    public fileName: string = "";//当下载文件保存成什么，如果没有的话服务端需暴露 "Access-Control-Expose-Headers", "Content-Disposition"
    //创建一个对象
    static createNew(isForm: boolean = false, qResultFormat: TResultFormat = TResultFormat.json): THTTPRequest {
        let lRequest = new THTTPRequest();
        lRequest.isResult = true; //返回的结果是标准数据
        if (isForm) {
            //表单数据
            lRequest.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            //参数形式如下
            //roleID=参数1值&indexNames=参数2值
        }
        return lRequest;
    }
    static createNewNoResult(isForm: boolean = false): THTTPRequest {
        let lRequest = new THTTPRequest();
        lRequest.isResult = false; //返回的结果自已解析
        if (isForm) {
            //表单数据
            lRequest.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            //参数形式如下
            //roleID=参数1值&indexNames=参数2值
        }
        return lRequest;
    }
    //
    public initModuleInfo() {
        this.moduleInfo = new TFastApiRequest();
        this.data = this.moduleInfo;
    }
    //公共方法
    //"Content-Type": "application/x-www-form-urlencoded"
    public setHeadersUrlencoded() {
        this.headers = { "Content-Type": "application/x-www-form-urlencoded" }
    }
    //快捷方法
    public httpDO() {
        THTTPClient.httpDO(this);
    }

    public get() {
        THTTPClient.httpGet(this);
    }

    public post() {
        THTTPClient.httpPost(this);
    }

    public async httpDoAsync(): Promise<TResult> {
        return await THTTPClient.httpDoAsync(this);
    }

    public async getAsync(): Promise<TResult> {
        return await THTTPClient.httpGetAsync(this);
    }

    public async postAsync(): Promise<TResult> {
        return await THTTPClient.httpPostAsync(this);
    }
}

//HTTP请求
export class THTTPClient {

    public static getFileName(disposition: string = ""): string {
        const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/;
        const asciiFilenameRegex = /filename=(["']?)(.*?[^\\])\1(?:; ?|$)/;

        let fileName: string = "";
        if (utf8FilenameRegex.test(disposition)) {
            let ltemp = utf8FilenameRegex.exec(disposition);
            if (ltemp instanceof Array) {
                fileName = ltemp[1];
                fileName = decodeURIComponent(fileName);
            }
        } else {
            const matches = asciiFilenameRegex.exec(disposition);
            if (matches != null && matches[2]) {
                fileName = matches[2];
            }
        }
        return fileName;
    }
    //URL签名 加全安全性
    public static urlMakeSign(qUrl: string): string {
        if (!store.state.tokenInfo.isLogin) {
            //未登陆,原原本本返回去
            return qUrl;
        }
        let lTimestamp = Date.now();
        if (store.state.tokenInfo.isLogin) {
            store.state.tokenInfo.lastTime = lTimestamp;
        }
        let lSign = store.state.tokenInfo.tokenID + lTimestamp.toString() + store.state.tokenInfo.privateKey;
        lSign = md5(lSign);
        let lSinParams = [];
        lSinParams.push("tokenID=" + store.state.tokenInfo.tokenID);
        lSinParams.push("timestamp=" + lTimestamp);
        lSinParams.push("sign=" + lSign);
        lSign = lSinParams.join("&");
        //判断有没有参数
        if (qUrl.indexOf("?") > 0) {
            //直接拼接在后面
            qUrl = qUrl + "&" + lSign;
        } else {
            qUrl = qUrl + "?" + lSign;
        }
        return qUrl;
    }
    //HTTP请求
    public static httpDO(qRequest: THTTPRequest) {
        //URL处理
        qRequest.url = THTTPClient.urlMakeSign(qRequest.url);
        axios({
            method: qRequest.method,
            url: qRequest.url,
            headers: qRequest.headers,
            data: qRequest.data
        }).then(
            //成功执行的事件
            function (response) {
                if (qRequest.onSuccess != null) {
                    if (qRequest.isResult && response.data.resultCode) {
                        let lResult = TResult.createNew();
                        lResult.resultCode = response.data.resultCode;
                        lResult.resultMsg = response.data.resultMsg;
                        lResult.resultFormat = response.data.resultFormat;
                        lResult.resultData = response.data.resultData;
                        lResult.resultDataPageCount = response.data.resultDataPageCount;
                        if (lResult.resultCode == TResultCode.resultTrue) {
                            lResult.resultSuccess = true;
                            if (qRequest.onSuccess != null) {
                                qRequest.onSuccess(lResult);
                            }
                        } else {
                            if (qRequest.onFailed != null) {
                                qRequest.onFailed(lResult);
                            }
                        }
                    } else {
                        //非标准的Result格式
                        let lResult = TResult.createNew();
                        lResult.resultData = response.data;
                        if (qRequest.onSuccess != null) {
                            qRequest.onSuccess(lResult);
                        }
                    }
                }
            })
            .catch(function (error) {
                if (qRequest.onError != null) {
                    let lResult = TResult.createNew();
                    lResult.resultMsg = "客户端异常消息:" + JSON.stringify(error);
                    qRequest.onError(lResult)
                }
            });
    }
    //HTTP异步请求
    public static async httpDoAsync(qRequest: THTTPRequest): Promise<TResult> {
        //token签名

        qRequest.url = THTTPClient.urlMakeSign(qRequest.url);
        let lResult = TResult.createNew();
        try {
            var response = await axios.request({
                method: qRequest.method,
                url: qRequest.url,
                headers: qRequest.headers,
                data: qRequest.data
            });
            if (response.status == 200) {
                if (qRequest.resultFormat == TResultFormat.fileDown) {
                    if (response.headers['content-type'].indexOf('octet-stream') >= 0) {
                        let lFileName = qRequest.fileName;
                        if (response.headers['content-disposition'] != undefined) {
                            lFileName = THTTPClient.getFileName(response.headers['content-disposition']);
                        }
                        if (TStringHelper.stringIsEmptyYW(lFileName)) {
                            //as bnbn n  lResult.re
                            lResult.resultMsg = "文件名称为空，要么指定要保存的文件名【fileName】，要么服务端开放【content-disposition】返回头";
                            return lResult;
                        }
                        lFileName = decodeURI(lFileName);
                        let lBlob = new Blob([response.data], { type: 'application/octet-stream' })
                        let downloadElement = document.createElement('a')
                        let href = window.URL.createObjectURL(lBlob);//创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = lFileName;//下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click();//点击下载
                        document.body.removeChild(downloadElement);//下载完成移除元素
                        window.URL.revokeObjectURL(href);//释放blob对象
                        lResult.resultSuccess = true;
                        lResult.resultMsg = "下载【" + lFileName + "】文件成功";
                        return lResult;
                    }
                    //如果不是返回的文件，走正常流程
                }
                if (qRequest.isResult && response.data.resultCode) {
                    lResult.resultCode = response.data.resultCode;
                    lResult.resultMsg = response.data.resultMsg;
                    lResult.resultFormat = response.data.resultFormat;
                    lResult.resultData = response.data.resultData;
                    lResult.resultDataPageCount = response.data.resultDataPageCount;
                    if (lResult.resultCode == TResultCode.resultTrue) {
                        lResult.resultSuccess = true;
                    }
                } else {
                    //非标准的Result格式
                    lResult.resultData = response.data;
                }
            }
        } catch (error) {
            if (error != undefined) {
                lResult.resultMsg = "异常错误【" + JSON.stringify(error) + "】";
            } else {
                lResult.resultMsg = JSON.stringify(error);
            }
        } finally {

        }
        return lResult;
    }
    //常用的一些快捷请求
    public static httpGet(qRequest: THTTPRequest, qUrlencoded: boolean = true) {
        qRequest.method = 'get';
        if (qUrlencoded) {
            qRequest.setHeadersUrlencoded();
        }
        THTTPClient.httpDO(qRequest);
    }
    public static httpPost(qRequest: THTTPRequest) {
        qRequest.method = 'post';
        THTTPClient.httpDO(qRequest);
    }
    public static httpPut(qRequest: THTTPRequest) {
        qRequest.method = 'PUT';
        THTTPClient.httpDO(qRequest);
    }
    public static httpDelete(qRequest: THTTPRequest) {
        qRequest.method = 'delete';
        THTTPClient.httpDO(qRequest);
    }
    // async
    public static async httpGetAsync(qRequest: THTTPRequest, qUrlencoded: boolean = true): Promise<TResult> {
        qRequest.method = 'get';
        if (qUrlencoded) {
            qRequest.setHeadersUrlencoded();
        }
        return await this.httpDoAsync(qRequest);
    }
    public static async httpPostAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'post';
        return await this.httpDoAsync(qRequest);
    }
    public static async httpPutAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'PUT';
        return await this.httpDoAsync(qRequest);
    }
    public static async httpDeleteAsync(qRequest: THTTPRequest): Promise<TResult> {
        qRequest.method = 'delete';
        return await this.httpDoAsync(qRequest);
    }
}

export default THTTPClient
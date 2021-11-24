import ElementPlus, { ElLoading, ElMessage, ElMessageBox, ILoadingInstance } from 'element-plus'
export enum elmMsgType { msgSuccess, msgWarning, msgInfo, msgError }
import zhCn from 'element-plus/es/locale/lang/zh-cn'
export interface promptResult {
  isConfirm: boolean;
  value: string;
}
export class TElmMsgHelper {
  public static msgSuccess = elmMsgType.msgSuccess;
  public static msgWarning = elmMsgType.msgWarning;
  public static msgInfo = elmMsgType.msgInfo;
  public static msgError = elmMsgType.msgError;
  public static msgHintAutoClose(qMsg: string, qMsgType: elmMsgType = elmMsgType.msgSuccess, duration: number = 1500) {
    let lType: any = "info";
    switch (qMsgType) {
      case elmMsgType.msgSuccess:
        lType = "success";
        ElMessage.success({ message: qMsg, showClose: true, duration: duration, center: true });
        break;
      case elmMsgType.msgWarning:
        lType = "warning";
        ElMessage.warning({ message: qMsg, showClose: true, duration: duration, center: true });
        break;
      case elmMsgType.msgInfo:
        lType = "info";
        ElMessage.info({ message: qMsg, showClose: true, duration: duration, center: true });
        break;
      case elmMsgType.msgError:
        ElMessage.error({ message: qMsg, showClose: true, duration: duration, center: true });
        lType = "error";
        break;
      default:
        ElMessage.error({ message: qMsg, showClose: true, duration: duration, center: true });
        break;
    }
    // ElMessage.({ message: qMsg, showClose: true, duration: duration, center: true, type: lType });
  }
  public static msgHintNotClose(qMsg: string, qMsgType: elmMsgType = elmMsgType.msgInfo) {
    let lType: any = "info";
    switch (qMsgType) {
      case elmMsgType.msgSuccess:
        lType = "success";
        ElMessage.success({ message: qMsg, showClose: true, duration: 0, center: true });
        break;
      case elmMsgType.msgWarning:
        lType = "warning";
        ElMessage.warning({ message: qMsg, showClose: true, duration: 0, center: true });
        break;
      case elmMsgType.msgInfo:
        lType = "info";
        ElMessage.info({ message: qMsg, showClose: true, duration: 0, center: true });
        break;
      case elmMsgType.msgError:
        lType = "error";
        ElMessage.error({ message: qMsg, showClose: true, duration: 0, center: true });
        break;
      default:
        ElMessage.error({ message: qMsg, showClose: true, duration: 0, center: true });
        break;
    }
    // ElMessage({ message: qMsg, showClose: true, duration: 0, center: true, type: lType });
  }
  public static msgDialog(qMsg: string) {
    ElMessageBox({ title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: false });
  }
  public static msgDialogAutoClose(qMsg: string) {
    ElMessageBox({ title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: true });
    setTimeout(() => {
      ElMessageBox.close();
    }, 3000)
  }

  public static async msgDialogConfirm(qMsg: string): Promise<boolean> {
    let lReulst = await ElMessageBox({
      title: "消息提示", message: qMsg, center: true, showConfirmButton: true, showCancelButton: true,
    }).then();
    return (lReulst == "confirm")
  }

  public static async inputDialog(qValue: string, qTitle: string = "请输入数据"): Promise<promptResult> {
    let lResult: promptResult = { isConfirm: false, value: qValue };
    let lTemp = await ElMessageBox.prompt(qValue, qTitle);
    //'confirm' | 'close' | 'cancel';
    lResult.isConfirm = (lTemp.action == 'confirm');
    if (lResult.isConfirm) {
      lResult.value = lTemp.value;
    }
    return lResult;
  }
  //遮罩层
  public static loadingInstance: ILoadingInstance;
  public static msgLoading(qMsg: string = "") {
    if (qMsg.length == 0) {
      qMsg = "加载中请稍候...";
    }
    //需要注意的是，以服务的方式调用的全屏( fullscreen: true) Loading 是单例的否则每一个弹窗多是独立的实例
    //background: 'rgba(0, 0, 0, 0.7)'
    TElmMsgHelper.loadingInstance = ElLoading.service({ fullscreen: true, text: qMsg });
  }
  public static msgLoadingClose() {
    TElmMsgHelper.loadingInstance.close();
  }
}


export default (app: any) => {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}

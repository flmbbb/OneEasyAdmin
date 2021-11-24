export interface IGlobal {
    apiBaseUrl: string;
    urlCombination(qUrlB: string): string;
    urlFastAPI(): string;
}
export class TGlobal {
    static apiBaseUrl = "";
    static appTitle = "OneAdmin";
    static appCaptoin = "OneAdmin";
    static cmsCode = "";
    static appLogoUrl = "";
    static dbCode = "";
    public static urlCombination(qUrlB: string): string {
        let qUrlA = TGlobal.apiBaseUrl;
        qUrlA = qUrlA.trim();
        qUrlB = qUrlB.trim();
        let lAEnd = qUrlA.charAt(qUrlA.length - 1);
        let lBStart = qUrlB.substring(0, 1);
        lAEnd = lAEnd.replace("\\", "/");
        lBStart = lBStart.replace("\\", "/");
        if (lAEnd == "/") {
            qUrlA = qUrlA.substring(0, qUrlA.length - 1);
        }
        if (lBStart == "/") {
            qUrlB = qUrlB.substring(1, qUrlB.length);
        }
        let lUrl = qUrlA + "/" + qUrlB;
        return lUrl;
    }
    public static urlFastAPI(): string {
        let qUrlA = TGlobal.apiBaseUrl;
        let qUrlB = "/OneService/FastHelper/FastModule";
        qUrlA = qUrlA.trim();
        qUrlB = qUrlB.trim();
        let lAEnd = qUrlA.charAt(qUrlA.length - 1);
        let lBStart = qUrlB.substring(0, 1);
        lAEnd = lAEnd.replace("\\", "/");
        lBStart = lBStart.replace("\\", "/");
        if (lAEnd == "/") {
            qUrlA = qUrlA.substring(0, qUrlA.length - 1);
        }
        if (lBStart == "/") {
            qUrlB = qUrlB.substring(1, qUrlB.length);
        }
        let lUrl = qUrlA + "/" + qUrlB;
        return lUrl;
    }
}

export default TGlobal;
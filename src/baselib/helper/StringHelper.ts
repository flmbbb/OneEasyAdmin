
class DateFormatOption {
	"M+": number;//月
	"d+": number;//日
	"H+": number;//小时
	"m+": number;//分
	"s+": number;//秒
	"q+": number;//季度
	"S+": number;//毫秒
}

export class TStringHelper {
	//判断字符串是不是空
	public static stringIsEmpty(qStr: string): boolean {
		if (qStr == undefined || qStr == "undefined" || qStr == null || qStr == "" || qStr.trim() == "") {
			return true;
		} else {
			return false;
		}
	}
	public static stringIsEmptyYW(qStr: string): boolean {
		//-1也算是业务为空的
		if (qStr == undefined || qStr == "undefined" || qStr == null || qStr == "" || qStr.trim() == "" || qStr.trim() == "-1") {
			return true;
		} else {
			return false;
		}
	}
	//获取GUID32
	public static getGUID(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	//两个url组装 判断组装的地方有没有 / \ 
	public static urlCombination(qUrlA: string, qUrlB: string): string {
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
	public static urlJoinParams(qUrl: string, qKeyName: string, qkeyValue: string): string {
		if (qUrl.indexOf("?") > 0) {
			qUrl = qUrl + "&" + qKeyName + "=" + qkeyValue;
		} else {
			qUrl = qUrl + "?" + qKeyName + "=" + qkeyValue;
		}
		return qUrl;
	}
	public static getDateNowStr() {
		let lDate = Date.now();
		//this.formatDate(lDate, "yyyy-MM-dd HH:mm:ss.SSS")

	}

	private static formatDate(date: Date, fmt: string) {
		const options = new DateFormatOption();
		options["M+"] = date.getMonth() + 1;
		options["d+"] = date.getDate();
		options["H+"] = date.getHours();
		options["m+"] = date.getMinutes();
		options["s+"] = date.getSeconds();
		options["q+"] = Math.floor((date.getMonth() + 3) / 3);
		options["S+"] = date.getMilliseconds();

		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (const i in options) {
			const key = i as keyof DateFormatOption;//转换key格式
			if (new RegExp("(" + i + ")").test(fmt)) {
				let matchZeros = "";//补零
				for (let j = 0; j < RegExp.$1.length; j++) {
					matchZeros += "0";
				}
				const newVal = (matchZeros + options[key]).substr(("" + options[key]).length);
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (options[key]).toString() : newVal);
			}
		}
		return fmt;
	}
}
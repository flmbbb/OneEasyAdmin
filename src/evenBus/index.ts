import mitt from 'mitt'
import store, { IMenuItem, defaultTag } from "@/store";

export default class EvenBus {
    public static _instance = mitt();
    public static addTag(qMenuItem: IMenuItem) {
        if (qMenuItem.menuComponent.length <= 0) {
            //菜单展开不处理事件
            return;
        }
        store.state.tagsList.itemTags.find
        let temp = store.state.tagsList.itemTags.find((vale: IMenuItem) => {
            return vale.menuIndexName == qMenuItem.menuIndexName;
        });
        if (!temp) {
            //增加
            store.state.tagsList.itemTags.push(qMenuItem);
        }
        EvenBus._instance.emit("changeTag", qMenuItem);
    }
    public static chageTag(qMenuItem: IMenuItem) {
        EvenBus._instance.emit("changeTag", qMenuItem);
        store.state.indexTag = qMenuItem;
    }
    public static defalutTag() {
        EvenBus.chageTag(defaultTag);
    }
    public static closeTag(qMenuItem: IMenuItem) {
        store.state.tagsList.itemTags.find
        let temp = store.state.tagsList.itemTags.findIndex((vale: IMenuItem) => {
            return vale.menuIndexName == qMenuItem.menuIndexName;
        });
        if (temp >= 0) {
            store.state.tagsList.itemTags.splice(temp, 1);
            if (store.state.tagsList.itemTags.length == 0) {
                //为空就推个空的,当然也可以推主页
                EvenBus.defalutTag();
                return;
            }
            if (store.state.tagsList.itemTags.length <= temp) {
                temp = temp - 1;
            }
            let tempItem = store.state.tagsList.itemTags.find((vale: IMenuItem, index: number) => {
                return index == temp;
            });
            if (tempItem != undefined) {
                EvenBus.chageTag(tempItem);
            }
        }
        //设定当前页
    }
    public static closeTagAll() {
        if (store.state.tagsList.itemTags.length > 0) {
            store.state.tagsList.itemTags = [];
            EvenBus.defalutTag();
            return;
        }
    }
    public static closeOtherTag(qMenuItem: IMenuItem) {
        if (store.state.tagsList.itemTags.length <= 1) {
            return;
        }
        //关闭其它,除了自已
        const curItem = store.state.tagsList.itemTags.filter((item: IMenuItem) => {
            return item.menuIndexName == qMenuItem.menuIndexName;
        });
        store.state.tagsList.itemTags = curItem;
        EvenBus.chageTag(qMenuItem);
    }
}
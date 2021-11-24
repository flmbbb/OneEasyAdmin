import { IMenuItem } from "@/store";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
export default class TFormBase extends Vue {
    //@Ref 不可有v-if模块 refs写
    // declare $refs: {
    //     FrmDataList: TFrmModuleDataList;
    //   };
    //props写法
    @Prop() zIndexTag?: IMenuItem;  //列标签数据
    @Prop() zContextParams: any;   //上文窗体传过来的参数,比如列表编辑打开明细,传参用的
    @Prop() zContextOnCall: any;  //回调上文窗体事件
    // declare $props: {
    //     indexTag: IMenuItem;
    // };
    //数据打开成功标识,自已的单元自已把控
    public zIsOpenData: boolean = false;
    public zCurrID: string = ""; //一般存放主键值
    //
    //Watch用户
    // @Watch("$route")
    // onRouteChanged(to: any) {
    //   // Do stuff with the watcher here.
    //   if (to.meta.keepAlive && this.includeList.indexOf(to.name) === -1) {
    //     // this.includeList.push(to.name);
    //   }
    // }
}

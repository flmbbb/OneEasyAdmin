//控件注册
//主页是以 Tab-pane 去承担每个控件,不以路由
//路由不好的地方只能打开一个
import TDashboard from "@/views/Dashboard.vue"
import TAbout from "@/views/About.vue"
export default (app: any) => {
    app.component("TDashboard", TDashboard);
    app.component("TAbout", TAbout);
}
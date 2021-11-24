<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold" style="color: black"></i>
      <i v-else class="el-icon-s-unfold" style="color: black"></i>
    </div>
    <div class="logo">{{ FCaption }}</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div> -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <i class="el-icon-s-custom"></i>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.userName }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="loginout"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { TMenuList, TTokenInfo } from "@/store";
import TGlobal from "@/baselib/helper/GlobalHelper";
//配合着用
@Options({
  data() {
    return {
      fullscreen: false,
      message: 2,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //当界面小于多少时，主动关闭菜单，先屏B
    // if (document.body.clientWidth < 1500) {
    //   this.collapseChage();
    // }
  },
})
export default class Header extends Vue {
  private FCaption: string = TGlobal.appCaptoin;
  private userInfo: TTokenInfo = store.state.tokenInfo;
  private get collapse(): boolean {
    return store.state.collapse;
  }
  public created() {}

  public handleCommand(command: string) {
    // 用户名下拉菜单选择事件
    if (command == "loginout") {
      //清登陆记录
      TTokenInfo.initTokenInfo(store.state.tokenInfo);
      //清标签页
      store.state.tagsList = new TMenuList();
      this.$router.replace("Login");
    }
  }
  // 侧边栏折叠
  public collapseChage() {
    store.commit("hadndleCollapse", !store.state.collapse);
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  font-size: 22px;
  background-color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 40px;
  color: #bdb8b8;
}
.header .logo {
  float: left;
  font-size: 15px;
  width: 250px;
  line-height: 40px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 40px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 8px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: black;
}
.user-avator {
  margin-left: 10px;
  margin-right: 5px;
  color: #77a381;
}

.el-dropdown-link {
  color: black;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>

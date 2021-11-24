<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">{{ appCaption }}</div>
      <el-form
        :model="userLogin"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="loginCode">
          <el-input v-model="userLogin.loginCode" placeholder="请输入账号">
            <template #prefix>
              <el-icon class="el-icon-user" color="red"></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-tooltip
          v-model="capsTooltip"
          content="大写状态"
          placement="right"
          manual
        >
          <el-form-item prop="loginPass">
            <el-input
              type="loginPass"
              placeholder="请输入密码"
              v-model="userLogin.loginPass"
              @keyup="checkCapslock"
              @keyup.enter="adminLogin()"
              show-password
            >
              <template #prefix>
                <el-icon class="el-icon-lock" color="red"></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-tooltip>
        <div class="login-btn">
          <el-button type="primary" @click="adminLogin()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script  lang="ts">
import store from "@/store";
import md5 from "js-md5";
import { Options, Vue } from "vue-class-component";
//配合着用
@Options({
  components: {},
})
export default class Login extends Vue {
  private get appCaption(): string {
    return this.$myGlobal.appCaptoin;
  }
  private capsTooltip: boolean = false;
  private userLogin = { loginCode: "admin", loginPass: "" };
  private rules = {
    loginCode: [{ required: true, message: "请输入账号", trigger: "blur" }],
    loginPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  public created() {
    this.userLogin.loginCode = store.state.tokenInfo.loginCode;
  }
  private async adminLogin() {
    //
    if (this.$myStrHelper.stringIsEmpty(this.userLogin.loginCode)) {
      this.$myMsgHelp.msgHintAutoClose("请输入账号");
      return;
    }
    if (this.$myStrHelper.stringIsEmpty(this.userLogin.loginPass)) {
      this.$myMsgHelp.msgHintAutoClose("请输入密码");
      return;
    }
    //登陆接口,方法里面有写入用户全局信息,如果提示密码不正确，请更新中中间层
    //兼容客户端 密码是加密码还是非加密两种模式
    let lUserPass = md5(this.userLogin.loginPass);
    let lResult = await this.$myBaseRightAPI.adminLogin(
      this.userLogin.loginCode,
      lUserPass
    );
    if (!lResult.resultSuccess) {
      this.$myMsgHelp.msgDialog(lResult.resultMsg);
    } else {
      this.$router.replace("/");
    }
  }

  private checkCapslock(e: { key: any }) {
    const { key } = e;
    this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: #283443;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: rgb(19, 172, 233);
  border-bottom: 1px solid rgb(19, 172, 233);
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 480px;
  margin: -190px 0 0 -190px;
  border-radius: 5px;
  background: #19222e;
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>
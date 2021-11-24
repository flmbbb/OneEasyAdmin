<template>
  <router-view />
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
//配合着用
@Options({
  components: {},
  computed: {},
})
export default class App extends Vue {
  public created() {
    document.title = this.$myGlobal.appTitle;
  }
}
</script>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
@import "./assets/css/elm.css";
/* 联级检查器放在 el-form-item情况下充满*/

</style>

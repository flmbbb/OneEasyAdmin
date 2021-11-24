<template>
  <div style="margin-bottom: 50px">
    <div style="color: red; text-align: center; width: 100%;">
      <h1>平台介绍说明</h1>
    </div>
    <div>
      <h2>此后台主要管理中间件的功能</h2>
      <h3>1.平台快速接口的管理</h3>
      <h3>2.平台数据库账套管理</h3>
      <h3>3.平台日记管理</h3>
      <h3>4.平台Token管理</h3>
      <h3>5.其它管理</h3>
    </div>
    <div style="color: red; text-align: right; width: 100%;">
      <h3>作者:Flm(范联满)</h3>
      <h3>联系QQ:378464060</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
//配合着用
@Options({
  components: {},
  computed: {},
  props: {
    //上下文
    FContext: {},
  },
})
export default class Dashboard extends Vue {
  public created() {}
}
</script>
<style scoped>
</style>
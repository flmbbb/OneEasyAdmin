<template>
  <div>
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-header />
      <v-tags ref="menuTags"></v-tags>
      <div class="content">
        <el-tabs id="homTable" v-model="FIndexName">
          <el-tab-pane
            v-for="item in tagsList"
            :key="item.menuIndexName"
            :name="item.menuIndexName"
            :label="item.menuTitle"
          >
            <component :is="item.menuComponent" :zIndexTag="item"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IMenuItem } from "@/store";
import vHeader from "@/components/Header.vue";
import vSidebar from "@/components/Sidebar.vue";
import vTags from "@/components/Tags.vue";

//配合着用
@Options({
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  computed: {},
})
export default class Home extends Vue {
  public FIndexName: string = "";
  private get tagsList(): IMenuItem[] {
    return store.state.tagsList.itemTags;
  }
  public created() {
    this.$myEvenBus._instance.on("changeTag", (qItem) => {
      this.FIndexName = (qItem as IMenuItem).menuIndexName;
    });
    //获取动态菜单
  }
  private changeIndexName(qTagItem: IMenuItem) {}
  private get collapse(): boolean {
    return store.state.collapse;
  }
}
</script>
<style scope>
/* 设定homeTale不显示标签 */
#homTable > .el-tabs__header {
  visibility: hidden;
  height: 0;
  margin: 0;
}

.log-box {
  width: 100%;
  height: 100%;
  padding: 10px;
  /*加上display和display-direction样式属性就可以解决页面卡死问题*/
  display: flex;
  flex-direction: column;
}
</style>
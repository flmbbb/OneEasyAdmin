<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <template v-for="item in items">
        <template v-if="item.menuChildren.length > 0">
          <el-sub-menu :index="item.menuIndexName" :key="item.menuIndexName">
            <template #title>
              <i :class="item.menuIcon"></i>
              <span>{{ item.menuTitle }}</span>
            </template>
            <template v-for="subItem in item.menuChildren">
              <el-sub-menu
                v-if="subItem.menuChildren.length > 0"
                :index="subItem.menuIndexName"
                :key="subItem.menuIndexName"
              >
                <template #title>
                  <i :class="subItem.menuIcon"></i>
                  <span>{{ subItem.menuTitle }}</span>
                </template>
                <el-menu-item
                  v-for="threeItem in subItem.menuChildren"
                  :key="threeItem.menuIndexName"
                  :index="threeItem.menuIndexName"
                  @click="DoOpenMeun(threeItem)"
                  >{{ threeItem.menuTitle }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.menuIndexName"
                :key="subItem.menuIndexName"
                @click="DoOpenMeun(subItem)"
              >
                <template #title>
                  <i :class="subItem.menuIcon"></i>
                  <span>{{ subItem.menuTitle }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.menuIndexName"
            :key="item.menuIndexName"
            @click="DoOpenMeun(item)"
          >
            <i :class="item.menuIcon"></i>
            <template #title>{{ item.menuTitle }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IMenuItem } from "@/store";
//配合着用
@Options({})
export default class Sidebar extends Vue {
  private items: IMenuItem[] = store.state.menuList;
  public created() {}
  private get collapse(): boolean {
    return store.state.collapse;
  }
  public DoOpenMeun(item: IMenuItem) {
    this.$myEvenBus.addTag(item);
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 210px;
}
.sidebar > ul {
  height: 100%;
}
</style>

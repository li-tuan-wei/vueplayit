<template>
  <div style="margin-top: 10px">
    <el-tabs v-model="defaultTab" type="card">
      <el-tab-pane label="部门管理" name="depManager">
        <dep-mana></dep-mana>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="positionManager">
        <pos-mana state="position"></pos-mana>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="jobTitleManager">
        <job-mana state="jobtitle"></job-mana>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="menuRole">
        <menu-role></menu-role>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import MenuRole from './organ/MenuRole.vue'
  import DepManager from './organ/DepManager.vue'
  import JobTitleManager from './organ/JobTitleManager.vue'
  import PositionManager from './organ/PositionManager.vue'
  export default {
    data() {
      return {
        defaultTab: 'depManager'
      };
    },
    methods: {},
    components: {
      'menu-role': MenuRole,
      'dep-mana': DepManager,
      'job-mana': JobTitleManager,
      'pos-mana': PositionManager
    }
  };
</script>

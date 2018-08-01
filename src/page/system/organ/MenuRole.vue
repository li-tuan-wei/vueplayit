<template>
  <div>
    <div style="text-align: left" v-loading="loading">
      <el-input placeholder="请输入角色英文名称..."
                size="mini"
                style="width: 250px"
                v-model="newRole">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        placeholder="请输入角色中文名称..."
        size="mini"
        style="width: 250px"
        v-model="newRoleZh">
      </el-input>
      <el-button type="primary" size="mini" style="margin-left: 5px" @click="addNewRole">添加角色</el-button>
    </div>
    <div style="margin-top: 10px;text-align: left">
      <el-collapse v-model="activeColItem" accordion style="width: 500px;" @change="collapseChange">
        <el-collapse-item v-for="(item,index) in roles" :title="item.nameZh" :name="item.id" :key="item.name">
          <el-card class="box-card">
            <div slot="header">
              <span>可访问的资源</span>
              <el-button type="text"
                         style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                         icon="el-icon-delete" @click="deleteRole(item.id,item.nameZh)"></el-button>
            </div>
            <div>
              <el-tree :props="props"
                       :key="item.id"
                       :data="treeData"
                       :default-checked-keys="checkedKeys"
                       node-key="id"
                       ref="tree"
                       show-checkbox
                       highlight-current
                       @check-change="handleCheckChange">
              </el-tree>
            </div>
            <div style="display: flex;justify-content: flex-end;margin-right: 10px">
              <el-button size="mini" @click="cancelUpdateRoleMenu">取消修改</el-button>
              <el-button type="primary" size="mini" @click="updateRoleMenu(index)">确认修改</el-button>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  import {isNotNullORBlank} from '../../../share/utils'
  export default{
    mounted: function () {
      this.loading = true;
      this.initRoles();
    },
    methods: {
      deleteRole(rid, rname){
        var _this = this;
        this.$confirm('删除角色[' + rname + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.loading = true;
          var _responseData = {"msg":"删除成功!","status":"success"};
          _this.$message({type: _responseData.status, message: _responseData.msg})
          _this.initRoles();
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addNewRole(){
        var _this = this;
        if (isNotNullORBlank(this.newRole, this.newRoleZh)) {
          this.loading = true;
          var _responseData = {"status":"success","msg":"添加成功!"};
          _this.$message({type: _responseData.status, message: _responseData.msg});
          _this.newRole = '';
          _this.newRoleZh = '';
          _this.initRoles();
        } else {
          _this.$message({
            type: 'warning',
            message: '角色名称不能为空！'
          });
        }
      },

      updateRoleMenu(index){
        var checkedKeys = this.$refs.tree[index].getCheckedKeys(true); //true:只获取子id
        var _this = this;
        var data = {"status":"success","msg":"修改成功!"};
        _this.$message({type: data.status, message: data.msg})
        _this.activeColItem = -1;

      },
      collapseChange(activeName){
        if (activeName == '') {
          return;
        }
        var _this = this;

        var _responseData = {"mids":[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"menus":[{"id":1,"path":null,"component":null,"name":"所有","iconCls":null,"children":[{"id":2,"path":null,"component":null,"name":"员工资料","iconCls":null,"children":[{"id":7,"path":null,"component":null,"name":"基本资料","iconCls":null,"children":null,"meta":null}],"meta":null},{"id":3,"path":null,"component":null,"name":"人事管理","iconCls":null,"children":[{"id":10,"path":null,"component":null,"name":"员工奖惩","iconCls":null,"children":null,"meta":null},{"id":11,"path":null,"component":null,"name":"员工培训","iconCls":null,"children":null,"meta":null},{"id":12,"path":null,"component":null,"name":"员工调薪","iconCls":null,"children":null,"meta":null},{"id":13,"path":null,"component":null,"name":"员工调动","iconCls":null,"children":null,"meta":null}],"meta":null},{"id":4,"path":null,"component":null,"name":"薪资管理","iconCls":null,"children":[{"id":14,"path":null,"component":null,"name":"工资账套管理","iconCls":null,"children":null,"meta":null},{"id":15,"path":null,"component":null,"name":"员工账套设置","iconCls":null,"children":null,"meta":null},{"id":16,"path":null,"component":null,"name":"工资表管理","iconCls":null,"children":null,"meta":null},{"id":17,"path":null,"component":null,"name":"月末处理","iconCls":null,"children":null,"meta":null},{"id":18,"path":null,"component":null,"name":"工资表查询","iconCls":null,"children":null,"meta":null}],"meta":null},{"id":5,"path":null,"component":null,"name":"统计管理","iconCls":null,"children":[{"id":19,"path":null,"component":null,"name":"综合信息统计","iconCls":null,"children":null,"meta":null},{"id":20,"path":null,"component":null,"name":"员工积分统计","iconCls":null,"children":null,"meta":null},{"id":21,"path":null,"component":null,"name":"人事信息统计","iconCls":null,"children":null,"meta":null},{"id":22,"path":null,"component":null,"name":"人事记录统计","iconCls":null,"children":null,"meta":null}],"meta":null},{"id":6,"path":null,"component":null,"name":"系统管理","iconCls":null,"children":[{"id":23,"path":null,"component":null,"name":"基础信息设置","iconCls":null,"children":null,"meta":null},{"id":24,"path":null,"component":null,"name":"系统管理","iconCls":null,"children":null,"meta":null},{"id":25,"path":null,"component":null,"name":"操作日志管理","iconCls":null,"children":null,"meta":null},{"id":26,"path":null,"component":null,"name":"操作员管理","iconCls":null,"children":null,"meta":null},{"id":27,"path":null,"component":null,"name":"备份恢复数据库","iconCls":null,"children":null,"meta":null},{"id":28,"path":null,"component":null,"name":"初始化数据库","iconCls":null,"children":null,"meta":null}],"meta":null}],"meta":null}]};

        _this.treeData = _responseData.menus;
        _this.checkedKeys = _responseData.mids;

      },
      handleCheckChange(data, checked, indeterminate) {
//        console.log(data,checked,indeterminate)
      },
      initRoles(){
        var _this = this;
        var _data = [{"id":1,"name":"ROLE_manager","nameZh":"部门经理"},{"id":2,"name":"ROLE_personnel","nameZh":"人事专员"},{"id":3,"name":"ROLE_recruiter","nameZh":"招聘主管"},{"id":4,"name":"ROLE_train","nameZh":"培训主管"},{"id":5,"name":"ROLE_performance","nameZh":"薪酬绩效主管"},{"id":13,"name":"ROLE_test2","nameZh":"测试角色2"}];
        _this.roles = _data;
        _this.loading = false;
        _this.activeColItem=-1
      },
      cancelUpdateRoleMenu(){
        this.activeColItem = -1;
      }
    },
    data(){
      return {
        props: {
          label: 'name',
          children: 'children'
        },
        newRole: '',
        newRoleZh: '',
        roles: [],
        treeData: [],
        checkedKeys: [],
        loading: false,
        activeColItem: -1
      };
    }
  }
</script>

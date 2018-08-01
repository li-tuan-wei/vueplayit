<template>
  <div style="padding-top: 2rem;" >
    <div style="text-align: left">
      <el-input
        placeholder="输入菜单名称搜索菜单..."
        style="width: 500px;margin: 0px;padding: 0px;"
        size="mini"
        prefix-icon="el-icon-search"
        v-model="keywords">
      </el-input>
    </div>
    <div>
      <el-tree
        :props="defaultProps"
        :data="treeData"
        ref="tree"
        :filter-node-method="filterNode"
        v-loading="treeLoading"
        style="width: 500px;margin-top: 10px"
        :render-content="renderContent">
      </el-tree>
      <div style="text-align: left">
        <el-dialog
          title="添加菜单"
          :visible.sync="dialogVisible"
          width="25%">
          <div>
            <span>上级菜单</span>
            <el-select v-model="cMenu" style="width: 200px" placeholder="请选择" size="mini">
              <el-option
                v-for="item in menuItems"
                :key="item.id"
                :label="item.menuName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <span>菜单名称</span>
            <el-input size="mini" style="width: 200px;" v-model="menuName" placeholder="请输入菜单名称..." ></el-input>
          </div>
          <div style="margin-top: 10px">
            <span>菜单描述</span>
            <el-input size="mini" style="width: 200px;" v-model="menuDesc" placeholder="请输入菜单描述..." ></el-input>
          </div>
          <div style="margin-top: 10px">
            <span>菜单路径</span>
            <el-input size="mini" style="width: 200px;" v-model="menuPath" placeholder="/system/example" ></el-input>
          </div>
          <div style="margin-top: 10px">
            <span>菜单组件</span>
            <el-input size="mini" style="width: 200px;" v-model="menuComponent" placeholder="请输入菜单组件" ></el-input>
          </div>
          <div style="margin-top: 10px">
            <span>是否启用</span>
            <el-switch
              v-model="enabled"
              active-text="是"
              inactive-text="否" style="padding-left:1rem;">
            </el-switch>
          </div>
          <div style="margin-top: 10px">
            <span>匿名访问</span>
            <el-switch
              v-model="anonymousAccess"
              active-text="是"
              inactive-text="否" style="padding-left:1rem;">
            </el-switch>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="addMenu">添加</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
      cMenu: '',
      menuName: '',
      menuDesc: '',
      enabled: false,
      anonymousAccess: false,
      menuPath: '',
      menuComponent: '',
      menuItems: [],
      treeLoading: false,
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        label: 'menuName',
        isLeaf: 'leaf',
        children: 'children'
      }
    }
  },
  mounted: function () {
    this.treeLoading = true;
    this.loadTreeData();
  },
  watch: {
    keywords(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    addMenu(){
      var _this = this;
      this.dialogVisible = false;
      this.treeLoading = true;
      this.treeLoading = false;
      _this.$message({message: "添加成功!"});
    },
    loadTreeData(){
      var _this = this;

      var data = [{"id":"1","menuName":"系统管理","parentId":"-1","enabled":"true","edit":"N","parent":"true","children":[{"id":"2","menuName":"系统用户","parentId":"1","enabled":true},{"id":"3","menuName":"组织管理","parentId":"1","enabled":true},{"id":4,"menuName":"菜单管理","parentId":"1","enabled":true},{"id":"5","menuName":"会员管理","parentId":"1","enabled":true}]},{"id":6,"menuName":"系统工具","parentId":-1,"enabled":true,"edit":"N","parent":"true", "children":[{"id":"7","menuName":"发送邮件","parentId":"6","enabled":true}]}];

      _this.treeData = data;
      _this.treeLoading = false;
    },

    loadAllMenus(){
      var _this = this;
      //再次发送请求拿到最新的的数据
      var responseData = [{"id":"1","menuName":"系统管理","parentId":"-1","enabled":true},{"id":"2","menuName":"系统用户","parentId":"1","enabled":true},{"id":"3","menuName":"组织管理","parentId":"1","enabled":true},{"id":4,"menuName":"菜单管理","parentId":"1","enabled":true},{"id":"5","menuName":"会员管理","parentId":"1","enabled":true},{"id":6,"menuName":"系统工具","parentId":-1,"enabled":true},{"id":"7","menuName":"发送邮件","parentId":"6","enabled":true}];
    _this.menuItems = responseData;
    },
    renderContent(h, {node, data, store}) {
      if(data.edit == 'N'){
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="primary" size="mini" style="padding:3px" on-click={ () => this.showAddMenuView(data,event) }>添加菜单</el-button>
              <el-button disabled style="font-size: 12px;" type="danger" size="mini" style="padding:3px" on-click={ () => this.deleteMenu(data,event) }>删除菜单</el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="primary" size="mini" style="padding:3px" on-click={ () => this.showAddMenuView(data,event) }>添加菜单</el-button>
              <el-button style="font-size: 12px;" type="danger" size="mini" style="padding:3px" on-click={ () => this.deleteMenu(data,event) }>删除菜单</el-button>
            </span>
          </span>
        );
      }

    },
    showAddMenuView(data, event){
      this.loadAllMenus();
      this.dialogVisible = true;
      this.cMenu = data.id;
      this.enabled = false;
      this.anonymousAccess = false;
      event.stopPropagation();
    },
    deleteDep(data, event){
      var _this = this;
      if (data.children.length>0) {
        this.$message({
          message: '该菜单下尚有子菜单，不能被删除!',
          type: 'warning'
        });
      } else {
        this.$confirm('删除[' + data.name + ']菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.treeLoading = true;
          _this.treeLoading = false;
          _this.$message({message: "删除成功!"});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
     }
     event.stopPropagation();
    }
  }
}
</script>

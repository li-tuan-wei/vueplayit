<template>
  <div>
    <div style="text-align: left">
      <el-input
        placeholder="输入部门名称搜索部门..."
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
          title="添加部门"
          :visible.sync="dialogVisible"
          width="25%">
          <div>
            <span>上级部门</span>
            <el-select v-model="pDep" style="width: 200px" placeholder="请选择" size="mini">
              <el-option
                v-for="item in allDeps"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <span>部门名称</span>
            <el-input size="mini" style="width: 200px;" v-model="depName" placeholder="请输入部门名称..." ></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="addDep">添加</el-button>
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
      depName: '',
      pDep: '',
      allDeps: [],
      treeLoading: false,
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        label: 'name',
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
      return data.name.indexOf(value) !== -1;
    },
    addDep(){
      var _this = this;
      this.dialogVisible = false;
      this.treeLoading = true;
      this.treeLoading = false;
      _this.$message({message: "添加成功!"});
    },
    loadTreeData(){
      var _this = this;

      var data = [{"id":1,"name":"股东会","parentId":-1,"enabled":true,"children":[{"id":4,"name":"董事会","parentId":1,"enabled":true,"children":[{"id":5,"name":"总办","parentId":4,"enabled":true,"children":[{"id":8,"name":"财务部","parentId":5,"enabled":true,"children":[],"parent":false},{"id":78,"name":"市场部","parentId":5,"enabled":true,"children":[{"id":81,"name":"华北市场部","parentId":78,"enabled":true,"children":[{"id":85,"name":"石家庄市场部","parentId":81,"enabled":true,"children":[],"parent":false}],"parent":true},{"id":82,"name":"华南市场部","parentId":78,"enabled":true,"children":[],"parent":false},{"id":86,"name":"西北市场部","parentId":78,"enabled":true,"children":[{"id":87,"name":"西安市场","parentId":86,"enabled":true,"children":[{"id":89,"name":"莲湖区市场","parentId":87,"enabled":true,"children":[],"parent":false}],"parent":true}],"parent":true}],"parent":true},{"id":91,"name":"技术部","parentId":5,"enabled":true,"children":[],"parent":false},{"id":92,"name":"运维部","parentId":5,"enabled":true,"children":[],"parent":false}],"parent":true}],"parent":true}],"parent":true}];

      _this.treeData = data;
      _this.treeLoading = false;
    },

    loadAllDeps(){
      var _this = this;
      //再次发送请求拿到最新的的数据
      var depsData = [{"id":1,"name":"股东会","parentId":-1,"enabled":true,"children":[],"parent":true},{"id":4,"name":"董事会","parentId":1,"enabled":true,"children":[],"parent":true},{"id":5,"name":"总办","parentId":4,"enabled":true,"children":[],"parent":true},{"id":8,"name":"财务部","parentId":5,"enabled":true,"children":[],"parent":false},{"id":78,"name":"市场部","parentId":5,"enabled":true,"children":[],"parent":true},{"id":81,"name":"华北市场部","parentId":78,"enabled":true,"children":[],"parent":true},{"id":82,"name":"华南市场部","parentId":78,"enabled":true,"children":[],"parent":false},{"id":85,"name":"石家庄市场部","parentId":81,"enabled":true,"children":[],"parent":false},{"id":86,"name":"西北市场部","parentId":78,"enabled":true,"children":[],"parent":true},{"id":87,"name":"西安市场","parentId":86,"enabled":true,"children":[],"parent":true},{"id":89,"name":"莲湖区市场","parentId":87,"enabled":true,"children":[],"parent":false},{"id":91,"name":"技术部","parentId":5,"enabled":true,"children":[],"parent":false},{"id":92,"name":"运维部","parentId":5,"enabled":true,"children":[],"parent":false}];
    _this.allDeps = depsData;
    },
    renderContent(h, {node, data, store}) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="primary" size="mini" style="padding:3px" on-click={ () => this.showAddDepView(data,event) }>添加部门</el-button>
            <el-button style="font-size: 12px;" type="danger" size="mini" style="padding:3px" on-click={ () => this.deleteDep(data,event) }>删除部门</el-button>
          </span>
        </span>
      );
    },
    showAddDepView(data, event){
      this.loadAllDeps();
      this.dialogVisible = true;
      this.pDep = data.id;
      event.stopPropagation();
    },
    deleteDep(data, event){
      var _this = this;
      if (data.children.length>0) {
        this.$message({
          message: '该部门下尚有其他部门，不能被删除!',
          type: 'warning'
        });
      } else {
        this.$confirm('删除[' + data.name + ']部门, 是否继续?', '提示', {
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

<template>
  <div>
    <div style="text-align: left">
      <el-input
        placeholder="添加职位..."
        size="mini"
        @keyup.enter.native="addPosition"
        style="width: 300px;"
        prefix-icon="el-icon-plus"
        v-model="positionName">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addPosition">添加</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
        v-loading="loading"
        :data="posData"
        size="mini"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 80%">
        <el-table-column
          type="selection"
          width="55"
          align="left">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职位名称"
          width="180"
          align="left">
        </el-table-column>
        <el-table-column
          width="180"
          label="创建时间"
          align="left">
          <template slot-scope="scope">{{ scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: left;margin-top: 10px">
      <el-button type="danger" size="mini" v-if="posData.length>0" :disabled="multipleSelection.length==0"
      @click="deleteMany">
      批量删除
      </el-button>
    </div>
    <div style="text-align: left">
      <el-dialog
        title="编辑职位名称"
        :visible.sync="dialogVisible"
        width="25%">
        <el-input v-model="updatePosName" size="mini" placeholder="请输入新的职位名称..."></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="mini" @click="updatePosNameExec">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        positionName: '',
        updatePosName: '',
        titleLevel: '',
        updatePosId: -1,
        loading: false,
        dialogVisible: false,
        multipleSelection: [],
        type: [],
        titleLevels: ['正高级', '副高级', '中级', '初级', '员级'],
        nameLabelName: '职位名称',
        posData: [{"id":29,"name":"技术总监","createDate":1515676422000},{"id":30,"name":"运营总监","createDate":1515676428000},{"id":31,"name":"市场总监","createDate":1515676436000},{"id":32,"name":"总经理","createDate":1515677707000},{"id":33,"name":"研发工程师","createDate":1515917231000},{"id":34,"name":"运维工程师-","createDate":1515917501000},{"id":35,"name":"项目经理","createDate":1529133399000}]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row){
        this.updatePosName = row.name;
        this.updatePosId = row.id;
        this.dialogVisible = true;
      },
      updatePosNameExec(){
        var _this = this;
        if (!_this.isNotNullORBlank(_this.updatePosName)) {

          _this.$message({
            message: '职位名称不能为空!',
            type: 'warning'
          });
          return;
        }
        _this.loading = true;
        _this.loading = false;
        _this.dialogVisible = false;

        _this.$message({ message: "职位名称更新成功！"});
        //_this.loadTableData();

      },
      addPosition(){
        var _this = this;
        if (!_this.isNotNullORBlank(_this.positionName)) {
          _this.$message({
            message: '职位名称不能为空!',
            type: 'warning'
          });
          return;
        }
      },
      deleteMany(){
        var _this = this;
        this.$confirm('删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var multipleSelection = _this.multipleSelection;
          var ids = '';
          multipleSelection.forEach(row=> {
            ids = ids + row.id + ',';
          })
          _this.doDelete(ids);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleDelete(index, row){
        var _this = this;
        this.$confirm('删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.doDelete(row.id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doDelete(ids){
        var _this = this;
        _this.loading = true;
        this.$message({
          type: 'info',
          message: '删除成功！'
        });
        _this.loading = false;
      }

    }
  }
</script>
